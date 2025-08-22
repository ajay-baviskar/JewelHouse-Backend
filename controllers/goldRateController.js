const GoldRate = require("../models/goldRate");

// ✅ Create
const createGoldRate = async (req, res) => {
  try {
    const { rate24k, rate22k, rate18k, rate14k } = req.body;

    const goldRate = new GoldRate({ rate24k, rate22k, rate18k, rate14k });
    await goldRate.save();

    return res.status(201).json({
      code: 201,
      status: true,
      message: "Gold rate added successfully",
      data: goldRate,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, status: false, message: err.message });
  }
};

// ✅ Read (Get All)
const getGoldRates = async (req, res) => {
  try {
    const rates = await GoldRate.find().sort({ createdAt: -1 });
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Gold rates fetched successfully",
      data: rates,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, status: false, message: err.message });
  }
};

// ✅ Read (Get One by ID)
const getGoldRateById = async (req, res) => {
  try {
    const rate = await GoldRate.findById(req.params.id);
    if (!rate) {
      return res.status(404).json({ code: 404, status: false, message: "Rate not found" });
    }
    return res.status(200).json({ code: 200, status: true, data: rate });
  } catch (err) {
    return res.status(500).json({ code: 500, status: false, message: err.message });
  }
};

// ✅ Update
const updateGoldRate = async (req, res) => {
  try {
    const { rate24k, rate22k, rate18k, rate14k } = req.body;

    const updatedRate = await GoldRate.findByIdAndUpdate(
      req.params.id,
      { rate24k, rate22k, rate18k, rate14k },
      { new: true }
    );

    if (!updatedRate) {
      return res.status(404).json({ code: 404, status: false, message: "Rate not found" });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Gold rate updated successfully",
      data: updatedRate,
    });
  } catch (err) {
    return res.status(500).json({ code: 500, status: false, message: err.message });
  }
};

// ✅ Delete
const deleteGoldRate = async (req, res) => {
  try {
    const deletedRate = await GoldRate.findByIdAndDelete(req.params.id);
    if (!deletedRate) {
      return res.status(404).json({ code: 404, status: false, message: "Rate not found" });
    }
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Gold rate deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ code: 500, status: false, message: err.message });
  }
};

module.exports = {
  createGoldRate,
  getGoldRates,
  getGoldRateById,
  updateGoldRate,
  deleteGoldRate,
};
