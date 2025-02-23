import React from "react";
import StatsCard from "./StatsCard";

const QuizPoints = () => {
  return <StatsCard title="Quiz Points" apiEndpoint="http://localhost:5000/api/quiz/points" unit="pts" />;
};

export default QuizPoints;
