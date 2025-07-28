const express = require('express');
const router = express.Router();
const multer = require('multer');
const { importDiamonds, getAllDiamonds,getDropdownData, getDiamondPrice,updateDiamond} = require('../controllers/diamondController');

const upload = multer({ dest: 'uploads/' });
router.post('/import', upload.single('file'), importDiamonds);
router.get('/all', getAllDiamonds);
router.get('/dropdowns', getDropdownData);
router.get('/price', getDiamondPrice);
router.put("/update/:id", updateDiamond); // PUT or PATCH

module.exports = router;
