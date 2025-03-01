import React, { useState, useEffect } from "react";
import { Container, Table, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./styles/ManageRoles.css"; // Make sure to create and adjust this CSS file as needed

const ManageRoles = () => {
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchStudents();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching admins");
    }
  };

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching students");
    }
  };

  const updateUserRole = async (userId, newRole, userType) => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      let endpoint = "";
      if (userType === "student") {
        endpoint = `http://localhost:5000/api/users/${userId}/role`;
      } else if (userType === "admin") {
        endpoint = `http://localhost:5000/api/admins/${userId}/role`;
      }
      await axios.put(
        endpoint,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state accordingly
      if (userType === "student") {
        setStudents((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else if (userType === "admin") {
        setAdmins((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      }
      setUpdating(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating role");
      setUpdating(false);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Manage Roles</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <h5>Admins</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Email</th>
            <th>User</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((user) => (
            <tr key={user._id} className="role-row">
              <td>{user.email}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked
                  disabled
                  label="User"
                />
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={user.role === "admin"}
                  onChange={(e) => {
                    const newRole = e.target.checked ? "admin" : "student";
                    updateUserRole(user._id, newRole, "admin");
                  }}
                  label="Admin"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5>Students</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Email</th>
            <th>User</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {students.map((user) => (
            <tr key={user._id} className="role-row">
              <td>{user.email}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked
                  disabled
                  label="User"
                />
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={user.role === "admin"}
                  onChange={(e) => {
                    const newRole = e.target.checked ? "admin" : "student";
                    updateUserRole(user._id, newRole, "student");
                  }}
                  label="Admin"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageRoles;
