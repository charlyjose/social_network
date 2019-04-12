var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {
    // Check if signed in
    if (req.session.email) {
        res.render('feeds', {
            pageTitle: 'USN | Feeds',
            name: 'Charly Jose',
            goBack: '1',
            
            likes: '12',
            views: '344',
            circulations: '24',

            address: results[0].addressline1 + ', ' + results[0].addressline2 + ', ' + results[0].city,

            connections: '240',
            onlineNow: '25',
            onlineToday: '172',

            newPosts: '43'


        });
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});

module.exports = router;