// // import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { Bar } from "react-chartjs-2";
// import React, { useState, useEffect } from "react";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const UserPhysicalResourceMetrics = () => {
//   const [metrics, setMetrics] = useState(null);
//   const [animatedCount, setAnimatedCount] = useState(0);

//   useEffect(() => {
//     fetchMetrics();
//   }, []);

//   useEffect(() => {
//     if (metrics?.totalResources) {
//       let count = 0;
//       const interval = setInterval(() => {
//         count += 1;
//         if (count > metrics.totalResources) {
//           clearInterval(interval);
//         } else {
//           setAnimatedCount(count);
//         }
//       }, 50);
//       return () => clearInterval(interval);
//     }
//   }, [metrics]);

//   const fetchMetrics = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/physicalresources/metrics", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMetrics(response.data);
//     } catch (error) {
//       console.error("Error fetching metrics:", error.response?.data || error.message);
//     }
//   };

//   if (!metrics) {
//     return <div>Loading metrics...</div>;
//   }

//   const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const monthlyData = new Array(12).fill(0);
//   metrics.monthlyUploads.forEach(({ _id, count }) => {
//     const monthIndex = parseInt(_id.split("-")[1], 10) - 1;
//     monthlyData[monthIndex] = count;
//   });

//   const monthlyChartData = {
//     labels: monthLabels,
//     datasets: [
//       {
//         label: "Resources Uploaded per Month",
//         data: monthlyData,
//         backgroundColor: "white",
//         borderColor: "rgba(255, 255, 255, 0.8)",
//         borderWidth: 2,
//         fill: true,
//       },
//     ],
//   };

//   const monthlyChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: { grid: { display: false } },
//       y: { beginAtZero: true, max: 15, ticks: { stepSize: 5 } },
//     },
//     plugins: { legend: { display: false } },
//   };

//   return (
//     <Container fluid className="mt-4 d-flex flex-column align-items-center">
//       <Row className="justify-content-center w-100">
//         <Col md={11}>
//           <Card className="shadow-lg p-4" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #007bff, #00c6ff)", color: "white" }}>
//             <Card.Body style={{ height: "350px", padding: "1rem" }}>
//               <h5 className="text-center">📊 Monthly Physical Resource Uploads</h5>
//               <Bar data={monthlyChartData} options={monthlyChartOptions} />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="mt-4 justify-content-center w-100">
//         <Col md={5}>
//           <Card className="shadow-lg p-4" style={{ borderRadius: "12px", backgroundColor: "#fff", height: "300px" }}>
//             <Card.Body className="text-center d-flex flex-column justify-content-center">
//               <h4>Total Physical Resources 📂</h4>
//               <p style={{ fontSize: "4rem", fontWeight: "bold", margin: 0, transition: "all 0.5s ease-out" }}>{animatedCount}</p>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={5}>
//           <Card className="shadow-lg p-4" style={{ borderRadius: "12px", backgroundColor: "#fff", height: "300px" }}>
//             <Card.Body className="text-center d-flex flex-column justify-content-center">
//               <h4>🚨 Flagged Posts</h4>
//               <p style={{ fontSize: "4rem", fontWeight: "bold", margin: 0 }}>{metrics.flaggedPosts || 0}</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default UserPhysicalResourceMetrics;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PhysicalResourceMetrics = () => {
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
      const response = await axios.get("http://localhost:5000/api/physical-resources/metrics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data); // Debugging
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics:", error.response?.data || error.message);
    }
  };

  if (!metrics) {
    return <div>Loading metrics...</div>;
  }

  // Labels for months
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Ensure missing months display zero
  const monthlyData = metrics.monthlyUploads.length ? metrics.monthlyUploads : new Array(12).fill(0);

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
              <h5 className="text-center">📊 Monthly Physical Resource Uploads</h5>
              <Bar data={monthlyChartData} options={monthlyChartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Total Uploads Count & Flagged Posts */}
      <Row className="mt-4 justify-content-center w-100">
        
        {/* Total Uploads */}
        <Col md={6}>
          <Card className="shadow-lg p-4"
            style={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              height: "300px",
            }}>
            <Card.Body className="text-center d-flex flex-column justify-content-center">
              <h4>Total Physical Resources 📂</h4>
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

        {/* Flagged Posts */}
        <Col md={5}>
          <Card className="shadow-lg p-4"
            style={{
              borderRadius: "12px",
              backgroundColor: "#fff",
              height: "300px",
            }}>
            <Card.Body className="text-center d-flex flex-column justify-content-center">
              <h4>🚩 Flagged Resources</h4>
              <p style={{
                fontSize: "3rem",
                fontWeight: "bold",
                margin: 0,
                color: "red",
              }}>
                {metrics.flaggedResources || 0}
              </p>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default PhysicalResourceMetrics;
