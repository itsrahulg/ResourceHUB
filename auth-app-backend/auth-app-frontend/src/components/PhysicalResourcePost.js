// import React, { useState } from "react";

// const PhysicalResourcePost = () => {
//   const [title, setTitle] = useState("");
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [radioOption, setRadioOption] = useState("");
//   const [numDays, setNumDays] = useState("");

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!selectedFile) {
//       alert("Please select a photo before submitting.");
//       return;
//     }

//     console.log("Submitting form data...");

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("department", department);
//     formData.append("semester", semester);
//     formData.append("subject", subject);
//     formData.append("description", description);
//     formData.append("availability", radioOption);

//     if (radioOption === "For Lending") {
//       formData.append("lendingDays", numDays);
//     }

//     formData.append("photo", selectedFile);

//     try {
//       const token = localStorage.getItem("token"); // Get token from local storage
//       if (!token) {
//         alert("User is not logged in. Please log in to continue.");
//         return;
//       }

//       const response = await fetch("http://localhost:5000/api/physicalresource/upload", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in request
//         },
//       });

//       const result = await response.json();
//       console.log("Server Response:", result);

//       if (response.ok) {
//         alert("Physical resource posted successfully!");
//         // Reset form after successful submission
//         setTitle("");
//         setDepartment("");
//         setSemester("");
//         setSubject("");
//         setDescription("");
//         setSelectedFile(null);
//         setRadioOption("");
//         setNumDays("");
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while posting the resource.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />

//       <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
//         <option value="">Select Department</option>
//         <option value="Computer Science">Computer Science</option>
//         <option value="Electrical Engineering">Electrical Engineering</option>
//         <option value="Mechanical Engineering">Mechanical Engineering</option>
//         <option value="MCA">MCA</option>
//         <option value="MBA">MBA</option>
//       </select>

//       <input
//         type="number"
//         placeholder="Semester"
//         value={semester}
//         onChange={(e) => setSemester(e.target.value)}
//         required
//       />

//       <input
//         type="text"
//         placeholder="Subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//         required
//       />

//       <textarea
//         placeholder="Description (Max 100 words)"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//         maxLength="100"
//       />

//       <label>
//         <input
//           type="radio"
//           value="Up for Donation"
//           checked={radioOption === "Up for Donation"}
//           onChange={(e) => setRadioOption(e.target.value)}
//           required
//         />
//         Up for Donation
//       </label>

//       <label>
//         <input
//           type="radio"
//           value="For Lending"
//           checked={radioOption === "For Lending"}
//           onChange={(e) => setRadioOption(e.target.value)}
//           required
//         />
//         For Lending
//       </label>

//       {radioOption === "For Lending" && (
//         <input
//           type="number"
//           placeholder="Number of Days"
//           value={numDays}
//           onChange={(e) => setNumDays(e.target.value)}
//           required
//         />
//       )}

//       <input type="file" accept="image/*" onChange={handleFileChange} required />

//       <button type="submit">Post</button>
//     </form>
//   );
// };

// export default PhysicalResourcePost;



import React, { useState } from "react";
import { Form, Button, Card, Spinner, Row, Col } from "react-bootstrap";

const PhysicalResourcePost = () => {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [radioOption, setRadioOption] = useState("");
  const [numDays, setNumDays] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a photo before submitting.");
      return;
    }

    console.log("Submitting form data...");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("department", department);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("availability", radioOption);

    if (radioOption === "For Lending") {
      formData.append("lendingDays", numDays);
    }

    formData.append("photo", selectedFile);

    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        alert("User is not logged in. Please log in to continue.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/physicalresource/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Physical resource posted successfully!");
        // Reset form after successful submission
        setTitle("");
        setDepartment("");
        setSemester("");
        setSubject("");
        setDescription("");
        setSelectedFile(null);
        setRadioOption("");
        setNumDays("");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while posting the resource.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="container shadow p-4">
      <Card.Body>
        <h4 className="mb-4 text-center">Post a Physical Resource</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Department</Form.Label>
                <Form.Select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="number"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description (Max 100 words)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="100"
              required
            />
          </Form.Group>

          {/* Availability Options */}
          <Form.Group className="mb-3">
            <Form.Label>Availability</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Up for Donation"
                value="Up for Donation"
                checked={radioOption === "Up for Donation"}
                onChange={(e) => setRadioOption(e.target.value)}
                required
              />
              <Form.Check
                inline
                type="radio"
                label="For Lending"
                value="For Lending"
                checked={radioOption === "For Lending"}
                onChange={(e) => setRadioOption(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          {radioOption === "For Lending" && (
            <Form.Group className="mb-3">
              <Form.Label>Number of Days</Form.Label>
              <Form.Control
                type="number"
                value={numDays}
                onChange={(e) => setNumDays(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {/* File Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Photo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
          </Form.Group>

          {selectedFile && (
            <div className="mb-3">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px" }}
              />
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Post Resource"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PhysicalResourcePost;
