// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Upload from "./pages/Upload";
import ViewFiles from "./pages/ViewFiles";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/adminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import InquiryForm from "./pages/InquiryForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view" element={<ViewFiles />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/form" element={<InquiryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
