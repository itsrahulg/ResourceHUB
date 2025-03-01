import React, { useState } from "react";
import { Form, Button, Container, Alert, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NormalNavbar from "../components/NormalNavbar";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const requestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/request-otp", {
        email,
        password,
      });
      console.log(response.data);
      setOtpSent(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    }
  };

  // const verifyOtp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/admin/verify-otp", {
  //       email,
  //       otp,
  //     });
  //     console.log(response.data);
  //     // Save token or set admin session, then navigate to the dashboard
  //     navigate("/admin/dashboard");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "OTP Verification failed");
  //   }
  // };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/verify-otp", { email, otp });
      console.log("New admin token:", response.data.token);
      // Manually store the token
      localStorage.setItem("token", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "OTP Verification failed");
    }
  };
  

  return (
    
    <div>

<NormalNavbar title="Admin Login" buttons={[{ label: "Student Login", path: "/login" },{ label: "Student Signup", path: "/signup" }, { label: "Home", path: "/" }]} />


      <div fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
       
       <Card className="shadow" style={{ maxWidth: "800px", width: "100%" }}>
         <Row className="g-0">
           {/* Left Column: Login Form */}
           <Col md={6} className="p-4">
             <h3 className="text-center mb-4">Admin Login</h3>
             {error && <Alert variant="danger">{error}</Alert>}
             {!otpSent ? (
               <Form onSubmit={requestOtp}>
                 <Form.Group controlId="formEmail" className="mb-3">
                   <Form.Label>Email</Form.Label>
                   <Form.Control
                     type="email"
                     placeholder="Enter admin email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                   />
                 </Form.Group>
                 <Form.Group controlId="formPassword" className="mb-3">
                   <Form.Label>Password</Form.Label>
                   <Form.Control
                     type="password"
                     placeholder="Enter password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                   />
                 </Form.Group>
                 <Button variant="primary" type="submit" className="w-100">
                   Request OTP
                 </Button>
               </Form>
             ) : (
               <Form onSubmit={verifyOtp}>
                 <Form.Group controlId="formOtp" className="mb-3">
                   <Form.Label>OTP</Form.Label>
                   <Form.Control
                     type="text"
                     placeholder="Enter OTP"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                     required
                   />
                 </Form.Group>
                 <Button variant="primary" type="submit" className="w-100">
                   Verify OTP and Login
                 </Button>
               </Form>
             )}
           </Col>
           {/* Right Column: Image */}
           <Col md={6} className="d-none d-md-block p-0">
             <div
               style={{
                 height: "100%",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 background: "white",
               }}
             >
               <img
                 src="/images/admin-login-image.jpg" // Replace with your image path
                 alt="Admin Login"
                 style={{
                   width: "100%",
                   height: "100%",
                   objectFit: "contain", // Adjusts image scaling without cropping
                   padding: "1rem",
                 }}
               />
             </div>
           </Col>
         </Row>
       </Card>
     </div>






    </div>

    
  );
};

export default AdminLogin;

