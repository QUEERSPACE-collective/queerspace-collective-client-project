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
        SELECT DISTINCT count(distinct "username"),
        "user"."id" as userId, 
        "user".username, 
        CONCAT("user".fname,' ',  "user".lname) AS "name",
        "question", "answers"."answer", "eventId"
        FROM "questions"
        JOIN "answers" ON "answers"."questionId" = "questions".id
        JOIN "user" ON "user".id = "answers"."userId"
        WHERE "eventId" = $1
        GROUP BY "username", "user"."id", "questions".question, "answers".answer, "questions"."eventId";
        `;
        pool.query(sqlText, sqlParams)
            .then(dbResult => {
                console.log('what am i getting back from the db for event registered users???', dbResult.rows)

                res.send(dbResult.rows)
            })
            .catch(error => {
                console.error('error getting event registered users from db', error)
            })

})


module.exports = router;
