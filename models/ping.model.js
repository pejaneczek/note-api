class Ping {
    constructor(content) {
        this._content = content;
    }

    get content() {
        return this._content;
    }

    toJSON() {
        return {
            content: this._content
        }
    }
}

module.exports = Ping;