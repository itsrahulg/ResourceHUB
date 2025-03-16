// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NormalNavbar from "./components/NormalNavbar";

// const AllRegisteredStudents = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found in localStorage");
//         return;
//       }
  
//       const response = await axios.get("http://localhost:5000/api/admin/all-registered-students", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       console.log("Fetched users:", response.data);
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error.response?.data || error.message);
//     }
//   };
//   ;

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//        <NormalNavbar 
//         title="All Registered Students" 
//         buttons={[{ label: "Dashboard", path: "/admin/dashboard" }]} 
//       />
//           <div className="container mt-4 p-4 shadow-lg rounded-lg bg-white">
//       <h4 className="mb-3 text-center">All Registered Students</h4>
//       <Form.Control
//         type="text"
//         placeholder="Search by name or email"
//         className="mb-3"
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Program</th>
//             <th>Start Year</th>
//             <th>End Year</th>
//             <th>Profile Photo</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length === 0 ? (
//             <tr>
//               <td colSpan="8" className="text-center">No users found</td>
//             </tr>
//           ) : (
//             filteredUsers.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.department}</td>
//                 <td>{user.program}</td>
//                 <td>{user.startYear}</td>
//                 <td>{user.endYear}</td>
//                 <td>
//                   {user.profilePhoto ? (
//                     <img src={`http://localhost:5000${user.profilePhoto}`} alt="Profile" width="50" height="50" className="rounded-circle" />
//                   ) : (
//                     "No Photo"
//                   )}
//                 </td>
//                 <td>
//                   <Button variant="warning" className="me-2">Block</Button>
//                   <Button variant="danger">Delete</Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//     </div>
//     </div>
    
//   );
// };

// export default AllRegisteredStudents;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NormalNavbar from "./components/NormalNavbar";
import { Ban, Trash2 } from "lucide-react"; // Replace with your preferred icons

const AllRegisteredStudents = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await axios.get("http://localhost:5000/api/admin/all-registered-students", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Fetched users:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NormalNavbar 
        title="All Registered Students" 
        buttons={[{ label: "Dashboard", path: "/admin/dashboard" }]} 
      />

      <div className="container mt-4 p-4 bg-white shadow-lg rounded"
        style={{ 
          // boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
        }}
      >
        <h4 className="mb-3 text-center">All Registered Students</h4>
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          className="mb-3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Table striped bordered hover responsive className="rounded">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Program</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Profile Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No users found</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>{user.program}</td>
                  <td>{user.startYear}</td>
                  <td>{user.endYear}</td>
                  <td className="text-center">
                    {user.profilePhoto ? (
                      <img 
                        src={`http://localhost:5000${user.profilePhoto}`} 
                        alt="Profile" 
                        className="rounded-circle"
                        style={{ width: "70px", height: "70px", objectFit: "cover" }} 
                      />
                    ) : (
                      "No Photo"
                    )}
                  </td>
                  <td className="">
                    <Ban size={20} className="text-warning me-3 cursor-pointer" /> {/* Block Icon */}
                    <Trash2 size={20} className="text-danger cursor-pointer" /> {/* Delete Icon */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      <br></br>
      <br></br>
    </div>
    
  );
};

export default AllRegisteredStudents;
