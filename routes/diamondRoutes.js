const express = require('express');
const router = express.Router();
const multer = require('multer');
const { importDiamonds, getAllDiamonds,getDropdownData, getDiamondPrice,updateDiamond, createDiamond, downloadDiamondsExcel, getSizesByAttributes} = require('../controllers/diamondController');

const upload = multer({ dest: 'uploads/' });
router.post('/import', upload.single('file'), importDiamonds);
router.post('/create-diamonds', createDiamond);

router.get('/all', getAllDiamonds);
router.get('/dropdowns', getDropdownData);
router.get('/price', getDiamondPrice);
router.put("/update/:id", updateDiamond); // PUT or PATCH
router.get("/download",downloadDiamondsExcel);
router.get('/diamond-sizes', getSizesByAttributes);

module.exports = router;
