const Quotation = require('../models/Quotation');

// Submit Quotation API
const submitQuotation = async (req, res) => {
  try {
    const {
      userId,
      date,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary
    } = req.body;

    if (!userId || !clientDetails || !goldDetails || !quotationSummary) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const newQuotation = await Quotation.create({
      userId,
      date,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary
    });

    return res.status(201).json({
      success: true,
      message: "Quotation created successfully",
      data: newQuotation
    });

  } catch (error) {
    console.error("Error creating quotation:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};



const getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id);

    if (!quotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }

    res.status(200).json(quotation);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  submitQuotation,
  getQuotationById
};
