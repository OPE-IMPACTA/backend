const mongoose = require('mongoose');
const { Schema } = mongoose;

const HelpSchema = new Schema({
    field: { type: String, unique: true },
    action: String
});

module.exports = mongoose.model('help', HelpSchema, 'helps');
