const Diamond = require('../models/Diamond');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

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

        // Read Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        if (!data || data.length === 0) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "Excel file is empty or invalid format"
            });
        }

        // Insert into DB
        await Diamond.insertMany(data);

        // Delete file after processing
        fs.unlinkSync(filePath);

        return res.status(200).json({
            code: 200,
            status: true,
            message: "Diamonds imported successfully",
            total: data.length
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

        const total = await Diamond.countDocuments();
        const diamonds = await Diamond.find()
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });

        return res.status(200).json({
            code: 200,
            status: true,
            message: "Diamonds fetched successfully",
            total,
            page,
            limit,
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
        const { size, color, shape, purity } = req.query;

        if (!size || !color || !shape || !purity) {
            return res.status(400).json({

                success: false,
                message: "Please provide size, color, shape, and purity in query params"
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
            Purity: purity
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
                price: matchingDiamond.Price
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


// Export all controller functions
module.exports = {
    importDiamonds,
    getAllDiamonds,
    getDropdownData,
    getDiamondPrice
};
