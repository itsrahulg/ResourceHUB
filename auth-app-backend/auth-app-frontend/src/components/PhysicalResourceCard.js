import React from "react";
import { Card } from "react-bootstrap";

const PhysicalResourceCard = ({ resource }) => {
  return (
    <Card className="shadow-sm">
      {resource.photo && (
        <Card.Img
          variant="top"
          src={`http://localhost:5000${resource.photo}`} // Ensure this matches your backend URL
          alt="Resource"
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.Body>
        <Card.Title>{resource.title}</Card.Title>
        <Card.Text>
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
      </Card.Body>
    </Card>
  );
};

export default PhysicalResourceCard;
