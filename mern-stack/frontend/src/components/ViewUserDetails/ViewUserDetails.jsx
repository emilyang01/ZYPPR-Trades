import React from "react";
import IMG12581 from "./IMG-1258-1.png";
import chatCircleDots from "./chat-circle-dots.svg";
// removed clipPathGroup image (it contained a large non-clickable arrow)
import userCirclePlus from "./user-circle-plus.svg";
import userList from "./user-list.svg";
import "./styleguide.css";
import "./ViewUserDetails.css";

export const ViewUserDetails = () => {
  return (
    <main className="view-user-details">
      <header className="user-header">
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
            <button className="nav-link">About ZYPPR</button>
            <button className="nav-link">Customer Service</button>
          </nav>

          <div className="header-auth">
            <button className="signin-button">Sign in</button>
            <button className="register-button">Register</button>
          </div>
        </div>
      </header>

      <div className="user-content">
        <aside className="left-sidebar">
          <div className="user-stats">
            <button className="stat-item">
              <img src={userList} alt="" />
              <span>Followers (4)</span>
            </button>
            <button className="stat-item">
              <img src={userCirclePlus} alt="" />
              <span>Following (9)</span>
            </button>
            <button className="stat-item message-btn">
              <img src={chatCircleDots} alt="" />
              <span>Message</span>
            </button>
          </div>

          <button className="follow-button">Follow</button>

          <section className="availability-section">
            <h2 className="sidebar-heading">Availability</h2>
            <ul className="availability-list">
              <li className="available">Monday <span className="check">✓</span></li>
              <li className="available">Tuesday <span className="check">✓</span></li>
              <li>Wednesday</li>
              <li>Thursday</li>
              <li className="available">Friday <span className="check">✓</span></li>
              <li>Saturday</li>
              <li className="available">Sunday <span className="check">✓</span></li>
            </ul>
          </section>

          <div className="rating-section">
            <div className="stars">
              <span>★★★★☆</span>
              <span className="rating-number">4</span>
            </div>
            <button className="see-reviews-btn">See Reviews</button>
          </div>

          <button className="view-resume-btn">View Resume</button>
          <button className="report-user-btn">Report User</button>
        </aside>

        <div className="main-content">
          <section className="profile-header">
            <div className="profile-image">
              <div className="avatar-large">M</div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">Martha Williams</h1>
              <div className="contact-info">
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.33 3.33h13.34v10h-13.34z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.33 5l6.67 5 6.67-5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <a href="mailto:Martha.Williams@Yahoo.com">Martha.Williams@Yahoo.com</a>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 3h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <a href="tel:+19164978359">(916) 497-8359</a>
                </div>
              </div>
              <p className="profile-bio">
                Motivated and reliable to work on house maintenance. Always aiming to offer the best quality of work for customers.
              </p>
            </div>
          </section>

          <section className="info-sections">
            <div className="info-item">
              <h3 className="info-heading">My Skills</h3>
              <p className="info-text">House cleaning, moving, tech assistance, painting</p>
            </div>
            <div className="info-item">
              <h3 className="info-heading">Location</h3>
              <p className="info-text">Sacramento, CA</p>
            </div>
            <div className="info-item">
              <h3 className="info-heading">Languages</h3>
              <p className="info-text">English</p>
            </div>
          </section>

          <section className="jobs-section">
            <h2 className="section-heading">Jobs</h2>
            <div className="jobs-grid">
              <article className="job-card">
                <div className="job-icon painter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L4 6v4c0 6 3 10 8 12 5-2 8-6 8-12V6l-8-4z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="job-title">Painter</h3>
                <p className="job-subtitle">Painter</p>
              </article>

              <article className="job-card">
                <div className="job-icon mover">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="job-title">Mover</h3>
                <p className="job-subtitle">Mover</p>
              </article>

              <article className="job-card">
                <div className="job-icon electrician">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="job-title">Electrician</h3>
                <p className="job-subtitle">Electrician</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};