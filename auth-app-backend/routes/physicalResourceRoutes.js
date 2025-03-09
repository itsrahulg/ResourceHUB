// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const PhysicalResource = require("../models/PhysicalResource");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // Ensure the physicalresource directory exists
// const uploadDir = "physicalresource/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // Save in physicalresource folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPEG, PNG, and JPG files are allowed!"), false);
//   }
// };

// // Multer upload setup with limits
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
// });

// // POST API: Upload Physical Resource
// router.post("/upload", authMiddleware, upload.single("photo"), async (req, res) => {
//   try {
//     const { title, department, semester, subject, description, availability, lendingDays } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: "Photo upload is required" });
//     }

//     const resource = new PhysicalResource({
//       title,
//       department,
//       semester,
//       subject,
//       description,
//       availability,
//       lendingDays: availability === "For Lending" ? lendingDays : null,
//       photo: `/physicalresource/${req.file.filename}`, // Store only the file path
//       postedBy: req.user.id,
//     });

//     await resource.save();
//     res.status(201).json({ message: "Physical Resource Posted Successfully", resource });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ error: "Server Error while uploading resource" });
//   }
// });

// // GET API: Fetch All Physical Resources
// router.get("/all", async (req, res) => {
//   try {
//     const resources = await PhysicalResource.find().populate("postedBy", "name email");
//     res.status(200).json(resources);
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     res.status(500).json({ error: "Error fetching resources" });
//   }
// });

// module.exports = router;






const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const PhysicalResource = require("../models/PhysicalResource");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure the physicalresource directory exists
const uploadDir = "physicalresource/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save in physicalresource folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed!"), false);
  }
};

// Multer upload setup (accepts up to 5 images)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).array("photos", 5); // Allow multiple file uploads

// POST API: Upload Physical Resource
// router.post("/upload", authMiddleware, (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     try {
//       const { title, department, semester, subject, description, availability, lendingDays, mobileNumber } = req.body;

//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ error: "At least one photo is required" });
//       }

//       if (!req.user || !req.user.email) {
//         return res.status(400).json({ error: "User email is missing. Ensure you are logged in." });
//       }

//       // Get all uploaded image URLs
//       const photoUrls = req.files.map(file => `/physicalresource/${file.filename}`);

//       const resource = new PhysicalResource({
//         title,
//         department,
//         semester,
//         subject,
//         description,
//         availability,
//         lendingDays: availability === "For Lending" ? lendingDays : null,
//         photos: photoUrls,
//         mobileNumber,
//         email: req.user.email, // ✅ This ensures the email is set
//         postedBy: req.user.id,
//       });

//       await resource.save();
//       res.status(201).json({ message: "Physical Resource Posted Successfully", resource });
//     } catch (error) {
//       console.error("Upload Error:", error);
//       res.status(500).json({ error: "Server Error while uploading resource" });
//     }
//   });
// });

router.post("/upload", authMiddleware, upload.array("photos", 5), async (req, res) => {
  try {
    const { title, department, semester, subject, description, availability, lendingDays, mobileNumber } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one photo is required" });
    }

    const photoPaths = req.files.map((file) => `/physicalresource/${file.filename}`);

    const resource = new PhysicalResource({
      title,
      department,
      semester,
      subject,
      description,
      availability,
      lendingDays: availability === "For Lending" ? lendingDays : null,
      photos: photoPaths,
      mobileNumber,
      email: req.user.email, // ✅ Ensure email is stored
      postedBy: req.user.id, // ✅ Store the logged-in user's ID
    });

    await resource.save();
    res.status(201).json({ message: "Physical Resource Posted Successfully", resource });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Server Error while uploading resource" });
  }
});



// GET API: Fetch All Physical Resources
router.get("/all", async (req, res) => {
  try {
    const resources = await PhysicalResource.find().populate("postedBy", "name email");
    res.status(200).json(resources);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Error fetching resources" });
  }
});

// PATCH API: Flag a Resource
router.patch("/flag", authMiddleware, async (req, res) => {
  try {
    const { resourceId, flaggedReason } = req.body;

    if (!flaggedReason) {
      return res.status(400).json({ error: "Flag reason is required" });
    }

    const resource = await PhysicalResource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    resource.flagged = true;
    resource.flaggedReason = flaggedReason;
    await resource.save();

    res.status(200).json({ message: "Resource flagged successfully", resource });
  } catch (error) {
    console.error("Flag Error:", error);
    res.status(500).json({ error: "Error flagging resource" });
  }
});



// Add this inside physicalResourceRoutes.js
router.put("/flag/:id", authMiddleware, async (req, res) => {
  try {
    const { flagged, flaggedReason } = req.body;
    const resourceId = req.params.id;

    // Find the resource by ID
    const resource = await PhysicalResource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Physical Resource not found" });
    }

    // Update flagged status & reason
    resource.flagged = flagged;
    resource.flaggedReason = flagged ? flaggedReason : "";

    await resource.save();
    res.status(200).json({ message: "Resource flagged successfully", resource });
  } catch (error) {
    console.error("Error flagging resource:", error);
    res.status(500).json({ error: "Server error while flagging resource" });
  }
});

//get count of posts put in the website
router.get("/count/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }

    const count = await PhysicalResource.countDocuments({ postedBy: userId }); // ✅ Correct Query
    console.log(`📊 User ${userId} has posted ${count} resources.`);

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching post count:", error);
    res.status(500).json({ error: "Server error while fetching count" });
  }
});



module.exports = router;
