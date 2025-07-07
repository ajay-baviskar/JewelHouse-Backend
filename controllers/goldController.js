const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getGoldPrice = async (req, res) => {
    const { metal = "XAU", currency = "USD" } = req.query;  // Default to XAU/USD

    try {
        const apiUrl = `https://www.goldapi.io/api/${metal}/${currency}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'x-access-token': process.env.GOLD_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        return res.status(200).json({
            status: true,
            message: "Gold price fetched successfully",
            data: response.data
        });

    } catch (error) {
        console.error("Error fetching gold price:", error.message);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch gold price",
            data: null
        });
    }
};
