'use strict';

const errors = require('../../errors');

class PingServiceError extends errors.ApplicationError { }

module.exports = {
    PingServiceError
}