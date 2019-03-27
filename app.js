var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');



var appJS = require('./routes/appJS');
var appCSS = require('./routes/appCSS');
var favic = require('./routes/favic');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');



//var inSigninRouter = require('./routes/INSignIn');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/app.js', appJS);
app.use('/app.css', appCSS);
app.use('/favicon.ico', favic);


app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/signin', loginRouter);
app.use('/forgotpassword', forgotPassword);
app.use('/reset-password', resetPassword);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/reset-username', resetUserRouter);
app.use('/reset-password', resetPassRouter);
app.use('/reset-contacts', resetContRouter);
app.use('/delete-account', deleteAccRouter);


/*
app.use('/in', inSigninRouter);
app.use('/in/verified', homeRouter);
*/





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
