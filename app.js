const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const headers = require('./routes/middleware/headers');
const filesRouter = require('./routes/files');
const leaderboardsRouter = require('./routes/leaderboards');
const obstaclesRouter = require('./routes/obstacles');
const playersRouter = require('./routes/players');
const teamsRouter = require('./routes/teams');
const bodyParser = require('body-parser');

const conn = require('./app/providers/mongodb/Connector');

/******* Start Mongoose Database connection *******/
conn.connect();
/** **/

const app = express();



app.use(bodyParser.json({limit: '70mb'}));
app.use(bodyParser.urlencoded({limit: '70mb', extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(headers);
app.use('/api/files', filesRouter);
app.use('/api/leaderboards', leaderboardsRouter);
app.use('/api/obstacles', obstaclesRouter);
app.use('/api/players', playersRouter);
app.use('/api/teams', teamsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
