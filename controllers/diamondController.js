const Diamond = require('../models/Diamond');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Import Diamonds from Excel
const importDiamonds = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
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
                status: false,
                message: "Excel file is empty or invalid format"
            });
        }

        // Insert into DB
        await Diamond.insertMany(data);

        // Delete file after processing
        fs.unlinkSync(filePath);

        return res.status(200).json({
            status: true,
            message: "Diamonds imported successfully",
            total: data.length
        });

    } catch (err) {
        console.error("Import Error:", err.message);
        return res.status(500).json({
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
            if (d.Shape) shapes.add(normalizeShape(d.Shape));
            if (d.Color) normalizeColor(d.Color).forEach(c => colors.add(c));
            if (d.Purity) normalizePurity(d.Purity).forEach(p => purities.add(p));
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

// Export all controller functions
module.exports = {
    importDiamonds,
    getAllDiamonds,
    getDropdownData
};
