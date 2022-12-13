const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        const sqlText = `SELECT * FROM "resources" ORDER BY "resourceName" ASC;`
        pool.query(sqlText)
            .then(dbRes=>{
                res.send(dbRes.rows);
            })
            .catch(dbErr=>{
                console.error(dbErr);
                res.sendStatus(500);
            });
    }
});


module.exports = router;
