// import React from "react";
// import { Container } from "react-bootstrap";
// import NormalNavbar from "./components/NormalNavbar";

// const AdminDashboard = () => {
//   return (
//     <div>
//       <NormalNavbar title="Admin Dashboard" buttons={[{ label: "Logout", path: "/" }]} />
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NormalNavbar from "./components/NormalNavbar";
import "./styles/AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <NormalNavbar 
        title="Admin Dashboard" 
        buttons={[{ label: "Logout", path: "/" }]} 
      />
      <Container className="mt-4">
        <Row className="mb-4">
        

        {/* <Col md={4}>
              <Link to="/admin/manage-roles" style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="dashboard-card">
                  <Card.Img variant="top" src="/images/admin-role-change.jpg" />
                  <Card.Body>
                    <Card.Title>Manage Roles</Card.Title>
                    <Card.Text>
                      Change roles of students (from student to admin and vice versa).
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col> */}


            <Col md={4}>
                <Link to="/admin/all-registered-students" style={{ textDecoration: "none", color: "inherit" }}>
                  <Card className="dashboard-card">
                    <Card.Img variant="top" src="/images/admin-students.jpg" />
                    <Card.Body>
                      <Card.Title>Registered Students</Card.Title>
                      <Card.Text>
                        View all registered students and all their uploads and posts.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
            </Col>

          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Img variant="top" src="/images/admin-documents.jpg" />
              <Card.Body>
                <Card.Title>Documents</Card.Title>
                <Card.Text>
                  Check analytics on uploaded documents.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Img variant="top" src="/images/admin-posts.jpg" />
              <Card.Body>
                <Card.Title>Manage Posts</Card.Title>
                <Card.Text>
                  Review and manage user posts.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          
          
        <Col md={4}>
            <Link to="/admin/platform-metrics" style={{ textDecoration: "none", color: "inherit" }}>
              <Card className="dashboard-card">
                <Card.Img variant="top" src="/images/admin-metrics.jpg" />
                <Card.Body>
                  <Card.Title>Platform Metrics</Card.Title>
                  <Card.Text>
                    View all statistics and analytics about the platform usage.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

        </Row>
      </Container>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default AdminDashboard;
