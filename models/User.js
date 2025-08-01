const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['MOBILE', 'ADMIN'], default: 'ADMIN' }



}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
