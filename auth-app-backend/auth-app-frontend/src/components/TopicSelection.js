// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/TopicSelection.css"; // Optional: For styling

// const topics = [
//   "Mathematics",
//   "Physics",
//   "Chemistry",
//   "Biology",
//   "Computer Science",
//   "History",
//   "Geography",
//   "English",
//   "General Knowledge",
//   "Current Affairs",
//   "Artificial Intelligence",
//   "Cyber Security",
//   "Data Science",
//   "Software Engineering",
//   "Machine Learning",
// ];

// const TopicSelection = () => {
//   const navigate = useNavigate();

//   const handleTopicClick = (topic) => {
//     navigate(`/quiz/${topic}`);
//   };

//   return (
//     <div className="topic-selection-container">
//       <h2>Select a Quiz Topic</h2>
//       <div className="topic-grid">
//         {topics.map((topic, index) => (
//           <div key={index} className="topic-card" onClick={() => handleTopicClick(topic)}>
//             {topic}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopicSelection;










// import React from "react";
// import { useNavigate } from "react-router-dom";

// const topics = [
//   "Computer Science",
//   "Mathematics",
//   "Physics",
//   "General Knowledge",
//   "History",
//   "Geography",
//   "Biology",
//   "Chemistry",
//   "Sports",
//   "Entertainment",
//   "Coding",
//   "AI & Machine Learning",
//   "Cyber Security",
//   "Software Engineering",
//   "Data Science",
// ];

// const TopicSelection = () => {
//   const navigate = useNavigate();

//   const handleTopicClick = (topic) => {
//     // Convert topic to URL-friendly format (e.g., "Computer Science" → "computer-science")
//     const formattedTopic = topic.toLowerCase().replace(/\s+/g, "-");
//     navigate(`/quiz/${formattedTopic}`);
//   };

//   return (
//     <div className="topic-container">
//       <h2>Select a Quiz Topic</h2>
//       <div className="topic-grid">
//         {topics.map((topic, index) => (
//           <button key={index} className="topic-card" onClick={() => handleTopicClick(topic)}>
//             {topic}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopicSelection;







import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TopicSelection.css"; // Optional: For styling

const topics = [
  { id: "general-knowledge", name: "General Knowledge" },
  { id: "science-computers", name: "Computer Science" },
  { id: "science-mathematics", name: "Mathematics" },
  { id: "history", name: "History" },
  { id: "sports", name: "Sports" },
  { id: "geography", name: "Geography" },
  { id: "entertainment-music", name: "Music" },
  { id: "entertainment-film", name: "Film" },
  { id: "art", name: "Art" },
];

const TopicSelection = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Select a Quiz Topic</h2>
      <Row className="g-4">
        {topics.map((topic) => (
          <Col key={topic.id} md={4} sm={6} xs={12}>
            <Card className="topic-card shadow-sm text-center">
              {/* Replace src with your images later */}
              {/* <Card.Img
                variant="top"
                src="/images/placeholder.jpg"
                alt={topic.name}
                className="topic-img"
              /> */}
              <Card.Body>
                <Card.Title>{topic.name}</Card.Title>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => navigate(`/quiz/${topic.id}`)}
                >
                  Start Quiz
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopicSelection;

