import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>ResourceHUB</div>
        <div style={styles.navLinks}>
          <Link to="/digital-repository" style={styles.navButton}>Digital Repository</Link>
          <Link to="/physical-resources" style={styles.navButton}>Physical Resources</Link>
          <Link to="/quiz-module" style={styles.navButton}>Play Quiz</Link>
          <Link to="/profile" style={styles.navButton}>Profile</Link>
          <Link to="/metrics" style={styles.navButton}>Metrics</Link>
          

          {/* <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> */}
        </div>
      </nav>

      {/* Cards Section */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <img src="/images/digital-resource-card.jpg" alt="Digital Repository" className="card-img-top mb-3" />
                <h5 className="card-title">Digital Repository</h5>
                <p className="card-text">Access and manage digital learning resources.</p>
                <Link to="/digital-repository" className="btn btn-primary">
  Digital Repository
</Link>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <img src="/images/books-dashboard-card.jpg" alt="Physical Resources" className="card-img-top mb-3" />
                <h5 className="card-title">Physical Resources</h5>
                <p className="card-text">Find and borrow physical books and materials.</p>
                <Link to="/physical-resources" className="btn btn-primary">View</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <img src="/images/quiz-dashboard-card.jpg" alt="Quiz Module" className="card-img-top mb-3" />
                <h5 className="card-title">Quiz Module</h5>
                <p className="card-text">Test your knowledge with interactive quizzes.</p>
                <Link to="/quiz-module" className="btn btn-primary">Start Quiz</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br>
      </br>
      <br>
      </br>

      

    </div>
  );
};

// Styling
const styles = {
  container: { 
    textAlign: "center", 
    minHeight: "100vh", 
    background: "linear-gradient(to right, #87CEFA, #B0E0E6)", 
    paddingTop: "80px" // Ensures content is below the navbar
  },
  navbar: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    padding: "15px 30px", 
    backgroundColor: "#007BFF", 
    color: "white", 
    position: "fixed", 
    width: "100%", 
    top: 0, 
    left: 0, 
    zIndex: 1000 
  },
  navBrand: { 
    fontSize: "24px", 
    fontWeight: "bold" 
  },
  navLinks: { 
    display: "flex", 
    gap: "20px" 
  },
  navButton: { 
    textDecoration: "none", 
    color: "white", 
    fontSize: "16px", 
    padding: "8px 16px", 
    borderRadius: "5px", 
    border: "1px solid white", 
    transition: "0.3s" 
  },
  logoutButton: { 
    backgroundColor: "red", 
    color: "white", 
    fontSize: "16px", 
    padding: "8px 16px", 
    borderRadius: "5px", 
    border: "none", 
    cursor: "pointer" 
  }
};

export default Dashboard;




