var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    if (req.session.email) {
        // get information from database for the logged in user
        res.redirect('/profile'); //feeds actually
    }
    else {
        res.render('sign-up');
    }
});


router.post('/', function (req, res, next) {

    if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword || !req.body.collegeID || !req.body.confirmCollegeID) {
        res.render('messageBoard', {
            title: 'USN | Sign Up Error',
            heading: 'Sorry',
            subtitle: 'The account requirements are not satisfied.',
            body: 'Please provide all details.',
            diagnose: '',
            comments: '',
            returnLink: 'signup'
        });
    }
    else {
        var session;
        var sendConfirm = '';

        /*
        // Server side validation
        req.check('name', 'Name should contain 4 letters').isLength({ min: 3 });
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
        */


        // check if Email ID is taken
        var sql = 'select email from user where email like ?';
        var values = [
            [req.body.email]
        ];

        db.query(sql, [values], function (err, results, fields) {
            if (err) {
                // DB ERROR
                console.log('\n\nDB ERROR: ' + err);

                res.render('messageBoard', {
                    title: 'USN | Error',
                    heading: 'Ouch!',
                    subtitle: 'Something went wrong on our side ?',
                    body: 'Our engineers are looking into it, if you see them tell them code give below.',
                    diagnose: '',
                    comments: '1011011 1000100 1000001 1010100 1000001 1000010 1000001 1010011 1000101 100000 1000101 1010010 1010010 1001111 1010010 1011101',
                    returnLink: 'logout'
                });
            }
            else if (results.length === 0) {
                // Email ID is okay
                // check if College ID is taken
                var sql = 'select collegeID from user where collegeID like ?';
                var values = [
                    [req.body.collegeID]
                ];

                db.query(sql, [values], function (err, results, fields) {
                    if (err) {
                        // DB ERROR
                        console.log('\n\nDB ERROR: ' + err);

                        res.render('messageBoard', {
                            title: 'USN | Error',
                            heading: 'Ouch!',
                            subtitle: 'Something went wrong on our side ?',
                            body: 'Our engineers are looking into it, if you see them tell them code give below.',
                            diagnose: '',
                            comments: '1011011 1000100 1000001 1010100 1000001 1000010 1000001 1010011 1000101 100000 1000101 1010010 1010010 1001111 1010010 1011101',
                            returnLink: 'logout'
                        });
                    }
                    else if (results.length == 0) {
                        // College ID is okay
                        // Set sessions
                        req.session.email = req.body.email;
                        req.session.password = req.body.password;
                        session = req.session.email;

                        // Creating user account
                        var sql = 'insert into user (name, email, password, collegeID, session) values ?'
                        var values = [
                            [req.body.name, req.body.email, req.body.password, req.body.collegeID, session]
                        ];

                        db.query(sql, [values], function (err, results, fields) {
                            if (err) {
                                // DB ERROR
                                console.log('\n\nDB ERROR: ' + err);

                                res.render('messageBoard', {
                                    title: 'USN | Error',
                                    heading: 'Ouch!',
                                    subtitle: 'Something went wrong on our side ?',
                                    body: 'Our engineers are looking into it, if you see them tell them code give below.',
                                    diagnose: '',
                                    comments: '1011011 1000100 1000001 1010100 1000001 1000010 1000001 1010011 1000101 100000 1000101 1010010 1010010 1001111 1010010 1011101',
                                    returnLink: 'logout'
                                });
                            }
                            else {
                                // Account creation successful
                                sendConfirm += "done";
                                //res.send(sendConfirm);
                                res.redirect('/profile');
                            }
                        });
                    }
                    else {
                        // College ID is taken
                        sendConfirm += "c";
                        //res.send(sendConfirm);
                        res.render('sign-up');
                    }
                });
            }
            else {
                // Email ID is taken
                sendConfirm += "e";
                //res.send(sendConfirm);
                res.render('sign-up');
            }
        });
    }
});


router.get('/favicon.ico', function (req, res, next) {
    res.sendFile('/images/favicon.ico');
});


module.exports = router;