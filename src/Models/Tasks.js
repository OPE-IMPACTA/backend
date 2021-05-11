const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    project_id: mongoose.Schema.ObjectId,
    user_id: mongoose.Schema.ObjectId,
    description: String,
    startDate: Date,
    endDate: Date,
    hours: Number,
});

module.exports = mongoose.model('Tasks', TaskSchema);