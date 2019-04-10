var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    if (req.session.email) {
        // get imformation from database for the logged in user
        res.render('write-post');
    }
    else {
        res.render('sign-in');
    }
});



module.exports = router;