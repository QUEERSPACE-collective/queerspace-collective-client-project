const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const SqlText = `SELECT * FROM "user"`

  pool.query(SqlText)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((err) => {
        console.log("error getting user list", err);
    })
});

module.exports = router;