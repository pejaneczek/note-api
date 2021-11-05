class ErrorHelper {
    constructor() { }

    process(error, instance, response) {
        const errorData = {
            code: error.status  || 500,
            message: error.message
        };

        return response.status(error.status).json(errorData);
    }
}

module.exports = ErrorHelper;