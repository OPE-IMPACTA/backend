const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestSchema = new Schema({
    user_id: String,
    title: String,
    description: String,
    url: String,
    project: String,
    status: { type: String, default: 'new' },
    created_at: Date,
    updated_at: Date,
    operations: Array
});

module.exports = mongoose.model('test', TestSchema, 'tests');
