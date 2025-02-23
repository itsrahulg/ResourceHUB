import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="py-6 border-top" style={{ height: "120px" }}> {/* Increased height */}
      <div className="container d-flex justify-content-between align-items-center h-100">
        {/* Left Side - Brand Name */}
        <h2 className="fw-bold  m-0">ResourceHUB</h2>

        {/* Right Side - Navigation Links */}
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link text-body-secondary">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-body-secondary">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link text-body-secondary">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/features" className="nav-link text-body-secondary">Features</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link text-body-secondary">About</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
