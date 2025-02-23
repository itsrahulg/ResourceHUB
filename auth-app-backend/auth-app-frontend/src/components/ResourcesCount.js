import React from "react";
import StatsCard from "./StatsCard";

const ResourcesCount = () => {
  return <StatsCard title="Physical Resources" apiEndpoint="http://localhost:5000/api/resources/count" />;
};

export default ResourcesCount;
