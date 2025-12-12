import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./style.css";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";
      
      case "password":
        if (!value) return "Password is required";
        return "";
      
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    
    setErrors(newErrors);
    setTouched({ email: true, password: true });
    
    if (!newErrors.email && !newErrors.password) {
      // TODO: Backend API call here
      console.log("Form submitted:", formData);
      // Example: await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify(formData) })
      // For now, navigate to admin dashboard
      navigate("/admin/dashboard");
    }
  };

  const handleSignUpClick = () => {
    navigate("/admin/signup");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="admin-login">
      <button className="back-button" onClick={() => window.history.back()} aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="form-container">
        <img className="logo" alt="ZYPPR Trades" src={logo} />
        
        <h1 className="title">Admin Log In</h1>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input ${errors.email && touched.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password" className="label">Password</label>
              <button 
                type="button" 
                onClick={handleForgotPassword} 
                className="forgot-password-link"
              >
                Forgot password
              </button>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              className={`input ${errors.password && touched.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don't have an account?{' '}
          <button onClick={handleSignUpClick} className="link-button">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};