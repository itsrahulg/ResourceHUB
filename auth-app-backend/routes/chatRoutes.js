const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Get or create a chat session
router.get("/:receiverEmail", authMiddleware, chatController.getOrCreateChat);

// ✅ Send a message
router.post("/:receiverEmail", authMiddleware, chatController.sendMessage);

// // ✅ Get all messages in a chat
// router.get("/:receiverEmail/messages", authMiddleware, chatController.getMessages);

// router.get("/messages/:receiverEmail", chatController.getMessages);


// ✅ Get all chats for the logged-in user
router.get("/", authMiddleware, chatController.getUserChats);

module.exports = router;
