var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    // Check if signed in
    if (req.session.email) {
        res.render('reset-password');
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});


router.post('/', function (req, res, next) {
    // Check if signed in
    if (req.session.email) {
        var sql = "select email, password from user where email = '" + req.session.email + "' and password = '" + req.body.passwordold + "'";

        db.query(sql, function (err, results, fields) {
            if (err) {
                console.log('\n\nDB ERROR: ' + err);
            }
            else if (results.length === 0) {
                // Session not set | No such user | Old password is wrong
                res.render('messageBoard', {
                    title: 'USN | Error',
                    heading: 'Ouch!',
                    subtitle: 'Your old password wrong ? or something went wrong on our side ?',
                    body: 'Our engineers are looking into it, if you see them tell them code give below.',
                    diagnose: 'Tip: Try another browser',
                    comments: '1011011011100110110010101110011 1110011011010010110111101101110 1011111011011100110111101110100 1011111011100110110010101110100 1011101001000000111110001111100 100000010110110110111101101100 1100100010111110111000001100001 1110011011100110111011101101111 1110010011001000101111101110111 1110010011011110110111001100111 1011101000000000000000000000000',
                    returnLink: 'home'
                });
            }
            else {
                // Session is set and user found in db

                // Check if passwordnew1 and passwordnew2 are equal
                if (req.body.passwordnew1 === req.body.passwordnew2) {
                    // Passwords are equal

                    // Check if old password = new password
                    if (results[0].password === req.body.passwordnew1) {
                        // New password required
                        res.render('messageBoard', {
                            title: 'USN | Error',
                            heading: 'Use new password',
                            subtitle: '',
                            body: '',
                            diagnose: 'Cannot use old password again.',
                            comments: '',
                            returnLink: '/reset-password'
                        });
                    }
                    else {
                        // Old password != new password
                        var sql = "update user set password = '" + req.body.passwordnew1 + "' where email = '" + req.session.email + "'";
                        db.query(sql, function (err, results, fields) {
                            if (err) {
                                console.log('\n\nDB ERROR: ' + err);
                            }
                            else {
                                // Session destroyed
                                req.session.destroy(function (err) {
                                    if (err) {
                                        // res.negotiate(err);
                                        console.log('ERROR: ' + err);
                                    }
                                    else {
                                        //
                                    }
                                });
                                // Password changed
                                res.render('okay', {
                                    title: 'USN | Password Changed',
                                    heading: '',
                                    subtitle: ' ',
                                    body: '',
                                    diagnose: '',
                                    comments: '',
                                    returnLink: '/logout'
                                });
                            }
                        });
                    }
                }
                else {
                    // Passwords are wrong
                    res.redirect('/password-reset');
                }
            }
        });
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

module.exports = router;