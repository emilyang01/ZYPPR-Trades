import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import image14 from "./image-14.png";
import logo from "./logo.png";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Login failed");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <img className="image" src={image14} alt="Background" />
      <img className="logo-centered" src={logo} alt="Logo" />

      <h1 className="text-wrapper">Welcome Back!</h1>
      <p className="div">Enter your credentials to access your account</p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleLogin}>
        <label className="text-wrapper-2">Email Address</label>
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

        <label className="text-wrapper-3">Password</label>
        <div className="rectangle-2">
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="rectangle-3" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-wrapper-7">Don't have an account?</p>
      <p className="text-wrapper-8" onClick={() => navigate("/signup")}>
        Sign up
      </p>
    </div>
  );
};
