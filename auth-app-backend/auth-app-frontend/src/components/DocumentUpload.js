import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const DocumentUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    semester: "",
    subject: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const departments = [
    { category: "BE/BTech", names: ["Automobile Engineering", "Biomedical Engineering", "Civil Engineering", "Computer Science and Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Electrical and Electronics Engineering", "Biotechnology", "Fashion Technology", "Information Technology", "Textile Technology", "Electronics and Communication Engineering", "B.E. in Electrical and Electronics Engineering (Sandwich)", "B.E. in Mechanical Engineering (Sandwich)", "B.E. in Production Engineering (Sandwich)", "Instrumentation and Control Engineering", "Mechanical Engineering", "Metallurgical Engineering", "Production Engineering", "Robotics and Automation Engineering"] },
    { category: "MSc", names: ["Cyber Security", "Data Science", "Theoretical Computer Science", "Software Systems", "Fashion Design and Merchandising"] },
    { category: "MTech", names: ["Automobile Engineering", "Biomedical Engineering", "Civil Engineering", "Computer Science and Engineering", "Computer Science and Engineering (Artificial Intelligence and Machine Learning)", "Electrical and Electronics Engineering", "Biotechnology", "Fashion Technology", "Information Technology", "Textile Technology", "Electronics and Communication Engineering", "B.E. in Electrical and Electronics Engineering (Sandwich)", "B.E. in Mechanical Engineering (Sandwich)", "B.E. in Production Engineering (Sandwich)", "Instrumentation and Control Engineering", "Mechanical Engineering", "Metallurgical Engineering", "Production Engineering", "Robotics and Automation Engineering"] },
    { category: "Other", names: ["MCA", "MBA"] },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => i + 1); // [1,2,3,4,5,6,7,8]

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileSelect = (file) => {
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("department", formData.department);
    formDataToSend.append("semester", formData.semester);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("file", selectedFile);
  
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
  
      const response = await fetch("http://localhost:5000/api/document/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: formDataToSend, // Send form data
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Document uploaded successfully!");
        setFormData({
          title: "",
          department: "",
          semester: "",
          subject: "",
          description: "",
        });
        setSelectedFile(null);
      } else {
        alert(data.error || "Failed to upload document.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      alert("An error occurred while uploading the document.");
    }
  };
  

  return (
    <div className="container mt-4">
      
      <Row className="shadow-lg p-4 bg-white rounded">
        {/* Left Side - Form */}
        <h3 className="text-center mb-4">Upload Document</h3>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <optgroup key={index} label={dept.category}>
                    {dept.names.map((name, i) => (
                      <option key={i} value={`${dept.category} - ${name}`}>
                        {dept.category} - {name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Select name="semester" value={formData.semester} onChange={handleChange} required>
                <option value="">Select Semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description (Max 100 words)</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} maxLength={100} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Upload
            </Button>
          </Form>
        </Col>

        {/* Right Side - Drag & Drop Zone */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div
            className={`drop-zone ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input type="file" onChange={handleFileInputChange} accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" hidden id="fileInput" />
            <label htmlFor="fileInput">
              {selectedFile ? (
                <div>
                  <p className="fw-bold">{selectedFile.name}</p>
                  <p className="text-muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <p className="text-center">Drag & Drop or Click to Upload</p>
              )}
            </label>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: { display: "flex", width: "100%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" },
  leftSection: { flex: 1, paddingRight: "10px" },
  rightSection: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #ddd" },
  previewImage: { maxWidth: "100%", maxHeight: "150px", objectFit: "contain" },

};




export default DocumentUpload;
