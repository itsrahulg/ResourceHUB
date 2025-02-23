import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PhysicalResourceCard from "./components/PhysicalResourceCard";
import PhysicalResourcesSidebar from "./components/PhysicalResourcesSidebar";
import { Row, Col, Spinner } from "react-bootstrap";

const PhysicalResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    departments: [],
    semester: [],
    availability: [],
    lendingDays: 1, // Default lending days
    sortBy: "latest",
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/physicalresource/all");
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources
    .filter((resource) => {
      // Search Filter
      if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Department Filter
      if (filters.departments.length > 0 && !filters.departments.includes(resource.department)) {
        return false;
      }

      // Semester Filter
      if (filters.semester.length > 0 && !filters.semester.includes(resource.semester)) {
        return false;
      }

      // Availability Filter
      if (filters.availability.length > 0) {
        if (
          filters.availability.includes("Up for Donation") &&
          resource.availability !== "Up for Donation"
        ) {
          return false;
        }
        if (
          filters.availability.includes("For Lending") &&
          (resource.availability !== "For Lending" || resource.lendingDays < filters.lendingDays)
        ) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        case "latest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar title="Physical Resources" buttons={[{ label: "Dashboard", path: "/dashboard" }]} onSearchChange={setSearchTerm} />

      <div style={pageContainerStyles}>
        {/* Sidebar */}
        <div style={sidebarContainerStyles}>
          <PhysicalResourcesSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Cards Container */}
        <div style={cardsContainerStyles}>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <p className="text-center">No resources available.</p>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {filteredResources.map((resource) => (
                <Col key={resource._id}>
                  <PhysicalResourceCard resource={resource} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const pageContainerStyles = {
  display: "flex",
  margin: "20px",
  marginTop: "100px", // Push below navbar
};

const sidebarContainerStyles = {
  flex: "0 0 330px",
  marginRight: "20px",
};

const cardsContainerStyles = {
  flex: "1",
  overflowY: "auto",
  maxHeight: "calc(100vh - 100px)",
  paddingRight: "10px",
  scrollbarWidth: "none", // Hide scrollbar for Firefox
  msOverflowStyle: "none", // Hide scrollbar for IE/Edge
};

// Hide scrollbar for Chrome, Safari, and Opera
cardsContainerStyles["&::-webkit-scrollbar"] = {
  display: "none",
};

export default PhysicalResourceList;
