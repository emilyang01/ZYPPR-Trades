import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG_1258 1.png";
import "./CustomerService.css";
import "../SharedHeader/SharedHeader.css";

export const CustomerService = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.email?.split('@')[0] || "User");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <main className="customer-service">
      {/* Header */}
      <header className="shared-header">
        <div className="shared-header-content">
          <button className="shared-back-button" aria-label="Go back" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="shared-logo-section" onClick={() => navigate("/")} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img className="shared-logo-image" alt="ZYPPR logo" src={IMG12581} />
            <h1 className="shared-logo-text">YPPR Trades</h1>
          </button>

          <nav className="shared-main-navigation" aria-label="Main navigation">
            <button className="shared-nav-link" onClick={() => navigate("/jobs")}>Jobs</button>
            <button className="shared-nav-link">Customer Service</button>
          </nav>

          <div className="shared-header-auth">
            {user?._id ? (
              <button className="cs-userchip" onClick={() => navigate("/dashboard")}>
                <span>{userName}</span>
                <div className="cs-avatar"></div>
              </button>
            ) : (
              <>
                <button className="shared-signin-button" onClick={() => navigate("/login")}>Sign in</button>
                <button className="shared-register-button" onClick={() => navigate("/signup")}>Register</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="background-overlay"></div>
        
        {/* Contact Form */}
        <div className="contact-form-container">
          <h2 className="form-title">Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Message Sent Overlay */}
      {showOverlay && (
        <div className="cs-overlay" onClick={handleCloseOverlay}>
          <div className="cs-overlay-content" onClick={(e) => e.stopPropagation()}>
            <p className="cs-overlay-message">Your Message Has Been Sent.</p>
            <button className="cs-overlay-button" onClick={handleCloseOverlay}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CustomerService;