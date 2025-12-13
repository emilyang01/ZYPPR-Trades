import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import IMG12581 from "./IMG_1258 1.png";
import backgroundImage from "./974667 (1) 1.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavClick = (section) => {
    if (section === "jobs") navigate("/jobs");
    else if (section === "customer-service") navigate("/customer-service");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleAdminSignIn = () => {
    navigate("/admin/login");
  };

  return (
    <main className="home-page">
      {/* Header */}
      <header className="main-header" role="banner">
        <div className="header-content">
          <div className="brand-section">
            <div className="brand-logo">
              <img className="logo-image" alt="ZYPPR logo" src={IMG12581} />
              <h1 className="logo-text">YPPR Trades</h1>
            </div>
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            <button
              className="nav-link"
              type="button"
              onClick={() => handleNavClick("jobs")}
            >
              Jobs
            </button>
            <button
              className="nav-link"
              type="button"
              onClick={() => handleNavClick("customer-service")}
            >
              Customer Service
            </button>
          </nav>

          <div className="auth-buttons">
            <button
              className="btn btn-outline"
              type="button"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <img
          className="hero-image"
          alt="Construction worker hammering nail into wood"
          src={backgroundImage}
          loading="eager"
        />
      </section>

      {/* About Section */}
      <section className="about-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="about-title">
          About ZYPPR
        </h2>
        <p className="about-description">
          ZYPPR is a collaborative software project founded by us, Zaki, Yang,
          Phagura, Phillips, and Rivera . Created for our software engineering
          class, ZYPPR represents our shared goal of building technology that
          connects skilled individuals with meaningful opportunities. Our
          mission is to bridge the gap between talent and need, empowering
          people to showcase their abilities and find the right paths to grow
          and succeed.
        </p>
      </section>

      {/* Footer */}
      <footer className="admin-footer">
        <button
          className="btn btn-outline"
          type="button"
          onClick={handleAdminSignIn}
        >
          Admin Sign in
        </button>
      </footer>
    </main>
  );
};

export default HomePage;