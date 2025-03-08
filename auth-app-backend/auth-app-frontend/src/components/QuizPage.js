import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Modal } from "react-bootstrap";

const QuizPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStartModal, setShowStartModal] = useState(true);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/quiz?topic=${topic}`);
      console.log("📜 Received Questions:", response.data);

      if (Array.isArray(response.data)) {
        setQuestions(response.data);
      } else {
        console.error("❌ Error: Expected an array but got", response.data);
        setQuestions([]);
      }
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
      setQuestions([]);
    }
  };

  const handleSelectAnswer = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    console.log("🔍 Selected Answers:", selectedAnswers);
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(
      (q, index) => selectedAnswers[index] === q.answer
    ).length;
    setUserScore(correctAnswers);

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("❌ Error: userId is missing from localStorage!");
      alert("Error: You must be logged in to submit the quiz.");
      return;
    }

    const quizResult = {
      userId,
      topic,
      score: correctAnswers,
      totalQuestions,
    };

    console.log("📝 Submitting Quiz Data:", quizResult);

    try {
      const response = await axios.post("http://localhost:5000/api/quiz/submit", quizResult);
      console.log("✅ Quiz submitted successfully:", response.data);
      setShowScoreModal(true);
    } catch (error) {
      console.error("❌ Error submitting quiz result:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      {/* Start Quiz Modal */}
      <Modal show={showStartModal} onHide={() => navigate("/dashboard")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>📌 Instructions:</p>
          <ul>
            <li>You can attempt only one question at a time.</li>
            <li>You must answer before moving to the next question.</li>
            <li>The quiz consists of 10 questions.</li>
            <li>Click Submit at the end to save your progress.</li>
            <li>Click Quit to exit the quiz.</li>
          </ul>
          <Button variant="primary" onClick={() => setShowStartModal(false)}>Start Quiz</Button>
        </Modal.Body>
      </Modal>

      {/* Quiz Question Card */}
      {questions.length > 0 && (
        <Card
          className="shadow-lg p-4 mx-auto text-center"
          style={{
            width: "90%",
            maxWidth: "1200px",
            borderRadius: "15px",
            margin: "20px auto",
          }}
        >
          <Card.Body>
            <Card.Title className="fw-bold">
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex]?.question}
            </Card.Title>
            <div className="options">
              {questions[currentQuestionIndex]?.options.map((option, i) => (
                <Button
                  key={i}
                  variant={selectedAnswers[currentQuestionIndex] === option ? "success" : "outline-primary"}
                  className="m-2 w-100 text-start"
                  onClick={() => handleSelectAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-4 d-flex justify-content-between">
              <Button
                variant="success"
                onClick={handleNextQuestion}
                disabled={!selectedAnswers[currentQuestionIndex]}
              >
                {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
              </Button>
              <Button variant="danger" onClick={() => setShowQuitModal(true)}>
                Quit
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Quit Confirmation Modal */}
      <Modal show={showQuitModal} onHide={() => setShowQuitModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>⚠️ Are you sure you want to quit?</p>
          <p>You will lose all progress if you exit now.</p>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setShowQuitModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => navigate("/quiz")}>Yes, Quit</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Score Modal */}
      <Modal show={showScoreModal} onHide={() => navigate("/dashboard")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>🎉 **Your Score:** {userScore} / {questions.length}</p>
          <p>📊 Your progress has been recorded.</p>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>OK</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default QuizPage;
