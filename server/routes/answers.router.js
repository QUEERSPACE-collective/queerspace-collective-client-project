const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('in registration answers router', req.body)
    try{
        const sqlText = 
        `
        INSERT INTO "answers" ("questionId", "userId", "answer")
         VALUES ($1, $2, $3)
        `;
        const sqlParams = [req.body.questionId, req.user.id, req.body.answer]
        await pool.query(sqlText, sqlParams);
        res.sendStatus(204)
    } catch (error) {
        console.error('error posting answers to answer tagble', error)
        res.sendStatus(500)
    }
    
})



module.exports = router;
