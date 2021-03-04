const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    }
});

UserSchema.virtual('groups', {
    ref: 'Group',
    localField: 'group_id',
    foreignField: '_id'
});

module.exports = mongoose.model('User', UserSchema);