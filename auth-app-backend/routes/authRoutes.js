// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Adjust the path if needed
// const router = express.Router();


// router.post("/signup", async (req, res) => {
//   const { name, email, password, program, department, startYear, endYear } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       program,
//       department,
//       startYear,
//       endYear,
//     });

//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ message: "User registered successfully", token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


//   // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Send token as an HTTP-only cookie (more secure than localStorage)
//     res.cookie("token", token, {
//       httpOnly: true, // Prevents client-side access (XSS protection)
//       secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
//       sameSite: "Strict",
//     });

//     // Return token along with user details
//     res.json({
//       message: "Login successful",
//       token, // Sending the token for frontend storage if needed
//       user: {
//         name: user.name,
//         email: user.email,
//         program: user.program,
//         department: user.department,
//         startYear: user.startYear,
//         endYear: user.endYear
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path if needed
const router = express.Router();

// User Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, program, department, startYear, endYear } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      program,
      department,
      startYear,
      endYear,
    });

    await newUser.save();

    // ✅ Generate JWT token including userId
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Send userId in response
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id, // ✅ Ensure frontend can store it
    });

  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT token including userId
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side access (XSS protection)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict",
    });

    // ✅ Return token along with userId and details
    res.json({
      message: "Login successful",
      token, // ✅ Ensure frontend stores it properly
      userId: user._id, // ✅ This will be stored in localStorage
      user: {
        name: user.name,
        email: user.email,
        program: user.program,
        department: user.department,
        startYear: user.startYear,
        endYear: user.endYear,
      },
    });

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

