const express = require('express');
const router = express.Router();
const { submitQuotation } = require('../controllers/quotationController');

router.post('/submit', submitQuotation);

module.exports = router;
