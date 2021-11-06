class ResponseFormatHelper {
    constructor() { }

    format(req, res, data) {
        const { format } = req.query;
        if (format && format !== 'jsonp') {
            res.status(400).json({ code: 400, message: 'Unsapported format' });
        } else {
            return format === 'jsonp' ? res.jsonp(data) : res.json(data);
        }
    }
}

module.exports = ResponseFormatHelper;