import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Sidebar = ({ filters, setFilters }) => {
  const [openSections, setOpenSections] = useState({
    departments: false,
    semester: false,
    availability: false,
  });

  const departments = [
    "Automobile Engineering",
    "Biomedical Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    "Electrical and Electronics Engineering",
    "Biotechnology",
    "Fashion Technology",
    "Information Technology",
    "Textile Technology",
    "Electronics and Communication Engineering",
    "Instrumentation and Control Engineering",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Production Engineering",
    "Robotics and Automation Engineering",
    "MCA",
  ];

  const semesters = Array.from({ length: 10 }, (_, i) => `Semester ${i + 1}`);

  const availabilityOptions = ["Up for Donation", "Lending"];

  const sortingOptions = [
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
    { label: "Largest First", value: "largest" },
    { label: "Smallest First", value: "smallest" },
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
  ];

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (category, event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: checked
        ? [...prevFilters[category], name]
        : prevFilters[category].filter((item) => item !== name),
    }));
  };

  const handleSliderChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      lendingDays: value,
    }));
  };

  return (
    <div style={sidebarStyles}>
      <h5 className="text-center">Filters</h5>

      {/* Departments Section */}
      <div className="mb-3">
        <h6 onClick={() => toggleSection("departments")} style={collapsibleHeader}>
          Departments {openSections.departments ? "▲" : "▼"}
        </h6>
        {openSections.departments && (
          <div style={checkboxContainer}>
            {departments.map((dept) => (
              <div key={dept} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={dept}
                  checked={filters.departments.includes(dept)}
                  onChange={(e) => handleCheckboxChange("departments", e)}
                />
                <label className="form-check-label">{dept}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Semesters Section */}
      <div className="mb-3">
        <h6 onClick={() => toggleSection("semester")} style={collapsibleHeader}>
          Semester {openSections.semester ? "▲" : "▼"}
        </h6>
        {openSections.semester && (
          <div style={checkboxContainer}>
            {semesters.map((sem) => (
              <div key={sem} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={sem}
                  checked={filters.semester.includes(sem)}
                  onChange={(e) => handleCheckboxChange("semester", e)}
                />
                <label className="form-check-label">{sem}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Section */}
      <div className="mb-3">
        <h6 onClick={() => toggleSection("availability")} style={collapsibleHeader}>
          Availability {openSections.availability ? "▲" : "▼"}
        </h6>
        {openSections.availability && (
          <div style={checkboxContainer}>
            {availabilityOptions.map((option) => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={option}
                  checked={filters.availability.includes(option)}
                  onChange={(e) => handleCheckboxChange("availability", e)}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
            {filters.availability.includes("Lending") && (
              <div className="mt-3">
                <label>Lending Duration (Days):</label>
                <Slider
                  min={1}
                  max={365}
                  value={filters.lendingDays || 1}
                  onChange={handleSliderChange}
                />
                <div className="text-center">{filters.lendingDays || 1} days</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sorting Options */}
      <div className="mt-4">
        <h6>Sort By</h6>
        <select
          className="form-select"
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
        >
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Styles
const sidebarStyles = {
  width: "330px",
  backgroundColor: "#f8f9fa",
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  margin: "20px",
  overflowY: "auto",
  maxHeight: "80vh",
};

const collapsibleHeader = {
  cursor: "pointer",
  fontWeight: "bold",
  userSelect: "none",
};

const checkboxContainer = {
  maxHeight: "200px",
  overflowY: "auto",
  paddingRight: "5px",
};

export default Sidebar;