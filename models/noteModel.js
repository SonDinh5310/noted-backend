const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    lastUpdated: { type: Date, required: true },
    createdAt: { type: Date },
    name: { type: String, required: true },
    content: { type: String },
});

module.exports = mongoose.model('Note', NoteSchema);
