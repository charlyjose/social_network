var express = require('express');               //rqd
var router = express.Router();                  //rqd
var db = require('../connectDB');               //rqd
var transporter = require('../mailService');    //rqd


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

        if (!req.body.passwordold || !req.body.passwordnew1 || !req.body.passwordnew2) {
            res.render('messageBoard', {
                title: 'USN | Sign Up Error',
                heading: 'Sorry',
                subtitle: 'The account requirements are not satisfied.',
                body: 'Please provide all details.',
                diagnose: '',
                comments: '',
                returnLink: 'signup'
            });
            
            // res.send('sfm');
        }
        else {            

        var sql = "select email, password from user where email = '" + req.session.email + "' and password = '" + req.body.passwordold + "'";

        db.query(sql, function (err, results, fields) {
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

                // res.send('opw');
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

                        // res.send('nwps');
                    }
                    else {
                        // Old password != new password
                        var email = req.session.email;
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
                                // res.render('okay', {
                                //     title: 'USN | Password Changed',
                                //     heading: '',
                                //     subtitle: ' ',
                                //     body: '',
                                //     diagnose: '',
                                //     comments: '',
                                //     returnLink: '/logout'
                                // });


                                // MAIL SERVICE
                                var html = "<body><h1>Your password has been changed</h1><p>Greetings from USN. Per your request, we have succesfully changed your password.</p><br /><p>For any queries related to your account visit this <a href='https://usn-help.com/password-assistance' style='text-decoration: none;'>link</a>, we always love to help you.</p><p>Cheers, </p><p>The USN Team</p><br /><br /><center><p>You received this email to let you know about important changes to your USN Account and services.</p><p>&copy; 2019 USN Ltd, 2520 Beehumber Bay, Chetskar County, Kadtle 4534, IN </p></center></body>";
                                
                                var mailOptions = {
                                    from: 'usnrobot@gmail.com',
                                    to: email,
                                    subject: 'Revision to Your USN Account',
                                    //text: 'Your account\'s password has been changed'
                                    html: html
                                  };
                                  
                                  transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                      console.log(error);
                                    } else {
                                      console.log('\nEmail sent: ' + info.response + '\n');
                                    }
                                  });


                                res.send('done');
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
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

module.exports = router;