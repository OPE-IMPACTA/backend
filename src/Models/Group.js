const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
    group: { type: String, required: true, unique: true },
    }
)

module.exports = mongoose.model('Group', GroupSchema, 'groups');