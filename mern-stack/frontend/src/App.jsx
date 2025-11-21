import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login/Login.jsx';
import { Signup } from './components/Signup/Signup.jsx';

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
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '24px',
              fontFamily: 'Open Sans, Helvetica'
            }}>
              🎉 Dashboard - Coming Soon!
            </div>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              fontSize: '24px',
              fontFamily: 'Open Sans, Helvetica'
            }}>
              🔐 Forgot Password - Coming Soon!
            </div>
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;