
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// REGISTER STUDENT
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone,
            department,
            enrollmentNumber,
            graduationYear
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            department,
            enrollmentNumber,
            graduationYear,
            role: "student"
        });

        const token = generateToken(user);

        res.status(201).json({
            message: "Registration successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration Error:", error);

        res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Login failed. Please try again."
        });
    }
};

// CREATE FIRST ADMIN ACCOUNT
const createAdmin = async (req, res) => {
    try {
        const { name, email, password, setupKey } = req.body;

        if (!name || !email || !password || !setupKey) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        if (!process.env.ADMIN_SETUP_KEY ||
            setupKey !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({
                message: "Invalid admin setup key."
            });
        }

        const existingAdmin = await User.findOne({ role: "admin" });

        if (existingAdmin) {
            return res.status(403).json({
                message: "An admin account already exists."
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Admin password must contain at least 8 characters."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({
            message: "Admin account created successfully!",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Admin Creation Error:", error);

        res.status(500).json({
            message: "Admin account creation failed."
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    createAdmin
};
