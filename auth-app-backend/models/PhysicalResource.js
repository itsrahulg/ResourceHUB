// const mongoose = require("mongoose");

// const PhysicalResourceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   department: { type: String, required: true },
//   semester: { type: String, required: true },
//   subject: { type: String, required: true },
//   description: { type: String, required: true, maxlength: 100 },
//   availability: { type: String, required: true, enum: ["Up for Donation", "For Lending"] },
//   lendingDays: { type: Number, required: function () { return this.availability === "For Lending"; } },
//   photo: { type: String, required: true }, // URL to stored photo
//   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("PhysicalResource", PhysicalResourceSchema);




const mongoose = require("mongoose");

const PhysicalResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  availability: { type: String, required: true, enum: ["Up for Donation", "For Lending"] },
  lendingDays: { type: Number, required: function () { return this.availability === "For Lending"; } },
  photos: { 
    type: [String], // Array of image URLs
    validate: [arrayLimit, "You can upload up to 5 images only"],
    required: true
  },
  mobileNumber: { type: String, required: true }, // New field
  email: { type: String, required: true }, // Automatically fetched from logged-in user
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  flagged: { type: Boolean, default: false }, // New field to mark inappropriate posts
  flaggedReason: { type: String, required: function () { return this.flagged; } }, // Reason for flagging
  createdAt: { type: Date, default: Date.now }
});

// Function to limit the number of images
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("PhysicalResource", PhysicalResourceSchema);
