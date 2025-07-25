// controllers/orderController.js
const Order = require('../models/Order');
const Quotation = require('../models/Quotation');
const User = require('../models/User');
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





const getSummaryCounts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (userId) {
      // Check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          code: 404,
          status: false,
          message: 'User not found',
        });
      }

      // Count user-specific data
      const [orderCount, pendingOrderCount, quotationCount] = await Promise.all([
        Order.countDocuments({ userId }),
        Order.countDocuments({ userId, orderStatus: 'pending' }),
        Quotation.countDocuments({ userId }),
      ]);

      return res.status(200).json({
        code: 200,
        status: true,
        message: 'User summary fetched successfully',
        data: {
          userId,
          totalOrders: orderCount,
          totalPendingOrders: pendingOrderCount,
          totalQuotations: quotationCount,
        },
      });
    } else {
      // Global summary
      const [userCount, orderCount, pendingOrderCount, quotationCount] = await Promise.all([
        User.countDocuments(),
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: 'pending' }),
        Quotation.countDocuments(),
      ]);

      return res.status(200).json({
        code: 200,
        status: true,
        message: 'Summary fetched successfully',
        data: {
          totalUsers: userCount,
          totalOrders: orderCount,
          totalPendingOrders: pendingOrderCount,
          totalQuotations: quotationCount,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching summary:', error);
    return res.status(500).json({
      code: 500,
      status: false,
      message: 'Server error',
    });
  }
};




module.exports = {
    placeOrder,
    getOrderHistory,
    getSummaryCounts
};
