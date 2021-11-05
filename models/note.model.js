const { v4 } = require('uuid');

class Note {
    constructor(id, title, message) {
        this._id = id;
        this._title = title;
        this._message = message;
        this._createDate = new Date();
        this._updateDate = new Date();
    }

    static fromRequestBody(body) {
        return new this(v4(), body.title, body.message);
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get message() {
        return this._message;
    }

    get createDate() {
        return this._createDate;
    }

    get updateDate() {
        return this._updateDate;
    }

    toJSON() {
        return {
            id: this._id,
            title: this._title,
            content: this._message,
            createDate: this._createDate,
            updateDate: this._updateDate
        }
    }
}

module.exports = Note;