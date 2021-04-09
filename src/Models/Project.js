const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    user_id: mongoose.Schema.ObjectId,
    client_id: mongoose.Schema.ObjectId,
    description: String,
    status: String,
});

module.exports = mongoose.model('Projects', ProjectSchema);