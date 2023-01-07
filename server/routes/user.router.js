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
    user: process.env.EMAIL_USERNAME, // sender username
    pass: process.env.EMAIL_PASSWORD, // sender password
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

  if (req.user.userType == 5) {
    try {
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.EMAIL_USERNAME, // sender address TODO: SWITCH TO QSC's email (cannot be gmail!!)
        to: username, // list of receivers
        subject: "Login Credentials", // Subject line
        html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" 
                 xmlns:v="urn:schemas-microsoft-com:vml"
                 xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                  <!--[if gte mso 9]><xml>
                   <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                   </o:OfficeDocumentSettings>
                  </xml><![endif]-->
                  <!-- fix outlook zooming on 120 DPI windows devices -->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
                  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
                  <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS 7-9 -->
                  <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS 7-9 -->
                </head>
                <body style="margin:0; padding:0;" bgcolor="#ffffff" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
                
                <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="container">
                        <tr>
                          <td class="container-padding header" align="center">
                          </td>
                        </tr>
                        <tr>
                          <td class="container-padding content" align="left">
                            <br>
                
                <div class="title" align="center" style="font-size:2em">
                  <b>Welcome to QUEERSPACE Collective</b>
                </div>
                <br>
                <div class="body-text" align="center">
                Now that you are a member of QUEERSPACE, you can join our app! In there you will be able to
                customize your account, register for QUEERSPACE events, and find other users. Use the credentials below to login
                for the first time. After that, you will need to reset your password to get back in.
                <br><br>
                Username: ${username}
                <br><br>
                Password: ${pw}
                <br><br>
                Please follow the link to sign up:
                http://localhost:3000/#/login
                <br><br> 
                </div> 
                          </td>
                        </tr>
                        <tr>
                          <td class="container-padding footer-text" align="center">
                            &copy; QUEERSPACE COLLECTIVE
                            Contact us at info@queerspacecollective.org
                            Or visit us at our <a href="http://www.queerspacecollective.org">website</a><br>
                            <br><br>
                          </td>
                        </tr>
                      </table><!--/600px container -->
                
                </body>
                </html>         
    `, // TODO: Update login link
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
  const sqlParams = [req.params.id, req.user.id];
  const sqlText = `DELETE FROM "userEvents" WHERE "eventId" = $1 AND "userId" = $2;`;
  pool.query(sqlText, sqlParams)
    .then(dbResult => {
      res.sendStatus(204)
    })
    .catch(err => {
      console.log('error deleting user event in router', err)
      res.sendStatus(500)
    })
})

// GET specific user
router.get('/:id', (req, res) => {
  console.log('/user GET/:id req.params.id is: ', req.params.id);
  if (req.user.userType > 3) {
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
        res.send(user);

        if (user) {
          delete user.password
        }
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
        res.send(user);

        if (user) {
          delete user.password
          delete user.username
        }
      })
      .catch((err) => {
        console.log(`Error making db query ${sqlText}`, err);
      });
  }
})

// Edit user information
router.put('/:id', (req, res) => {
  if (req.user.userType == 5) {
    const sqlText = `
      UPDATE "user"
      SET "fname" = $1, "lname" = $2, 
      "userType" = $3, "pronouns" = $4, 
      "bio" = $5, "profilePic" = $6, "mentorPair" = $7
      WHERE id = $8;
    `;

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

// POST send email for password reset
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
              <a href=http://localhost:3000/#/reset/${token}>Click Here</a>`, // html text body
    }); // TODO: Update reset link

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

// PUT update new password
router.put('/reset/:token', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  const sqlText = `
    UPDATE "user"
    SET "password" = $1
    WHERE "token" = $2;
  `;
  const sqlParams = [password, req.body.token];

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