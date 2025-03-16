const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const Admin = require("../models/Admin"); // Import the Admin model
const { getDepartmentUserStats } = require("../controllers/adminController");
const { getAllUsers } = require("../controllers/adminController");


// Route for requesting OTP (unprotected)
router.post("/request-otp", adminController.requestOtp);

// Route for verifying OTP (unprotected)
router.post("/verify-otp", adminController.verifyOtp);



// router.get("/users", adminAuthMiddleware, getAllUsers);
router.get("/all-registered-students", adminAuthMiddleware, getAllUsers); // ✅ Use the correct function

router.get("/department-user-stats", adminAuthMiddleware, getDepartmentUserStats);

router.get("/platform-count", adminAuthMiddleware, adminController.getPlatformCounts);

// Endpoint to fetch all admins (protected, admin-only)
router.get("/", adminAuthMiddleware, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});






module.exports = router;
