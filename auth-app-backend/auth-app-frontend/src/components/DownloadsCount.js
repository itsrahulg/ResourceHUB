import React from "react";
import StatsCard from "./StatsCard";

const DownloadsCount = () => {
  return <StatsCard title="Downloads Made" apiEndpoint="http://localhost:5000/api/downloads/count" />;
};

export default DownloadsCount;
