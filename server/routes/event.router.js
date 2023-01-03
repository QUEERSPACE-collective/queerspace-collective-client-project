const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// also getting the total number of attendees per event
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = 
    `SELECT "events"."name", "events".id, "events"."dateTime", 
    "events"."location", "events".description, "events"."type", "userEvents"."eventId",
    "events"."attendeeMax", "events"."programLocationID",
    count ("userEvents"."userId") as total_attendees
    FROM "events"
    FULL JOIN "userEvents" ON "userEvents"."eventId" = "events".id
    GROUP BY "events"."name", "events".id, "userEvents"."eventId";
    `;
    pool.query(sqlText)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(error => {
            console.error('error getting events back from db', error)
            res.sendStatus(500);
        })
})

// getting event details with count of total attendees
// router.get('/specificEvent/:id', rejectUnauthenticated, (req,res) => {
//     const sqlParams = [req.params.id]
//     const sqlText = `SELECT "questions"."eventId", "questionId", "question", "answer", "name", "location", "description", "user"."username","fname","lname","userType", "user"."id" 
//     FROM "questions"
//        RIGHT JOIN "answers" ON "answers"."questionId" = "questions"."id"
//        LEFT JOIN "events" ON "events"."id" = "questions"."eventId" 
//        LEFT JOIN "user" ON "user"."id" = "answers"."userId"
//        LEFT JOIN "userEvents" ON "userEvents"."eventId" = "events"."id" and "events"."id" = "answers"."questionId"
//        LEFT JOIN "eventTypes" ON "eventTypes"."id" = "events"."id" WHERE "events"."id" = $1;`;
//     pool.query(sqlText, sqlParams)
//         .then(dbResult => {
//             res.send(dbResult.rows)
//         })
//         .catch(error => {
//             console.error('error getting specific event data',error)
//             res.sendStatus(500);
//         })
// });

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in router tyingn to get event details', req.params.id)
    const sqlParams = [req.params.id]
    const sqlText = 
    `SELECT * FROM "events" WHERE "id" = $1;`

    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            console.log('result of event details is', dbResult.rows)
            res.send(dbResult.rows[0])

        })
        .catch(error => {
            console.log('error getting event details from db', error)
            res.sendStatus(500)
        })
})


// get a specific event for editing
router.get('/:id/edit', rejectUnauthenticated, async (req, res)=>{
    console.log('in router.get /:id', req.params)
    try{
        const id = req.params.id;
        const sqlText=`
            SELECT * FROM "events"
            WHERE id = $1;
            `;
        let dbRes = await pool.query(sqlText, [id]);
        res.send(dbRes.rows[0]);
    }
    catch (error) {
        console.error('error in edit event', error);
        res.sendStatus(500);
    }
});

// edit the user
router.put('/:id', rejectUnauthenticated, async (req, res)=>{
    console.log('req params id', req.params.id)

    try{
        const sqlText=`
            UPDATE "events"
            SET "name" = $1, 
                "dateTime" = $2, 
                "location" = $3, 
                "programLocationID" = $4, 
                "type" = $5, 
                "description" = $6
            WHERE "id" = $7;
            `;

        const sqlParams = [
            req.body.name,
            req.body.dateTime,
            req.body.location,
            req.body.programLocationID,
            req.body.type,
            req.body.description,
            req.params.id
        ];
        let dbRes = await pool.query(sqlText, sqlParams);
        res.send(dbRes.rows);
    }
    catch (error) {
        console.error('error in PUT event', error);
        res.sendStatus(500);
    }
})

router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `
            DELETE FROM "events"
            WHERE "id" = $1;
            `;
        await pool.query(sqlText, [req.params.id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('error in delete event from db', error);
        res.sendStatus(500);
    }
});

router.post('/', (req, res) => {
    console.log('reqbody is', req.body);
    let sqlText = 
    `INSERT INTO "events" ("name","dateTime","location","programLocationID","type","attendeeMax","hasVolunteers", "volunteerMax", "description")
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING "id";`;
    let sqlParams = [req.body.data.name, req.body.data.dateTime, req.body.data.location, req.body.data.programLocationID, req.body.data.type, req.body.data.attendeeMax, req.body.data.hasVolunteers, req.body.data.volunteerMax, req.body.data.description];
    pool.query(sqlText, sqlParams)
        .then(dbRes=>{
            const eventId = dbRes.rows[0].id;
            sqlText = `INSERT INTO "questions" ("eventId", "question")
            VALUES($1,$2);`;
            req.body.data.questions.map(question=>{
                sqlParams = [eventId, question];
                pool.query(sqlText, sqlParams)
                    .catch(dbQuestionErr=>{
                        console.error(dbQuestionErr);
                    });
            });
        res.sendStatus(201);
        })
        .catch(dbErr=>{
            console.error(dbErr);
            res.sendStatus(500);
        });      
});

router.get('/questions/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id]
    const sqlText = 
    `
    SELECT * FROM "questions" WHERE "eventId" = $1;
    `;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(error => {
            console.log('error getting event questions from db', error)
            res.sendStatus(500)
        })
})



module.exports = router;