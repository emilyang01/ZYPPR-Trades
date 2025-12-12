import React from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG-1258-1.png";
import "./styleguide.css";
import "./UserFeedback.css";

const ReportCard = ({ imageClass, title, description, actions, reporter, onActionClick }) => (
  <article className="report-card">
    <div className={`report-image ${imageClass}`} />
    <div className="report-content">
      <div className="report-info">
        <h2 className="report-title">{title}</h2>
        <p className="report-description">{description}</p>
        {reporter && <p className="report-by">Reported by {reporter}</p>}
      </div>
      <div className="report-actions">
        {actions.map((action, index) => (
          <button key={index} className="action-btn" onClick={() => onActionClick(action, title)}>
            {action}
          </button>
        ))}
      </div>
    </div>
  </article>
);

export const UserFeedback = () => {
  const navigate = useNavigate();

  return (
    <main className="user-feedback">
      <header className="feedback-header">
        <div className="header-content">
          <button className="back-button" aria-label="Go back" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="logo-section">
            <img className="logo-image" alt="ZYPPR logo" src={IMG12581} />
            <h1 className="logo-text">YPPR Trades</h1>
          </div>

          <nav className="main-navigation" aria-label="Main navigation">
            <button className="nav-link" onClick={() => navigate("/jobs")}>Jobs</button>
            <button className="nav-link">About ZYPPR</button>
            <button className="nav-link">Customer Service</button>
          </nav>

          <div className="header-auth">
            <button className="user-button">
              <span>Your Name</span>
              <div className="avatar" />
            </button>
          </div>
        </div>
      </header>

      <div className="feedback-container">
        <div className="search-section">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search Reports"
              aria-label="Search Reports"
            />
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L10.5 10.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <section className="reports-section">
          <ReportCard
            imageClass="user-image-1"
            title="User - John Smith"
            description="Reported for misleading job posting."
            reporter="Andi Lane"
            actions={["See profile", "Send Warning Message", "Ban User"]}
            onActionClick={(action) => {
              if (action === "See profile") navigate("/users/1");
              else if (action === "Send Warning Message") navigate("/admin/warning/1");
              else console.log(action);
            }}
          />

          <ReportCard
            imageClass="user-image-2"
            title="User - Robert Jones"
            description="Reported for inappropriate language."
            reporter="Andi Lane"
            actions={["See profile", "Send Warning Message", "Ban User"]}
            onActionClick={(action) => {
              if (action === "See profile") navigate("/users/2");
              else if (action === "Send Warning Message") navigate("/admin/warning/2");
              else console.log(action);
            }}
          />

          <ReportCard
            imageClass="user-image-3"
            title="User - Martha Williams"
            description="Reported for spam messages or job postings."
            reporter="Andi Lane"
            actions={["See profile", "Send Warning Message", "Ban User"]}
            onActionClick={(action) => {
              if (action === "See profile") navigate("/users/1");
              else if (action === "Send Warning Message") navigate("/admin/warning/1");
              else console.log(action);
            }}
          />

          <ReportCard
            imageClass="review-image"
            title="Review - This Gardener Sucks"
            description="Reported for inaccurate or misleading review."
            reporter="Andi Lane"
            actions={["See Review", "Send Warning Message", "Delete Review"]}
            onActionClick={(action) => {
              if (action === "See Review") navigate("/reviews");
              else console.log(action);
            }}
          />
        </section>
      </div>
    </main>
  );
};