// import React from "react";
// import { Card, Button, Row, Col } from "react-bootstrap";

// const DocumentList = ({ documents }) => {
//   if (!documents || documents.length === 0) {
//     return <p className="text-center mt-3">No documents available.</p>;
//   }

//   return (
//     <div className="container mt-3">
//       <Row>
//         {documents.map((doc) => (
//           <Col key={doc._id} md={4} sm={6} xs={12} className="mb-4">
//             <Card className="shadow-sm h-100" style={{ minHeight: "320px" }}>
//               <Card.Body>
//                 <Card.Title className="fw-bold">{doc.title}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   {doc.subject} - {doc.department}
//                 </Card.Subtitle>
//                 <Card.Text>
//                   <strong>Semester:</strong> {doc.semester} <br />
//                   <strong>Uploaded:</strong> {new Date(doc.uploadedAt).toLocaleDateString()} <br />
//                   <strong>Description:</strong>{" "}
//                   {doc.description
//                     ? doc.description.length > 100
//                       ? doc.description.substring(0, 100) + "..."
//                       : doc.description
//                     : "No description provided."}
//                 </Card.Text>
//                 <Button
//                   variant="primary"
//                   href={`http://localhost:5000${doc.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Document
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default DocumentList;




import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const DocumentList = ({ documents }) => {
  if (!documents || documents.length === 0) {
    return <p className="text-center mt-3">No documents available.</p>;
  }

  return (
    <div className="container mt-3">
      <Row>
        {documents.map((doc) => (
          <Col key={doc._id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-sm h-100" style={{ minHeight: "300px", display: "flex", flexDirection: "column" }}>
              <Card.Body style={{ flex: "1" }}>
                <Card.Title className="fw-bold">{doc.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{doc.subject}</Card.Subtitle>
                <Card.Text>
                  <strong>Department:</strong> {doc.department} <br />
                  <strong>Semester:</strong> {doc.semester} <br />
                  <strong>Uploaded:</strong> {new Date(doc.uploadedAt).toLocaleDateString("en-GB")} <br />
                  <strong>Description:</strong>{" "}
                  {doc.description
                    ? doc.description.length > 100
                      ? doc.description.substring(0, 100) + "..."
                      : doc.description
                    : "No description provided."}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center bg-white border-0">
                {/* <Button
                  variant="primary"
                  href={`http://localhost:5000${doc.fileUrl}`}
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="w-100"
                >
                  View Document
                </Button> */}

                <Button
                  variant="primary"
                  onClick={() => {
                    const url = `http://localhost:5000/${doc.fileUrl}`; // Notice the slash after 5000/
                    console.log("Opening document URL:", url);
                    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
                    if (!newWindow) {
                      console.error("Popup blocked. Please allow popups for this site.");
                    }
                  }}
                  className="w-100"
                >
                  View Document
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DocumentList;
