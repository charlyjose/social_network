var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // chk if session is set

    req.session.destroy(function(err) {
        if(err) {
            // res.negotiate(err);
            console.log('ERROR: ' + err);
        }
        else {
            res.redirect('/');
        }
    });
});

module.exports = router;