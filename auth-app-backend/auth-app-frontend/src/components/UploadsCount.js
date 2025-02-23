import React from "react";
import StatsCard from "./StatsCard";

const UploadsCount = () => {
  return <StatsCard title="Documents Uploaded" apiEndpoint="http://localhost:5000/api/uploads/count" />;
};

export default UploadsCount;
