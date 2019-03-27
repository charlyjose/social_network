var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('/always/app.js');
});

module.exports = router;