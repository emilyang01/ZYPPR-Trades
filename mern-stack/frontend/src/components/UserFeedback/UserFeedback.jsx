import React from "react";
import IMG12581 from "./IMG-1258-1.png";
import clipPathGroup from "./clip-path-group.png";
import "./styleguide.css";
import "./UserFeedback.css";

const ReportCard = ({ imageClass, title, description, actions, reporter }) => (
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
          <button key={index} className="action-btn">
            {action}
          </button>
        ))}
      </div>
    </div>
  </article>
);

export const UserFeedback = () => {
  return (
    <main className="user-feedback">
      <header className="feedback-header">
        <div className="header-content">
          <div className="logo-section">
            <img className="logo-icon" alt="ZYPPR logo" src={clipPathGroup} />
            <img className="logo-image" alt="" src={IMG12581} />
            <h1 className="logo-text">YPPR Trades</h1>
          </div>

          <nav className="main-navigation" aria-label="Main navigation">
            <button className="nav-link">Jobs</button>
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
          />

          <ReportCard
            imageClass="user-image-2"
            title="User - Robert Jones"
            description="Reported for inappropriate language."
            reporter="Andi Lane"
            actions={["See profile", "Send Warning Message", "Ban User"]}
          />

          <ReportCard
            imageClass="user-image-3"
            title="User - Martha Williams"
            description="Reported for spam messages or job postings."
            reporter="Andi Lane"
            actions={["See profile", "Send Warning Message", "Ban User"]}
          />

          <ReportCard
            imageClass="review-image"
            title="Review - This Gardener Sucks"
            description="Reported for inaccurate or misleading review."
            reporter="Andi Lane"
            actions={["See Review", "Send Warning Message", "Delete Review"]}
          />
        </section>
      </div>
    </main>
  );
};