class NoteValidator {
    constructor() { }

    static title(req, res, next) {
        const { title } = req.body;

        if (!title) {
            return res.status(400).send({ code: 400, message: 'Title is required!' })
        }

        if (title.length < 3) {
            return res.status(400).send({ code: 400, message: 'Title minimum length is 3 characters.' })
        }

        next();
    }

    static message(req, res, next) {
        const { message } = req.body;

        if (!message) {
            return res.status(400).send({ code: 400, message: 'Message is required!' })
        }

        if (message.length < 3) {
            return res.status(400).send({ code: 400, message: 'Message minimum length is 3 characters.' })
        }

        next();
    }
}

module.exports = NoteValidator;