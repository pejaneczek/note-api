'use strict';

const router = require('express').Router();
const PingController = require('../controllers/PingController');

router.get('/', PingController.ping.bind(PingController));

module.exports = router;