import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

const UserDocumentMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    if (metrics?.totalUploads) {
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        if (count > metrics.totalUploads) {
          clearInterval(interval);
        } else {
          setAnimatedCount(count);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [metrics]);

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

  // Generate all 12 months for the x-axis
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Map API data to ensure missing months show 0
  const monthlyData = new Array(12).fill(0);
  metrics.monthlyUploads.forEach(({ _id, count }) => {
    const monthIndex = parseInt(_id.split("-")[1], 10) - 1; // Convert "YYYY-MM" to month index
    monthlyData[monthIndex] = count;
  });

  // Bar chart data
  const monthlyChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Uploads per Month",
        data: monthlyData,
        backgroundColor: "white",
        borderColor: "rgba(255, 255, 255, 0.8)",
        borderWidth: 2,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Bar chart options
  const monthlyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, max: 15, ticks: { stepSize: 5 } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  // Pie chart data
  const typeLabels = metrics.documentTypes.map(item => item._id.toUpperCase());
  const typeData = metrics.documentTypes.map(item => item.count);
  const typeChartData = {
    labels: typeLabels.length ? typeLabels : ["No Data"],
    datasets: [
      {
        label: "Document Types",
        data: typeData.length ? typeData : [1],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return (
    <Container fluid className="mt-4 d-flex flex-column align-items-center">
      
      {/* Monthly Uploads Bar Chart */}
      <Row className="justify-content-center w-100">
        <Col md={11}>
          <Card className="shadow-lg p-4"
            style={{
              borderRadius: "12px",
              background: "linear-gradient(135deg, #007bff, #00c6ff)", // Blue gradient
              color: "white",
            }}>
            <Card.Body style={{ height: "350px", padding: "1rem" }}>
              <h5 className="text-center">📊 Monthly Uploads</h5>
              <Bar data={monthlyChartData} options={monthlyChartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Total Uploads Count & Pie Chart */}
      <Row className="mt-4 justify-content-center w-100">
        
        {/* Total Uploads */}
        <Col md={5}>
          <Card className="shadow-lg p-4"
            style={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              height: "300px",
            }}>
            <Card.Body className="text-center d-flex flex-column justify-content-center">
              <h4>Total Documents Uploaded 📂</h4>
              <p style={{
                fontSize: "4rem", // Larger Number
                fontWeight: "bold",
                margin: 0,
                transition: "all 0.5s ease-out",
              }}>
                {animatedCount}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Pie Chart (Document Types) */}
        <Col md={6}>
          <Card className="shadow-lg p-4"
            style={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              height: "300px",
            }}>
            <Card.Body className="d-flex align-items-center">
              <Col md={6}>
                <Pie data={typeChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Col>
              <Col md={6} className="text-center">
                <h5>📄 Document Types</h5>
                <ul className="list-unstyled">
                  {metrics.documentTypes.length > 0 ? (
                    metrics.documentTypes.map((item, index) => (
                      <li key={index} style={{ fontWeight: "bold" }}>
                        {item._id}: {item.count}
                      </li>
                    ))
                  ) : (
                    <li style={{ fontWeight: "bold" }}>No Data</li>
                  )}
                </ul>
              </Col>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default UserDocumentMetrics;
