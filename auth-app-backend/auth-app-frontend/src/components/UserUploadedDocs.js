// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Trash } from "lucide-react";

// const UserDocuments = () => {
//   const [documents, setDocuments] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [docToDelete, setDocToDelete] = useState(null);

//   useEffect(() => {
//     fetchUserDocuments();
//   }, []);

//   const fetchUserDocuments = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const response = await axios.get("http://localhost:5000/api/documents/user", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
      

//       setDocuments(response.data);
//     } catch (error) {
//       console.error("Error fetching user documents:", error.response?.data || error.message);
//     }
//   };

//   const handleDelete = async () => {
//     if (!docToDelete) return;
//     try {
//       await axios.delete(`/api/documents/${docToDelete}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setDocuments(documents.filter((doc) => doc._id !== docToDelete));
//       setShowConfirm(false);
//     } catch (error) {
//       console.error("Error deleting document", error);
//     }
//   };

//   return (
//     <div className="container-fluid mt-4 p-4 shadow-lg rounded-lg" style={{ maxWidth: "90%", background: "#fff" }}>
//       <h4 className="mb-3">Your Uploaded Documents</h4>

//       {/* List View */}
//       <ul className="list-group" style={{ maxHeight: "400px", overflowY: "auto", scrollbarWidth: "none" }}>
//         {documents.map((doc) => (
//           <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
//             <span>{doc.title}</span>
//             <Button variant="danger" onClick={() => { setShowConfirm(true); setDocToDelete(doc._id); }}>
//               <Trash size={16} /> Delete
//             </Button>
//           </li>
//         ))}
//       </ul>

//       {/* Confirmation Modal */}
//       <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//         <Modal.Body className="text-center p-4">
//           <h5>Are you sure?</h5>
//           <p>This action cannot be undone.</p>
//           <div className="d-flex justify-content-center gap-2">
//             <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
//             <Button variant="danger" onClick={handleDelete}>Delete</Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default UserDocuments;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash } from "lucide-react";

const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // default to list view
  const [showConfirm, setShowConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  useEffect(() => {
    fetchUserDocuments();
  }, []);

  const fetchUserDocuments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/documents/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(response.data);
    } catch (error) {
      console.error(
        "Error fetching user documents:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/documents/${docToDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDocuments(documents.filter((doc) => doc._id !== docToDelete));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  return (
    <div
      className="container-fluid mt-4 p-4 shadow-lg rounded-lg"
      style={{ maxWidth: "90%", background: "#fff" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Your Uploaded Documents</h4>
        <ToggleButtonGroup
          type="radio"
          name="viewMode"
          value={viewMode}
          onChange={(val) => setViewMode(val)}
        >
          <ToggleButton variant="outline-primary" value="card">
            Card View
          </ToggleButton>
          <ToggleButton variant="outline-secondary" value="list">
            List View
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {viewMode === "card" ? (
        <div
          className="d-flex flex-wrap gap-3"
          style={{ maxHeight: "400px", overflowY: "auto", scrollbarWidth: "none" }}
        >
          {documents.map((doc) => (
            <Card key={doc._id} style={{ width: "18rem" }} className="shadow-sm">
              <Card.Body>
                <Card.Title>{doc.title}</Card.Title>
                <Card.Text>{doc.description}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowConfirm(true);
                    setDocToDelete(doc._id);
                  }}
                >
                  <Trash size={16} /> Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <ul
          className="list-group"
          style={{ maxHeight: "400px", overflowY: "auto", scrollbarWidth: "none" }}
        >
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{doc.title}</span>
              <Button
                variant="danger"
                onClick={() => {
                  setShowConfirm(true);
                  setDocToDelete(doc._id);
                }}
              >
                <Trash size={16} /> Delete
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Body className="text-center p-4">
          <h5>Are you sure?</h5>
          <p>This action cannot be undone.</p>
          <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserDocuments;
