var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    if(req.session.email) {
        // get imformation from database for the logged in user
        res.render('profile');
    }
    else {
        res.render('home');
    }

});

router.post('/', function(req, res, next) {

});

module.exports = router;