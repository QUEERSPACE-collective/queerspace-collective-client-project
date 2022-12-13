const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// get all events
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM "events"
                    ORDER BY id ASC;
                `;

    pool.query(sqlText)
        .then(dbResult => {
            res.send(dbResult.rows)
        })
        .catch(error => {
            console.error('error getting events back from db', error)
            res.sendStatus(500);
        })
})

// get a specific event for editing
router.get('/:id', rejectUnauthenticated, async (req, res)=>{
    try{
        const id = req.params.id;
        const sqlText=`
            SELECT * FROM "events"
            WHERE id = $1;
            `;
        let dbRes = await pool.query(sqlText, [id]);
        res.send(dbRes.rows[0]);
    }
    catch (error) {
        console.error('error in edit event', error);
        res.sendStatus(500);
    }
});

// edit the user
router.put('/:id', rejectUnauthenticated, async (req, res)=>{
    console.log('req params id', req.params.id)

    try{
        const sqlText=`
            UPDATE "events"
            SET "name" = $1, 
                "dateTime" = $2, 
                "location" = $3, 
                "programLocationID" = $4, 
                "type" = $5, 
                "description" = $6
            WHERE "id" = $7;
            `;

        const sqlParams = [
            req.body.name,
            req.body.dateTime,
            req.body.location,
            req.body.programLocationID,
            req.body.type,
            req.body.description,
            req.params.id
        ];
        let dbRes = await pool.query(sqlText, sqlParams);
        res.send(dbRes.rows);
    }
    catch (error) {
        console.error('error in PUT event', error);
        res.sendStatus(500);
    }
})

//not currently set up as cascading with 'quetions' and 'answers' in database.... so I have nested delete queries
router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `
            DELETE FROM "events"
            WHERE "id" = $1;
            `;
        await pool.query(sqlText, [req.params.id]);
        res.sendStatus(204);
    }
    catch (error) {
        console.error('error in delete event from db', error);
        res.sendStatus(500);
    }
});



module.exports = router;