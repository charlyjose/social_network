var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd

// var app = require('../app');

// var app = express();



router.get('/', function (req, res, next) {
    res.render('sign-up');
    // req.session.errors = null;
});

router.get('/favicon.ico', function(req, res, next) {
    res.sendFile('/images/favicon.ico');
});

router.post('/', function(req, res, next) {

    console.log(' ::: ' + req.body.email + ' ::: ' + req.body.name + ' ::: ' + req.body.password + ' ::: ' + req.body.confirmPassword + ' ::: ' + req.body.collegeID + ' ::: ' + req.body.confirmCollegeID);


    if(!req.body.name || !req.body.email ||  !req.body.password || !req.body.confirmPassword || !req.body.collegeID || !req.body.confirmCollegeID) {
        res.render('error', {
            heading: 'Sorry',
            title: 'Credentials incorrect',
            body: 'Please provide all details'
        });
    }

    else {

        req.session.email = req.body.email;
        req.session.password = req.body.password;
        res.end('done');


        // Validation
        
        /*
        req.check('email', 'Invalid Email Address').isEmail();
        req.check('password', 'Password doesn\'t match').isLength({min: 4}).equals(req.body.confirmPassword);
        req.check('collegeID', 'Invalid College ID').isLength({min: 10}).equals(req.body.confirmCollegeID);
        */

        
        /*
        var errors = req.validationErrors();
        if(errors) {
            req.session.errors = errors;
            req.session.success = false;
        }
        else {
            req.session.errors = null;
            req.session.success = true;
        }
        */




        /*
        var sql = 'insert into user (name, email, password, collegeID) values ?'
        var values = [
            [req.body.name, req.body.email, req.body.password, req.body.collegeID]
        ];

        db.query(sql, [values], function(err, results, fields) {
            if(err) {
                console.log('\n\nDB ERROR: ' + err);
            }
            else {
                res.redirect('profile');
            }
                
        });

        */



    }
});



module.exports = router;