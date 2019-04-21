var express = require('express');               //rqd
var router = express.Router();                  //rqd
var db = require('../connectDB');               //rqd
var transporter = require('../mailService');    //rqd
var datetime = require('node-datetime');


router.get('/', function (req, res, next) {
    // Check if signed in
    if (req.session.email) {
        res.render('verify');


        var dt = datetime.create();
        var formatted = dt.format('YYYY-MM-DD HH:MM:SS');
        console.log("\n\n" + formatted + "\n\n")


    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

router.post('/', function (req, res, next) {

});


module.exports = router;