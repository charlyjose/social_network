var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var Keygrip = require('keygrip');
var crypto = require('crypto');
var uuid = require('node-uuid');
var mysql = require('mysql');
var app = require('../app');
var db = require('../connectDB');


var app = express();

app.use(cookieSession({
    name: 'session',
    keys: new Keygrip(['I have a duck, who\'s name is duckey'], 'SHA384', 'base64'),
    maxAge: 24 * 60 * 60 * 1000,
    genid:function(req){
        return crypto.createHash('sha256').update(uuid.v1()).update(crypto.randomBytes(256)).digest("hex");
    },
}));

app.use(cookieParser());



router.get('/', function (req, res, next) {
    res.render('sign-up');
});

router.get('/favicon.ico', function(req, res, next) {
    res.sendFile('/images/favicon.ico');
})

router.post('/', function(req, res, next) {
    if(!req.body.name || !req.body.email ||  !req.body.password ||  !req.body.collegeID) {
        res.render('error', {
            heading: 'Sorry',
            title: 'Credential incorrect',
            body: 'Please provide all details'
        });
    }

    else {
        // console.log('\n req.body.name || !req.body.email ||  !req.body.password ||  !req.body.collegeID : ' + req.body.name  + ' : ' + req.body.username  + ' : ' + req.body.email  + ' : ' + req.body.password  + ' : ' + req.body.collegeID);
        console.log("OKAY");
        
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


        // res.render('okay');
    }
});



module.exports = router;