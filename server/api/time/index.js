var express = require('express');
var controller = require('./time.controller');
var router = express.Router();

router.get('/time', controller.time);

module.exports = router;
