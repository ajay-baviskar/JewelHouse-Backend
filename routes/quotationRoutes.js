const express = require('express');
const router = express.Router();
const { submitQuotation,getQuotationByUserId, getAllQuotations,updateQuotation, deleteQuotation } = require('../controllers/quotationController');

router.post('/submit', submitQuotation);
router.get('/:userId', getQuotationByUserId);
router.get('/', getAllQuotations);
router.put('/:quotationId', updateQuotation);
router.delete('/:id', deleteQuotation);   // ✅ delete route

module.exports = router;
