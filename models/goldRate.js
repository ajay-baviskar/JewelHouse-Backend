const mongoose = require("mongoose");

const goldRateSchema = new mongoose.Schema(
  {
    rate24k: { type: Number, required: true },
    rate22k: { type: Number, required: true },
    rate18k: { type: Number, required: true },
    rate14k: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GoldRate", goldRateSchema);
