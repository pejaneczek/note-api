'use strict';

const router = require('express').Router();
const NoteController = require('../controllers/NoteController');
const NoteValidator = require('../validators/NoteValidator');

router.get('/', NoteController.list.bind(NoteController));
router.get('/:id', NoteController.getById.bind(NoteController));
router.post('/', [NoteValidator.title, NoteValidator.message], NoteController.create.bind(NoteController));
router.put('/:id', [NoteValidator.title, NoteValidator.message], NoteController.update.bind(NoteController));
router.delete('/:id', NoteController.delete.bind(NoteController));

module.exports = router;