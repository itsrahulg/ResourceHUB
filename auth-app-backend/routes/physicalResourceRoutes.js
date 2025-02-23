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
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
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

// Multer upload setup with limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

// POST API: Upload Physical Resource
router.post("/upload", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const { title, department, semester, subject, description, availability, lendingDays } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Photo upload is required" });
    }

    const resource = new PhysicalResource({
      title,
      department,
      semester,
      subject,
      description,
      availability,
      lendingDays: availability === "For Lending" ? lendingDays : null,
      photo: `/physicalresource/${req.file.filename}`, // Store only the file path
      postedBy: req.user.id,
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

module.exports = router;
