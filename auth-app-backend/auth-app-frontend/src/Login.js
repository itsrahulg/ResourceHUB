import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
  //     localStorage.setItem("token", data.token);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert("Invalid credentials");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
  
      localStorage.setItem("token", response.data.token); // ✅ Store token
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to profile page
  
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>ResourceHUB</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navButton}>Home</Link>
          <Link to="/signup" style={styles.navButton}>Sign Up</Link>
        </div>
      </nav>

      {/* Login Box with Image */}
      <div style={styles.loginWrapper}>
        <div style={styles.loginBox}>
          {/* Left Side - Image */}
          <div style={styles.imageSection}>
            <img 
              src="/images/login-form-image.jpg" 
              alt="Login" 
              style={styles.loginImage} 
            />
          </div>

          {/* Right Side - Login Form */}
          <div style={styles.formSection}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={styles.signupText}>
              Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
  },
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
  loginWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
  loginBox: {
    display: "flex",
    width: "700px", // Increased width
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden", // Prevents content overflow
    height: "400px", // Adjust the height as needed
  },
  imageSection: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "#e3f2fd", // Light blue background
    padding: "20px",
  },
  loginImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px 0 0 8px",
  },
  formSection: {
    width: "70%",
    padding: "30px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "white",
    marginTop: "10px",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  signupLink: {
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
