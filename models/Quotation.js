const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  userId: Number,
  date: String,
  customer: {
    name: String,
    phone: String,
    address: String
  },
  gold: {
    purity: String,
    weight: Number,
    ratePerGram: Number,
    totalGoldPrice: Number
  },
  labour: {
    labourRatePerGram: Number,
    totalLabourCost: Number
  },
  centerDiamond1: {
    shape: String,
    purity: String,
    color: String,
    size: Number,
    ratePerCarat: Number,
    totalDiamondPrice: Number,
    discountPercent: Number,
    priceAfterDiscount: Number
  },
  sideDiamond1: {
    shape: String,
    purity: String,
    color: String,
    size: Number,
    ratePerCarat: Number,
    totalDiamondPrice: Number,
    discountPercent: Number,
    priceAfterDiscount: Number
  },
  costSummary: {
    totalCost: Number,
    gstPercent: Number,
    gstAmount: Number,
    finalAmount: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Quotation', QuotationSchema);
