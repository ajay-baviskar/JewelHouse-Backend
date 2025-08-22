const express = require('express');
const router = express.Router();
const { getGoldPrice } = require('../controllers/goldController');

const {
  createGoldRate,
  getGoldRates,
  getGoldRateById,
  updateGoldRate,
  deleteGoldRate,
} = require("../controllers/goldRateController");

router.get('/gold-price', getGoldPrice);
router.post("/create-gold", createGoldRate);       // Create
router.get("/get-all-get", getGoldRates);          // Get All
router.get("/:id", getGoldRateById);    // Get One
router.put("/:id", updateGoldRate);     // Update
router.delete("/:id", deleteGoldRate);  // Delete

module.exports = router;
