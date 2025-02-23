import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";

const departments = {
  "BE/BTech": [
    "Automobile Engineering", "Biomedical Engineering", "Civil Engineering",
    "Computer Science and Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    "Electrical and Electronics Engineering", "Biotechnology", "Fashion Technology", "Information Technology",
    "Textile Technology", "Electronics and Communication Engineering",
    "B.E. in Electrical and Electronics Engineering (Sandwich)", "B.E. in Mechanical Engineering (Sandwich)",
    "B.E. in Production Engineering (Sandwich)", "Instrumentation and Control Engineering",
    "Mechanical Engineering", "Metallurgical Engineering", "Production Engineering",
    "Robotics and Automation Engineering", "Master of Computer Applications"
  ],
  "MTech": [
    "Automobile Engineering", "Biomedical Engineering", "Civil Engineering",
    "Computer Science and Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    "Electrical and Electronics Engineering", "Biotechnology", "Fashion Technology", "Information Technology",
    "Textile Technology", "Electronics and Communication Engineering",
    "B.E. in Electrical and Electronics Engineering (Sandwich)", "B.E. in Mechanical Engineering (Sandwich)",
    "B.E. in Production Engineering (Sandwich)", "Instrumentation and Control Engineering",
    "Mechanical Engineering", "Metallurgical Engineering", "Production Engineering",
    "Robotics and Automation Engineering"
  ],
  "MSc": [
    "Cyber Security", "Data Science", "Theoretical Computer Science", "Software Systems", "Fashion Design and Merchandising"
  ],
  "Computer Applications": ["Master of Computer Applications"]
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState("BE/BTech");
  const [department, setDepartment] = useState("");
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [endYear, setEndYear] = useState(startYear + 4);
  const navigate = useNavigate();


  // Handle Start Year Change
const handleStartYearChange = (year) => {
  const numericYear = parseInt(year);
  if (numericYear > new Date().getFullYear()) return;
  setStartYear(numericYear);
  setEndYear(numericYear + (program === "BE/BTech" ? 4 : program === "MTech" ? 2 : program === "MSc" ? 5 : 2)); // MCA is 2 years
};

// Handle Program Change
const handleProgramChange = (prog) => {
  setProgram(prog);
  setDepartment("");
  setEndYear(startYear + (prog === "BE/BTech" ? 4 : prog === "MTech" ? 2 : prog === "MSc" ? 5 : 2)); // MCA is 2 years
};

// Validate College Email
const isCollegeEmail = (email) => {
  const regex = /^[0-9]{2}[a-zA-Z]+[0-9]+@psgtech\.ac\.in$/;
  return regex.test(email);
};

const handleSignup = async (e) => {
  e.preventDefault();
  
  // Email validation
  if (!isCollegeEmail(email)) {
    alert("Please enter a valid PSG College email (e.g., 23mx322@psgtech.ac.in).");
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
      program,
      department,
      startYear,
      endYear,
    });
    
    localStorage.setItem("token", response.data.token); // Store token
    alert("Signup successful! Please login.");
    navigate("/dashboard"); // Redirect to dashboard after signup

    alert("Signup successful! Please login.");
    navigate("/login");
  } catch (err) {
    alert("User already exists");
  }
};


  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>ResourceHUB</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navButton}>Home</Link>
          <Link to="/login" style={styles.navButton}>Login</Link>
        </div>
      </nav>

      <div style={styles.signupBox}>
        <div style={styles.imageSection}>
          <img src="/images/signup-form-image.png" alt="Signup" style={styles.image} />
        </div>

        <div style={styles.formSection}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup} style={styles.form}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />

            <select value={program} onChange={(e) => handleProgramChange(e.target.value)} required style={styles.input}>
              <option value="BE/BTech">BE/BTech</option>
              <option value="MTech">MTech</option>
              <option value="MSc">MSc</option>
              <option value="Computer Applications">Computer Applications</option> {/* Added MCA */}
            </select>

            <select value={department} onChange={(e) => setDepartment(e.target.value)} required style={styles.input}>
              <option value="">Select Department</option>
              {departments[program].map((dept) => (
                <option key={dept} value={`${program} ${dept}`}>{`${program} ${dept}`}</option>
              ))}
            </select>

            <input type="number" placeholder="Start Year" value={startYear} onChange={(e) => handleStartYearChange(e.target.value)} min="2000" max={new Date().getFullYear()} required style={styles.input} />
            <input type="number" placeholder="End Year" value={endYear} disabled style={styles.input} />

            <button type="submit" style={styles.button}>Sign Up</button>
          </form>
          <br></br>
          <p style={styles.loginText}>Already have an account? <Link to="/login" style={styles.loginLink}>Login here</Link></p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Styles in Single Line
const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(to right, #4facfe, #00f2fe)" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 50px", backgroundColor: "#333", color: "white" },
  navBrand: { fontSize: "24px", fontWeight: "bold" },
  navLinks: { display: "flex", gap: "15px" },
  navButton: { color: "white", textDecoration: "none", padding: "8px 15px", borderRadius: "5px", backgroundColor: "#007BFF" },
  signupBox: { display: "flex", width: "850px", height: "700px", margin: "80px auto", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", overflow: "hidden" },
  imageSection: { width: "40%", backgroundColor: "#e0f7fa", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  image: { width: "100%", height: "auto", borderRadius: "8px 0 0 8px" },
  formSection: { width: "60%", padding: "30px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" },
  button: { padding: "12px", fontSize: "16px", cursor: "pointer", border: "none", borderRadius: "5px", backgroundColor: "#007BFF", color: "white", marginTop: "10px" },
  loginLink: {color: "#007BFF",textDecoration: "none",fontWeight: "bold",}
};

export default Signup;



