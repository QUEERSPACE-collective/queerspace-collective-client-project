const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// registering for an event
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
    const sqlParams = [req.user.id, req.body.data.eventId, req.body.data.attendees]
    const sqlText = 
    `
    INSERT INTO "userEvents" ("userId", "eventId", "attendees")
    VALUES ($1, $2, $3)
    RETURNING "attendees","eventId"
    `;
    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            const sqlParams = [dbResult.rows[0].attendees, dbResult.rows[0].eventId]
            const sqlText = 
            `
            UPDATE "events"
            SET "totalAttendees" = "totalAttendees" + $1
            WHERE "id" = $2;
            `;
            pool.query(sqlText, sqlParams)
                .then(dbResult => {
                    for (let answer of req.body.data.answer) {
                        const sqlParams = [answer.id, req.user.id, answer.answer, req.body.data.eventId]
                        const sqlText = `
                        INSERT INTO "answers" ("questionId", "userId", "answer", "eventId" )
                        VALUES ($1, $2, $3, $4);`;
                        pool.query(sqlText, sqlParams)
                    }
                    res.sendStatus(200)
                })
        })
    }
        catch (error){
            console.log('error posting user event registration', error)
            res.sendStatus(500)
        }
    }  
)


//unregistering from an event
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlParams = [req.params.id, req.user.id]
  const sqlText = 
  `
  SELECT "attendees", "eventId" 
  FROM "userEvents"
  WHERE "eventId" = $1 AND "userId" = $2;
  `;
  pool.query(sqlText, sqlParams)
    .then(dbResult => {
      const sqlParams = [dbResult.rows[0].attendees, dbResult.rows[0].eventId]
      const sqlText = 
      `
      UPDATE "events" 
      SET "totalAttendees" = "totalAttendees" - $1
      WHERE "id" = $2
      `;
    pool.query(sqlText,sqlParams)
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
  .catch(error => {
    console.log('error deleting user event in router', error)
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
