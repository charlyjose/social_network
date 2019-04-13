var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    console.log("\n\n FEEDS\n\n");

    // Check if signed in
    if (req.session.email) {
        res.render('feeds', {
            pageTitle: 'USN | Feeds',
            name: 'Charly Jose',
            likes: '12',
            views: '344',
            circulations: '24'
        });
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

module.exports = router;