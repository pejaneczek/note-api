const database = require('../../database/database');
class NoteRepository {
    constructor() { }

    async create(data) {
        let createdNote;
        const { title, message } = data;
        const createDate = new Date();

        try {
            await database.run(
                'INSERT INTO notes(title, message, create_date, update_date) VALUES (?, ?, ?, ?)',
                [title, message, createDate, createDate]
            );
            createdNote = await database.get('SELECT * FROM notes WHERE create_date=?', [createDate]);
        } catch (error) {
            console.error(error);
            throw new Error();
        }

        return createdNote;
    }

    async list(page, size = 10) {
        let notes;
        let results;
        let totalPages;

        try {
            if (page) {
                const offset = page * size;
                const records = await database.get('SELECT COUNT(*) as count FROM notes');
                totalPages = Math.ceil(records.count / size);
                results = await database.all('SELECT * FROM notes LIMIT ? OFFSET ?', [size, offset]);
            } else {
                results = await database.all('SELECT * FROM notes');
            }

            if (results) {
                notes = page ? {
                    count: results.length,
                    results,
                    totalPages,
                    currentPage: Number(page)
                } : {
                    count: results.length,
                    results
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error();
        }
        return notes || [];
    }

    async getById(id) {
        let note;

        try {
            note = await database.get('SELECT * FROM notes WHERE id = ?', [id]);
        } catch (error) {
            console.error(error);
            throw new Error();
        }

        return note || {};
    }

    async update(id, data) {
        let updatedNote;
        const { title, message } = data;
        const updateDate = new Date();

        try {
            const note = await database.get('SELECT * FROM notes WHERE id = ?', [id]);
            if (!note) {
                return { error: true, status: 404, message: 'Element does not exist' };
            }

            await database.run(
                'UPDATE notes SET title=?, message=?, update_date=? WHERE id=?',
                [title, message, updateDate, id]
            );
            updatedNote = await database.get('SELECT * FROM notes WHERE update_date=?', [updateDate]);
        } catch (error) {
            console.error(error);
            throw new Error();
        }

        return updatedNote;
    }

    async delete(id) {
        let success;

        try {
            const note = await database.get('SELECT * FROM notes WHERE id = ?', [id]);
            if (!note) {
                return { error: true, status: 404, message: 'Element does not exist' };
            }

            await database.run('DELETE FROM notes WHERE id=?', [id]);
            const isDeleted = await database.get('SELECT id FROM notes WHERE id=?', [id]);
            success = { success: isDeleted ? false : true };
        } catch (error) {
            console.log(error);
            throw new Error();
        }

        return success;
    }
}

module.exports = NoteRepository;