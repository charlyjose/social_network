var express = require('express');
var router = express.Router();

/* GET signup page */
router.get('/', function (req, res, next) {
    console.log('\n\nTest1:::::' + req.query.test + '\n\n' );
    console.log('\n\nTest2:::::' + req.query.test2 + '\n\n' );

    res.render('signup', {
        title: 'Signup'
    });
});

module.exports = router;