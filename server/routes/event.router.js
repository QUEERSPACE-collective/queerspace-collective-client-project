const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// getting all events and info. Joining program location and event types
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText =
        `SELECT 
            "events".id, 
            "name", 
            "dateTime", 
            "dateTimeEnd", 
            "location", 
            "locationName", 
            "eventType", 
            "totalAttendees", 
            "attendeeMax", 
            "hasVolunteers", 
            "registeredVolunteers", 
            "volunteerMax", 
            "description"
        FROM "events" 
        JOIN "programLocations" ON "events"."programLocationID" = "programLocations".id
        JOIN "eventTypes" ON "events"."type" = "eventTypes".id
        ORDER BY "events"."id" DESC;`
    ;
    pool.query(sqlText)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(error => {
            console.error('error getting events back from db', error)
            res.sendStatus(500);
        })
})

// GET the events by a certain order depending on the params value
router.get('/order/:order', rejectUnauthenticated, (req, res) => {
    console.log('what is req.params.order', req.params.order);
    const order = req.params.order;
    var sqlText = "";

    if (order == 1) {
        sqlText = 
        `SELECT 
            "events".id, 
            "name", 
            "dateTime", 
            "dateTimeEnd", 
            "location", 
            "locationName", 
            "eventType", 
            "totalAttendees", 
            "attendeeMax", 
            "hasVolunteers", 
            "registeredVolunteers", 
            "volunteerMax", 
            "description"
        FROM "events" 
        JOIN "programLocations" ON "events"."programLocationID" = "programLocations".id
        JOIN "eventTypes" ON "events"."type" = "eventTypes".id 
        ORDER BY "id" ASC;`
        ;
    } else if (order == 2) {
        sqlText = 
            `SELECT 
            "events".id, 
            "name", 
            "dateTime", 
            "dateTimeEnd", 
            "location", 
            "locationName", 
            "eventType", 
            "totalAttendees", 
            "attendeeMax", 
            "hasVolunteers", 
            "registeredVolunteers", 
            "volunteerMax", 
            "description"
        FROM "events" 
        JOIN "programLocations" ON "events"."programLocationID" = "programLocations".id
        JOIN "eventTypes" ON "events"."type" = "eventTypes".id 
        ORDER BY "id" DESC;`;
    } else if (order == 3) {
        sqlText = 
        `SELECT 
            "events".id, 
            "name", 
            "dateTime", 
            "dateTimeEnd", 
            "location", 
            "locationName", 
            "eventType", 
            "totalAttendees", 
            "attendeeMax", 
            "hasVolunteers", 
            "registeredVolunteers", 
            "volunteerMax", 
            "description"
        FROM "events" 
        JOIN "programLocations" ON "events"."programLocationID" = "programLocations".id
        JOIN "eventTypes" ON "events"."type" = "eventTypes".id 
        WHERE "dateTime" > clock_timestamp();`;
    } else {
        sqlText = 
            `SELECT 
            "events".id, 
            "name", 
            "dateTime", 
            "dateTimeEnd", 
            "location", 
            "locationName", 
            "eventType", 
            "totalAttendees", 
            "attendeeMax", 
            "hasVolunteers", 
            "registeredVolunteers", 
            "volunteerMax", 
            "description"
        FROM "events" 
        JOIN "programLocations" ON "events"."programLocationID" = "programLocations".id
        JOIN "eventTypes" ON "events"."type" = "eventTypes".id 
        WHERE "dateTime" < clock_timestamp();`;
    }

    pool.query(sqlText)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(err => {
            console.error('error getting events back from db', err)
            res.sendStatus(500);
        })
})

// GET specific event details
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id];
    const sqlText = `SELECT * FROM "events" WHERE "id" = $1;`

    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            res.send(dbResult.rows[0])
        })
        .catch(err => {
            console.log('error getting event details from db', err)
            res.sendStatus(500)
        })
})

// GET a specific event for editing
router.get('/:id/edit', rejectUnauthenticated, async (req, res) => {
    console.log('in router.get /:id/edit, req.params are', req.params);
    if (req.user.userType == 5) {
        try {
            const id = req.params.id;
            const sqlText = `SELECT * FROM "events" WHERE id = $1;`;
            let dbRes = await pool.query(sqlText, [id]);
            res.send(dbRes.rows[0]);
        }
        catch (err) {
            console.error('error in edit event', err);
            res.sendStatus(500);
        }
    }
});

// edit the event
router.put('/:id', rejectUnauthenticated, async (req, res)=>{
    console.log('req params id', req.params.id)

  if (req.user.userType == 5) {
    try{
        const sqlText=`
            UPDATE "events"
            SET "name" = $1, 
                "dateTime" = $2,
                "dateTimeEnd" = $3, 
                "location" = $4, 
                "programLocationID" = $5, 
                "type" = $6, 
                "description" = $7
            WHERE "id" = $8;
            `;

        const sqlParams = [
            req.body.name,
            req.body.dateTime,
            req.body.dateTimeEnd,
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
    }
})

// DELETE specific event
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    if (req.user.userType == 5) {
        try {
            const sqlText = `DELETE FROM "events" WHERE "id" = $1;`;
            await pool.query(sqlText, [req.params.id]);
            res.sendStatus(204);
        }
        catch (err) {
            console.error('error in delete event from db', err);
            res.sendStatus(500);
        }
    }
});

// POST new event
router.post('/', (req, res) => {
    console.log('POST req.body is', req.body);
    if (req.user.userType == 5) {
        let sqlText = `INSERT INTO "events" 
            ( "name","dateTime", 
            "dateTimeEnd","location",
            "programLocationID","type",
            "attendeeMax","hasVolunteers", 
            "volunteerMax", "description" )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING "id";`;

        let sqlParams = [
            req.body.data.name,
            req.body.data.dateTime,
            req.body.data.dateTimeEnd,
            req.body.data.location,
            req.body.data.programLocationID,
            req.body.data.type,
            req.body.data.attendeeMax,
            req.body.data.hasVolunteers,
            req.body.data.volunteerMax,
            req.body.data.description
        ];
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                const eventId = dbRes.rows[0].id;
                sqlText = `INSERT INTO "questions" ("eventId", "question")
                VALUES($1,$2);`;
                req.body.data.questions.map(question => {
                    sqlParams = [eventId, question];
                    pool.query(sqlText, sqlParams)
                        .catch(dbQuestionErr => {
                            console.error(dbQuestionErr);
                        });
                });
                res.sendStatus(201);
            })
            .catch(dbErr => {
                console.error(dbErr);
                res.sendStatus(500);
            });
    }
});

// GET questions for specific event
router.get('/questions/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id]
    const sqlText = `SELECT * FROM "questions" WHERE "eventId" = $1;`;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(err => {
            console.log('error getting event questions from db', err)
            res.sendStatus(500)
        })
})

module.exports = router;