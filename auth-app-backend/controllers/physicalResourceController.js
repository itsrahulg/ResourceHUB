// const multer = require("multer");
// const path = require("path");
// const PhysicalResource = require("../models/PhysicalResource"); // Ensure you have this model

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "physicalresource/"); // Folder where images will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
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

// // Multer upload setup
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// }).single("photo");

// // Controller function to handle uploads
// const uploadPhysicalResource = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     try {
//       const { title, department, semester, subject, description, availability, lendingDays } = req.body;

//       if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//       }

//       const photoUrl = `/physicalresource/${req.file.filename}`; // Relative URL for frontend use

//       // Save resource in MongoDB
//       const newResource = new PhysicalResource({
//         title,
//         department,
//         semester,
//         subject,
//         description,
//         availability,
//         lendingDays: availability === "For Lending" ? lendingDays : null,
//         photo: photoUrl,
//       });

//       await newResource.save();

//       res.status(201).json({ message: "Resource uploaded successfully", resource: newResource });
//     } catch (error) {
//       console.error("Upload Error:", error);
//       res.status(500).json({ error: "Server error while uploading resource" });
//     }
//   });
// };

// // Fetch all physical resources
// const getAllPhysicalResources = async (req, res) => {
//   try {
//     const resources = await PhysicalResource.find();
//     res.status(200).json(resources);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching resources" });
//   }
// };

// module.exports = { uploadPhysicalResource, getAllPhysicalResources };





const multer = require("multer");
const path = require("path");
const PhysicalResource = require("../models/PhysicalResource"); // Ensure you have this model

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "physicalresource/"); // Folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).array("photos", 5); // Accept multiple files with field name "photos"

// Controller function to handle uploads
const uploadPhysicalResource = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { title, department, semester, subject, description, availability, lendingDays, mobileNumber } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      // Get all uploaded image URLs
      const photoUrls = req.files.map(file => `/physicalresource/${file.filename}`);

      // Fetch the email from the logged-in user
      const email = req.user.email; // Ensure authentication middleware sets req.user

      // Save resource in MongoDB
      const newResource = new PhysicalResource({
        title,
        department,
        semester,
        subject,
        description,
        availability,
        lendingDays: availability === "For Lending" ? lendingDays : null,
        photos: photoUrls, // Store multiple image URLs
        mobileNumber,
        email, // Automatically fetched from logged-in user
        postedBy: req.user._id, // Store user ID
      });

      await newResource.save();

      res.status(201).json({ message: "Resource uploaded successfully", resource: newResource });
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).json({ error: "Server error while uploading resource" });
    }
  });
};

// Fetch all physical resources
const getAllPhysicalResources = async (req, res) => {
  try {
    const resources = await PhysicalResource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: "Error fetching resources" });
  }
};

// Flagging a Physical Resource
const flagResource = async (req, res) => {
  try {
    const { resourceId, flaggedReason } = req.body;

    if (!flaggedReason) {
      return res.status(400).json({ error: "Flagged reason is required" });
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
    res.status(500).json({ error: "Error flagging resource" });
  }
};

module.exports = { uploadPhysicalResource, getAllPhysicalResources, flagResource };
