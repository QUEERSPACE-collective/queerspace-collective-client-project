const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const allUsersRouter = require("./routes/allusers.router");
const eventRouter = require('./routes/event.router');
const resourcesRouter = require('./routes/resources.router');
const registrationRouter = require('./routes/registration.router');
const answersRouter = require('./routes/answers.router');
const multerRouter = require('./routes/multer.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/allusers', allUsersRouter);
app.use('/api/event', eventRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/registration', registrationRouter);
app.use('/api/answers', answersRouter);
app.use('/api/upload', multerRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
