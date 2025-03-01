// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Ensure this path is correct
require("dotenv").config(); // Loads variables from .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/authDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB();

    // Define your admin credentials (change these as needed)
    const adminData = {
      email: "rahulstark13@gmail.com",
      password: await bcrypt.hash("password123", 10),
    };

    // Check if an admin with that email already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Create and save the admin
    const admin = new Admin(adminData);
    await admin.save();
    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
