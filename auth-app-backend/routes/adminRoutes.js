// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const authMiddleware = require("../middleware/authMiddleware");
// const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");


// // Route for requesting OTP
// router.post("/request-otp", adminController.requestOtp);
// // Route for verifying OTP
// router.post("/verify-otp", adminController.verifyOtp);


// // Endpoint to fetch all admins
// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.json(admins);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const Admin = require("../models/Admin"); // Import the Admin model

// Route for requesting OTP (unprotected)
router.post("/request-otp", adminController.requestOtp);

// Route for verifying OTP (unprotected)
router.post("/verify-otp", adminController.verifyOtp);

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
