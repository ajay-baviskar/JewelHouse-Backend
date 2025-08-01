const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
    orderDate: { type: Date },
    customerDetails: {
        name: String,
        contactNumber: String,
        address: String,
        city: String,
        pinCode: String,
        email: String,
        aadhaarNumber: { type: String },
        panCardNumber: { type: String },
        expectedDeliverydate: { type: String }
    },
    orderSummary: {
        goldCost: Number,
        labourCost: Number,
        diamondCost: Number,
        gstPercent: Number,
        gstAmount: Number,
        finalAmount: Number
    },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    orderStatus: { type: String, enum: ['pending', 'placed','confirmed', 'shipped', 'delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
