import React from "react";
import { Link } from "react-router-dom";

const NormalNavbar = ({ title, buttons }) => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 50px",
      backgroundColor: "#333",
      color: "white",
    },
    navBrand: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    navLinks: {
      display: "flex",
      gap: "15px",
    },
    navButton: {
      color: "white",
      textDecoration: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      backgroundColor: "#007BFF",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navBrand}>{title}</div>
      <div style={styles.navLinks}>
        {buttons.map((btn, index) => (
          <Link key={index} to={btn.path} style={styles.navButton}>
            {btn.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NormalNavbar;