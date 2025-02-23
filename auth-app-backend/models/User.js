// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   department: { type: String, required: true },
//   program: { type: String, required: true }, // BE/BTech, MTech, MSc, MCA
//   startYear: { type: Number, required: true },
//   endYear: { type: Number, required: true },
// });

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  program: { type: String, required: true }, // BE/BTech, MTech, MSc, MCA
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  profilePhoto: { type: String, default: "" }, // Store profile photo URL
});

module.exports = mongoose.model("User", UserSchema);
