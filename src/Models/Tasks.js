const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: String, // ObjectId
    userId: String, // ObjectId
    description: String,
    startDate: Date,
    endDate: Date,
    hours: Number,
});

module.exports = mongoose.model('Tasks', TaskSchema);