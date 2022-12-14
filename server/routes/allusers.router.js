const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  if (req.user.userType > 3) {
    const SqlText = 
      `SELECT "id", 
      "username", 
      "fname", 
      "lname", 
      "userType", 
      "pronouns", 
      "profilePic", 
      "bio", 
      "mentorPair" FROM "user" ORDER BY "user"."fname" ASC;`

    pool.query(SqlText)
      .then((dbRes) => {
        const user = dbRes.rows
        res.send(user)
      })
      .catch((err) => {
          console.log("error getting user list", err);
      })
  } else if (req.user.userType < 4) {
    const SqlText = 
      `SELECT "id", 
      "fname", 
      "lname", 
      "userType", 
      "pronouns", 
      "profilePic", 
      "bio", 
      "mentorPair" FROM "user" ORDER BY "user"."fname" ASC;`

    pool.query(SqlText)
      .then((dbRes) => {
        const user = dbRes.rows
        res.send(user)
      })
      .catch((err) => {
          console.log("error getting user list", err);
      })
  }
});

// GET specific user
router.get('/:id', (req, res) => {
  if (req.user.userType > 3) {
    const id = req.params.id;
    const sqlText = 
      `SELECT "user".*, 
      "mentor"."fname" AS mentor_firstname, 
      "mentor"."lname" AS mentor_lastname FROM "user"
        LEFT JOIN "user" "mentor"
        ON "user"."mentorPair" = "mentor"."id"
        WHERE "user"."id" = $1;`;
    const sqlParams = [id]; // $1 = req.params.id
  
    pool.query(sqlText, sqlParams)
      .then((dbRes) => {
        const user = dbRes.rows[0];
        if (user) {
          delete user.password
        }
        res.send(user);
      })
      .catch((err) => {
        console.log(`Error making db query ${sqlText}`, err);
      });
  } else if (req.user.userType < 4) {
      const id = req.params.id;
      const sqlText = `
          SELECT * FROM "user"
          WHERE id = $1
          ORDER BY id ASC;
      `;
      const sqlParams = [id]; // $1 = req.params.id
      pool.query(sqlText, sqlParams)
        .then((dbRes) => {
          const user = dbRes.rows[0];
          if (user) {
            delete user.password
            delete user.username
          }
          res.send(user);
        })
        .catch((err) => {
          console.log(`Error making db query ${sqlText}`, err);
        });
    }
})

// PUT route to update user
router.put('/:id', (req, res) => {
  if (req.user.userType == 5) {
    const sqlText = `
      UPDATE "user"
      SET "fname" = $1, 
      "lname" = $2, 
      "userType" = $3, 
      "pronouns" = $4, 
      "bio" = $5, 
      "profilePic" = $6, 
      "mentorPair" = $7
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
  
      pool.query(sqlText, sqlParams)
        .then((dbRes) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(`Error making database query ${sqlText}`, err);
          res.sendStatus(500);
        })
  }
})
  
// DELETE user
router.delete('/:id', (req, res) => { 
  if (req.user.userType == 5) {
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
  }
});

module.exports = router;