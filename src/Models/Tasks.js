const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: mongoose.Schema.ObjectId,
    userId: mongoose.Schema.ObjectId,
    description: String,
    startDate: Date,
    endDate: Date,
    hours: Number,
});

module.exports = mongoose.model('Tasks', TaskSchema);