const express = require('express');
const router = express.Router();
const { submitQuotation,getQuotationById } = require('../controllers/quotationController');

router.post('/submit', submitQuotation);
router.get('/:id', getQuotationById);

module.exports = router;
