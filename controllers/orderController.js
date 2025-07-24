// controllers/orderController.js
const Order = require('../models/Order');
const Quotation = require('../models/Quotation');
const logger = require('../utils/logger');

const placeOrder = async (req, res) => {
    try {
        const {
            userId,
            quotationId,
            orderDate,
            customerDetails,
            paymentStatus,
            orderStatus
        } = req.body;

        const quotation = await Quotation.findById(quotationId);
        if (!quotation) {
            return res.status(404).json({ code: 404, status: false, message: 'Quotation not found' });
        }

        const order = new Order({
            userId,
            quotationId,
            orderDate,
            customerDetails,
            paymentStatus,
            orderStatus
        });

        await order.save();

        res.status(201).json({ code: 201, status: true, message: 'Order placed successfully', order });

    } catch (err) {
        logger.error('Error placing order:', {
            message: err.message,
            stack: err.stack,
            errors: err.errors || null
        });

        res.status(500).json({ code: 500, status: false, message: 'Server error', error: err.message });
    }
};


const getOrderHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId })
            .populate('quotationId')
            .sort({ createdAt: -1 }); // 👈 descending order

        if (!orders.length) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: 'No orders found for this user.',
            });
        }

        res.status(200).json({
            code: 200,
            status: true,
            message: 'Order history fetched successfully',
            orders,
        });
    } catch (error) {
        logger.error('Error fetching order history:', error);
        res.status(500).json({
            code: 500,
            status: false,
            message: 'Server error',
        });
    }
};




module.exports = {
    placeOrder,
    getOrderHistory
};
