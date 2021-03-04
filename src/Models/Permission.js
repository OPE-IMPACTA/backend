const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [
        {
            resource: { type: String },
            methods: { type: Array },
            action: { type: String }
        }
    ]
});

module.exports = mongoose.model('Permission', PermissionSchema);