const Image = require('../models/Image');

const uploadImage = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!req.file || !userId) {
      return res.status(400).json({ status: false, message: 'userId and image are required' });
    }

    // const imageUrl = `https://thejewelhouse.com/images/${req.file.filename}`;
        const imageUrl = `http://62.72.33.172:4000/images/${req.file.filename}`;


    const newImage = new Image({ userId, imageUrl });
    await newImage.save();

    return res.status(201).json({ status: true, message: 'Image uploaded successfully', data: newImage });
  } catch (err) {
    console.error('Upload Error:', err);
    return res.status(500).json({ status: false, message: 'Server Error' });
  }
};

module.exports = { uploadImage };
