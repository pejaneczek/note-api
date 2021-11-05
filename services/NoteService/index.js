'use strict';

const errors = require('../../errors');

class NoteService {
    /**
     * Constructor
     * @param {NoteModel} noteModel
     */
    constructor(noteModel) {
        this.__noteModel = noteModel;
    }

    /**
     * List notes
     * 
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async list() {
        let notes;

        try {
            notes = {
                "count": 2,
                "results": [
                    {
                        "id": 0,
                        "title": "Hello",
                        "message": "World"
                    },
                    {
                        "id": 1,
                        "title": "Another",
                        "message": "Note"
                    }
                ]
            }
        } catch (error) {
            throw new Error(error);
        }

        return notes;
    }

    /**
     * Get note by id
     *
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async getNoteById(id) {
        let note;

        const mockData = {
            1: { id: 1, title: 'title1', message: 'message1' },
            2: { id: 2, title: 'title2', message: 'message2' },
        }

        try {
            note = mockData[id];
        } catch (error) {
            throw new Error(error);
        }

        return note;
    }

    /**
     * Create note
     *
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async create(note) {
        let newNote;
        let { title, message } = note;

        try {
            newNote = { id: 1, title, message };
        } catch (error) {
            throw new Error(error);
        }

        return newNote;
    }

    /**
     * Update note
     *
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async update(id, note) {
        let updatedNote;
        let { title, message } = note;

        try {
            updatedNote = { id, title, message };
        } catch (error) {
            throw new Error(error);
        }

        return updatedNote;
    }

    /**
     * Delete note
     *
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async delete(id) {
        let success;

        try {
            success = { success: true };
        } catch (error) {
            throw new Error(error);
        }

        return success;
    }
}

module.exports = NoteService;