// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Login } from "./components/Login/Login.jsx";
import { Signup } from "./components/Signup/Signup.jsx";

import ChatBot from "./components/ChatBot";   // 👈 keep this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "24px",
                fontFamily: "Open Sans, Helvetica",
              }}
            >
              🎉 Dashboard - Coming Soon!
            </div>
          }
        />
      </Routes>

      {/* 👇 Add ChatBot at the bottom so it appears on all pages */}
      <ChatBot />
    </Router>
  );
}

export default App;
