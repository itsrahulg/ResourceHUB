import React from "react";
import UserDocuments from "./components/UserUploadedDocs"; // Adjust path if needed
import NormalNavbar from "./components/NormalNavbar";
const UserDocumentsPage = () => {
  return (

    
    <div>
      <NormalNavbar title="My Documents" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
      {/* <h2 className="mb-4">My Uploaded Documents</h2> */}
      <UserDocuments />
    </div>
  );
};

export default UserDocumentsPage;
