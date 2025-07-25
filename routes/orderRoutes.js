const express = require('express');
const router = express.Router();
const { placeOrder,getOrderHistory,getSummaryCounts } = require('../controllers/orderController');

router.post('/place-order', placeOrder);
router.get('/history/:userId', getOrderHistory);
router.get('/summary', getSummaryCounts);


module.exports = router;
