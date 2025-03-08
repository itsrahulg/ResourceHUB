// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Container } from "react-bootstrap";

// const LeaderboardComponent = () => {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/quiz/leaderboard")
//       .then((res) => setLeaderboard(res.data))
//       .catch((err) => console.error("❌ Error fetching leaderboard:", err));
//   }, []);

//   return (
//     <Container className="mt-4">
//       <h3 className="text-center mb-4">🏆 Quiz Leaderboard</h3>
//       <Table
//         striped
//         bordered
//         hover
//         className="shadow-lg"
//         style={{ borderRadius: "12px", overflow: "hidden", margin: "auto", maxWidth: "800px" }}
//       >
//         <thead className="table-dark">
//           <tr>
//             <th>🏅 Rank</th>
//             <th>👤 Name</th>
//             <th>📊 Total Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.length > 0 ? (
//             leaderboard.map((user, index) => (
//               <tr key={index}>
//                 <td className="fw-bold">{index + 1}</td>
//                 <td>{user.name}</td>
//                 <td>{user.totalScore}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center">No leaderboard data available</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default LeaderboardComponent;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const LeaderboardComponent = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/leaderboard")
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("❌ Error fetching leaderboard:", err));
  }, []);

  return (
    <Container fluid className="mt-4 d-flex justify-content-center">
      <div
        className="shadow-lg p-4"
        style={{
          width: "90%",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <h3 className="text-center mb-4">🏆 Quiz Leaderboard</h3>
        <Table
          striped
          bordered
          hover
          className="mb-0"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <thead className="table-dark">
            <tr>
              <th>🏅 Rank</th>
              <th>👤 Name</th>
              <th>📊 Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr key={index}>
                  <td className="fw-bold">{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.totalScore}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No leaderboard data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LeaderboardComponent;
