import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import NormalNavbar from "./components/NormalNavbar";
import UploadsCount from "./components/UploadsCount";
import DownloadsCount from "./components/DownloadsCount";
import ResourcesCount from "./components/ResourcesCount";
import QuizPoints from "./components/QuizPoints";
import DocumentUpload from "./components/DocumentUpload";
import PhysicalResourcePost from "./components/PhysicalResourcePost";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    axios
      .post("http://localhost:5000/api/profile/upload", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      })
      .then((response) => setUser((prev) => ({ ...prev, profilePhoto: response.data.profilePhoto })))
      .catch((error) => console.error("Error uploading profile photo:", error));
  };

  return (
    <div>
      <NormalNavbar title="User Profile" buttons={[{ label: "Dashboard", path: "/dashboard" },{ label: "My Uploads", path: "/my-documents" },{ label: "My Chats", path: "/chat" }, { label: "Logout", path: "/" }]} />

        {/*  

       <div style={styles.profileContainer}>
        
        <div style={styles.imageContainer}>
          <img 
            src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : "https://via.placeholder.com/200x120"} 
            alt="Profile" 
            style={styles.profileImage} 
          />
          <label htmlFor="photo-upload">
            <img src="/images/camera-icon.png" alt="Upload" style={styles.cameraIcon} />
          </label>
          <input type="file" id="photo-upload" onChange={handlePhotoUpload} accept="image/*" style={styles.uploadInput} />
        </div>

        
        <div style={styles.detailsContainer}>
          {!isEditing ? (
            <>
              <p><strong>Name:</strong> {user.name || "Not Provided"}</p>
              <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
              <p><strong>Program:</strong> {user.program || "Not Provided"}</p>
              <p><strong>Department:</strong> {user.department || "Not Provided"}</p>
              <p><strong>Start Year:</strong> {user.startYear || "Not Provided"}</p>
              <p><strong>End Year:</strong> {user.endYear || "Not Provided"}</p>
              <button onClick={() => setIsEditing(true)} style={styles.editButton}>Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={styles.editForm}>
              <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" />
              <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" />
              <input type="text" name="program" value={formData.program || ""} onChange={handleChange} placeholder="Program" />
              <input type="text" name="department" value={formData.department || ""} onChange={handleChange} placeholder="Department" />
              <input type="number" name="startYear" value={formData.startYear || ""} onChange={handleChange} placeholder="Start Year" />
              <input type="number" name="endYear" value={formData.endYear || ""} onChange={handleChange} placeholder="End Year" />
              <button type="submit" style={styles.saveButton}>Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
            </form>
          )}
        </div>
      </div>
      */}

<div className="container-fluid mt-4">
  <div className="row justify-content-center">
    <div className="col-md-11">
      <div className="card shadow p-3">
        <div className="row align-items-center">
          
          {/* Profile Image */}
          <div className="col-md-4 text-center">
            <div className="position-relative">
              <img
                src={user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : "https://via.placeholder.com/200x120"}
                alt="Profile"
                className="rounded-circle img-fluid"
                style={{ width: "280px", height: "280px", objectFit: "cover" }}
              />
              <label htmlFor="photo-upload" className="position-absolute bottom-0 end-0 p-1 bg-light rounded-circle">
                <img src="/images/camera-icon.png" alt="Upload" style={{ width: "30px", cursor: "pointer" }} />
              </label>
              <input type="file" id="photo-upload" onChange={handlePhotoUpload} accept="image/*" hidden />
            </div>
          </div>

          {/* User Details */}
          <div className="col-md-8">
            <div className="card-body">
              {!isEditing ? (
                <>
                  <h4 className="mb-3">{user.name || "Not Provided"}</h4>
                  <p><strong>Email:</strong> {user.email || "Not Provided"}</p>
                  <p><strong>Program:</strong> {user.program || "Not Provided"}</p>
                  <p><strong>Department:</strong> {user.department || "Not Provided"}</p>
                  <p><strong>Start Year:</strong> {user.startYear || "Not Provided"}</p>
                  <p><strong>End Year:</strong> {user.endYear || "Not Provided"}</p>
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input type="text" name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="text" name="program" value={formData.program || ""} onChange={handleChange} placeholder="Program" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="text" name="department" value={formData.department || ""} onChange={handleChange} placeholder="Department" className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="number" name="startYear" value={formData.startYear || ""} onChange={handleChange} placeholder="Start Year" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <input type="number" name="endYear" value={formData.endYear || ""} onChange={handleChange} placeholder="End Year" className="form-control" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary me-2">Cancel</button>
                    <button type="submit" className="btn btn-success">Save Changes</button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>


       {/* Cards Section */}
      {/* <div style={styles.cardsContainer}>
        <UploadsCount />
        <DownloadsCount />
        <ResourcesCount />
        <QuizPoints />
      </div> */}

      {/* <hr></hr> */}
      <br></br>
      <DocumentUpload />
      <br></br>
      {/* <hr></hr> */}
      <br></br>
      <br></br>
      <PhysicalResourcePost/>
      <br></br>
      <br></br>
    </div>
  );
};

// 🎨 **Single-Line CSS Styles**
const styles = {
  profileContainer: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "90%", height: "400px", margin: "40px auto", padding: "20px", borderRadius: "10px", background: "linear-gradient(to bottom, #f5e6ca, #ffffff)", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" },
  imageContainer: { position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "300px" },
  profileImage: { width: "300px", height: "350px", borderRadius: "15px", objectFit: "cover" },
  cameraIcon: { position: "absolute", bottom: "5px", right: "10px", width: "30px", cursor: "pointer", background: "#fff", borderRadius: "50%", padding: "5px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)" },
  uploadInput: { display: "none" },
  detailsContainer: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: "40px" },
  editButton: { background: "#007bff", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", marginTop: "10px", width: "150px" },
  editForm: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px", maxWidth: "300px" },
  saveButton: { background: "#28a745", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" },
  cancelButton: { background: "#dc3545", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" },
  cardsContainer: { display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", flexWrap: "nowrap", overflowX: "auto", paddingBottom:"10px"},
};

export default Profile;
