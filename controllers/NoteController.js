const di = require('bottlejs').pop('app').container;
const ErrorHelper = require('../helpers/error-helper');
const noteServiceErrors = require('../services/NoteService/errors');

class NoteController {
    /**
     * Constructor
     * @param {NoteService} noteService
     */
    constructor(noteService) {
        this.__noteService = noteService;
    }

    /**
     * @api {get} /api/v1/notes index action
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     * @apiSuccess(Success 200)
     */
    async list(req, res) {
        let response;

        try {
            response = await this.__noteService.list();
        } catch (error) {
            return new ErrorHelper()
                .process(error, noteServiceErrors.NoteServiceError, res);
        }

        return res.json(response);
    }

    /**
     * @api {get} /api/v1/notes/:id index action
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     * 
     * @param {Number} id
     *
     * @apiSuccess(Success 200)
     */
    async getById(req, res) {
        const { id } = req.params;
        let response;

        try {
            response = await this.__noteService.getNoteById(id);
        } catch (error) {
            return new ErrorHelper()
                .process(error, noteServiceErrors.NoteServiceError, res);
        }

        return res.json(response);
    }

    /**
     * @api {post} /api/v1/notes index action
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     * 
     * @param {Object} note
     *
     * @apiSuccess(Success 200)
     */
    async create(req, res) {
        let response;
        const { title, message } = req.body;

        try {
            response = await this.__noteService.create({ title, message });
        } catch (error) {
            return new ErrorHelper()
                .process(error, noteServiceErrors.NoteServiceError, res);
        }

        return res.json(response);
    }

    /**
     * @api {put} /api/v1/notes index action
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     * 
     * @param {Object} note
     *
     * @apiSuccess(Success 200)
     */
    async update(req, res) {
        let response;
        const { id } = req.params;
        const { title, message } = req.body;

        try {
            response = await this.__noteService.update(id, { title, message });
        } catch (error) {
            return new ErrorHelper()
                .process(error, noteServiceErrors.NoteServiceError, res);
        }

        return res.json(response);
    }

    /**
     * @api {delete} /api/v1/notes index action
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     * 
     * @param {Number} id 
     * 
     * @apiSuccess(Success 200)
     */
    async delete(req, res) {
        let response;
        const { id } = req.params;

        try {
            response = await this.__noteService.delete(id);
        } catch (error) {
            return new ErrorHelper()
                .process(error, noteServiceErrors.NoteServiceError, res);
        }

        return res.json(response);
    }
}

module.exports = new NoteController(di.NoteService);