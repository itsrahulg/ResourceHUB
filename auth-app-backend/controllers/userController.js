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
