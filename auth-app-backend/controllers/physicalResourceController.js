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

// Multer upload setup
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("photo");

// Controller function to handle uploads
const uploadPhysicalResource = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { title, department, semester, subject, description, availability, lendingDays } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const photoUrl = `/physicalresource/${req.file.filename}`; // Relative URL for frontend use

      // Save resource in MongoDB
      const newResource = new PhysicalResource({
        title,
        department,
        semester,
        subject,
        description,
        availability,
        lendingDays: availability === "For Lending" ? lendingDays : null,
        photo: photoUrl,
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

module.exports = { uploadPhysicalResource, getAllPhysicalResources };
