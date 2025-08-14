const mongoose = require('mongoose');

const clientDetailsSchema = new mongoose.Schema({
  name: { type: String },
  contactNumber: { type: String },
  address: { type: String },
  email: { type: String },
  city: { type: String }

}, { _id: false });

const goldDetailsSchema = new mongoose.Schema({
  category: { type: String },
  goldPurity: { type: String },
  goldColor: { type: String },
  jewelrySize: { type: String },
  weight: { type: Number },
  ratePerGram: { type: Number },
  totalGoldCost: { type: Number },
  labourCost: { type: Number },
  totalLabourPrice: { type: Number }
}, { _id: false });

const diamondDetailSchema = new mongoose.Schema({
  type: { type: String, enum: ['center', 'side'] },
  shape: { type: String },
  size: { type: Number },
  color: { type: String },
  clarity: { type: String },
  weight: { type: Number },
  ratePerCts: { type: Number },
  discount: { type: Number },
  ratePerCtsAfterDis: { type: Number },
  totalAmount: { type: Number }
}, { _id: false });

const quotationSummarySchema = new mongoose.Schema({
  goldCost: { type: Number },
  labourCost: { type: Number },
  diamondCost: { type: Number },
  gst: { type: Number },
  total: { type: Number }
}, { _id: false });

const quotationSchema = new mongoose.Schema({
  userId: { type: String },
  date: { type: Date, default: Date.now },
  image_url: { type: String },
  orderStatus: { type: String, enum: ['pending', 'placed','confirmed', 'shipped', 'delivered'], default: 'pending' },
  pdfUrl: { type: String },
  clientDetails: clientDetailsSchema,
  goldDetails: goldDetailsSchema,
  diamondDetails: [diamondDetailSchema],
  quotationSummary: quotationSummarySchema
}, { timestamps: true });

module.exports = mongoose.model('Quotation', quotationSchema);
