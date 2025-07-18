const Quotation = require('../models/Quotation');

// Submit Quotation API
const submitQuotation = async (req, res) => {
  try {
    const quotationData = req.body;

    // Save to DB
    const newQuotation = new Quotation(quotationData);
    await newQuotation.save();

    return res.status(201).json({
      status: true,
      message: "Quotation submitted successfully",
      quotationId: newQuotation._id
    });

  } catch (error) {
    console.error("Quotation Error:", error.message);
    return res.status(500).json({
      status: false,
      message: "Failed to submit quotation",
      error: error.message
    });
  }
};

module.exports = {
  submitQuotation
};
