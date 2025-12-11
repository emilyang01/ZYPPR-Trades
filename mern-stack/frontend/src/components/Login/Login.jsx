import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import "./styleguide.css";
import image14 from "./image-14.png";
import logo from "./logo.png";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError(false);
    setPasswordError(false);
    setSuccessMessage("");

    if (!email || !password) {
      setError("Please fill in all fields");
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setEmailError(true);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setPasswordError(true);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: REMOVE THIS MOCK LOGIN BLOCK WHEN BACKEND IS READY
      // This is temporary for frontend-only testing without backend connection
      // Original API call code is commented below:
      /*
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setEmailError(true);
        setPasswordError(true);
        return;
      }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      */
      
      // MOCK LOGIN: Replace with real API call above
      const mockToken = "mock-token-" + Date.now();
      const mockUser = { id: "user-" + Date.now(), email, role: "user", name: email.split("@")[0] };
      localStorage.setItem("authToken", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <button className="back-button" onClick={() => navigate(-1)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <img className="image" src={image14} alt="Background" />
      <img className="logo-centered" src={logo} alt="Logo" />
      <div className="text-wrapper">Welcome Back!</div>
      <p className="div">Enter your credentials to access your account</p>

      {error && <div className="error-banner"><span>{error}</span></div>}
      {successMessage && <div className="success-banner"><span>{successMessage}</span></div>}

      <form onSubmit={handleLogin}>
        <div className="text-wrapper-2">Email Address</div>
        <div className={`rectangle ${emailError ? "input-error" : ""}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div className="text-wrapper-3">Password</div>
        <div className={`rectangle-2 ${passwordError ? "input-error" : ""}`}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-field"
            disabled={isLoading}
          />
        </div>

        <div className="text-wrapper-4" onClick={() => navigate("/forgot-password")} style={{ cursor: "pointer" }}>
          Forgot password
        </div>

        <button type="submit" className="rectangle-3" disabled={isLoading}>
          <div className="text-wrapper-9">{isLoading ? "Logging in..." : "Login"}</div>
        </button>
      </form>

      <div className="text-wrapper-7">Don't have an account?</div>
      <div className="text-wrapper-8" onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
        Sign up
      </div>
    </div>
  );
};