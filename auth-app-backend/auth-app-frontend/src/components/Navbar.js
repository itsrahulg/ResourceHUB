import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ title, buttons, onSearchChange, onFilterChange }) => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 50px",
      backgroundColor: "#333",
      color: "white",
      position: "fixed", // Fixes navbar to top
      top: 0, // Sticks it at the top
      left: 0,
      width: "100%", // Full width
      zIndex: 1000, // Ensures it's above everything else
    },
    navBrand: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    navButton: {
      color: "white",
      textDecoration: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      backgroundColor: "#007BFF",
    },
    input: {
      padding: "6px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
  
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navBrand}>{title}</div>

      <div style={styles.navLinks}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search documents..."
          style={styles.input}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Navigation Buttons */}
        {buttons.map((btn, index) => (
          <Link key={index} to={btn.path} style={styles.navButton}>
            {btn.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
