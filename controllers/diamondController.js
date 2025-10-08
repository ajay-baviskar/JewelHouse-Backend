const Diamond = require('../models/Diamond');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');
const ExcelJS = require("exceljs");

// Import Diamonds from Excel
const importDiamonds = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Please upload an Excel file"
      });
    }

    const filePath = req.file.path;

    // Read Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let data = xlsx.utils.sheet_to_json(sheet);

    if (!data || data.length === 0) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Excel file is empty or invalid format"
      });
    }

    // ✅ Add uniqueKey for each record (before insertMany)
    const withKeys = data.map((d) => ({
      ...d,
      uniqueKey: `${d.Size || ''}-${d.Color || ''}-${d.Shape || ''}-${d.Purity || ''}-${d.Discount || ''}-${d.Price || ''}`
    }));

    let insertedCount = 0;

    try {
      const result = await Diamond.insertMany(withKeys, { ordered: false });
      insertedCount = result.length;
    } catch (err) {
      // Mongo will throw duplicate key errors, count successful inserts
      if (err.writeErrors) {
        insertedCount = err.result?.result?.nInserted || 0;
      } else {
        throw err;
      }
    }

    fs.unlinkSync(filePath);

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Diamonds imported successfully",
      totalImported: insertedCount,
      totalSkipped: data.length - insertedCount
    });

  } catch (err) {
    console.error("Import Error:", err.message);
    return res.status(500).json({
      code: 500,
      status: false,
      message: "Failed to import diamonds",
      error: err.message
    });
  }
};






// Get All Diamonds with Pagination
const getAllDiamonds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        const filterableFields = ['Color', 'Shape', 'Purity', 'Discount', 'Price'];

        // Normal filters (direct matches)
        filterableFields.forEach((field) => {
            if (req.query[field]) {
                filter[field] = req.query[field];
            }
        });

        let diamondsQuery = Diamond.find(filter);

        // Special handling for Size (range filtering)
        if (req.query.Size) {
            const inputSize = parseFloat(req.query.Size);

            diamondsQuery = diamondsQuery.where({
                Size: { $exists: true }
            }).find({
                $expr: {
                    $and: [
                        { 
                            $lte: [
                                parseFloat(inputSize),
                                {
                                    $toDouble: { $arrayElemAt: [{ $split: ["$Size", "-"] }, 1] }
                                }
                            ]
                        },
                        { 
                            $gte: [
                                parseFloat(inputSize),
                                {
                                    $toDouble: { $arrayElemAt: [{ $split: ["$Size", "-"] }, 0] }
                                }
                            ]
                        }
                    ]
                }
            });
        }

        const total = await Diamond.countDocuments(filter);
        const diamonds = await diamondsQuery
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        const hasPreviousPage = page > 1;
        const hasNextPage = skip + diamonds.length < total;

        return res.status(200).json({
            code: 200,
            status: true,
            message: "Diamonds fetched successfully",
            total,
            page,
            limit,
            hasPreviousPage,
            hasNextPage,
            data: diamonds
        });

    } catch (err) {
        console.error("Fetch Error:", err.message);
        return res.status(500).json({
            code: 500,
            status: false,
            message: "Failed to fetch diamonds",
            error: err.message
        });
    }
};



// Helpers
const normalizeShape = shape => {
    const shapeMap = {
        ROUND: 'Round',
        PRINCESS: 'Princess',
        EMERALD: 'Emerald',
        OVAL: 'Oval',
        PEAR: 'Pear',
        MARQUISE: 'Marquise',
        CUSHION: 'Cushion',
        HEART: 'Heart'
    };
    return shapeMap[shape.toUpperCase()] || shape;
};

const normalizeColor = colorRange => {
    return colorRange.split('-').map(c => c.toUpperCase().trim());
};

const normalizePurity = purityRange => {
    return purityRange.split('-').map(p => p.toUpperCase().trim());
};

// Get Dropdown Data
const getDropdownData = async (req, res) => {
    try {
        const diamonds = await Diamond.find({});

        const shapes = new Set();
        const colors = new Set();
        const purities = new Set();

        diamonds.forEach(d => {
            if (d.Shape) shapes.add(d.Shape.trim().toUpperCase());
            if (d.Color) colors.add(d.Color.trim().toUpperCase());    // Includes E-F, G-H etc.
            if (d.Purity) purities.add(d.Purity.trim().toUpperCase()); // Includes VVS1-VVS2 etc.
        });

        return res.json({
            code: 200,
            success: true,
            message: "Dropdown data fetched successfully",
            data: {
                diamondShapes: Array.from(shapes),
                diamondColors: Array.from(colors),
                diamondPurity: Array.from(purities)
            }
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            success: false,
            message: "Error fetching dropdown data",
            error: error.message
        });
    }
};



const getDiamondPrice = async (req, res) => {
    try {
        const { size, color, shape, purity,discount } = req.query;

        if (!size || !color || !shape || !purity ) {
            return res.status(400).json({

                success: false,
                message: "Please provide size, color, shape, discount and purity in query params"
            });
        }

        const numericSize = parseFloat(size);

        if (isNaN(numericSize)) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: "Size must be a numeric value"
            });
        }

        // Fetch all diamonds that match color, shape, purity
        const diamonds = await Diamond.find({
            Color: color,
            Shape: shape,
            Purity: purity,
        });

        // Filter by size range
        const matchingDiamond = diamonds.find(d => {
            if (d.Size && typeof d.Size === 'string' && d.Size.includes('-')) {
                const [minStr, maxStr] = d.Size.split('-').map(s => s.trim());
                const min = parseFloat(minStr);
                const max = parseFloat(maxStr);
                return numericSize >= min && numericSize <= max;
            }
            return false;
        });

        if (!matchingDiamond) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: "No matching diamond found for the given size range"
            });
        }

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Price fetched successfully",
            data: {
                price: matchingDiamond.Price,
                discount: matchingDiamond.Discount
            }
        });

    } catch (error) {
        console.error("Fetch Price Error:", error.message);
        return res.status(500).json({
            code: 500,
            success: false,
            message: "Error fetching price",
            error: error.message
        });
    }
};



const updateDiamond = async (req, res) => {
  try {
    const diamondId = req.params.id;
    const updateData = req.body;

    const updatedDiamond = await Diamond.findByIdAndUpdate(diamondId, updateData, {
      new: true, // return the updated document
      runValidators: true // validate before update
    });

    if (!updatedDiamond) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "Diamond not found"
      });
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Diamond updated successfully",
      data: updatedDiamond
    });

  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({
      code: 500,
      status: false,
      message: "Failed to update diamond",
      error: error.message
    });
  }
};


const createDiamond = async (req, res) => {
  try {
    const { Size, Color, Shape, Purity, Discount, Price } = req.body;

    if (!Size || !Color || !Shape || !Purity) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Size, Color, Shape and Purity are required"
      });
    }

    // ✅ Generate unique key before saving
    const uniqueKey = `${Size || ''}-${Color || ''}-${Shape || ''}-${Purity || ''}-${Discount || ''}-${Price || ''}`;

    const diamond = new Diamond({
      Size,
      Color,
      Shape,
      Purity,
      Discount,
      Price,
      uniqueKey
    });

    await diamond.save();

    return res.status(201).json({
      code: 201,
      status: true,
      message: "Diamond inserted successfully",
      data: diamond,
    });

  } catch (err) {
    // Handle duplicate key error nicely
    if (err.code === 11000) {
      return res.status(409).json({
        code: 409,
        status: false,
        message: "Duplicate diamond entry detected — skipped",
      });
    }

    console.error("Create Diamond Error:", err.message);
    return res.status(500).json({
      code: 500,
      status: false,
      message: "Failed to insert diamond",
      error: err.message,
    });
  }
};



const downloadDiamondsExcel = async (req, res) => {
  try {
    // Set headers before writing
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=diamonds.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Create workbook with streaming writer (directly pipes to response)
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: res });
    const worksheet = workbook.addWorksheet("Diamonds");

    // Add header row (schema keys)
    worksheet.addRow([
      "Size", "Color", "Shape", "Purity", "Discount", "Price", "CreatedAt"
    ]).commit();

    // Use cursor instead of fetching everything
    const cursor = Diamond.find().cursor();

    for (let diamond = await cursor.next(); diamond != null; diamond = await cursor.next()) {
      worksheet.addRow([
        diamond.Size,
        diamond.Color,
        diamond.Shape,
        diamond.Purity,
        diamond.Discount,
        diamond.Price,
        diamond.createdAt ? diamond.createdAt.toISOString() : ""
      ]).commit(); // commit row immediately to free memory
    }

    // Finalize file
    await workbook.commit();

  } catch (error) {
    console.error("Excel Download Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({
        code: 500,
        status: false,
        message: "Failed to download diamonds excel",
        error: error.message
      });
    }
  }
};



const getSizesByAttributes = async (req, res) => {
  try {
    const { color, shape, purity } = req.query;

    if (!color || !shape || !purity) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Please provide color, shape, and purity in query params"
      });
    }

    // Fetch diamonds matching the criteria
    const diamonds = await Diamond.find({
      Color: color,
      Shape: shape,
      Purity: purity
    }).select("Size -_id"); // Only fetch Size field

    if (!diamonds || diamonds.length === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: "No diamonds found for the given attributes"
      });
    }

    // Extract unique sizes
    const sizes = [...new Set(diamonds.map(d => d.Size))];

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Sizes fetched successfully",
      data: sizes
    });

  } catch (error) {
    console.error("Fetch Sizes Error:", error.message);
    return res.status(500).json({
      code: 500,
      status: false,
      message: "Error fetching sizes",
      error: error.message
    });
  }
};



// Export all controller functions
module.exports = {
    importDiamonds,
    getAllDiamonds,
    getDropdownData,
    getDiamondPrice,
    updateDiamond,
    createDiamond,
    downloadDiamondsExcel,
    getSizesByAttributes
};
