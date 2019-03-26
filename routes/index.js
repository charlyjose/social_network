var express = require('express');
var router = express.Router();
var db = require('../connectDB');


/* GET home page. */
router.get('/', function (req, res, next) {
  
  var sql = "select name from vuser where name like '" + req.query.test +  "%'";
 
  db.query(sql, (err, results, fields) => {
    if (err)
      throw err

    else {
      console.log('\n\nFROM DB: ' + results[0].name + '\n\n');
    }
  });

  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
