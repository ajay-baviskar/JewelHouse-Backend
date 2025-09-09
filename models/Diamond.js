const mongoose = require('mongoose');

const DiamondSchema = new mongoose.Schema({
    Size: { type: String, default: null },
    Color: { type: String, default: null },
    Shape: { type: String, default: null },
    Purity: { type: String, default: null },
    Discount: { type: String, default: null },
    Price: { type: String, default: null },
    certificateNo: { type: String, unique: true, required: true },

}, { timestamps: true });
DiamondSchema.index({ certificateNo: 1 }, { unique: true });

module.exports = mongoose.model('Diamond', DiamondSchema);
