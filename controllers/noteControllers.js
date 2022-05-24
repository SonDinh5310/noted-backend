const NoteModel = require('../models/noteModel.js');

class NoteControllers {
    getAllNotes = async (req, res) => {
        try {
            const notes = await NoteModel.find().sort({ createdAt: -1 });
            return res.status(200).json(notes);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    };
    getNoteById = async (req, res) => {
        try {
            const note = await NoteModel.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found!' });
            }
            return res.status(200).json(note);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    };
}

module.exports = new NoteControllers();
