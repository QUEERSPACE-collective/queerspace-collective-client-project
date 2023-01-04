const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.user.id, req.body.data.eventId, req.body.data.attendees]
    const sqlText = 
    `
    INSERT INTO "userEvents" ("userId", "eventId", "attendees")
    VALUES ($1, $2, $3)
    RETURNING "attendees","eventId"
    `;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            console.log('dbresult!!!!!!!!!!!!!!!!!', dbResult)
            const sqlParams = [dbResult.rows[0].attendees, dbResult.rows[0].eventId]
            const sqlText = 
            `
            UPDATE "events"
            SET "totalAttendees" = "totalAttendees" + $1
            WHERE "id" = $2;
            `;
            pool.query(sqlText, sqlParams)
                .then(dbResult => {
                    res.sendStatus(200)
                })
        })
        
        .catch(error => {
            console.log('error posting user event registration', error)
            res.sendStatus(500)
        })
})



router.get('/registered-users/:id', rejectUnauthenticated, (req, res) => {
    console.log('in registration router to get all event registered users')
    const sqlParams = [req.params.id]
        const sqlText = 
        `
        SELECT 
	    CONCAT("user".fname,' ',"user".lname) AS "name",
	    "user".username,
		json_agg(
            json_build_array(
                questions.question,
                answers.answer
                )
        ) as "question_answer" 
        FROM "answers" 
        JOIN "user" ON "answers"."userId" = "user"."id" 
        JOIN "questions" ON "answers"."questionId" = "questions"."id" 
        JOIN "events" ON "questions"."eventId" = "events"."id" 
        WHERE "events"."id" = $1
        GROUP BY "user"."fname", "user"."lname", "user".username;
        `;
        pool.query(sqlText, sqlParams)
            .then(dbResult => {
                console.log('what am i getting back from the db for event registered users???', dbResult.rows)
                res.send(dbResult.rows)
            })
            .catch(error => {
                console.error('error getting event registered users from db', error)
                res.sendStatus(500)
            })
})


module.exports = router;
