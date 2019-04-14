var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {

    // Check if signed in
    // if (req.session.email) {
        res.render('feeds - Copy', {
            pageTitle: 'USN | Feeds',
            author: 'Charly',
            authorProfile: '/u/charlyjose',
            name: 'Charly Jose',
            likes: '12',
            views: '344',
            circulations: '24'
        });
    // }
    // else {
    //     // Not signed in
    //     res.redirect('/signin');
    // }
});



//same for POST requests - notice, how the AJAX request above was defined as POST 
router.post('/', function(req, res) {
    // res.setHeader('Content-Type', 'application/json');

    //content generated here
    var some_json = {
        Title: "Test",
        Item: "Crate"
    };

    var result = JSON.stringify(some_json);

    //content got 'client.jade'
    var sent_data = req.body;
    sent_data.Nick = "ttony33";
var html = "<br /><p><a href='1'>fdsjlfjslk fsklj</a></p>";





res.render('feeds-posts', {
    author: 'Charly',
    authorProfile: '/u/charlyjose',
    likes: '12',
    views: '344',
    circulations: '24'
});
    //res.end();
});



module.exports = router;