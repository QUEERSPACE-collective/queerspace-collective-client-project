const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

const router = express.Router();

// get all events
 router.get('/', rejectUnauthenticated, async (req, res) => {
    try{
    const sqlText = `
                    SELECT * FROM "events" 
                    ORDER BY "id" ASC;
                    `;
    let dbRes = await pool.query(sqlText);
    res.send(dbRes.rows);
    }
    catch(err){
        console.error('error in GET events', err);
        res.sendStatus(500);
    }
});



module.exports = router;