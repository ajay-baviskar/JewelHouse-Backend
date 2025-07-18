const express = require('express');
const router = express.Router();
const { submitQuotation,getQuotationById, getAllQuotations } = require('../controllers/quotationController');

router.post('/submit', submitQuotation);
router.get('/:id', getQuotationById);
router.get('/', getAllQuotations);

module.exports = router;
