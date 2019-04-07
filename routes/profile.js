var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    var skip = 0;
    var skip = req.query.skip;

    console.log("\n\nSKIP:::" + skip + "\n\n");

    // Check if signed in
    if (req.session.email) {

        var sql = 'select name, collegeID from user where session like ?';
        var values = [
            [req.session.email]
        ];

        db.query(sql, [values], function (err, results, fields) {
            if (err) {
                console.log('\n\nDB ERROR: ' + err);
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
                        console.log('\n\nDB ERROR: ' + err);
                    }
                    else if (results.length === 0) {
                        // Basics profile is not set
                        if (skip === 0) {
                            res.redirect('/you');
                        }
                        else {
                            // Basics profile okay
                            res.render('profile', {
                                name: Name,
                                address: 'Fill your details',

                                connections: '240',
                                onlinenow: '25',
                                onlineToday: '172',

                                newPosts: '43'

                            });
                        }

                    }
                    else {
                        // Basics profile okay
                        res.render('profile', {
                            name: Name,
                            address: results[0].addressline1 + ', ' + results[0].addressline2 + ', ' + results[0].city,

                            connections: '240',
                            onlinenow: '25',
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