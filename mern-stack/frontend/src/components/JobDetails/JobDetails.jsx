import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import IMG12821 from "./IMG-1282-1.png";
import IMG12581 from "./IMG-1258-1.png";
import chatCircleDots from "./chat-circle-dots.svg";
import "./JobDetails.css";

export const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavClick = (nav) => {
    if (nav === 'Jobs') navigate('/jobs');
    // Add other navigation as needed
  };

  const handleContactClient = () => {
    console.log("Contact Martha");
    // TODO: Implement messaging feature
  };

  const handleApply = () => {
    console.log("Apply to job");
    // TODO: Implement job application
  };

  const handleReport = () => {
    navigate(`/report/job/${jobId}`);
  };

  return (
    <main className="job-details">
      <header className="job-header">
        <div className="header-content">
          <button className="back-button" aria-label="Go back" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="logo-section">
            <img className="logo-image" alt="ZYPPR logo" src={IMG12581} />
            <h1 className="logo-text">YPPR Trades</h1>
          </div>

          <nav className="main-navigation" aria-label="Main navigation">
            <button className="nav-link" onClick={() => handleNavClick('Jobs')}>Jobs</button>
            <button className="nav-link" onClick={() => handleNavClick('About ZYPPR')}>About ZYPPR</button>
            <button className="nav-link" onClick={() => handleNavClick('Customer Service')}>Customer Service</button>
          </nav>

          <div className="header-auth">
            <button className="user-button">
              <span>Your Name</span>
              <div className="avatar" />
            </button>
          </div>
        </div>
      </header>

      <div className="job-content">
        <article className="job-card">
          <header className="job-card-header">
            <button className="back-link" aria-label="Go back" onClick={handleBack}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 className="card-title">Job Details</h2>
            <time className="posted-date" dateTime="2025-10-13">
              Posted on 10/13/25
            </time>
          </header>

          <h3 className="job-title">Kitchen Sink Repair</h3>

          <div className="job-info-grid">
            <section className="client-section">
              <h4 className="section-heading">Client</h4>
              <address className="client-info">
                <p className="client-name">Martha Williams</p>
                <p className="client-phone">(555) 123-4567</p>
                <p className="client-address">
                  6000 J Street<br />
                  Sacramento, CA 95189
                </p>
              </address>
              <button className="contact-button" onClick={handleContactClient}>
                <img src={chatCircleDots} alt="" />
                <span>Contact Martha</span>
              </button>
            </section>

            <section className="images-section">
              <h4 className="section-heading">Job Images</h4>
              <div className="job-image-container">
                <img
                  src={IMG12821}
                  alt="Kitchen sink requiring repair"
                  className="job-image"
                />
              </div>
            </section>
          </div>

          <section className="job-description">
            <h4 className="section-heading">Job Info</h4>
            <ul className="job-requirements">
              <li>Old sink needs repairs</li>
              <li>Pipes bursted</li>
              <li>Needs done by Oct 17</li>
            </ul>
          </section>

          <footer className="job-card-footer">
            <div className="payment-info">
              <span className="pay-label">Pays:</span>
              <span className="pay-amount">$59.99</span>
            </div>
            <button className="apply-button" onClick={handleApply}>Apply</button>
          </footer>
        </article>

        <footer className="page-footer">
          <button className="report-link" onClick={handleReport}>Report listing</button>
        </footer>
      </div>
    </main>
  );
};