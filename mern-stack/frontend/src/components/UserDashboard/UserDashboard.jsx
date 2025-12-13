import React from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG_1258 1.png";
import "./UserDashboard.css";
import "../SharedHeader/SharedHeader.css";

export const UserDashboard = () => {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.email?.split('@')[0] || "User");

  const handlePostJob = () => {
    navigate("/jobs/new");
  };

  return (
    <div className="user-dashboard">
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
            <button className="shared-nav-link" onClick={() => navigate("/customer-service")}>Customer Service</button>
          </nav>

          <div className="shared-header-auth">
            <button className="ud-userchip" onClick={() => navigate("/dashboard")}>
              <span>{userName}</span>
              <div className="ud-userchip-avatar"></div>
            </button>
          </div>
        </div>
      </header>

      {/* User Banner */}
      <div className="ud-user-banner">
        <img 
          src="/assets/profile.jpg" 
          alt="User Avatar" 
          className="ud-user-avatar"
          onError={(e) => {
            e.target.style.background = '#999';
          }}
        />
        <span className="ud-user-name">{userName}</span>
      </div>

      {/* Body */}
      <div className="ud-body">
        {/* Sidebar */}
        <aside className="ud-sidebar">
          <button className="ud-sideitem active">
            <span className="icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="2" width="7" height="7" rx="1.5"/>
                <rect x="11" y="2" width="7" height="7" rx="1.5"/>
                <rect x="2" y="11" width="7" height="7" rx="1.5"/>
                <rect x="11" y="11" width="7" height="7" rx="1.5"/>
              </svg>
            </span>
            Dashboard
          </button>
          <button className="ud-sideitem" onClick={() => navigate("/messages")}>
            <span className="icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h12M4 10h12M4 14h8" strokeLinecap="round"/>
              </svg>
            </span>
            Messages
          </button>
          <button className="ud-sideitem" onClick={() => navigate("/notifications")}>
            <span className="icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2a5 5 0 015 5v3l2 2v1H3v-1l2-2V7a5 5 0 015-5z"/>
                <path d="M8 15a2 2 0 004 0"/>
              </svg>
            </span>
            Notifications
          </button>
        </aside>

        {/* Main Content */}
        <main className="ud-main">
          {/* First Row: Current Jobs & Jobs Completed */}
          <div className="ud-cards-row">
            {/* Current Jobs */}
            <div className="ud-card">
              <h3 className="ud-card-title">Current Jobs</h3>
              <div className="ud-job-list">
                <div className="ud-job-item">
                  <div className="ud-job-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                      <path d="M12 3v18M12 3l-4 4M12 3l4 4M5 21h14"/>
                      <path d="M7 14c0-2 2-3 5-3s5 1 5 3"/>
                    </svg>
                  </div>
                  <div className="ud-job-info">
                    <div className="ud-job-name">Gardening</div>
                    <div className="ud-job-date">Dec 14 - 11:30 PM - 2:30 PM</div>
                  </div>
                  <span className="ud-job-badge">Complete</span>
                </div>
                <div className="ud-job-item">
                  <div className="ud-job-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                      <rect x="4" y="3" width="16" height="18" rx="2"/>
                      <path d="M8 7h8M8 11h8M8 15h4"/>
                    </svg>
                  </div>
                  <div className="ud-job-info">
                    <div className="ud-job-name">Tutoring</div>
                    <div className="ud-job-date">Dec 16 - 3:00 PM - 6:00 PM</div>
                  </div>
                  <span className="ud-job-badge">Complete</span>
                </div>
              </div>
            </div>

            {/* Jobs Completed */}
            <div className="ud-card">
              <h3 className="ud-card-title">Jobs Completed</h3>
              <div className="ud-completed-item">
                <div className="ud-completed-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="5"/>
                    <path d="M12 13v8M9 18h6"/>
                  </svg>
                </div>
                <div className="ud-completed-info">
                  <div className="ud-completed-name">
                    Painter
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7"/>
                    </svg>
                  </div>
                  <div className="ud-completed-date">Oct 30 - 8:00 AM - 10:30 AM</div>
                </div>
                <span className="ud-job-badge payment">Make a payment</span>
              </div>
            </div>
          </div>

          {/* Second Row: Earnings & Reviews */}
          <div className="ud-cards-row">
            {/* Earnings Overview */}
            <div className="ud-card">
              <h3 className="ud-card-title">Earnings Overview</h3>
              <div className="ud-earnings-grid">
                <div className="ud-earning-item">
                  <div className="ud-earning-amount">$150</div>
                  <div className="ud-earning-label">Daily</div>
                </div>
                <div className="ud-earnings-divider"></div>
                <div className="ud-earning-item">
                  <div className="ud-earning-amount">$600</div>
                  <div className="ud-earning-label">Weekly</div>
                </div>
              </div>
            </div>

            {/* Reviews & Ratings */}
            <div className="ud-card">
              <h3 className="ud-card-title">Reviews & Ratings</h3>
              {/* You can use the image_20.png for stars or use SVG */}
              <div className="ud-stars">
                <span className="ud-star">★</span>
                <span className="ud-star">★</span>
                <span className="ud-star">★</span>
                <span className="ud-star">★</span>
                <span className="ud-star empty">★</span>
              </div>
              <p className="ud-review-text">
                Anna did a great job with gardening! She was professional and kind.
              </p>
            </div>
          </div>

          {/* Third Row: Job Categories & Quick Actions */}
          <div className="ud-cards-row">
            {/* Job Categories */}
            <div className="ud-card">
              <h3 className="ud-card-title">Job Categories</h3>
              <div className="ud-categories-grid">
                <div className="ud-category-item">
                  <div className="ud-category-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                      <path d="M12 3v18M12 3l-4 4M12 3l4 4M5 21h14"/>
                      <path d="M7 14c0-2 2-3 5-3s5 1 5 3"/>
                    </svg>
                  </div>
                  <span className="ud-category-label">Gardening</span>
                </div>
                <div className="ud-category-item">
                  <div className="ud-category-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                      <rect x="4" y="3" width="16" height="18" rx="2"/>
                      <path d="M8 7h8M8 11h8M8 15h4"/>
                    </svg>
                  </div>
                  <span className="ud-category-label">Tutoring</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="ud-card">
              <h3 className="ud-card-title">Quick Actions</h3>
              <div className="ud-qa-grid">
                <button className="ud-qa-btn primary" onClick={() => navigate("/jobs")}>
                  <div className="ud-qa-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  Find Work
                </button>
                <button className="ud-qa-btn">
                  <div className="ud-qa-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </div>
                  Edit Skills
                </button>
                <button className="ud-qa-btn" onClick={handlePostJob}>
                  <div className="ud-qa-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 8v8M8 12h8"/>
                    </svg>
                  </div>
                  Post a job
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;