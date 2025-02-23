const User = require("../models/User");
const path = require("path");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile details
// const updateUserProfile = async (req, res) => {
//   try {
//     const { name, department, program, startYear, endYear } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user.userId,
//       { name, department, program, startYear, endYear },
//       { new: true }
//     );

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId; // Ensure correct user ID extraction

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No user ID found" });
    }

    const { name, department, program, startYear, endYear } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, department, program, startYear, endYear },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // Ensure profilePhoto is included in the response
    res.json({
      message: "Profile updated successfully",
      user: {
        ...updatedUser._doc,
        profilePhoto: updatedUser.profilePhoto || ""
      }
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Upload profile photo and store in DB
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const photoPath = `/uploads/${req.file.filename}`; // Store relative path

    // Update user document with the new profile photo URL
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { profilePhoto: photoPath },
      { new: true }
    );

    res.json({ message: "Profile photo uploaded", profilePhoto: photoPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile, uploadProfilePhoto };

