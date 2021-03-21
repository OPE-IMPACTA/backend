const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    name: String,
    office: String,
});

module.exports = mongoose.model('Clients', ClientsSchema);
