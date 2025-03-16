// const mongoose = require("mongoose");

// const ChatSchema = new mongoose.Schema({
//   senderEmail: { type: String, required: true },
//   receiverEmail: { type: String, required: true },
//   messages: [
//     {
//       sender: { type: String, required: true },
//       text: { type: String, required: true },
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Chat", ChatSchema);



const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [String], // Stores emails of users in the chat
  messages: [
    {
      senderEmail: String,
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
