var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    console.log("\n\n POSTS\n\n");

    // Check if signed in
    if (req.session.email) {
        res.render('writepost', {
            pageTitle: 'USN | Write Post',
            name: 'CHARLY JOSE',
            goBack: '1',
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