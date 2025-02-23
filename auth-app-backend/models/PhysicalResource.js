// const mongoose = require("mongoose");

// const PhysicalResourceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   department: { type: String, required: true },
//   semester: { type: Number, required: true },
//   subject: { type: String, required: true },
//   description: { type: String, required: true, maxlength: 100 },
//   availability: { type: String, enum: ["Up for Donation", "For Lending"], required: true },
//   lendingDays: { type: Number, required: function () { return this.availability === "For Lending"; } },
//   photo: { type: String, required: true }, // Path to stored image
//   postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
  photo: { type: String, required: true }, // URL to stored photo
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PhysicalResource", PhysicalResourceSchema);
