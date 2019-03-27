var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('/always/usnLogo.jpeg');
});

module.exports = router;