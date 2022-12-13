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
            console.error('error getting events back from db', error)
            res.sendStatus(500);
        })
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