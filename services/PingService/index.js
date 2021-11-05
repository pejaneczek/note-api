'use strict';

class PingService {
    constructor(pingModel) {
        this.__pingModel = pingModel;
    }

    async healthCheck() {
        return { pong: true };
    }
}

module.exports = PingService;