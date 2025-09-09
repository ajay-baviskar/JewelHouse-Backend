const mongoose = require('mongoose');

// Define schema
const DiamondSchema = new mongoose.Schema({
    Size: { type: String, default: null },
    Color: { type: String, default: null },
    Shape: { type: String, default: null },
    Purity: { type: String, default: null },
    Discount: { type: String, default: null },
    Price: { type: String, default: null },

    // 🔑 Add a uniqueKey for fast duplicate checks
    uniqueKey: { type: String, unique: true, index: true }
}, { timestamps: true });

// Pre-save middleware to generate uniqueKey automatically
DiamondSchema.pre("save", function (next) {
    if (!this.uniqueKey) {
        this.uniqueKey = `${this.Size || ''}-${this.Color || ''}-${this.Shape || ''}-${this.Purity || ''}-${this.Discount || ''}-${this.Price || ''}`;
    }
    next();
});

module.exports = mongoose.model('Diamond', DiamondSchema);
