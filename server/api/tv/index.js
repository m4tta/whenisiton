var express = require('express');
var controller = require('./tv.controller');
var router = express.Router();

router.get('/tv/:id', controller.getTVById);
router.get('/tv/:id/:season/nextepisode', controller.nextEpisode);
router.post('/tv/search', controller.searchTV);

module.exports = router;
