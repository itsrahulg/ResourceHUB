// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure your User model is defined
const authMiddleware = require("../middleware/authMiddleware");

// Endpoint to fetch all users (students)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
