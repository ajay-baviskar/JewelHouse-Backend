const express = require('express');
const router = express.Router();
const { submitQuotation,getQuotationByUserId, getAllQuotations } = require('../controllers/quotationController');

router.post('/submit', submitQuotation);
router.get('/:userId', getQuotationByUserId);
router.get('/', getAllQuotations);

module.exports = router;
