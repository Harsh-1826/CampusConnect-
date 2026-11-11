
const express = require("express");
const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById
} = require("../controllers/jobController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Only admin and recruiter can post jobs
router.post("/", protect, authorize("admin", "recruiter"), createJob);

module.exports = router;
