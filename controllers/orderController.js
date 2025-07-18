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
      return res.status(404).json({ message: 'Quotation not found' });
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

    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (err) {
    logger.error('Error placing order:', {
      message: err.message,
      stack: err.stack,
      errors: err.errors || null
    });

    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getOrderHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).populate('quotationId');

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json({
      message: 'Order history fetched successfully',
      orders,
    });
  } catch (error) {
    logger.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  placeOrder,
  getOrderHistory
};
