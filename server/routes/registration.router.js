const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.post('/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.user.id, req.params.id]
    const sqlText = 
    `
    INSERT INTO "userEvents" ("userId", "eventId")
    VALUES ($1, $2)
    `;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            res.sendStatus(200)
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
        SELECT "userEvents"."userId", "userEvents"."eventId", "user".username, CONCAT("user".fname,' ',  "user".lname) AS "name", "questions".question, "answers".answer, count(distinct "username") as total_attendees
        FROM "userEvents"
        JOIN "user" ON "user".id = "userEvents"."userId"
        FULL JOIN "questions" ON "questions"."eventId" = "userEvents"."eventId"
        FULL JOIN "answers" ON "answers"."questionId" = "questions".id
        WHERE "userEvents"."eventId" = $1
        GROUP BY "userEvents"."userId", "userEvents"."eventId", "user"."username", "user".fname, "user".lname,
        "questions"."question", "answers".answer ;
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
