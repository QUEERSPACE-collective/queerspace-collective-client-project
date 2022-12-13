const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
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
