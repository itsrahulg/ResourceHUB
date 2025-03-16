import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PlatformCount = () => {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    fetchPlatformCounts();
  }, []);

  const fetchPlatformCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/platform-count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounts(response.data);
    } catch (error) {
      console.error("Error fetching platform counts:", error);
    }
  };

  if (!counts) {
    return <div className="text-center mt-4">Loading counts...</div>;
  }

  return (
    <Container  className="mt-4">
      <Row className="justify-content-center">
        {/* Total Users Ever Registered */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Total Users Ever Registered</h5>
              <h1 className="count-value">{counts.totalUsersEver}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Current Registered Users */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Current Registered Users</h5>
              <h1 className="count-value">{counts.currentUsers}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Documents Ever Uploaded */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Total Documents Ever Uploaded</h5>
              <h1 className="count-value">{counts.totalDocumentsEver}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        {/* Current Documents in System */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Current Documents in System</h5>
              <h1 className="count-value">{counts.currentDocuments}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Total Physical Resource Posts Ever */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Total Physical Resource Posts Ever</h5>
              <h1 className="count-value">{counts.totalPostsEver}</h1>
            </Card.Body>
          </Card>
        </Col>

        {/* Current Physical Resource Posts */}
        <Col md={4}>
          <Card className="shadow-lg p-4" style={cardStyle}>
            <Card.Body className="text-center">
              <h5>Current Physical Resource Posts</h5>
              <h1 className="count-value">{counts.currentPosts}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Styling for the cards
const cardStyle = {
  borderRadius: "12px",
  background: "linear-gradient(135deg, #fdfbfb, #ebedee)", // Cream gradient
  textAlign: "center",
};

export default PlatformCount;
