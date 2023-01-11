const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// POST new answers to question for event
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const sqlText =
            `
        INSERT INTO "answers" ("questionId", "userId", "answer")
         VALUES ($1, $2, $3)
        `;
        const sqlParams = [req.body.questionId, req.user.id, req.body.answer]
        await pool.query(sqlText, sqlParams);
        res.sendStatus(204)
    } catch (error) {
        console.error('error posting answers to answer table', error)
        res.sendStatus(500)
    }
})

// update into 'events' table the number of guests each attendee is bringing (adds to total attendees)
router.put('/guests', rejectUnauthenticated, async (req, res) => {
    try {
        sqlParams = [req.body.attendees, req.body.eventId]
        console.log('sql params', sqlParams)
        sqlText =
            `
        UPDATE "events"
        SET "totalAttendees" = "totalAttendees" + $1
        WHERE "id" = $2;
        `;
        await pool.query(sqlText, sqlParams);
        res.sendStatus(204)
    }
    catch (error) {
        console.error('error upserting guest count', error)
        res.sendStatus(500)
    }
})

module.exports = router;