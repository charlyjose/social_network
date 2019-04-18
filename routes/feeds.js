var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd


router.get('/', function (req, res, next) {

    // Check if signed in
    // if (req.session.email) {


    res.render('feeds4', {
        pageTitle: 'USN | Feeds',
        name: 'Charly Jose',


        author1: 'Charly',
        authorProfile1: '/u/charlyjose',
        avatarImage1: 'usn_avatar_images/charly.jpg',
        postImage1: '../usn_posts_images/6b38d476ae-1555585840879-disco_dingo_by_sylviaritter_dd05pt5-pre.jpg',
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

    var author = 'Unknown';
    var authorProfile = '/error';
    var avatarImage = 'default/avatar-anonymous.png';

    var postTitle = '';
    var postBody = '';
    var postImage = '';



    // // res.setHeader('Content-Type', 'application/json');

    // //content generated here
    // var some_json = {
    //     Title: "Test",
    //     Item: "Crate"
    // };

    // var result = JSON.stringify(some_json);

    // //content got 'client.jade'
    // var sent_data = req.body;
    // sent_data.Nick = "ttony33";
    // var html = "<br /><p><a href='1'>fdsjlfjslk fsklj</a></p>";


    var sql = 'select * from posts limit 4';
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
            // No Post(s)

            res.render('feeds-posts', {});
        }
        else if (results.length === 1) {
            // 1 Post(s)




            // console.log("\n\n\n" + results[0].content);

            var content = JSON.parse(results[0].content);

            // console.log("\n\n\n" + content["data"]);

            var coll = "MUT16CS023";
            var sql = "select name, uname, avatar from user where collegeID like '" + coll + "'";
            var values = [
                ["MUT16CS023"]
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
                else if (results.length == 0) {
                    // No such user || user account deleted

                    console.log("\n\n\nUNKOENS");
                    author = 'Unknown';
                    authorProfile = '/error';
                    avatarImage = 'default/avatar-anonymous.png';



                    // var content = results[0].content;
                    var DATA = content["data"];

                    if (DATA == 4) {
                        // Feeds image and text
                        postTitle = content["postTitle"];
                        postBody = content["postBody"];
                        postImage = content["imageFile"];
                    }

                    else if (DATA == 1) {
                        // Feeds text only
                        postTitle = content["postTitle"];
                        postBody = content["postBody"];
                        postImage = "";
                    }

                    res.render('feeds-posts1', {
                        author1: author,
                        authorProfile1: '/u/' + authorProfile,
                        avatarImage1: 'usn_avatar_images/' + avatarImage,
                        postImage1: '../usn_posts_images/' + postImage,
                        postTitle1: postTitle,
                        postBody1: postBody,
                        likes1: '12',
                        views1: '344',
                        circulations1: '24'

                    });
                }


                else {

                    console.log("\n\n" + results[0].name + " :: " + results[0].uname + " :: " + results[0].avatar + "\n\n");

                    author = results[0].name;
                    authorProfile = results[0].uname;
                    avatarImage = results[0].avatar;


                    console.log("\n\n" + author + " :: " + authorProfile + " :: " + avatarImage + "\n\n");


                    // var content = results[0].content;
                    var DATA = content["data"];

                    if (DATA == 4) {
                        // Feeds image and text
                        postTitle = content["postTitle"];
                        postBody = content["postBody"];
                        postImage = content["imageFile"];
                    }

                    else if (DATA == 1) {
                        // Feeds text only
                        postTitle = content["postTitle"];
                        postBody = content["postBody"];
                        postImage = "";
                    }

                    res.render('feeds-posts1', {
                        author1: author,
                        authorProfile1: '/u/' + authorProfile,
                        avatarImage1: 'usn_avatar_images/' + avatarImage,
                        postImage1: '../usn_posts_images/' + postImage,
                        postTitle1: postTitle,
                        postBody1: postBody,
                        likes1: '12',
                        views1: '344',
                        circulations1: '24'

                    });



                }
            });








        }
        else if (results.length === 2) {
            // 2 Post(s)

            res.render('feeds-posts2', {
                author1: 'Charly',
                authorProfile1: '/u/charlyjose',
                avatarImage1: 'usn_avatar_images/charly.jpg',
                postImage1: '../usn_posts_images/sdssd.jpg',
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
                circulations2: '24'

            });
        }
        else if (results.length === 3) {
            // 3 Post(s)

            res.render('feeds-posts3', {
                author1: 'Charly',
                authorProfile1: '/u/charlyjose',
                avatarImage1: 'usn_avatar_images/charly.jpg',
                postImage1: '../usn_posts_images/sdssd.jpg',
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
                circulations3: '24'
            });
        }
        else if (results.length === 4) {
            // 4 Post(s)

            res.render('feeds-posts4', {
                author1: 'Charly',
                authorProfile1: '/u/charlyjose',
                avatarImage1: 'usn_avatar_images/charly.jpg',
                postImage1: '../usn_posts_images/sdssd.jpg',
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
        }

    });






    //res.end();
});



module.exports = router;