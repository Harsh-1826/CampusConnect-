
const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    createAdmin
} = require("../controllers/authController");

// Student authentication
router.post("/register", registerUser);
router.post("/login", loginUser);

// Initial admin setup
router.post("/create-admin", createAdmin);

module.exports = router;
