const express = require('express');
const router = express.Router();

const upload = require('../utils/upload');
const { uploadImage } = require('../controllers/imageUploadController');

router.post('/image', upload.single('image'), uploadImage);

module.exports = router;