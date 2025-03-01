import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile"; // Import Profile component
import DigitalRepository from "./DigitalRepository";
import PhysicalResource from "./PhysicalResources";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhysicalResources from "./PhysicalResources";
import PhysicalResourcePost from "./components/PhysicalResourcePost";
import Metrics from "./metrics";
import UserDocumentsPage from "./UserDocumentsPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./AdminDashboard";
import ManageRoles from "./ManageRoles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} /> {/* Add this line */}
        <Route path="/digital-repository" element={<DigitalRepository />} />
        <Route path="/physical-resources" element={<PhysicalResource />} />
        <Route path="/physical-resources" element={<PhysicalResources />} />
        <Route path="/post-physical-resource" element={<PhysicalResourcePost />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/my-documents" element={<UserDocumentsPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/manage-roles" element={<ManageRoles />} />
        
      </Routes>
    </Router>
  );
}

export default App;
