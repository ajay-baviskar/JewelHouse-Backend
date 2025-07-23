const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Quotation = require('../models/Quotation'); // Update path as needed
const { generateQuotationHTML } = require('../utils/generateHTML');
const htmlPdf = require('html-pdf');

// Submit Quotation API
const submitQuotation = async (req, res) => {
  try {
    const {
      userId,
      date,
      clientDetails,
      goldDetails,       // this is a single object
      diamondDetails,    // this is an array
      quotationSummary
    } = req.body;

    if (!userId || !clientDetails || !goldDetails || !quotationSummary) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Missing required fields"
      });
    }

    // Save in DB
    const newQuotation = await Quotation.create({
      userId,
      date,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary
    });

    // Generate HTML from template
    const htmlContent = generateQuotationHTML({
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary,
      date
    });

    // Create /public/pdfs folder if not exists
    const pdfsDir = path.join(__dirname, '../public/pdfs');
    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir, { recursive: true });
    }

    const fileName = `quotation_${newQuotation._id}.pdf`;
    const filePath = path.join(pdfsDir, fileName);

    htmlPdf.create(htmlContent).toFile(filePath, (err, result) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).json({
          success: false,
          message: "Error generating PDF",
          error: err.message
        });
      }

      return res.status(201).json({
        code: 201,
        success: true,
        message: "Quotation created and PDF generated",
        data: {
          quotation: newQuotation,
          pdfUrl: `/pdfs/${fileName}`
        }
      });
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



// const getQuotationById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const quotation = await Quotation.findById(id);

//     if (!quotation) {
//       return res.status(404).json({ code: 404, status: false, message: 'Quotation not found' });
//     }

//     res.status(200).json({ code: 200, status: true, data: quotation });
//   } catch (error) {
//     res.status(500).json({ code: 500, status: false, message: 'Server Error', error: error.message });
//   }
// };

// In controllers/quotationController.js


const getQuotationById = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const item_per_page = parseInt(req.query.item_per_page) || 10;
    const skip = (page - 1) * item_per_page;

    const total = await Quotation.countDocuments({ userId });

    const quotations = await Quotation.find({ userId })
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip(skip)
      .limit(item_per_page);

    res.status(200).json({
      code: 200,
      status: true,
      data: quotations,
      meta: {
        page,
        item_per_page,
        total_items: total,
        total_pages: Math.ceil(total / item_per_page),
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};



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
