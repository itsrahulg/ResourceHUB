import React from "react";
import UserDocumentMetrics from "./components/UserDocumentMetrics";
import NormalNavbar from "./components/NormalNavbar";
import LeaderboardComponent from "./components/LeaderboardComponent";
import QuizMetricsComponent from "./components/QuizMetricsComponent";
import PhysicalResourceCountCard from "./components/PhysicalResourceCountCard";


const MetricsPage = () => (
  <div>
     <NormalNavbar title="User Profile" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
    
    <UserDocumentMetrics />
    <PhysicalResourceCountCard />
    <QuizMetricsComponent />
    <LeaderboardComponent />
    


    <br></br>
    <br></br>
    <br></br>
  </div>
);

export default MetricsPage;
