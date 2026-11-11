
const Job = require("../models/Job");

// Create a new job
const createJob = async (req, res) => {
    try {
        const {
            company,
            role,
            description,
            location,
            jobType,
            package: salaryPackage,
            eligibility,
            requiredSkills,
            applicationDeadline
        } = req.body;

        if (!company || !role || !description || !location || !salaryPackage) {
            return res.status(400).json({
                message: "Please provide all required job details."
            });
        }

        const job = await Job.create({
            company,
            role,
            description,
            location,
            jobType,
            package: salaryPackage,
            eligibility,
            requiredSkills,
            applicationDeadline,
            postedBy: req.user.id
        });

        res.status(201).json({
            message: "Job posted successfully!",
            job
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create job.",
            error: error.message
        });
    }
};

// Get all jobs with optional filters
const getAllJobs = async (req, res) => {
    try {
        const { search, location, jobType } = req.query;

        const filter = { status: "Open" };

        if (search) {
            filter.$or = [
                { company: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } }
            ];
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (jobType) {
            filter.jobType = jobType;
        }

        const jobs = await Job.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch jobs.",
            error: error.message
        });
    }
};

// Get a single job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found."
            });
        }

        res.status(200).json({ job });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch job.",
            error: error.message
        });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById
};
