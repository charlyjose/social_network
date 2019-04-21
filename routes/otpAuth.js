var express = require('express');               //rqd
var router = express.Router();                  //rqd
var db = require('../connectDB');               //rqd
var transporter = require('../mailService');    //rqd
var datetime = require('node-datetime');

var add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
}

var time = add_minutes(new Date(), 5).toString()
console.log(time);


router.get('/', function (req, res, next) {
    // Check if signed in
    // if (req.session.email) {


    res.render('verify', {
        // time: formatted
    });





    // }
    // else {
    // Not signed in
    // res.redirect('/signin');
    // }
});

router.post('/', function (req, res, next) {

    // Check if signed in
    if (req.session.email) {

        if (!req.body.otp) {
            res.render('messageBoard', {
                title: 'USN | Sign Up Error',
                heading: 'Sorry',
                subtitle: 'The account requirements are not satisfied.',
                body: 'Please provide all details.',
                diagnose: '',
                comments: '',
                returnLink: 'signin'
            });
        }
        else {

            // Get collegeID


            var sql = "select collegeID from user where email like ?";
            var values = [
                [req.session.email]
            ];

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
                    // No such user || user not signed in
                    res.redirect('/logout');
                }
                else {
                    // user in DB
                    var collegeID = results[0].collegeID;




                    var dt = datetime.create();
                    var formattedTime = dt.format('Y-m-d H:M:S');

                    var sql = "select subtime('" + formattedTime + "','0:5:0') as diff";

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
                            // CRITICAL ERROR
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
                            // Time returned
                            var sql = "select otp from verify where create_time <= '" + formattedTime + "' and collegeID like '" + collegeID + "'";

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
                                    // OTP Wrong
                                    res.render('messageBoard', {
                                        title: 'USN | OTP Error',
                                        heading: 'Ouch!',
                                        subtitle: 'The OTP you have entered is wrong',
                                        body: '',
                                        diagnose: '',
                                        comments: '',
                                        returnLink: 'logout'
                                    });
                                }
                                else {
                                    // OTP okay now change password

                                    

                                }
                            });

                        }
                    });
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