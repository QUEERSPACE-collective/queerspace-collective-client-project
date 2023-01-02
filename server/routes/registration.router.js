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


// getting event registered users and their questsions/answers
// router.get('/registered-users/:id', rejectUnauthenticated, (req, res) => {
//     const userId = [req.user.id]
//     const sqlText = 
//     `
//     SELECT 
// 		json_agg(
//             json_build_object(
//                 questions.question,
//                 answers.answer
//                 )
//         ) as "question_answer" FROM "answers" JOIN "user" ON "answers"."userId" = "user"."id" JOIN "questions" ON "answers"."questionId" = "questions"."id" JOIN "events" ON "questions"."eventId" = "events"."id" WHERE "userId" = 8 AND "events"."id" = 16
// GROUP BY "user"."fname", "user"."lname";
//     `;

// })




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
        // `
        // SELECT 
        // "user"."username", 
        // CONCAT("user".fname,' ',"user".lname) AS "name",
        // "userEvents"."eventId", 
        //     json_agg(
        //         json_build_object(
        //             questions.question,
        //             answers.answer
        //             )
        //     ) as question_answer
        // FROM "questions"
        // LEFT JOIN "answers"  
        // ON "answers"."questionId" = "questions".id
        // LEFT JOIN "user" on "user".id = "answers"."userId"
        // LEFT JOIN "userEvents" on "userEvents"."eventId" = "questions"."eventId"
        // WHERE "userEvents"."eventId" = $1
        // GROUP BY "user"."username", "user"."fname", "user"."lname", "userEvents"."eventId";
        // `;
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
