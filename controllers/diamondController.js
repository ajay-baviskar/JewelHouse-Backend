const Diamond = require('../models/Diamond');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.importDiamonds = async (req, res) => {
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



exports.getAllDiamonds = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;     // Default page 1
        const limit = parseInt(req.query.limit) || 10;  // Default 10 items per page
        const skip = (page - 1) * limit;

        const total = await Diamond.countDocuments();
        const diamonds = await Diamond.find()
            .skip(skip)
            .limit(limit)
            .sort({ _id: -1 });  // Latest first, optional

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
