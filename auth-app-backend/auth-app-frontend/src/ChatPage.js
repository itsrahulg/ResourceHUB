import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import NormalNavbar from "./components/NormalNavbar";

const ChatPage = () => {
  const [chatList, setChatList] = useState([]); // Stores chat participants
  const [selectedChat, setSelectedChat] = useState(null); // Selected user email
  const [messages, setMessages] = useState([]); // Stores messages
  const [newMessage, setNewMessage] = useState(""); // New message input

  const currentUserEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");

  // ✅ Fetch chat list on load
  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chat", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatList(response.data);
    } catch (error) {
      console.error("❌ Error fetching chat list:", error);
    }
  };

  // ✅ Fetch messages when a chat is selected
  const fetchMessages = async (email) => {
    try {
      setSelectedChat(email);
      const response = await axios.get(`http://localhost:5000/api/chat/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    }
  };

  // ✅ Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/chat/${selectedChat}`,
        { senderEmail: currentUserEmail, receiverEmail: selectedChat, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages([...messages, response.data]); // Add new message
      setNewMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  return (
    <div>
      <div>
      <NormalNavbar title="My Chats" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
      </div>
        <Container fluid className="p-4">
      <Row>
        {/* ✅ Chat List Sidebar */}
        <Col md={3}>
          <Card className="shadow-sm" style={{ borderRadius: "12px" }}>
            <Card.Body>
              <h5 className="text-center mb-3">Chats</h5>
              <ListGroup variant="flush" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {chatList.length === 0 ? (
                  <p className="text-center text-muted">No chats available</p>
                ) : (
                  chatList.map((email, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      onClick={() => fetchMessages(email)}
                      style={{
                        cursor: "pointer",
                        borderRadius: "8px",
                        marginBottom: "5px",
                        backgroundColor: selectedChat === email ? "#dfeffc" : "white",
                      }}
                    >
                      {email}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* ✅ Chat Window */}
        <Col md={9}>
          <Card className="shadow-sm" style={{ borderRadius: "12px", height: "80vh", display: "flex", flexDirection: "column" }}>
            <Card.Body className="d-flex flex-column" style={{ flex: 1, overflowY: "auto" }}>
              <h5 className="text-center">{selectedChat || "Select a chat"}</h5>
              {messages.length === 0 ? (
                <p className="text-center text-muted">No messages yet</p>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded my-1 ${msg.senderEmail === currentUserEmail ? "bg-primary text-white align-self-end" : "bg-light align-self-start"}`}
                  >
                    <strong>{msg.senderEmail === currentUserEmail ? "You" : selectedChat}:</strong> {msg.message}
                  </div>
                ))
              )}
            </Card.Body>

            {/* ✅ Message Input */}
            {selectedChat && (
              <Card.Footer className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button variant="primary" onClick={sendMessage} className="ms-2">Send</Button>
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default ChatPage;

