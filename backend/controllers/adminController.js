
const User = require("../models/User");

// GET ALL STUDENTS
const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" })
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: students.length,
            students
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students.",
            error: error.message
        });
    }
};

// DELETE A STUDENT
const deleteStudent = async (req, res) => {
    try {
        const student = await User.findOneAndDelete({
            _id: req.params.id,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.status(200).json({
            message: "Student deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete student.",
            error: error.message
        });
    }
};

module.exports = {
    getAllStudents,
    deleteStudent
};
