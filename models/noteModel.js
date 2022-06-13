const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    local_id: { type: String },
    lastUpdated: { type: Date, required: true },
    createdAt: { type: Date },
    name: { type: String, required: true },
    content: { type: String },
    status: { type: String },
    tags: { type: Array },
});

module.exports = mongoose.model('Note', NoteSchema);
