'use strict';

const router = require('express').Router();

router.use('/notes', require('./note'));
router.use('/ping', require('./ping'));

module.exports = router;