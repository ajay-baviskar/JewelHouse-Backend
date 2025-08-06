const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, mobile, password, role } = req.body;

    try {
        if (!name || !email || !mobile || !password || !role) {
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

        user = new User({ name, email, mobile, password, role });

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
                mobile: user.mobile,
                role: user.role

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
        if (!mobile || !password) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "Mobile number and password are required",
                data: null
            });
        }

        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

        // Role check
        if (user.role !== 'MOBILE') {
            return res.status(403).json({
                code: 403,
                status: false,
                message: "Access denied. You are not authorized to login here.",
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

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



exports.loginAdmin = async (req, res) => {
    const { mobile, password } = req.body;

    try {
        if (!mobile || !password) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "Mobile number and password are required",
                data: null
            });
        }

        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

        // Role check
        if (user.role !== 'ADMIN') {
            return res.status(403).json({
                code: 403,
                status: false,
                message: "Access denied. You are not authorized to login here.",
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                status: false,
                message: "Invalid mobile number or password",
                data: null
            });
        }

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

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await User.countDocuments();
        const totalPages = Math.ceil(total / limit);

        const users = await User.find()
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            code: 200,
            success: true,
            message: "Users fetched successfully",
            total,
            page,
            limit,
            hasPreviousPage: page > 1,
            hasNextPage: page < totalPages,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { mobileNumber, newPassword } = req.body;

        if ( !mobileNumber || !newPassword) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: 'userId, mobileNumber and newPassword are required'
            });
        }

        // Find the user by ID and mobile number
        const user = await User.findOne({ mobile: mobileNumber });

        if (!user) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: 'User not found or mobile number does not match'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            code: 200,
            status: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    register: exports.register,
    login: exports.login,
    loginAdmin: exports.loginAdmin,
    forgotPassword,
    getAllUsers
};
