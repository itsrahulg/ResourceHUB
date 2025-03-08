const axios = require("axios");
const QuizResult = require("../models/QuizResult");
const User = require("../models/User");
const mongoose = require("mongoose");

// Function to fetch quiz questions based on the selected topic
exports.getQuestionsByTopic = async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // ✅ Map topics to The Trivia API categories
    const categories = {
      "general-knowledge": "general_knowledge",
      "science-computers": "computers",
      "science-mathematics": "mathematics",
      "history": "history",
      "sports": "sport",
      "geography": "geography",
      "entertainment-music": "music",
      "entertainment-film": "film_and_tv",
      "art": "art_and_literature",
      "literature": "art_and_literature",  // Literature falls under Art & Literature
      "science-nature": "science", // Science-related category
      "politics": "history", // No direct category, best match is history
      "economics": "general_knowledge", // No direct category, best fit in GK
      "philosophy": "general_knowledge", // No philosophy category, best match GK
      "psychology": "science", // Related to science
      "technology": "computers", // Falls under Computers
      "food-and-drink": "food_and_drink", // Dedicated category exists
      "mythology": "mythology", // Dedicated category exists
      "science-space": "science", // Falls under Science
    };

    const category = categories[topic] || "general_knowledge"; // Default to General Knowledge

    // ✅ Fetch questions from The Trivia API
    const apiUrl = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10`;

    console.log("🌍 Fetching from API:", apiUrl);

    const response = await axios.get(apiUrl);

    console.log("📡 API Response:", response.data); // Debugging API Response

    if (!response.data || !Array.isArray(response.data)) {
      console.error("❌ Invalid API response:", response.data);
      return res.status(500).json({ error: "Invalid API response" });
    }

    // ✅ Format the questions
    const formattedQuestions = response.data.map((q) => ({
      question: q.question,
      options: [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5),
      answer: q.correctAnswer,
    }));

    res.json(formattedQuestions);
  } catch (error) {
    console.error("❌ API Request Failed:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};







exports.saveQuizResult = async (req, res) => {
  try {
    console.log("📥 Received quiz submission:", req.body); // ✅ Debugging

    const { userId, topic, score, totalQuestions } = req.body;

    if (!userId || !topic || score === undefined || totalQuestions === undefined) {
      console.error("❌ Missing required fields in request:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newScore = new QuizResult({
      userId,
      topic,
      score,
      totalQuestions,
      date: new Date(),
    });

    await newScore.save();
    console.log("✅ Quiz result saved:", newScore);
    res.status(201).json({ message: "Quiz result saved successfully", newScore });
  } catch (error) {
    console.error("❌ Error saving quiz result:", error);
    res.status(500).json({ error: "Server error" });
  }
};





  // Fetch leaderboard with user names
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await QuizResult.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" }, // Sum scores per user
        },
      },
      { $sort: { totalScore: -1 } }, // Sort in descending order
    ]);

    // Fetch user details for each entry
    const leaderboardWithNames = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await User.findById(entry._id).select("name");
        return {
          userId: entry._id,
          name: user ? user.name : "Unknown User",
          totalScore: entry.totalScore,
        };
      })
    );

    res.json(leaderboardWithNames);
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get user's quiz progress
// exports.getUserQuizProgress = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const progress = await QuizResult.aggregate([
//       { $match: { userId: mongoose.Types.ObjectId(userId) } },
//       {
//         $group: {
//           _id: "$topic",
//           quizzesTaken: { $sum: 1 },
//           averageScore: { $avg: "$score" },
//           highestScore: { $max: "$score" }
//         }
//       }
//     ]);

//     res.json(progress);
//   } catch (error) {
//     console.error("❌ Error fetching user progress:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };



exports.getUserQuizProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log("📢 Fetching quiz progress for user:", userId); // Debugging

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Ensure userId is converted to ObjectId
    const progress = await QuizResult.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } }, // ✅ Fix: Convert to ObjectId
      {
        $group: {
          _id: "$topic",
          quizzesTaken: { $sum: 1 },
          averageScore: { $avg: "$score" },
          highestScore: { $max: "$score" }
        }
      }
    ]);

    console.log("✅ User progress data:", progress); // Debugging
    res.json(progress);
  } catch (error) {
    console.error("❌ Error in getUserQuizProgress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
