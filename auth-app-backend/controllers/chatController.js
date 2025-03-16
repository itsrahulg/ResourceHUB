const Chat = require("../models/Chat");


exports.sendMessage = async (req, res) => {
  try {
    const { senderEmail, receiverEmail, message } = req.body;

    if (!senderEmail || !receiverEmail || !message) {
      return res.status(400).json({ message: "Sender, receiver, and message text are required" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderEmail, receiverEmail] },
    });

    if (!chat) {
      chat = new Chat({ participants: [senderEmail, receiverEmail], messages: [] });
    }

    // Add the new message
    chat.messages.push({ senderEmail, message });

    await chat.save();
    res.status(201).json({ senderEmail, message, timestamp: new Date() });

  } catch (error) {
    console.error("❌ Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Start or get an existing chat session
// exports.getOrCreateChat = async (req, res) => {
//   try {
//     const { receiverEmail } = req.params;
//     const senderEmail = req.user.email; // Extracted from the token

//     // Check if a chat already exists
//     let chat = await Chat.findOne({ senderEmail, receiverEmail });
//     if (!chat) {
//       chat = await Chat.create({ senderEmail, receiverEmail, messages: [] });
//     }

//     res.status(200).json(chat);
//   } catch (error) {
//     console.error("Error fetching chat:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// ✅ Start or get an existing chat session
exports.getOrCreateChat = async (req, res) => {
  try {
    const { receiverEmail } = req.params;
    const senderEmail = req.user.email; // Extracted from the token

    let chat = await Chat.findOne({
      participants: { $all: [senderEmail, receiverEmail] } // ✅ Find chat where both are participants
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderEmail, receiverEmail],
        messages: []
      });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("❌ Error fetching chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// ✅ Get all chats for the logged-in user
exports.getUserChats = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const chats = await Chat.find({ participants: userEmail });

    // Extract chat participant emails (excluding the logged-in user)
    const chatList = chats.map(chat => {
      return chat.participants.find(email => email !== userEmail);
    });

    res.status(200).json(chatList);
  } catch (error) {
    console.error("❌ Error fetching chat list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
