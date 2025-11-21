import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import image14 from "./image-14.png";
import logo from "./logo.png";
import "./Signup.css";


export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-up">
      <img className="image" src={image14} alt="Background" />
      <img className="logo-centered" src={logo} alt="Logo" />

      <h1 className="text-wrapper-2">Create Account</h1>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSignUp}>
        <label className="text-wrapper-3">Name</label>
        <div className="rectangle-2">
          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <label className="text-wrapper-email">Email Address</label>
        <div className="rectangle">
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label className="text-wrapper-password">Password</label>
        <div className="rectangle-3">
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="rectangle-4" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <p className="text-wrapper-8">Already have an account?</p>
      <p className="text-wrapper-9" onClick={() => navigate("/login")}>
        Sign in
      </p>
    </div>
  );
};
