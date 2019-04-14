var express = require('express');   //rqd
var router = express.Router();      //rqd
var db = require('../connectDB');   //rqd
var path = require('path');
var multer = require('multer');
var randomstring = require('randomstring');


var DIR = path.join(__dirname, '../../usn_posts_images/');

var IMAGENAME = "";
var data = 0;
var imageFile = "";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        
        var RAND = randomstring.generate({
            length: 6,
            charset: file.originalname
        });

        var DATE =  Date.now();
        IMAGENAME = RAND + '-' + DATE + '-' + file.originalname;
        console.log(IMAGENAME);
        cb(null, IMAGENAME)
    }
})

var uploading =  multer({storage: storage}).single('postImage');



router.get('/', function (req, res, next) {
    console.log("\n\n POSTS GETTING \n\n");

    // Check if signed in
    if (req.session.email) {

        var sql = 'select name from user where session like ?';
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
                res.render('writepost', {
                    pageTitle: 'USN | Write Post',
                    name: Name,
                    goBack: '1',
                });
            }
        });
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }
});




router.post('/', /*upload.single('postImage'),*/ function (req, res, next) {

    uploading(req, res, function (err) {
        if (err) {
           console.log(err);
        }
        
        imageFile = IMAGENAME;
        data = 0;
        if(imageFile === "") {
            data = 1
        }
        else {
            data = 4;
        }

        IMAGENAME = "";

        

        console.log('Successfully uploaded files!');

        console.log("\n\n POSTS POSTING DIRNAME: \n\n : \n " + req.body.postTitle + " : " + req.body.postBody);

            

        // Check if signed in
    if (req.session.email) {
        if (!req.body.postTitle || !req.body.postBody) {
            res.render('messageBoard', {
                title: 'USN | Post not send',
                heading: 'Sorry',
                subtitle: 'One or more fields are not filled',
                body: 'Post title and post body are required.',
                diagnose: '',
                comments: '',
                returnLink: 'writepost'
            });
        }
        else {

            console.log("\n\n POSTS POSTING 1\n\n");

            // get college ID
            var sql = 'select collegeID from user where session like ?';
            var values = [
                [req.session.email]
            ];

            db.query(sql, [values], function (err, results, fields) {
                if (err) {
                    console.log('\n\nDB ERROR: ' + err);
                }
                else if (results.length === 0) {

                    console.log("\n\n POSTS POSTING 2\n\n");



                    // No such collegeID

                    // Session not set | No such user
                    res.render('messageBoard', {
                        title: 'USN | Error',
                        heading: 'Ouch!',
                        subtitle: 'Something went wrong on our side ?',
                        body: 'Our engineers are looking into it, if you see them tell them code give below.',
                        diagnose: 'Tip: Try another browser',
                        comments: '1011011011100110110010101110011 1110011011010010110111101101110 1011111011011100110111101110100 1011111011100110110010101110100 1011101001000000111110001111100 100000010110110110111101101100 1100100010111110111000001100001 1110011011100110111011101101111 1110010011001000101111101110111 1110010011011110110111001100111 1011101000000000000000000000000',
                        returnLink: 'home'
                    });
                }
                else {


                    console.log("\n\n POSTS POSTING 3\n\n");



                    // College ID present
                    var CollegeID = results[0].collegeID;

                    


                        // Save image file --> get image_file location
                        

                        











                        console.log("\n\n POSTS POSTING 55\n\n");


                    // Save post to db
                    var sql = 'insert into posts(collegeID, parent, views, likes, data, postTitle, postBody, imageFile) values ?';
                    var values = [
                        [CollegeID, CollegeID, 0, 0, data, req.body.postTitle, req.body.postBody, imageFile]
                    ];

                    db.query(sql, [values], function (err, results, fields) {
                        if (err) {
                            console.log('\n\nDB ERROR: ' + err);
                        }
                        else {

                            console.log("\n\n POSTS POSTING 6\n\n");



                            // Post added successfully
                            res.render('okay', {
                                title: 'USN | Post added successfully',
                                heading: '',
                                subtitle: ' ',
                                body: '',
                                diagnose: '',
                                comments: '',
                                returnLink: '/profile'
                            });
                        }
                    });
                }
            });
        }
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }




    });


    /*

    // Check if signed in
    if (req.session.email) {
        if (!req.body.postTitle || !req.body.postBody) {
            res.render('messageBoard', {
                title: 'USN | Post not send',
                heading: 'Sorry',
                subtitle: 'One or more fields are not filled',
                body: 'Post title and post body are required.',
                diagnose: '',
                comments: '',
                returnLink: 'writepost'
            });
        }
        else {

            console.log("\n\n POSTS POSTING 1\n\n");

            // get college ID
            var sql = 'select collegeID from user where session like ?';
            var values = [
                [req.session.email]
            ];

            db.query(sql, [values], function (err, results, fields) {
                if (err) {
                    console.log('\n\nDB ERROR: ' + err);
                }
                else if (results.length === 0) {

                    console.log("\n\n POSTS POSTING 2\n\n");



                    // No such collegeID

                    // Session not set | No such user
                    res.render('messageBoard', {
                        title: 'USN | Error',
                        heading: 'Ouch!',
                        subtitle: 'Something went wrong on our side ?',
                        body: 'Our engineers are looking into it, if you see them tell them code give below.',
                        diagnose: 'Tip: Try another browser',
                        comments: '1011011011100110110010101110011 1110011011010010110111101101110 1011111011011100110111101110100 1011111011100110110010101110100 1011101001000000111110001111100 100000010110110110111101101100 1100100010111110111000001100001 1110011011100110111011101101111 1110010011001000101111101110111 1110010011011110110111001100111 1011101000000000000000000000000',
                        returnLink: 'home'
                    });
                }
                else {


                    console.log("\n\n POSTS POSTING 3\n\n");



                    // College ID present
                    var CollegeID = results[0].collegeID;

                    // get data type
                    var data = 0;
                    var imageFile = " ";

                    // Post doesn't have image
                    if (!req.body.postImage) {
                        data = 1;
                        imageFile = null;
                    }

                    // Post contains image
                    else {

                        console.log("\n\n POSTS POSTING 4\n\n");
                        data = 4;



                        const host = req.host;
                        const filePath = req.protocol + "://" + host + '/' + req.file.path;

                        console.log("\n\n PATH: " + filePath + "\n\n");





                        // Save image file --> get image_file location
                        













                        console.log("\n\n POSTS POSTING 55\n\n");
                    }

                    // Save post to db
                    var sql = 'insert into posts(collegeID, parent, views, likes, data, postTitle, postBody, imageFile) values ?';
                    var values = [
                        [CollegeID, CollegeID, 0, 0, data, req.body.postTitle, req.body.postBody, imageFile]
                    ];

                    db.query(sql, [values], function (err, results, fields) {
                        if (err) {
                            console.log('\n\nDB ERROR: ' + err);
                        }
                        else {

                            console.log("\n\n POSTS POSTING 6\n\n");



                            // Post added successfully
                            res.render('okay', {
                                title: 'USN | Post added successfully',
                                heading: '',
                                subtitle: ' ',
                                body: '',
                                diagnose: '',
                                comments: '',
                                returnLink: '/profile'
                            });
                        }
                    });
                }
            });
        }
    }
    else {
        // Not signed in
        res.redirect('/signin');
    }


    */
});




router.get('/favicon.ico', function (req, res, next) {
    res.sendFile('/images/favicon.ico');
});



module.exports = router;