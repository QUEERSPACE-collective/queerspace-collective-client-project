const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Password generator function
function generatePW() {
  var pass = '';
  var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
          'abcdefghijklmnopqrstuvwxyz0123456789@$';
    
  for (let i = 1; i <= 8; i++) {
      var char = Math.floor(Math.random()
                  * str.length + 1);
        
      pass += str.charAt(char)
  }
    
  return pass;
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secureConnection: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
    tls: {
      ciphers: 'SSLv3'
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res) => {
  const username = req.body.username;
  const pw = generatePW();
  const password = encryptLib.encryptPassword(pw);
  const userType = req.body.userType;
  
  // Restrict to admin?? only admin can see page by client side code
  // Need something here as well?

  try {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL_USERNAME, // sender address TODO: SWITCH TO QSC's email (cannot be gmail!!)
    to: username, // list of receivers
    subject: "Thank you for signing up!", // Subject line
    text: `When you sign in, here are your credentials:
              username: ${username}
              password: ${pw}
              Please follow the link to sign up:
              http://localhost:3000/login`, // plain text body
      // html: "<b>Hello world?</b>", // html body
  });
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  const queryText = `INSERT INTO "user" (username, password, "userType")
    VALUES ($1, $2, $3) RETURNING id`;
  await pool.query(queryText, [username, password, userType])
  res.sendStatus(201);
} 
catch (err) {
  console.log('User registration failed: ', err);
  res.sendStatus(500);
}

});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// getting all events that the user is registered for
// want to use async await to do multiple queries - 
// also get the name of the event back from "events" table
// so that the event name is rendered on 'your upcoming events..'
router.get('/events', rejectUnauthenticated, (req, res) => {
  const sqlParams = [req.user.id]
  const sqlText = 
  `
  SELECT "events"."name", "events"."id" 
  FROM "userEvents"
  JOIN "events" ON "events".id = "userEvents"."eventId"
  WHERE "userId" = $1;
  `;


  pool.query(sqlText, sqlParams)
    .then(dbResult => {
      res.send(dbResult.rows)
    })
    .catch(error => {
      console.log('error getting users registered events in router', error)
    })
})

// Delete event for user
router.delete('/events/:id', rejectUnauthenticated, (req, res) => {
  const sqlParams = [req.params.id, req.user.id]
  const sqlText = 
  `
  DELETE FROM "userEvents" WHERE "eventId" = $1 AND "userId" = $2;
  `;
  pool.query(sqlText, sqlParams)
  .then(dbResult => {
    res.sendStatus(204)
  })
  .catch(error => {
    console.log('error deleting user event in router', error)
    res.sendStatus(500)
  })
})

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

// Edit user information
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

// send email for password reset
router.post("/reset", async (req, res) => {
  let token;
  try {
    token = generatePW();

    const sqlText = `UPDATE "user" 
                      SET "token" = $2
                      WHERE "username"=$1;`;
    const sqlParams = [req.body.username, token];

    const dbRes = await pool.query(sqlText, sqlParams);
    res.send(dbRes.rows);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500)
  }

  try {
    const username = req.body.username;
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // sender address TODO: SWITCH TO QSC's email (cannot be gmail!!)
      to: username, // list of receivers
      subject: "Forgot Password?", // Subject line
      html: `<p>Follow this link to reset password:</p>
              <a href=http://localhost:3000/#/reset/${token}>Click Here</a>`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
  }
  catch (err) {
    console.log(err);
  }

})

router.put('/reset/:token', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  const sqlText = `
    UPDATE "user"
    SET "password" = $1
    WHERE "token" = $2`;

  const sqlParams = [password, req.body.token]

  pool.query(sqlText, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error resetting password', err);
      res.sendStatus(500);
    })
})
module.exports = router;
