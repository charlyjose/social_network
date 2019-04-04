var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd

// var app = require('../app');

// var app = express();

router.get('/', function (req, res, next) {
    res.render('sign-up');
});

router.get('/favicon.ico', function (req, res, next) {
    res.sendFile('/images/favicon.ico');
});

router.post('/', function (req, res, next) {
    // console.log(' ::: ' + req.body.email + ' ::: ' + req.body.name + ' ::: ' + req.body.password + ' ::: ' + req.body.confirmPassword + ' ::: ' + req.body.collegeID + ' ::: ' + req.body.confirmCollegeID);

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.collegeID || !req.body.confirmCollegeID) {
        res.render('messageBoard', {
            title: 'USN | Sign Up Error',
            heading: 'Sorry',
            subtitle: 'The account requirements are not satisfied.',
            body: 'Please provide all details.',
            returnLink: 'signup'
        });
    }
    else {
        var session;

        // Validation
        req.check('email', 'Invalid Email Address').isEmail();
        req.check('password', 'Password doesn\'t match').isLength({ min: 4 }).equals(req.body.confirmPassword);
        req.check('collegeID', 'Invalid College ID').isLength({ min: 10 }).equals(req.body.confirmCollegeID);

        var errors = req.validationErrors();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
        }
        else {
            req.session.errors = null;
            req.session.success = true;
        }

        var sendConfirm = '';

        for (var i = 0; i < errors.length; ++i) {
            if (errors[i].param === "email") {
                sendConfirm += 'e';
            }
            if (errors[i].param === "password") {
                sendConfirm += 'p';
            }
            if (errors[i].param === "collegeID") {
                sendConfirm += 'c';
            }

        }


        // console.log(JSON.stringify(errors) + req.session.success + ':  req.session.errors : ' + ' : req.session.success : \n');
        // console.log('\n\n' + sendConfirm + '\n\n\n');

        /*
        
               if(req.body.password != req.body.confirmPassword) {
                   res.send('p');
               }
               if(req.body.collegeID != req.body.confirmCollegeID) {
                   res.send('c');
               }
          
          */

        // All informations correct to policy
        if (sendConfirm === '') {
            req.session.email = req.body.email;
            req.session.password = req.body.password;
            session = req.session.email;

            // Adding user
            var sql = 'insert into user (name, email, password, collegeID, session) values ?'
            var values = [
                [req.body.name, req.body.email, req.body.password, req.body.collegeID, session]
            ];
            db.query(sql, [values], function (err, results, fields) {
                if (err) {
                    console.log('\n\nDB ERROR: ' + err);
                }
                else {
                    // Account creation successful
                    res.end('done');
                }
            });
        }
        // Account requirements are not satisfied
        else {
            res.send(sendConfirm);
        }
    }
});


module.exports = router;