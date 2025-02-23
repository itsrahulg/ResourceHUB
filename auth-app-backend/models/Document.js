// const mongoose = require("mongoose");

// const DocumentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   department: { type: String, required: true },
//   semester: { type: Number, required: true },
//   subject: { type: String, required: true },
//   description: { type: String, maxlength: 100 },
//   fileUrl: { type: String, required: true }, // Path of the stored document
//   uploadedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Document", DocumentSchema);


const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  subject: { type: String, required: true },
  description: { type: String, maxlength: 100 },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Fix: Ensure `userId` is used
});

module.exports = mongoose.model("Document", DocumentSchema);

