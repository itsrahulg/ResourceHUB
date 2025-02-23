import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Footer from "./Footer";


const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>ResourceHUB</div>
        <div style={styles.navLinks}>
          <Link to="/login" style={styles.navButton}>Login</Link>
          <Link to="/signup" style={styles.navButton}>Sign Up</Link>
        </div>
      </nav>

      {/* Bootstrap Hero Section */}
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">Welcome to ResourceHUB</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Your go-to platform for resources and connections. Access, share, and manage digital and physical learning materials effortlessly.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/login">
              <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Login</button>
            </Link>
            <Link to="/signup">
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">Sign Up</button>
            </Link>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src="/images/hero-image.jpg"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt=""
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* New Section Below Hero Section */}
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/documents-card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">All in one Digital Repository</h3>
           
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/books card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Exchange Physical resources easily</h3>
            
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/quiz card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Interactive Quizzes to keep you engaged</h3>
                
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* second row of cards */}
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/login-card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Secured with authentication</h3>
           
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/search-card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Advanced Search and filtering features</h3>
            
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{ backgroundImage: "url('/images/user-card.jpg')", backgroundSize: "cover" }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Preview and download</h3>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <Footer />

    </div>
    
  );
};

// Styling for Navbar
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

export default Home;
