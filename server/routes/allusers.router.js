const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  const SqlText = `SELECT * FROM "user" ORDER BY id ASC;`

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
    console.log(req.params.id, 'what is req params id huh');
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

// Might make GET requests to filter the results, otherwise if I can do it in the componenents to conditional render I would rather do it that way.


// PUT route
router.put('/:id', (req, res) => {
    const sqlText = `
      UPDATE "user"
      SET "fname" = $1, "lname" = $2, "userType" = $3, "pronouns" = $4, "bio" = $5, "profilePic" = $6, "mentorPair" = $7
      WHERE id = $8`;
  
      const sqlParams = [
        req.body.fname,
        req.body.lname,
        req.body.userType,
        req.body.pronouns,
        req.body.bio,
        req.body.profilePic,
        req.body.mentorPair,
        req.params.id
      ]
  
      console.log(sqlText, sqlParams);
      pool.query(sqlText, sqlParams)
        .then((dbRes) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(`Error making database query ${sqlText}`, err);
          res.sendStatus(500);
        })
  })
  
// DELETE route
router.delete('/:id', (req, res) => { 
    const sqlText = `DELETE FROM "user" 
                      WHERE id = $1;`;
    const sqlParams = [req.params.id]
    
    pool.query(sqlText, sqlParams)
      .then((dbRes) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error deleting user', err);
      })
  });

module.exports = router;