class ErrorHelper {
    constructor() { }

    process(error, instance, response) {
        const errorData = {
            code: error.status || 500,
            message: error.message || 'Something went wrong'
        };

        return response.status(errorData.code).json(errorData);
    }
}

module.exports = ErrorHelper;