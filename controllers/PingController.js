const di = require('bottlejs').pop('app').container;

class PingController {
    /**
     * Constructor
     * @param {PingService} pingService
     */
    constructor(pingService) {
        this.__pingService = pingService;
    }

    /**
     * @api {get} /api/v1 index action
     * @apiGroup Ping actions
     * @apiVersion 1.0.0
     *
     * @apiSuccess(Success 200)
     */
    async ping(req, res) {
        const response = await this.__pingService.healthCheck();
        return res.json(response);
    }
}

module.exports = new PingController(di.PingService);