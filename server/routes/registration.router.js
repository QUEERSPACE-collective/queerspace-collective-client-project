const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This lets the admin grab the number of attendees who are registered for a specific event
router.get('/getAttendees/:id', rejectUnauthenticated, (req,res) => {
    const sqlParams = [
        req.params.id
    ];
    if (req.user.userType == 5) {
        const sqlText =
            `
        SELECT "userAttendees", "events"."id", "user"."id" as "uId" FROM "userEvents"
        JOIN "events"
        ON "events"."id" = "userEvents"."eventId"
        JOIN "user"
        ON "user"."id" = "userEvents"."userId" 
        WHERE "events"."id" = $1 ;
        `;
        pool.query(sqlText, sqlParams)
            .then(dbResult => {
                res.send(dbResult.rows)
            })
            .catch(err => {
                console.error('error getting attendees users from db', err)
                res.sendStatus(500)
            })
    }
})

//This takes in data given by the user and stores it into the database, it then returns the event the user signed up for as well as the numebr of attendees the user said they
// were bringing and stores that information into a different table in the database. 
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const sqlParams = [
            req.user.id,
            req.body.data.eventId,
            req.body.data.attendees
        ];
        const sqlText =
            `
    INSERT INTO "userEvents" ("userId", "eventId", "userAttendees")
    VALUES ($1, $2, $3)
    RETURNING "userAttendees","eventId"
    `;
        pool.query(sqlText, sqlParams)
            .then(dbResult => {
                const sqlParams = [
                    dbResult.rows[0].userAttendees,
                    dbResult.rows[0].eventId
                ];
                const sqlText =
                    `
            UPDATE "events"
            SET "totalAttendees" = "totalAttendees" + $1
            WHERE "id" = $2;
            `;
                pool.query(sqlText, sqlParams)
                    .then(dbResult => {
                        for (let answer of req.body.data.answer) {
                            const sqlParams = [
                                answer.id,
                                req.user.id,
                                answer.answer,
                                req.body.data.eventId
                            ];
                            const sqlText = `
                        INSERT INTO "answers" ("questionId", "userId", "answer", "eventId" )
                        VALUES ($1, $2, $3, $4);`;
                            pool.query(sqlText, sqlParams)
                        }
                        res.sendStatus(200)
                    })
            })
    }
    catch (err) {
        console.log('error posting user event registration', err)
        res.sendStatus(500)
    }
}
)

// This deletes the user's info from several different tables as part of the unregistering from an event
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id, req.user.id]
    const sqlText =
        `
  SELECT "userAttendees", "eventId" 
  FROM "userEvents"
  WHERE "eventId" = $1 AND "userId" = $2;
  `;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            const sqlParams = [
                dbResult.rows[0].userAttendees,
                dbResult.rows[0].eventId
            ]
            const sqlText =
                `
      UPDATE "events" 
      SET "totalAttendees" = "totalAttendees" - $1
      WHERE "id" = $2
      `;
            pool.query(sqlText, sqlParams)
                .then(dbResult => {
                    const sqlParams = [req.params.id, req.user.id]
                    const sqlText =
                        `
        DELETE FROM "userEvents" 
        WHERE "eventId" = $1 AND "userId" = $2
        `;
                    pool.query(sqlText, sqlParams)
                        .then(dbResult => {
                            const sqlParams = [req.params.id, req.user.id]
                            const sqlText =
                                `
            DELETE FROM "answers" 
            WHERE "eventId" = $1 AND "userId" = $2
            `;
                            pool.query(sqlText, sqlParams)
                                .then(dbResult => {
                                    res.sendStatus(204)
                                })
                        })
                })
        })
        .catch(err => {
            console.log('error deleting user event in router', err)
            res.sendStatus(500)
        })
})

// This lets the admin get all of the users registered for an event and the answers they gave to the events questions
router.get('/registered-users/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.userType == 5) {
        const sqlParams = [req.params.id];
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
                console.log('Event registered users dbResult.rows: ', dbResult.rows)
                res.send(dbResult.rows)
            })
            .catch(err => {
                console.error('error getting event registered users from db', err)
                res.sendStatus(500)
            })
    }
})

module.exports = router;