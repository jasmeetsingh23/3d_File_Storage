// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Make sure the paths are correct
import Upload from "./pages/Upload";
import Store from "./pages/Store"; // Import Store page
import Success from "./pages/success";
import OneSideOpen from "./pages/OneSideOpen";
import TwoSideOpen from "./pages/TwoSideOpen";
import ThreeSideOpen from "./pages/ThreeSideOpen";
import FourSideOpen from "./pages/FourSideOpen";
import ViewFiles from "./pages/ViewFiles";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/success" element={<Success />} />
        <Route path="/store" element={<Store />} /> {/* Add Store route */}
        <Route path="/1-side-open" element={<OneSideOpen />} />
        <Route path="/2-side-open" element={<TwoSideOpen />} />
        <Route path="/3-side-open" element={<ThreeSideOpen />} />
        <Route path="/4-side-open" element={<FourSideOpen />} />
        <Route path="/view" element={<ViewFiles />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
