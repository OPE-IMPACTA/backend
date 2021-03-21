const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema({
    name: String,
    office: String,
});

module.exports = mongoose.model('Projects', ProjectsSchema);