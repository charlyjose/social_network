var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    res.render('you');
});

router.post('/', function (req, res, next) {
    // coming soon
    console.log('At you post');
});

module.exports = router;