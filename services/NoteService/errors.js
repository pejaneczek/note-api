'use strict';

const errors = require('../../errors');

class NoteServiceError extends errors.ApplicationError { }

class NoteNotFoundError extends NoteServiceError { }

class ValidationError extends NoteServiceError { }


module.exports = {
    NoteNotFoundError,
    ValidationError
}