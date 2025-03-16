const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const otpStore = {};
const User = require("../models/User");
const GlobalMetrics = require("../models/GlobalMetrics");
const Document = require("../models/Document"); // ✅ Add this
const PhysicalResource = require("../models/PhysicalResource"); // ✅ Add this

/**
 * Request OTP for admin login.
 */
exports.requestOtp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request OTP for email:", email);

    // Validate admin credentials
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      console.log("Password does not match for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a 6-digit OTP and store it temporarily with expiry (5 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ResourceHUB Admin Login OTP",
      text: `Your OTP for logging into ResourceHUB is ${otp}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in requestOtp:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Verify OTP and generate an admin token.
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOtpObj = otpStore[email];

    if (!storedOtpObj) {
      return res.status(400).json({ message: "OTP not requested or expired" });
    }

    if (storedOtpObj.expires < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (storedOtpObj.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is valid; remove it from the store.
    delete otpStore[email];

    // Find the admin by email.
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate a JWT token with admin-specific claims.
    const token = jwt.sign(
      {
        adminId: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "OTP verified", token });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error while fetching users" });
  }
};


// exports.getUserCountByDepartment = async (req, res) => {
//   try {
//     const departmentCounts = await User.aggregate([
//       { $group: { _id: "$department", count: { $sum: 1 } } },
//       { $sort: { count: -1 } } // Sort in descending order
//     ]);

//     res.status(200).json(departmentCounts);
//   } catch (error) {
//     console.error("Error fetching department-wise user count:", error);
//     res.status(500).json({ error: "Server error while fetching department user count" });
//   }
// };


exports.getDepartmentUserStats = async (req, res) => {
  try {
    const departmentStats = await User.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } }, // Group users by department
      { $sort: { count: -1 } }, // Sort by highest count
    ]);

    res.status(200).json(departmentStats);
  } catch (error) {
    console.error("Error fetching department user stats:", error);
    res.status(500).json({ error: "Server error while fetching department stats" });
  }
};

exports.getPlatformCounts = async (req, res) => {
  try {
    // Fetch Current Users
    const currentUsers = await User.countDocuments();

    // Fetch Total Users Ever Registered from GlobalMetrics
    const totalUsersEver = await GlobalMetrics.findOne({ key: "totalUsersEver" });

    // Fetch Current Documents
    const currentDocuments = await Document.countDocuments();

    // Fetch Total Documents Ever Uploaded from GlobalMetrics
    const totalDocumentsEver = await GlobalMetrics.findOne({ key: "totalDocumentsEver" });

    // Fetch Current Physical Resource Posts
    const currentPosts = await PhysicalResource.countDocuments();

    // Fetch Total Physical Resource Posts Ever from GlobalMetrics
    const totalPostsEver = await GlobalMetrics.findOne({ key: "totalPostsEver" });

    res.json({
      totalUsersEver: totalUsersEver?.count || 0,
      currentUsers,
      totalDocumentsEver: totalDocumentsEver?.count || 0,
      currentDocuments,
      totalPostsEver: totalPostsEver?.count || 0,
      currentPosts,
    });
  } catch (error) {
    console.error("Error fetching platform counts:", error);
    res.status(500).json({ message: "Server error while fetching platform counts" });
  }
};

module.exports = { 
  requestOtp: exports.requestOtp, 
  verifyOtp: exports.verifyOtp, 
  getAllUsers: exports.getAllUsers,
  getDepartmentUserStats: exports.getDepartmentUserStats, // ✅ Department-wise user stats
  getPlatformCounts: exports.getPlatformCounts // ✅ Platform-wide metrics
};
