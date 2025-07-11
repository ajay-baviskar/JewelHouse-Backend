const express = require('express');
const router = express.Router();
const multer = require('multer');
const { importDiamonds, getAllDiamonds } = require('../controllers/diamondController');

const upload = multer({ dest: 'uploads/' });
router.post('/import', upload.single('file'), importDiamonds);
router.get('/all', getAllDiamonds);


module.exports = router;
