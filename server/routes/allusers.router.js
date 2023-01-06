const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  const SqlText = `SELECT * FROM "user" ORDER BY "user"."fname" ASC;`
  // TODO: Update SQL query to show mentor/mentee names like below
  // (currently only works with people who have a mentor/mentee)
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
    WHERE "user"."id" = $1;
    `;
    const sqlParams = [id]; // $1 = req.params.id
    
    console.log(sqlParams);
    pool.query(sqlText, sqlParams)
      .then((dbRes) => {
        let user = dbRes.rows[0]
        delete user.password; // remove password so it doesn't get sent
        res.send(user)
      })
      .catch((err) => {
        console.log(`Error making db query ${sqlText}`, err);
      });
})

// PUT route to update user
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
  
// DELETE user

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