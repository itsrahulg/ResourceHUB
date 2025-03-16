import React from "react";
import NormalNavbar from "./components/NormalNavbar";
import DepartmentUserChart from "./components/DepartmentWiseUsers";
import PlatformCount
 from "./components/PlatformCount";
const PlatformMetrics = () => {
  return (
    <div>
      <NormalNavbar 
        title="Platform Metrics" 
        buttons={[{ label: "Dashboard", path: "/admin/dashboard" }]} 
      />
      <div className="container mt-4 p-4 bg-white shadow-lg rounded">
        <h4 className="text-center">📊 Platform Metrics Overview</h4>
        
      </div>

      <div className="container mt-4">
        <DepartmentUserChart />
      </div>

      <div>
        <PlatformCount/>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default PlatformMetrics;
