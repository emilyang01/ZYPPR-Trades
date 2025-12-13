import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./styleguide.css";
import image14 from "./image-14.png";
import logo from "./logo.png";

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name || name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must contain uppercase, lowercase, and a number");
      return;
    }

    setIsLoading(true);
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(' ');
      const first_name = nameParts[0] || name;
      const last_name = nameParts.slice(1).join(' ') || nameParts[0];

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Sign up failed");
        return;
      }
      
      // Store the token for auto-login
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      
      setSuccessMessage("Account created successfully! Redirecting...");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError("Unable to connect. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <img className="image" src={image14} alt="Background" />
      <img className="logo-centered" src={logo} alt="Logo" />
      <div className="text-wrapper-2">Create Account</div>

      {error && <div className="error-banner"><span>{error}</span></div>}
      {successMessage && <div className="success-banner"><span>{successMessage}</span></div>}

      <form onSubmit={handleSignUp}>
        <div className="text-wrapper-3">Name</div>
        <div className="rectangle-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div className="text-wrapper-email">Email Address</div>
        <div className="rectangle">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div className="text-wrapper-password">Password</div>
        <div className="rectangle-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="rectangle-4" disabled={isLoading}>
          <div className="text-wrapper-6">{isLoading ? "Creating Account..." : "Sign Up"}</div>
        </button>
      </form>

      <div className="text-wrapper-8">Already have an account?</div>
      <div className="text-wrapper-9" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
        Sign in
      </div>
    </div>
  );
};