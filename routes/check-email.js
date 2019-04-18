var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.post('/', function (req, res, next) {
    // chk if session is set

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
        else if (results.length == 0) {
            console.log("OKAY");
            // Email ID not taken
            res.send('okay');     
        }
        else {
            // Email ID is taken
            res.send('sorry');
        }
    });


});

module.exports = router;