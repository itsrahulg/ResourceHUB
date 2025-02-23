
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ filters, setFilters }) => {
  const [openSections, setOpenSections] = useState({
    departments: false,
    semester: false,
    documentType: false,
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
  ];

  const semesters = Array.from({ length: 10 }, (_, i) => `Semester ${i + 1}`);

  const documentTypes = ["PDF", "DOCX", "JPG", "PNG", "PPTX"];

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

      {/* Document Type Section */}
      <div className="mb-3">
        <h6 onClick={() => toggleSection("documentType")} style={collapsibleHeader}>
          Document Type {openSections.documentType ? "▲" : "▼"}
        </h6>
        {openSections.documentType && (
          <div style={checkboxContainer}>
            {documentTypes.map((type) => (
              <div key={type} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={type}
                  checked={filters.documentType.includes(type)}
                  onChange={(e) => handleCheckboxChange("documentType", e)}
                />
                <label className="form-check-label">{type}</label>
              </div>
            ))}
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
