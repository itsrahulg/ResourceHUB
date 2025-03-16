// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Trash } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const UserDocuments = () => {
//   const [documents, setDocuments] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [docToDelete, setDocToDelete] = useState(null);
//   const navigate = useNavigate();

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
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDocuments(response.data);
//     } catch (error) {
//       console.error(
//         "Error fetching user documents:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const handleDelete = async () => {
//     if (!docToDelete) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/documents/${docToDelete}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDocuments(documents.filter((doc) => doc._id !== docToDelete));
//       setShowConfirm(false);
//     } catch (error) {
//       console.error("Error deleting document:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div
//       className="container-fluid mt-4 p-4 shadow-lg rounded-lg"
//       style={{ maxWidth: "90%", background: "#fff" }}
//     >
//       <h4 className="mb-3 text-center">Your Uploaded Documents</h4>

//       {documents.length === 0 ? (
//         <div className="text-center">
//           <p>No documents uploaded.</p>
//           <Button variant="primary" onClick={() => navigate("/profile")}>
//            Click here to Upload Documents
//           </Button>
//         </div>
//       ) : (
//         <div
//           className="d-flex flex-wrap gap-3"
//           style={{
//             maxHeight: "400px",
//             overflowY: "auto",
//             scrollbarWidth: "none",
//           }}
//         >
//           {documents.map((doc) => (
//             <Card key={doc._id} style={{ width: "18rem" }} className="shadow-sm">
//               <Card.Body>
//                 <Card.Title>{doc.title}</Card.Title>
//                 <Card.Text>{doc.description}</Card.Text>
//                 <Button
//                   variant="danger"
//                   onClick={() => {
//                     setShowConfirm(true);
//                     setDocToDelete(doc._id);
//                   }}
//                 >
//                   <Trash size={16} /> Delete
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
//         <Modal.Body className="text-center p-4">
//           <h5>Are you sure?</h5>
//           <p>This action cannot be undone.</p>
//           <div className="d-flex justify-content-center gap-2">
//             <Button variant="secondary" onClick={() => setShowConfirm(false)}>
//               Cancel
//             </Button>
//             <Button variant="danger" onClick={handleDelete}>
//               Delete
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default UserDocuments;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);
  const navigate = useNavigate();

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
      console.error("Error fetching user documents:", error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/documents/${docToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(documents.filter((doc) => doc._id !== docToDelete));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting document:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container-fluid mt-4 p-4 shadow-lg rounded-lg" style={{ maxWidth: "90%", background: "#fff" }}>
      <h4 className="mb-3 text-center">Your Uploaded Documents</h4>
      {documents.length === 0 ? (
        <div className="text-center">
          <p>No documents uploaded.</p>
          <Button variant="primary" onClick={() => navigate("/profile")}>Click here to Upload Documents</Button>
        </div>
      ) : (
        <div style={{ maxHeight: "400px", overflowY: "auto", scrollbarWidth: "none" }}>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td>{doc.department}</td>
                  <td>{doc.semester}</td>
                  <td>{doc.subject}</td>
                  <td>{doc.description || "N/A"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setShowConfirm(true);
                        setDocToDelete(doc._id);
                      }}
                    >
                      <Trash size={16} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

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

export default UserDocuments;
