import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { BsChatDots, BsFlag, BsFlagFill } from "react-icons/bs"; // Chat & Flag Icons

const PhysicalResourceCard = ({ resource }) => {
  const [showModal, setShowModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagged, setFlagged] = useState(resource.flagged || false);
  const [flagReason, setFlagReason] = useState("");

  // Flag reasons
  const flagReasons = [
    "It was outdated",
    "The content is inappropriate",
    "False advertising",
    "Owner feedback not helpful",
    "Other",
  ];

  // Toggle flagging status
  const toggleFlag = (event) => {
    event.stopPropagation(); // Prevents opening the details modal
    setShowFlagModal(true);
  };

  // Save flagging status to database
  const updateFlagStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/physicalresource/flag/${resource._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ flagged: true, flaggedReason: flagReason }),
      });

      if (response.ok) {
        setFlagged(true);
        setShowFlagModal(false);
      }
    } catch (error) {
      console.error("Error updating flag status:", error);
    }
  };

  return (
    <>
      {/* Physical Resource Card */}
      <Card
        className="shadow-sm p-3"
        style={{
          cursor: "pointer",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => setShowModal(true)} // Show full details modal
      >
        {resource.photos && resource.photos.length > 0 && (
          <Card.Img
            variant="top"
            src={`http://localhost:5000${resource.photos[0]}`} // Show first photo
            alt="Resource"
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <Card.Body>
          <Card.Title>{resource.title}</Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>
            <strong>Department:</strong> {resource.department} <br />
            <strong>Semester:</strong> {resource.semester} <br />
            <strong>Subject:</strong> {resource.subject} <br />
            <strong>Availability:</strong> {resource.availability} <br />
            {resource.availability === "For Lending" && (
              <>
                <strong>Lending Days:</strong> {resource.lendingDays} <br />
              </>
            )}
          </Card.Text>

          {/* Chat & Flag Icons */}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-primary">
              <BsChatDots size={20} /> Chat
            </Button>

            <Button variant="outline-danger" onClick={toggleFlag}>
              {flagged ? <BsFlagFill size={20} color="red" /> : <BsFlag size={20} />}
              {flagged ? " Flagged" : " Flag"}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal to Show Full Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Body
          className="p-5"
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          {/* Close Button */}
          <Button
            variant="light"
            onClick={() => setShowModal(false)}
            style={{ position: "absolute", top: "10px", right: "10px", fontSize: "1.5rem", borderRadius: "50%" }}
          >
            &times;
          </Button>

          {/* Resource Details */}
          <h3 className="mb-4 text-center">{resource.title}</h3>
          <p style={{ fontSize: "18px" }}><strong>Department:</strong> {resource.department}</p>
          <p style={{ fontSize: "18px" }}><strong>Semester:</strong> {resource.semester}</p>
          <p style={{ fontSize: "18px" }}><strong>Subject:</strong> {resource.subject}</p>
          <p style={{ fontSize: "18px" }}><strong>Description:</strong> {resource.description}</p>
          <p style={{ fontSize: "18px" }}><strong>Mobile:</strong> {resource.mobileNumber}</p>
          <p style={{ fontSize: "18px" }}><strong>Availability:</strong> {resource.availability}</p>
          {resource.availability === "For Lending" && (
            <p style={{ fontSize: "18px" }}><strong>Lending Days:</strong> {resource.lendingDays}</p>
          )}

          {/* Display All Photos */}
          <div className="d-flex justify-content-center flex-wrap">
            {resource.photos && resource.photos.length > 0 &&
              resource.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000${photo}`}
                  alt={`Resource ${index + 1}`}
                  style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", margin: "5px" }}
                />
              ))
            }
          </div>
        </Modal.Body>
      </Modal>

      {/* Flag Modal */}
      <Modal show={showFlagModal} onHide={() => setShowFlagModal(false)} centered size="lg">
        <Modal.Body
          className="p-5 d-flex"
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            maxWidth: "1000px",
            margin: "auto",
          }}
        >
          {/* Close Button */}
          <Button
            variant="light"
            onClick={() => setShowFlagModal(false)}
            style={{ position: "absolute", top: "10px", right: "10px", fontSize: "1.5rem", borderRadius: "50%" }}
          >
            &times;
          </Button>

          {/* Left Half - Resource Details */}
          <div style={{ flex: 1, paddingRight: "20px", borderRight: "1px solid #ddd" }}>
            <h4>{resource.title}</h4>
            <p><strong>Department:</strong> {resource.department}</p>
            <p><strong>Semester:</strong> {resource.semester}</p>
            <p><strong>Subject:</strong> {resource.subject}</p>
            <p><strong>Description:</strong> {resource.description}</p>

            {/* Show First Photo Only */}
            {resource.photos && resource.photos.length > 0 && (
              <img
                src={`http://localhost:5000${resource.photos[0]}`}
                alt="Resource"
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}
          </div>

          {/* Right Half - Report Options */}
          <div style={{ flex: 1, paddingLeft: "20px" }}>
            <h5>Why are you reporting this resource?</h5>
            <Form>
              {flagReasons.map((reason, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={reason}
                  name="flagReason"
                  value={reason}
                  checked={flagReason === reason}
                  onChange={(e) => setFlagReason(e.target.value)}
                />
              ))}
              <div className="d-flex justify-content-end mt-3">
                <Button variant="danger" onClick={updateFlagStatus}>
                  Report Resource
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhysicalResourceCard;


