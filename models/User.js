const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },   // Not unique
  mobile: { type: String, required: true },  // Not unique
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['MOBILE', 'ADMIN'], 
    default: 'ADMIN' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
