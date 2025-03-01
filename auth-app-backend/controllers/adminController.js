

// const nodemailer = require("nodemailer");
// const Admin = require("../models/Admin");
// const otpStore = {};

// exports.requestOtp = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("Request OTP for email:", email); // Log the email

//     // Validate admin credentials
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isValid = await admin.comparePassword(password);
//     if (!isValid) {
//       console.log("Password does not match for email:", email);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate OTP and send email...
//     // (Rest of your OTP logic)
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

//     // Setup nodemailer (example)
//     let transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "ResourceHUB Admin Login OTP",
//       text: `Your OTP for logging into ResourceHUB is ${otp}. It expires in 5 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: "OTP sent to your email" });
//   } catch (error) {
//     console.error("Error in requestOtp:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // OTP verification function.
// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const storedOtpObj = otpStore[email];

//     if (!storedOtpObj) {
//       return res.status(400).json({ message: "OTP not requested or expired" });
//     }

//     if (storedOtpObj.expires < Date.now()) {
//       delete otpStore[email];
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (storedOtpObj.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // OTP is valid; remove it from the store.
//     delete otpStore[email];

//     // Generate a JWT token for admin login (dummy token for now)
//     const token = "dummy-admin-token";
//     res.json({ message: "OTP verified", token });
//   } catch (error) {
//     console.error("Error in verifyOtp:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { requestOtp: exports.requestOtp, verifyOtp: exports.verifyOtp };





const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const otpStore = {};

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

module.exports = { requestOtp: exports.requestOtp, verifyOtp: exports.verifyOtp };
