import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const QuizMetricsComponent = () => {
  const [progress, setProgress] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("❌ No userId found in localStorage!");
      return;
    }

    axios
      .get(`http://localhost:5000/api/quiz/progress/${userId}`)
      .then((res) => {
        console.log("📊 Quiz Progress Data:", res.data);
        setProgress(res.data);
      })
      .catch((err) => console.error("❌ Error fetching progress:", err));
  }, [userId]);

  return (
    <Container fluid className="d-flex justify-content-center mt-4">
      <div
        className="shadow-lg p-4"
        style={{
          width: "90%",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <h3 className="text-center mb-3">📈 My Quiz Stats</h3>
        <Table striped bordered hover className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>📚 Topic</th>
              <th>📝 Quizzes Taken</th>
              <th>📊 Average Score</th>
              <th>🏆 Highest Score</th>
            </tr>
          </thead>
          <tbody>
            {progress.length > 0 ? (
              progress.map((p, index) => (
                <tr key={index}>
                  <td>{p._id || "Unknown"}</td> {/* ✅ Ensure topic is displayed */}
                  <td>{p.quizzesTaken || 1}</td> {/* Default to 1 if missing */}
                  <td>{p.averageScore ? p.averageScore.toFixed(2) : "0.00"}</td>
                  <td>{p.highestScore || p.score || 0}</td> {/* Use highestScore, fallback to latest score */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No quiz data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default QuizMetricsComponent;
