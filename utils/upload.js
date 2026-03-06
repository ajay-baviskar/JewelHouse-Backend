const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },

  filename: function (req, file, cb) {

    // remove spaces and brackets
    const cleanName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[()]/g, "")
      .toLowerCase();

    const uniqueName = `${Date.now()}-${cleanName}`;

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, cb) {

    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }

  },

  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }

});

module.exports = upload;