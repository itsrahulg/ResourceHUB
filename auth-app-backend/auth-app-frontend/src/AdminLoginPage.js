import React from "react";
import { Container } from "react-bootstrap";
import AdminLogin from "./components/AdminLogin";
import NormalNavbar from "./components/NormalNavbar";

const AdminLoginPage = () => {
  return (
    
    <Container className="mt-5">
      <NormalNavbar title="User Profile" buttons={[{ label: "Dashboard", path: "/dashboard" },{ label: "My Documents", path: "/my-documents" }, { label: "Logout", path: "/" }]} />
      <AdminLogin />
    </Container>
  );
};

export default AdminLoginPage;
