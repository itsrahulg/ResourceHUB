const GlobalMetrics = require("../models/GlobalMetrics");


exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Example stats (replace with real DB queries)
    const stats = {
      uploads: await Document.countDocuments({ uploadedBy: userId }),
      downloads: 10, // Replace with actual download count
      quizPoints: 50, // Replace with actual quiz points
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    // Update total users ever registered count
    await GlobalMetrics.findOneAndUpdate(
      { key: "totalUsersEver" },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};
