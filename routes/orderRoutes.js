const express = require('express');
const router = express.Router();
const { placeOrder,getOrderHistory } = require('../controllers/orderController');

router.post('/place-order', placeOrder);
router.get('/history/:userId', getOrderHistory);


module.exports = router;
