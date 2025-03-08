// import React from "react";
// import { Container } from "react-bootstrap";
// import NormalNavbar from "./components/NormalNavbar";
// import TopicSelection from "./components/TopicSelection";



// const PlayQuiz = () => {
//   return (
//     <div>
//        <NormalNavbar title="Play Quiz" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
//        <TopicSelection />
//     </div>
//   );
// };

// export default PlayQuiz;



import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NormalNavbar from "./components/NormalNavbar";
import "./styles/PlayQuiz.css"; // Ensure this file exists

const topics = [
  { id: "general-knowledge", name: "General Knowledge", slogan: "Expand your mind!", gradient: "linear-gradient(135deg, #ff9a9e, #fad0c4)" },
  { id: "science-computers", name: "Computer Science", slogan: "Debug your brain!", gradient: "linear-gradient(135deg, #84fab0, #8fd3f4)" },
  { id: "science-mathematics", name: "Mathematics", slogan: "Numbers never lie!", gradient: "linear-gradient(135deg, #d4fc79, #96e6a1)" },
  { id: "history", name: "History", slogan: "Travel back in time!", gradient: "linear-gradient(135deg, #ff758c, #ff7eb3)" },
  { id: "sports", name: "Sports", slogan: "Are you a true fan?", gradient: "linear-gradient(135deg, #fcb69f, #ffecd2)" },
  { id: "geography", name: "Geography", slogan: "Explore the world!", gradient: "linear-gradient(135deg, #a1c4fd, #c2e9fb)" },
  { id: "entertainment-music", name: "Music", slogan: "Hit the right notes!", gradient: "linear-gradient(135deg, #ff9a8b, #ff6a88)" },
  { id: "entertainment-film", name: "Film", slogan: "Lights, camera, action!", gradient: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
  { id: "art", name: "Art", slogan: "Brush up on your skills!", gradient: "linear-gradient(135deg, #ffafbd, #ffc3a0)" },
  { id: "literature", name: "Literature", slogan: "Dive into classic tales!", gradient: "linear-gradient(135deg, #fbc2eb, #a6c1ee)" },
  { id: "science-nature", name: "Nature", slogan: "Uncover Earth's secrets!", gradient: "linear-gradient(135deg, #cfd9df, #e2ebf0)" },
  { id: "politics", name: "Politics", slogan: "Test your political savvy!", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)" },
  { id: "economics", name: "Economics", slogan: "Understand the markets!", gradient: "linear-gradient(135deg, #56ccf2, #2f80ed)" },
  { id: "philosophy", name: "Philosophy", slogan: "Ponder life's big questions!", gradient: "linear-gradient(135deg, #e0c3fc, #8ec5fc)" },
  { id: "psychology", name: "Psychology", slogan: "Explore the human mind!", gradient: "linear-gradient(135deg, #f093fb, #f5576c)" },
  { id: "technology", name: "Technology", slogan: "Stay ahead of the curve!", gradient: "linear-gradient(135deg, #00c6ff, #0072ff)" },
  { id: "food-and-drink", name: "Food & Drink", slogan: "Savor culinary trivia!", gradient: "linear-gradient(135deg, #fbc2eb, #a6c1ee)" },
  { id: "mythology", name: "Mythology", slogan: "Delve into ancient myths!", gradient: "linear-gradient(135deg, #ff9a9e, #fecfef)" },
  { id: "science-space", name: "Space", slogan: "Reach for the stars!", gradient: "linear-gradient(135deg, #a1c4fd, #c2e9fb)" },
];

const PlayQuiz = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-page">
      {/* Navbar */}
      <NormalNavbar title="Play Quiz" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />

      {/* Main Container */}
      <Container fluid className="quiz-container">
        <Row className="justify-content-center mt-4">
          {/* Sidebar Placeholder */}
          <Col md={2} className="sidebar"></Col>

          {/* Quiz Topics Section */}
          <Col md={8} className="topics-container">
            <h2 className="text-center mb-5">Choose a Quiz Topic</h2>
            <Row className="g-4">
              {topics.map((topic, index) => (
                <Col key={topic.id} md={index % 3 === 0 ? 6: 3} sm={6} xs={12} className="topic-box"
                  onClick={() => navigate(`/quiz/${topic.id}`)}
                  style={{ background: topic.gradient }}
                >
                  <div className="topic-content">
                    <h4 className="topic-title">{topic.name}</h4>
                    <div className="topic-slogan">{topic.slogan}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Sidebar Placeholder */}
          {/* <Col md={2} className="sidebar"></Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default PlayQuiz;
