const mongoose = require('mongoose');

const DiamondSchema = new mongoose.Schema({
    Size: { type: String, default: null },
    Color: { type: String, default: null },
    Shape: { type: String, default: null },
    Purity: { type: String, default: null },
    Discount: { type: String, default: null },
    Price: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Diamond', DiamondSchema);
