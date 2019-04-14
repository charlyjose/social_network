var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {

    // Check if signed in
    // if (req.session.email) {
    res.render('feeds - Copy', {
        pageTitle: 'USN | Feeds',
        name: 'Charly Jose',


        author1: 'Charly',
        authorProfile1: '/u/charlyjose',
        avatarImage1: 'usn_avatar_images/charly.jpg',
        postImage1: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle1: 'POST TITLE HERE',
        postBody1: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes1: '12',
        views1: '344',
        circulations1: '24',

        author2: 'Charly',
        authorProfile2: '/u/charlyjose',
        avatarImage2: 'usn_avatar_images/charly.jpg',
        postImage2: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle2: 'POST TITLE HERE',
        postBody2: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes2: '12',
        views2: '344',
        circulations2: '24',
        
        author3: 'Charly',
        authorProfile3: '/u/charlyjose',
        avatarImage3: 'usn_avatar_images/charly.jpg',
        postImage3: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle3: 'POST TITLE HERE',
        postBody3: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes3: '12',
        views3: '344',
        circulations3: '24',

        author4: 'Charly',
        authorProfile4: '/u/charlyjose',
        avatarImage4: 'usn_avatar_images/charly.jpg',
        postImage4: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle4: 'POST TITLE HERE',
        postBody4: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes4: '12',
        views4: '344',
        circulations4: '24'
    });
    // }
    // else {
    //     // Not signed in
    //     res.redirect('/signin');
    // }
});



//same for POST requests - notice, how the AJAX request above was defined as POST 
router.post('/', function (req, res) {
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
        author1: 'Charly',
        authorProfile1: '/u/charlyjose',
        avatarImage1: 'usn_avatar_images/charly.jpg',
        postImage1: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle1: 'POST TITLE HERE',
        postBody1: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes1: '12',
        views1: '344',
        circulations1: '24',

        author2: 'Charly',
        authorProfile2: '/u/charlyjose',
        avatarImage2: 'usn_avatar_images/charly.jpg',
        postImage2: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle2: 'POST TITLE HERE',
        postBody2: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes2: '12',
        views2: '344',
        circulations2: '24',
        
        author3: 'Charly',
        authorProfile3: '/u/charlyjose',
        avatarImage3: 'usn_avatar_images/charly.jpg',
        postImage3: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle3: 'POST TITLE HERE',
        postBody3: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes3: '12',
        views3: '344',
        circulations3: '24',

        author4: 'Charly',
        authorProfile4: '/u/charlyjose',
        avatarImage4: 'usn_avatar_images/charly.jpg',
        postImage4: '../usn_posts_images/ban.qo-1555281676255-love_is_in_the_air___jump_67_by_escaped_emotions-d4pqnnj.jpg',
        postTitle4: 'POST TITLE HERE',
        postBody4: 'POST BODY HERE Some quick example text to build on the card title and make up the bulk of the cards content.',
        likes4: '12',
        views4: '344',
        circulations4: '24'
    });

    //res.end();
});



module.exports = router;