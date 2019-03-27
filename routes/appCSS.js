var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile('/always/app.css');
});

module.exports = router;