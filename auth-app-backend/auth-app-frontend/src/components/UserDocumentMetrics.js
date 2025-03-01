import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const UserDocumentMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/documents/metrics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error.response?.data || error.message);
    }
  };

  if (!metrics) {
    return <div>Loading metrics...</div>;
  }

  // Prepare data for the monthly uploads bar chart
  const monthlyLabels = metrics.monthlyUploads.map(item => item._id); // e.g., "2025-02"
  const monthlyData = metrics.monthlyUploads.map(item => item.count);
  const monthlyChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Uploads per Month",
        data: monthlyData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for the document types pie chart
  const typeLabels = metrics.documentTypes.map(item => item._id.toUpperCase());
  const typeData = metrics.documentTypes.map(item => item.count);
  const typeChartData = {
    labels: typeLabels,
    datasets: [
      {
        label: "Document Types",
        data: typeData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <Container className="mt-4">
      
      <Row>
        {/* Monthly Uploads Bar Chart */}
        <Col>
          <Card className="shadow-sm mb-4 p-5">
            <Card.Body style={{ height: "350px", padding: "1rem" }}>
              <h5 className="text-center">Monthly Uploads</h5>
              <Bar
                data={monthlyChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        {/* Left: Total Uploads (squarish) */}
        <Col md={4}>
          <Card className="shadow-sm p-4">
            <Card.Body 
              className="text-center d-flex flex-column justify-content-center" 
              style={{ height: "250px" }}
            >
              <h2>Total Uploads 📤</h2>
              <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>
                {metrics.totalUploads}
              </p>
            </Card.Body>
          </Card>
        </Col>
        {/* Right: Document Types (Pie Chart) */}
        <Col md={4}>
          <Card className="shadow-sm p-4">
            <Card.Body style={{ height: "250px", padding: "1rem" }}>
              <h5 className="text-center">Document Types</h5>
              <Pie
                data={typeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  layout: { padding: 10 },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDocumentMetrics;
