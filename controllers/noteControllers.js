const NoteModel = require('../models/noteModel.js');
const UserModel = require('../models/userModel.js');

class NoteControllers {
    getAllNotes = async (req, res) => {
        try {
            await NoteModel.find()
                .select('-__v')
                .populate({ path: 'owner', select: '-password -__v' })
                // .sort({ lastUpdated: -1 })
                .exec(function (err, doc) {
                    if (err) {
                        return res.status(500).send({ error: err });
                    }
                    return res.status(200).send(doc);
                });
            // console.log('notes:', notes);
            // return res.status(200).json(notes);
        } catch (error) {
            console.log(error);
        }
    };
    getNoteById = async (req, res) => {
        try {
            const note = await NoteModel.findById(req.params._id);
            if (!note) {
                return res.status(404).json({ error: 'Note not found!' });
            }
            return res.status(200).json(note);
        } catch (error) {
            res.status(400).json({ error: error });
        }
    };
    backupNote = async (req, res) => {
        const {
            owner,
            name,
            content,
            tags,
            status,
            lastUpdated,
            createdAt,
            local_id,
        } = req.body;
        const localNote = {
            owner: owner,
            local_id: local_id,
            name: name,
            content: content,
            tags: tags,
            status: status,
            createdAt: createdAt,
            lastUpdated: lastUpdated,
        };
        try {
            await NoteModel.findOneAndUpdate(
                { local_id: local_id },
                { $set: localNote },
                { upsert: true }
            )
                // .populate('users')
                .exec(function (err, doc) {
                    if (err) {
                        return res.status(500).send({ error: err });
                    }
                    return res.send('Succesfully saved.');
                });
        } catch (error) {
            console.log(error);
        }
    };
    updateLocalNotes = async (req, res) => {
        const { owner, notes } = req.body;
        const userExist = await UserModel.findOne({ _id: owner });
        if (!userExist) {
            return res
                .status(404)
                .send('This user does not exist in database!');
        }
        // const notesIds = notes
        //     .filter((note) => note.local_id)
        //     .map((note) => note.local_id);
        const toBeUpdatedNotes = [];
        await Promise.all(
            notes.map(async (note) => {
                const noteData = await NoteModel.find({
                    local_id: note.local_id,
                    lastUpdated: { $gt: note.lastUpdated },
                })?.populate({ path: 'owner', select: '-password -__v' });

                if (noteData !== []) {
                    console.log('noteData:', noteData);
                    return toBeUpdatedNotes.push(noteData);
                }
                return;
                // return noteData.filter((note) => note !== []);
            })
        );
        // console.log('toBeUpdatedNotes:', toBeUpdatedNotes);
        return res.status(200).json(toBeUpdatedNotes);
    };
}

module.exports = new NoteControllers();
