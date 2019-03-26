var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('\n\n:::::' + req.query.test + '\n\n' );

    res.render('login', {
        title: 'Login'
    });
});

module.exports = router;