const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");

        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");
        console.log("Database Host:", connection.connection.host);

    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

module.exports = connectDB;