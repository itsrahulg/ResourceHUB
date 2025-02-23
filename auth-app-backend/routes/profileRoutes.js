const express = require("express");
const { getUserProfile, updateUserProfile, uploadProfilePhoto } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure authentication
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Store images in 'uploads' folder

router.get("/", authMiddleware, getUserProfile);
router.put("/", authMiddleware, updateUserProfile);
router.post("/upload", authMiddleware, upload.single("profilePhoto"), uploadProfilePhoto);
router.put("/", authMiddleware, updateUserProfile);


module.exports = router;













// const express = require("express");
// const { getUserProfile, updateUserProfile, uploadProfilePhoto } = require("../controllers/profileController");
// const authMiddleware = require("../middleware/authMiddleware");
// const multer = require("multer");

// const router = express.Router();

// // Configure Multer for profile image uploads
// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${req.user.userId}-${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// router.get("/", authMiddleware, getUserProfile);
// router.put("/", authMiddleware, updateUserProfile);
// router.post("/upload", authMiddleware, upload.single("profilePhoto"), uploadProfilePhoto);

// module.exports = router;
