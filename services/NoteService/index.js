'use strict';

const di = require('bottlejs').pop('app').container;

class NoteService {
    /**
     * Constructor
     * @param {NoteRepository} noteRepository
     */
    constructor(noteRepository) {
        this.__noteRepository = noteRepository;
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
            notes = await this.__noteRepository.list();
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

        try {
            note = await this.__noteRepository.getById(id);
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

        try {
            newNote = await this.__noteRepository.create(note);
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
        let results;

        try {
            results = await this.__noteRepository.update(id, note);
            if (results.error) {
                throw results;
            }
        } catch (error) {
            throw error;
        }

        return results;
    }

    /**
     * Delete note
     *
     * @apiGroup Note actions
     * @apiVersion 1.0.0
     *
     */
    async delete(id) {
        let results;

        try {
            results = await this.__noteRepository.delete(id);
            if (results.error) {
                throw results;
            }
        } catch (error) {
            throw error;
        }

        return results;
    }
}

module.exports = new NoteService(di.NoteRepository);