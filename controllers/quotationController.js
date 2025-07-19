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
        code: 400,
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
      code: 201,
      success: true,
      message: "Quotation created successfully",
      data: newQuotation
    });

  } catch (error) {
    console.error("Error creating quotation:", error.message);
    return res.status(500).json({
      code: 500,
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
      return res.status(404).json({ code: 404, status: false, message: 'Quotation not found' });
    }

    res.status(200).json({ code: 200, status: true, data: quotation });
  } catch (error) {
    res.status(500).json({ code: 500, status: false, message: 'Server Error', error: error.message });
  }
};

// In controllers/quotationController.js


const getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    return res.status(200).json({
      code: 200,
      success: true,
      message: "Quotation get successfully",
      data: quotations
    });
  } catch (error) {
    res.status(500).json({ code: 500, status: false, message: 'Failed to fetch quotations', error: error.message });
  }
};


module.exports = {
  submitQuotation,
  getQuotationById,
  getAllQuotations
};
