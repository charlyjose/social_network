var express = require('express');
var router = express.Router();
var db = require('../connectDB');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../views/profile')));
app.use(express.static('public'));
app.use(express.static('public/profile'))
//app.use('/', express.static(path.join(__dirname, '../views/profile')));

/* GET home page. */
router.get('/', function (req, res, next) {
  
  //var sql = "select name from vuser where name like '" + req.query.test +  "%'";
 
 
  /*
  db.query(sql, (err, results, fields) => {
    if (err)
      throw err

    else {
      console.log('\n\nFROM DB: ' + results[0].name + '\n\n');
    }
  });

  */

/*
  res.render('index', {
    title: 'Express'
  });

  */


  res.sendFile('index.html');
  res.end();

});

module.exports = router;
