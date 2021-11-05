'use strict';

const config = require('./config/config.json');

require('./server').listen(config.SERVER.PORT);