const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Quotation = require('../models/Quotation'); // Update path as needed
const { generateQuotationHTML } = require('../utils/generateHTML');
const htmlPdf = require('html-pdf');
const User = require("../models/User"); // make sure you have imported User model

// Submit Quotation API

const submitQuotation = async (req, res) => {
  try {
    const {
      userId,
      date,
      image_url,
      clientDetails,
      goldDetails,       // this is a single object
      diamondDetails,    // this is an array
      quotationSummary,
      orderStatus
    } = req.body;

    if (!userId || !clientDetails || !goldDetails || !quotationSummary) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Missing required fields"
      });
    }

    const user = await User.findById(userId).select("name mobile");
    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User not found"
      });
    }


    // Save in DB
    console.log("Saving quotation to DB...");
    const newQuotation = await Quotation.create({
      userId,
      date,
      image_url,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary,
      orderStatus
    });
    console.log("Quotation saved:", newQuotation._id);
    const qt_id = newQuotation._id;
    const userName= user.name
    const userMobile= user.mobile
    // Generate HTML from template
    const htmlContent = generateQuotationHTML({
      qt_id,
      image_url,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary,
      date,
      userName,
      userMobile

    });

    // Create /public/pdfs folder if not exists
    const pdfsDir = path.join(__dirname, '../public/pdfs');
    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir, { recursive: true });
    }

    const imageURL = newQuotation.image_url;
    const fileName = `THE_JEWEL_HOUSE_${newQuotation._id}.pdf`;
    const filePath = path.join(pdfsDir, fileName);

    htmlPdf.create(htmlContent).toFile(filePath, async (err, result) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).json({
          success: false,
          message: "Error generating PDF",
          error: err.message
        });
      }

      const pdfUrl = `http://62.72.33.172:4000/pdfs/${fileName}`;

      // ✅ Save the PDF URL to the quotation document
      await Quotation.findByIdAndUpdate(newQuotation._id, {
        $set: { pdfUrl }
      });

      return res.status(201).json({
        code: 201,
        success: true,
        message: "Quotation created and PDF generated",
        data: {
          pdfUrl,
          goldImageURL: imageURL,
           userName: user.name,
          userMobile: user.mobile
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



const updateQuotation = async (req, res) => {
  try {
    const { quotationId } = req.params;
    const {
      userId,
      date,
      image_url,
      clientDetails,
      goldDetails,
      diamondDetails,
      quotationSummary,
      orderStatus
    } = req.body;

    // Check if quotation exists
    const existingQuotation = await Quotation.findById(quotationId);
    if (!existingQuotation) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Quotation not found"
      });
    }

    // Update quotation in DB
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      quotationId,
      {
        $set: {
          userId,
          date,
          image_url,
          clientDetails,
          goldDetails,
          diamondDetails,
          quotationSummary,
          orderStatus
        }
      },
      { new: true }
    );

    // ✅ Fetch user details to add into PDF (name, mobile from Users collection)
    let user = null;
    if (userId) {
      user = await User.findById(userId).select("name mobile");
    }

    // Generate updated HTML
    const htmlContent = generateQuotationHTML({
      qt_id: quotationId,
      image_url: updatedQuotation.image_url,
      clientDetails: updatedQuotation.clientDetails,
      goldDetails: updatedQuotation.goldDetails,
      diamondDetails: updatedQuotation.diamondDetails,
      quotationSummary: updatedQuotation.quotationSummary,
        date: (date instanceof Date) 
          ? date.toISOString().split("T")[0] 
          : (typeof date === "string" ? date.split("T")[0] : ""),
      userName: user?.name || "N/A",
      userMobile: user?.mobile || "N/A"
    });

    // Create /public/pdfs folder if not exists
    const pdfsDir = path.join(__dirname, "../public/pdfs");
    if (!fs.existsSync(pdfsDir)) {
      fs.mkdirSync(pdfsDir, { recursive: true });
    }

    const fileName = `quotation_${quotationId}.pdf`;
    const filePath = path.join(pdfsDir, fileName);

    htmlPdf.create(htmlContent).toFile(filePath, async (err, result) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).json({
          success: false,
          message: "Error generating updated PDF",
          error: err.message
        });
      }

      const pdfUrl = `http://62.72.33.172:4000/pdfs/${fileName}`;

      // ✅ Save PDF URL
      await Quotation.findByIdAndUpdate(quotationId, { $set: { pdfUrl } });

      return res.status(200).json({
        code: 200,
        success: true,
        message: "Quotation updated successfully",
        data: {
          // quotation: updatedQuotation,
          pdfUrl,
          goldImageURL: updatedQuotation.image_url
        }
      });
    });
  } catch (error) {
    console.error("Error updating quotation:", error.message);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


// const getQuotationByUserId = async (req, res) => {
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


const getQuotationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const item_per_page = parseInt(req.query.item_per_page) || 10;
    const skip = (page - 1) * item_per_page;

    const filter = { userId };

    const total = await Quotation.countDocuments(filter);
    if (total === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: 'No quotations found for the given userId.',
      });
    }

    const quotations = await Quotation.find(filter)
      .sort({ createdAt: -1 })
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
    const { page = 1, limit = 10, name, contactNumber, email, city } = req.query;

    const filter = {};
    if (name) filter['clientDetails.name'] = { $regex: name, $options: 'i' };
    if (contactNumber) filter['clientDetails.contactNumber'] = { $regex: contactNumber, $options: 'i' };
    if (email) filter['clientDetails.email'] = { $regex: email, $options: 'i' };
    if (city) filter['clientDetails.city'] = { $regex: city, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Quotation.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Fetch quotations
    const quotations = await Quotation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // ✅ Attach user details manually
    const dataWithUsers = await Promise.all(
      quotations.map(async (q) => {
        const user = await User.findById(q.userId).select("name mobile email");
        return {
          ...q.toObject(),
          user: user ? user.toObject() : null
        };
      })
    );

    res.status(200).json({
      code: 200,
      success: true,
      message: "Quotations fetched successfully",
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      hasPreviousPage: parseInt(page) > 1,
      hasNextPage: parseInt(page) < totalPages,
      data: dataWithUsers
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'Failed to fetch quotations',
      error: error.message
    });
  }
};



const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuotation = await Quotation.findByIdAndDelete(id);

    if (!deletedQuotation) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Quotation not found"
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Quotation deleted successfully",
      deleted_quotation_id: deletedQuotation._id
    });

  } catch (error) {
    console.error("Delete Error:", error.message);
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Failed to delete quotation",
      error: error.message
    });
  }
};



module.exports = {
  submitQuotation,
  getQuotationByUserId,
  getAllQuotations,
  updateQuotation,
  deleteQuotation
};
