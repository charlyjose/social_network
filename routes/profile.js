var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    console.log("\n\n PROFILE\n\n");

    var skip = req.query.skip;

    if (skip === undefined) {
        // No skip
        skip = 0;
    }
    else {
        skip = 1;
    }

    // Check if signed in
    if (req.session.email) {

        var sql = 'select name, collegeID from user where session like ?';
        var values = [
            [req.session.email]
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
                // Session deleted from db
                res.redirect('/signin');
            }
            else {
                // Session is set in db
                var Name = results[0].name;

                // Get user details from address table
                var sql = 'select addressline1, addressline2, city from address where collegeID like ?'
                var values = [
                    [results[0].collegeID]
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
                        // Basics profile is not set
                        if (skip === 0) {
                            res.redirect('/you');
                        }
                        else if (skip == 1) {
                            // Basics profile okay
                            res.render('profile', {
                                pageTitle: 'USN | Home',
                                name: Name,
                                address: 'Fill your details',
                                goBack: '0',

                                connections: '240',
                                onlineNow: '25',
                                onlineToday: '172',

                                newPosts: '43'

                            });
                        }
                    }
                    else {
                        // Basics profile okay
                        res.render('profile', {
                            pageTitle: 'USN | Home',
                            name: Name,
                            goBack: '0',
                            address: results[0].addressline1 + ', ' + results[0].addressline2 + ', ' + results[0].city,

                            connections: '240',
                            onlineNow: '25',
                            onlineToday: '172',

                            newPosts: '43'

                        });
                    }
                });
            }
        });
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

router.get('/favicon.ico', function (req, res, next) {
    res.sendFile('/images/favicon.ico');
});

module.exports = router;