'use strict';

class ApplicationError extends Error {
    constructor(message, error) {
        super(message);
        this.name = this.constructor.name;
        this.code = this.constructor.name;
        this.message = message;

        Error.captureStackTrace(this, this.constructor.name);
        if (error instanceof Error) {
            this.parent = error;
        }
    }
}

module.exports = {
    ApplicationError
}