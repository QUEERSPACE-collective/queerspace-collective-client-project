const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log('reqbody is', req.body);
    let sqlText = `INSERT INTO "events" ("name","dateTime","location","programLocationID","type","attendeeMax","hasVolunteers", "volunteerMax", "description")
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

module.exports = router;
