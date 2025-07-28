const express = require('express');
const router = express.Router();
const { placeOrder,getOrderHistory,getSummaryCounts,updateOrderStatus,getAllOrders } = require('../controllers/orderController');

router.post('/place-order', placeOrder);
router.get('/history/:userId', getOrderHistory);
router.get('/summary', getSummaryCounts);
router.put('/:id/status', updateOrderStatus);
router.get('/orders-history', getAllOrders); // GET /orders?page=1&limit=10


module.exports = router;
