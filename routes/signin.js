var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd

router.get('/', function (req, res, next) {
    if (req.session.email) {
        // get imformation from database for the logged in user
        res.redirect('/profile'); //feeds actually
    }
    else {
        res.render('sign-in');
    }
});

router.get('/favicon.ico', function (req, res, next) {
    res.sendFile('/images/favicon.ico');
});

router.post('/', function (req, res, next) {
    console.log(' ::: ' + req.body.email + ' ::: ' + req.body.password);

    if (!req.body.email || !req.body.password) {
        res.render('messageBoard', {
            title: 'USN | Sign In Error',
            heading: 'Sorry',
            subtitle: 'The account requirements are not satisfied.',
            body: 'Please provide all details.',
            diagnose: '',
            comments: '',
            returnLink: 'signin'
        });
    }
    else {
        var session;
        var sendConfirm = '';

        // Check for user account
        var sql = 'select password from user where email like ?';
        var values = [
            [req.body.email]
        ];

        db.query(sql, [values], function (err, results, fields) {
            if (err) {
                console.log('\n\nDB ERROR: ' + err);
            }
            else if (results.length === 0) {

                // No such user
                res.render('messageBoard', {
                    title: 'USN | Sign In Error',
                    heading: 'Sorry',
                    subtitle: 'The account requirements are not satisfied.',
                    body: 'Email ID or Password is wrong.',
                    diagnose: '',
                    comments: '',
                    returnLink: 'signin'
                });
            }
            else {
                console.log("\n\n HERE3::::" + req.body.email + "::::" + req.body.password);

                // The user is registered in db
                // Check if password is correct
                if (results[0].password === req.body.password) {
                    // Password is okay
                    // Set sessions
                    req.session.email = req.body.email;
                    req.session.password = req.body.password;
                    session = req.session.email;
                    res.redirect('/profile'); //feeds actually
                }
                else {
                    // Password is wrong
                    res.render('messageBoard', {
                        title: 'USN | Sign In Error',
                        heading: 'Sorry',
                        subtitle: 'The account requirements are not satisfied.',
                        body: 'Email ID or Password is wrong.',
                        diagnose: '',
                        comments: '',
                        returnLink: 'signin'
                    });
                }
            }
        });
    }
});


module.exports = router;