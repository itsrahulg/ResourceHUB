import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserPhysicalResources = () => {
  const [resources, setResources] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserResources();
  }, []);

  const fetchUserResources = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/physical-resources/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching user resources:", error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    if (!resourceToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/physical-resources/${resourceToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(resources.filter((res) => res._id !== resourceToDelete));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting resource:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container-fluid mt-4 p-4 shadow-lg rounded-lg" style={{ maxWidth: "90%", background: "#fff" }}>
      <h4 className="mb-3 text-center">Your Physical Resources</h4>
      {resources.length === 0 ? (
        <div className="text-center">
          <p>No physical resources posted.</p>
          <Button variant="primary" onClick={() => navigate("/profile")}>Upload a Resource</Button>
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Semester</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Posted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr key={res._id}>
                <td>{res.title}</td>
                <td>{res.semester}</td>
                <td>{res.subject}</td>
                <td>{res.description}</td>
                <td>{new Date(res.createdAt).toLocaleDateString()}</td>
                <td className="d-flex gap-2">
                  {/* <Button 
                    variant="info" 
                    onClick={() => { setSelectedImages(res.photos || []); setShowImages(true); }}
                    disabled={!res.photos || res.photos.length === 0}
                  >
                    <Image size={16} /> View Images
                  </Button> */}
                  <Button variant="danger" onClick={() => { setShowConfirm(true); setResourceToDelete(res._id); }}>
                    <Trash size={16} /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Image Viewer Modal */}
      {/* <Modal show={showImages} onHide={() => setShowImages(false)} centered>
        <Modal.Body className="text-center">
          <h5>Uploaded Images</h5>
          {selectedImages.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {selectedImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Resource ${index}`} 
                  className="img-fluid rounded shadow" 
                  style={{ maxWidth: "200px" }} 
                />
              ))}
            </div>
          ) : (
            <p>No images available</p>
          )}
          <Button variant="secondary" onClick={() => setShowImages(false)} className="mt-3">Close</Button>
        </Modal.Body>
      </Modal> */}

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <h5>Are you sure?</h5>
          <p>This action cannot be undone.</p>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserPhysicalResources;
