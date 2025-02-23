import React, { useEffect, useState } from "react";
import DocumentList from "./components/DocumentList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const DigitalRepository = () => {
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    departments: [],
    semester: [],
    documentType: [],
    sortBy: "latest", // Default sorting by latest
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/document/all")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDocuments(data);
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch((error) => console.error("Error fetching documents:", error));
  }, []);


    const filteredDocuments = documents.filter((doc) => {
      const docDepartment = doc.department?.split(" - ")[1]; // Extract department name safely
      const docSemester = doc.semester ? `Semester ${doc.semester}` : "";
      
      // Extract file extension from fileUrl
      const docFileType = doc.fileUrl ? doc.fileUrl.split(".").pop().toUpperCase() : "";
    
      return (
        (filters.departments.length === 0 || filters.departments.includes(docDepartment)) &&
        (filters.semester.length === 0 || filters.semester.includes(docSemester)) &&
        (filters.documentType.length === 0 || filters.documentType.includes(docFileType))
      );
    });
    
    

  // Apply sorting
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (filters.sortBy) {
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "largest":
        return b.size - a.size; // Assuming `size` is in KB or MB
      case "smallest":
        return a.size - b.size;
      case "latest":
        return new Date(b.uploadedAt) - new Date(a.uploadedAt);
      case "oldest":
        return new Date(a.uploadedAt) - new Date(b.uploadedAt);
      default:
        return 0;
    }
  });

  // Styles
  const styles = {
    digitalRepository: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "row", // Sidebar on left, documents on right
      alignItems: "flex-start",
      marginTop: "56px",
      padding: "20px",
    },
    sidebarContainer: {
      width: "340px",
      flexShrink: 0,
      marginRight: "20px",
    },
    documentContainer: {
      flexGrow: 1,
      minWidth: "300px",
      height: "80vh", // Ensure full height for scrolling
      overflowY: "auto",
      scrollbarWidth: "none", // Hide scrollbar for Firefox
      msOverflowStyle: "none", // Hide scrollbar for IE/Edge
    },
    documentContainerHiddenScrollbar: {
      "&::-webkit-scrollbar": {
        display: "none", // Hide scrollbar for Webkit browsers (Chrome, Safari)
      },
    },
  };

  return (
    <div style={styles.digitalRepository}>
      {/* Navbar (Fixed at the top) */}
      <Navbar title="Digital Repository" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />

      {/* Main Content */}
      <div style={styles.contentWrapper}>
        {/* Sidebar on the Left */}
        <div style={styles.sidebarContainer}>
          <Sidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Documents on the Right */}
        <div style={{ ...styles.documentContainer, ...styles.documentContainerHiddenScrollbar }}>
          <DocumentList documents={sortedDocuments} />
        </div>
      </div>
    </div>
  );
};

export default DigitalRepository;
