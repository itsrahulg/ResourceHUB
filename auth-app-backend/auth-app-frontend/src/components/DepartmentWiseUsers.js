// // Frontend: DepartmentUserBarChart.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
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

// const DepartmentUserBarChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/admin/department-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = response.data;
//       const departmentNames = Object.keys(data);
//       const departmentCounts = Object.values(data);

//       setChartData({
//         labels: departmentNames,
//         datasets: [
//           {
//             label: "Number of Users",
//             data: departmentCounts,
//             backgroundColor: "#f5e6ca", // Cream gradient effect
//             borderColor: "#d4af37", // Gold border
//             borderWidth: 2,
//             hoverBackgroundColor: "#e0c097", // Darker cream on hover
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching department user data:", error);
//     }
//   };

//   return (
//     <div className="container mt-4 p-4 shadow-lg rounded-lg bg-white text-center" style={{ width: "1000px" }}>
//       <h4 className="mb-3">Users by Department</h4>
//       {chartData ? (
//         <div style={{ width: "1000px", height: "600px" }}>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               plugins: { legend: { display: false } },
//               scales: {
//                 x: { ticks: { autoSkip: false, maxRotation: 45, minRotation: 45 } },
//                 y: { beginAtZero: true, ticks: { stepSize: 10 } },
//               },
//             }}
//           />
//         </div>
//       ) : (
//         <p>Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default DepartmentUserBarChart;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "react-bootstrap";
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

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DepartmentUserBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchDepartmentStats();
  }, []);

  const fetchDepartmentStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admin/department-user-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;

      // Extracting department names and user counts
      const departmentNames = data.map((item) => item._id);
      const userCounts = data.map((item) => item.count);

      setChartData({
        labels: departmentNames,
        datasets: [
          {
            label: "Number of Users",
            data: userCounts,
            backgroundColor: "rgba(255, 228, 181, 0.9)", // Cream color
            borderColor: "rgba(240, 200, 150, 1)", // Slightly darker cream
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching department user stats:", error);
    }
  };

  return (
    <Row className="justify-content-center w-100">
      <Col md={12}>
        <Card className="shadow-lg p-4"
          style={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #FFDAB9, #FFE4B5)", // Cream gradient
            color: "black",
          }}>
          <Card.Body style={{ height: "350px", padding: "1rem" }}>
            <h5 className="text-center">📊 Department-wise User Count</h5>
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { stepSize: 10 } },
                  },
                }}
              />
            ) : (
              <p className="text-center">Loading chart...</p>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DepartmentUserBarChart;
