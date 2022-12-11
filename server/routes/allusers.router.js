const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET all users
router.get('/', (req, res) => {
  const SqlText = `SELECT * FROM "user"`

  pool.query(SqlText)
    .then((dbRes) => {
        res.send(dbRes.rows);
    })
    .catch((err) => {
        console.log("error getting user list", err);
    })
});

// GET specific user
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const sqlText = `
        SELECT * FROM "user"
        WHERE id = $1
        ORDER BY id ASC;
    `;
    const sqlParams = [id]; // $1 = req.params.id
  
    console.log(sqlParams);
    pool.query(sqlText, sqlParams)
      .then((dbRes) => {
        res.send(dbRes.rows[0]);
      })
      .catch((err) => {
        console.log(`Error making db query ${sqlText}`, err);
      });
})

module.exports = router;