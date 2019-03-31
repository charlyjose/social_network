var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // chk if session is set

    if(req.session.email) {
        res.render('profile', {
            name: 'Name Here',
            address: 'line1, ' + 'line2, ' + 'line3',
            connections: '240',
    
            onlinenow: '25',
            onlineToday: '172',
    
            newPosts: '43'
    
        });
    }

    else {
        res.redirect('/signup');
    }



   
});

module.exports = router;