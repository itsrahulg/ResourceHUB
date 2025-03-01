const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes"); // Import the routes
const cors = require("cors");
const profileRoutes = require("./routes/profileRoutes");

const physicalResourceRoutes = require("./routes/physicalResourceRoutes");

const documentRoutes = require("./routes/documentRoutes");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes"); // new


dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend requests
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));



// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cookieParser()); // To parse cookies

// Use Routes
app.use("/api/auth", authRoutes); // Prefix all auth routes with /api/auth
app.use("/api/profile/", profileRoutes);
app.use("/uploads", express.static("uploads")); // Serve profile photos

app.use("/api/physicalresource", physicalResourceRoutes);
app.use("/physicalresource", express.static("physicalresource"));

app.use("/api/document", documentRoutes);

app.use("/documents", express.static("documents"));

app.use("/api/documents", documentRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);


app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log("✅ Registered Route:", r.route.path);
  }
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
