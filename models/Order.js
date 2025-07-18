const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation', required: true },
    orderDate: { type: Date, required: true },
    customerDetails: {
        name: String,
        contactNumber: String,
        address: String,
        pinCode: String,
        email: String,
        aadhaarNumber: { type: String, required: true },
        panCardNumber: { type: String, required: true },
        expectedDeliverydate: { type: String, required: true }
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
    orderStatus: { type: String, enum: ['confirmed', 'shipped', 'delivered'], default: 'confirmed' }
});

module.exports = mongoose.model('Order', orderSchema);
