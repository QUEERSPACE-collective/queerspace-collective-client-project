const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET resources from database
router.get('/', (req, res) => {
    if (req.user.userType > 3 || req.user.userType == 2) {
        if (req.isAuthenticated()) {
            const sqlText = `SELECT * FROM "resources" ORDER BY "resourceName" ASC;`
            pool.query(sqlText)
                .then(dbRes => {
                    res.send(dbRes.rows);
                })
                .catch(dbErr => {
                    console.error(dbErr);
                    res.sendStatus(500);
                });
        }
    }
});

// POST new resource
router.post('/', (req, res) => {
    if (req.user.userType == 5) {
        if (req.isAuthenticated()) {
            const sqlText = `INSERT INTO "resources" 
            ("resourceName", "resourceDescription", "resourceLink")
            VALUES ($1,$2,$3);`;
            const sqlParams = [
                req.body.data.resourceName, 
                req.body.data.resourceDescription, 
                req.body.data.resourceLink
            ];
            pool.query(sqlText, sqlParams)
                .then(dbRes => {
                    res.sendStatus(201);
                })
                .catch(dbErr => {
                    res.sendStatus(500);
                    console.error(dbErr);
                });
        }
    }
});

module.exports = router;
