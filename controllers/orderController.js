// controllers/orderController.js
const { generateQuotationOrderHTML } = require('../utils/generateQuotationOrderHTML');
const htmlPdf = require('html-pdf');
const path = require('path');
const fs = require('fs');

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

    quotation.orderStatus = orderStatus;
    await quotation.save();

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

      // Count user-specific data with different statuses
      const [orderCount, quotationCount, pendingOrders, confirmedOrders, shippedOrders, deliveredOrders] = await Promise.all([
        Order.countDocuments({ userId }),
        Quotation.countDocuments({ userId }),
        Order.countDocuments({ userId, orderStatus: 'pending' }),
        Order.countDocuments({ userId, orderStatus: 'confirmed' }),
        Order.countDocuments({ userId, orderStatus: 'shipped' }),
        Order.countDocuments({ userId, orderStatus: 'delivered' }),
      ]);

      return res.status(200).json({
        code: 200,
        status: true,
        message: 'User summary fetched successfully',
        data: {
          userId,
          totalOrders: orderCount,
          totalQuotations: quotationCount,
          orderStatusCounts: {
            pending: pendingOrders,
            confirmed: confirmedOrders,
            shipped: shippedOrders,
            delivered: deliveredOrders,
          },
        },
      });
    } else {
      // Global summary with different statuses
      const [userCount, orderCount, quotationCount, pendingOrders, confirmedOrders, shippedOrders, deliveredOrders] = await Promise.all([
        User.countDocuments(),
        Order.countDocuments(),
        Quotation.countDocuments(),
        Order.countDocuments({ orderStatus: 'pending' }),
        Order.countDocuments({ orderStatus: 'confirmed' }),
        Order.countDocuments({ orderStatus: 'shipped' }),
        Order.countDocuments({ orderStatus: 'delivered' }),
      ]);

      return res.status(200).json({
        code: 200,
        status: true,
        message: 'Summary fetched successfully',
        data: {
          totalUsers: userCount,
          totalOrders: orderCount,
          totalQuotations: quotationCount,
          orderStatusCounts: {
            pending: pendingOrders,
            confirmed: confirmedOrders,
            shipped: shippedOrders,
            delivered: deliveredOrders,
          },
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


const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Order ID from URL
    const { orderStatus } = req.body;

    // Allowed statuses
    const allowedStatuses = ['pending','placed', 'confirmed', 'shipped', 'delivered'];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: 'Invalid order status. Allowed statuses: pending, placed, confirmed, shipped, delivered'
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (err) {
    logger.error('Error updating order status:', {
      message: err.message,
      stack: err.stack,
      errors: err.errors || null
    });

    return res.status(500).json({
      code: 500,
      status: false,
      message: 'Server error',
      error: err.message
    });
  }
};



const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      name,
      contactNumber,
      pinCode,
      email,
      orderStatus
    } = req.query;

    // Build filter object
    const filter = {};

    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    if (name) {
      filter['customerDetails.name'] = { $regex: name, $options: 'i' };
    }

    if (contactNumber) {
      filter['customerDetails.contactNumber'] = { $regex: contactNumber, $options: 'i' };
    }

    if (email) {
      filter['customerDetails.email'] = { $regex: email, $options: 'i' };
    }

    if (pinCode) {
      filter['customerDetails.pinCode'] = { $regex: pinCode, $options: 'i' };
    }

    const total = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) // Latest orders first
      .populate('userId', 'name email')
      .populate('quotationId');

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Orders fetched successfully',
      total,
      page,
      limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
      data: orders
    });

  } catch (err) {
    logger.error('Error fetching orders:', {
      message: err.message,
      stack: err.stack,
      errors: err.errors || null
    });

    res.status(500).json({
      code: 500,
      status: false,
      message: 'Server error',
      error: err.message
    });
  }
};



const generateQuotationOrderPDF = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('quotationId');
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    const quotation = order.quotationId;
    const user = await User.findById(order.userId).select("name email mobile");

    const htmlContent = generateQuotationOrderHTML({ quotation, order, user });

    const pdfsDir = path.join(__dirname, "../public/pdfs");
    if (!fs.existsSync(pdfsDir)) fs.mkdirSync(pdfsDir, { recursive: true });

    const fileName = `Quotation_Order_${orderId}.pdf`;
    const filePath = path.join(pdfsDir, fileName);

    htmlPdf.create(htmlContent).toFile(filePath, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error generating PDF", error: err.message });
      }

      const pdfUrl = `http://62.72.33.172:4000/pdfs/${fileName}`;
      res.status(200).json({
        success: true,
        message: "Quotation & Order PDF generated",
        pdfUrl
      });
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: 'Order not found',
      });
    }

    // Optionally update quotation status to pending if linked
    if (order.quotationId) {
      await Quotation.findByIdAndUpdate(order.quotationId, { orderStatus: 'pending' });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    return res.status(200).json({
      code: 200,
      status: true,
      message: 'Order deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting order:', error.message);
    return res.status(500).json({
      code: 500,
      status: false,
      message: 'Server error while deleting order',
      error: error.message,
    });
  }
};



module.exports = {
  
generateQuotationOrderPDF,
  placeOrder,
  getOrderHistory,
  getSummaryCounts,
  updateOrderStatus,
  getAllOrders,
  deleteOrder
};
