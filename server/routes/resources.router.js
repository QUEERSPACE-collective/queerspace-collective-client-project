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

router.post('/', (req, res) => {
  if(req.isAuthenticated()){
    const sqlText = `INSERT INTO "resources" ("resourceName", "resourceDescription", "resourceLink")
    VALUES ($1,$2,$3);`;
    const sqlParams = [req.body.data.resourceName, req.body.data.resourceDescription, req.body.data.resourceLink];
    pool.query(sqlText, sqlParams)
        .then(dbRes=>{
            res.sendStatus(201);
        })
        .catch(dbErr=>{
            res.sendStatus(500);
            console.error(dbErr);
        });
  }
});

module.exports = router;
