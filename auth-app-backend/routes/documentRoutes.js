const express = require("express");
const multer = require("multer");
const path = require("path");
const documentController = require("../controllers/documentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "documents/"); // Store files in documents folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Upload document (protected route)
router.post("/upload", authMiddleware, upload.single("file"), documentController.uploadDocument);

// Get all documents
router.get("/all", documentController.getAllDocuments);



router.delete("/:id", authMiddleware, documentController.deleteDocument);

router.get("/user", authMiddleware, documentController.getUserDocuments);


// Get metrics for user documents
router.get("/metrics", authMiddleware, documentController.getUserDocumentMetrics);

module.exports = router;
