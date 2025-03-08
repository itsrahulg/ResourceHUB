const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// Route to fetch questions based on the selected topic
router.get("/", quizController.getQuestionsByTopic);

// ✅ Save quiz result
router.post("/submit", quizController.saveQuizResult);

// ✅ Get leaderboard
router.get("/leaderboard", quizController.getLeaderboard);

// ✅ Get user quiz progress
router.get("/progress/:userId", quizController.getUserQuizProgress);




module.exports = router;
