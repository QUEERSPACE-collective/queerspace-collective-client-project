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

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
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


// Send email to user to register
router.post('/adduser', (req, res) => {
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
    tls: {
        ciphers: 'SSLv3'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'joanofchoir@outlook.com', // sender address
    to: "maiaj1306@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
})
module.exports = router;
