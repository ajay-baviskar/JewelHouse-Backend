const mongoose = require('mongoose');

const DiamondSchema = new mongoose.Schema({
  Size: { type: String, default: null },
  Color: { type: String, default: null },
  Shape: { type: String, default: null },
  Purity: { type: String, default: null },
  Discount: { type: String, default: null },
  Price: { type: String, default: null },

  // Unique key for detecting duplicates (based on all fields)
  uniqueKey: { type: String, required: true, unique: true, index: true }
}, { timestamps: true });

// Utility function to generate a unique key from fields
DiamondSchema.statics.generateUniqueKey = function (diamond) {
  return [
    diamond.Size || '',
    diamond.Color || '',
    diamond.Shape || '',
    diamond.Purity || '',
    diamond.Discount || '',
    diamond.Price || ''
  ].join('-');
};

module.exports = mongoose.model('Diamond', DiamondSchema);
