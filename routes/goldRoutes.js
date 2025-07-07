const express = require('express');
const router = express.Router();
const { getGoldPrice } = require('../controllers/goldController');

router.get('/gold-price', getGoldPrice);

module.exports = router;
