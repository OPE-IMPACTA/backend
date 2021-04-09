const mongoose = require('mongoose');

const ClientsSchema = new mongoose.Schema({
    cnpj: String,
    company: String,
    department: String,
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('Clients', ClientsSchema);
