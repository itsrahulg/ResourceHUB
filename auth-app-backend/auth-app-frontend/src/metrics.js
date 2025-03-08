// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Metrics = () => {
//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>User Metrics</h2>
//         <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
//       </div>

    

      
//     </div>
//   );
// };

// export default Metrics;


// For example, in a page component:
import React from "react";
import UserDocumentMetrics from "./components/UserDocumentMetrics";
import NormalNavbar from "./components/NormalNavbar";
import LeaderboardComponent from "./components/LeaderboardComponent";
import QuizMetricsComponent from "./components/QuizMetricsComponent";

const MetricsPage = () => (
  <div>
     <NormalNavbar title="User Profile" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
    
    <UserDocumentMetrics />
    <QuizMetricsComponent />
    <LeaderboardComponent />
    


    <br></br>
    <br></br>
    <br></br>
  </div>
);

export default MetricsPage;
