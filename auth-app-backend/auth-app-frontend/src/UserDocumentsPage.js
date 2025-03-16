import React from "react";
import UserDocuments from "./components/UserUploadedDocs"; // Adjust path if needed
import NormalNavbar from "./components/NormalNavbar";
import UserPhysicalResources from "./components/UserUploadedPosts";

const UserDocumentsPage = () => {
  return (

    
    <div>
      <NormalNavbar title="My Documents" buttons={[{ label: "Dashboard", path: "/dashboard" }]} />
      {/* <h2 className="mb-4">My Uploaded Documents</h2> */}
      <UserDocuments />
      <br></br>
      <UserPhysicalResources/>
      <br></br>
      <br></br>
    </div>
  );
};

export default UserDocumentsPage;
