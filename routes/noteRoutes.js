const express = require('express');
const noteRouter = express.Router();
const NoteControllers = require('../controllers/noteControllers.js');

noteRouter.get('/', NoteControllers.getAllNotes);
noteRouter.get('/:id', NoteControllers.getNoteById);
noteRouter.post('/backup', NoteControllers.backupNote);
noteRouter.post('/update_local', NoteControllers.updateLocalNotes);

module.exports = noteRouter;
