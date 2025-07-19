const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "All fields are required",
                data: null
            });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                code: 409,
                status: false,
                message: "User with this email already exists",
                data: null
            });
        }

        user = new User({ name, email, mobile, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Success Response
        return res.status(201).json({
            code: 201,
            status: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile
            }
        });

    } catch (err) {
        console.error("Registration Error:", err.message);
        return res.status(500).json({
            code: 500,
            status: false,
            message: "Internal Server Error",
            data: null
        });
    }
};


exports.login = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        // Basic field validation
        if (!mobile || !password) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "Mobile number and password are required",
                data: null
            });
        }

        // Find user by mobile
        let user = await User.findOne({ mobile });
        if (!user) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

        // Generate JWT Token
        const payload = { user: { id: user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;

            return res.status(200).json({
                code: 200,
                status: true,
                message: "Login successful",
                data: {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile
                    }
                }
            });
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        return res.status(500).json({
            code: 500,
            status: false,
            message: "Internal Server Error",
            data: null
        });
    }
};
