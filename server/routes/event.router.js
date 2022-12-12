const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "events"`;

    pool.query(sqlText)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(error => {
            console.log('error getting events back from db', error)
            res.sendStatus(500);
        })
})

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlParams = [req.params.id]
    const sqlText = 
    `SELECT * FROM "events"
    WHERE "id" = $1;`;

    pool.query(sqlText, sqlParams)
        .then(dbResult => {
            res.send(dbResult.rows)
            console.log('getting back from the server...', dbResult.rows)
        })
        .catch(error => {
            console.log('error getting event details from db', error)
            res.sendStatus(500)
        })
})

router.post('/register/:id', rejectUnauthenticated, (req, res) => {
    console.log('in api/event/register router trying to register for event')

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
            res.sendStatus
        })
})




module.exports = router;