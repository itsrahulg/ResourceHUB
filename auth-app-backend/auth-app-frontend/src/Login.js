// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Footer from "./Footer";
// import jwt_decode from "jwt-decode"; // Install this using npm install jwt-decode

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showModal, setShowModal] = useState(false); // Modal state
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password
//       });
  
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("userId", response.data.userId);
      


//       setShowModal(true); // Show success modal

//       // Redirect after 2 seconds
//       setTimeout(() => {
//         setShowModal(false);
//         navigate("/dashboard");
//       }, 2000);
  
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Navbar */}
//       <nav style={styles.navbar}>
//         <div style={styles.navBrand}>Student Login</div>
//         <div style={styles.navLinks}>
//           <Link to="/" style={styles.navButton}>Home</Link>
//           <Link to="/signup" style={styles.navButton}>Sign Up</Link>
//         </div>
//       </nav>

//       {/* Login Box */}
//       <div style={styles.loginWrapper}>
//         <div style={styles.loginBox}>
//           {/* Left Side - Image */}
//           <div style={styles.imageSection}>
//             <img 
//               src="/images/login-form-image.jpg" 
//               alt="Login" 
//               style={styles.loginImage} 
//             />
//           </div>

//           {/* Right Side - Login Form */}
//           <div style={styles.formSection}>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin} style={styles.form}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 style={styles.input}
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 style={styles.input}
//               />
//               <button type="submit" style={styles.button}>Login</button>
//             </form>
//             <p style={styles.signupText}>
//               Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
//             </p>

//             <p style={styles.signupText}>
//               Are you an Admin? <Link to="/admin/login" style={styles.signupLink}>Login here</Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* Success Modal */}
//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h2 style={{ color: "green" }}>Login Successful!</h2>
//             <div style={styles.tickContainer}>
//               ✔
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     background: "linear-gradient(to right, #4facfe, #00f2fe)",
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "15px 50px",
//     backgroundColor: "#333",
//     color: "white",
//   },
//   navBrand: {
//     fontSize: "24px",
//     fontWeight: "bold",
//   },
//   navLinks: {
//     display: "flex",
//     gap: "15px",
//   },
//   navButton: {
//     color: "white",
//     textDecoration: "none",
//     padding: "8px 15px",
//     borderRadius: "5px",
//     backgroundColor: "#007BFF",
//   },
//   loginWrapper: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "80vh",
//   },
//   loginBox: {
//     display: "flex",
//     width: "700px",
//     backgroundColor: "white",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     overflow: "hidden",
//     height: "400px",
//   },
//   imageSection: {
//     width: "70%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//   },
//   loginImage: {
//     width: "100%",
//     height: "auto",
//     borderRadius: "8px 0 0 8px",
//   },
//   formSection: {
//     width: "70%",
//     padding: "30px",
//     textAlign: "center",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     padding: "10px",
//     margin: "10px 0",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "12px",
//     fontSize: "16px",
//     cursor: "pointer",
//     border: "none",
//     borderRadius: "5px",
//     backgroundColor: "#007BFF",
//     color: "white",
//     marginTop: "10px",
//   },
//   signupText: {
//     marginTop: "15px",
//     fontSize: "14px",
//   },
//   signupLink: {
//     color: "#007BFF",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
//   },
//   tickContainer: {
//     fontSize: "50px",
//     color: "green",
//     marginTop: "10px",
//   },
// };

// export default Login;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode"; // ✅ Corrected import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/login", {
  //       email,
  //       password
  //     });

  //     const token = response.data.token;
  //     localStorage.setItem("token", token);

  //     // ✅ Decode the JWT to get user email
  //     const decodedToken = jwtDecode(token);
  //     const userEmail = decodedToken.email;

  //     // ✅ Store userEmail in localStorage
  //     localStorage.setItem("userEmail", userEmail);
  //     console.log("User email stored in localStorage:", userEmail); // Debugging log

  //     setShowModal(true);

  //     setTimeout(() => {
  //       setShowModal(false);
  //       navigate("/dashboard");
  //     }, 2000);

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
  
      // ✅ Store token, userId, and email in local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userEmail", response.data.email); // ✅ Store email
  
      setShowModal(true);
  
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2000);
  
    } catch (err) {
      alert("Invalid credentials");
    }
  };
  
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>Student Login</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navButton}>Home</Link>
          <Link to="/signup" style={styles.navButton}>Sign Up</Link>
        </div>
      </nav>

      <div style={styles.loginWrapper}>
        <div style={styles.loginBox}>
          <div style={styles.imageSection}>
            <img src="/images/login-form-image.jpg" alt="Login" style={styles.loginImage} />
          </div>

          <div style={styles.formSection}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
              <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={styles.signupText}>
              Don't have an account? <Link to="/signup" style={styles.signupLink}>Sign up here</Link>
            </p>
            <p style={styles.signupText}>
              Are you an Admin? <Link to="/admin/login" style={styles.signupLink}>Login here</Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ color: "green" }}>Login Successful!</h2>
            <div style={styles.tickContainer}>✔</div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(to right, #4facfe, #00f2fe)" },
  navbar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 50px", backgroundColor: "#333", color: "white" },
  navBrand: { fontSize: "24px", fontWeight: "bold" },
  navLinks: { display: "flex", gap: "15px" },
  navButton: { color: "white", textDecoration: "none", padding: "8px 15px", borderRadius: "5px", backgroundColor: "#007BFF" },
  loginWrapper: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" },
  loginBox: { display: "flex", width: "700px", backgroundColor: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", overflow: "hidden", height: "400px" },
  imageSection: { width: "70%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  loginImage: { width: "100%", height: "auto", borderRadius: "8px 0 0 8px" },
  formSection: { width: "70%", padding: "30px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column" },
  input: { padding: "10px", margin: "10px 0", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" },
  button: { padding: "12px", fontSize: "16px", cursor: "pointer", border: "none", borderRadius: "5px", backgroundColor: "#007BFF", color: "white", marginTop: "10px" },
  signupText: { marginTop: "15px", fontSize: "14px" },
  signupLink: { color: "#007BFF", textDecoration: "none", fontWeight: "bold" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" },
  tickContainer: { fontSize: "50px", color: "green", marginTop: "10px" }
};

export default Login;
