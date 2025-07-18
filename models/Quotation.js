const mongoose = require('mongoose');

const clientDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true }
}, { _id: false });

const goldDetailsSchema = new mongoose.Schema({
  goldPurity: { type: String, required: true },
  goldColor: { type: String, required: true },
  jewelrySize: { type: String, required: true },
  weight: { type: Number, required: true },
  ratePerGram: { type: Number, required: true },
  totalGoldCost: { type: Number, required: true },
  labourCost: { type: Number, required: true },
  totalLabourPrice: { type: Number, required: true }
}, { _id: false });

const diamondDetailSchema = new mongoose.Schema({
  type: { type: String, enum: ['center', 'side'], required: true },
  shape: { type: String, required: true },
  size: { type: Number, required: true },
  color: { type: String, required: true },
  clarity: { type: String, required: true },
  weight: { type: Number, required: true },
  ratePerCts: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalAmount: { type: Number, required: true }
}, { _id: false });

const quotationSummarySchema = new mongoose.Schema({
  goldCost: { type: Number, required: true },
  labourCost: { type: Number, required: true },
  diamondCost: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true }
}, { _id: false });

const quotationSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  clientDetails: clientDetailsSchema,
  goldDetails: goldDetailsSchema,
  diamondDetails: [diamondDetailSchema],
  quotationSummary: quotationSummarySchema
});

module.exports = mongoose.model('Quotation', quotationSchema);
