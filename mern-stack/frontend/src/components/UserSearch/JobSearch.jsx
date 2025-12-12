import React from "react";
import IMG12581 from "./IMG_1258 1.png";
import search from "./Search.svg";
import clipPathGroup from "./Clip path group.png";
import x from "./x.svg";
import check from "./check.svg";
import "./JobSearch.css";
import "../SharedHeader/SharedHeader.css";

export const JobSearch = () => {
  return (
    <div className="job-search">
      <div className="job-search-container">
        {/* Header Section - unified header like other pages */}
        <div className="job-search-header-section">
          <header className="shared-header">
            <div className="shared-header-content">
              <button className="shared-back-button" aria-label="Go back" onClick={() => window.history.back()}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="shared-logo-section">
                <img className="shared-logo-image" alt="ZYPPR logo" src={IMG12581} />
                <h1 className="shared-logo-text">YPPR Trades</h1>
              </div>

              <nav className="shared-main-navigation" aria-label="Main navigation">
                <button className="shared-nav-link">About ZYPPR</button>
                <button className="shared-nav-link">Customer Service</button>
              </nav>

              <div className="shared-header-auth">
                <button className="shared-signin-button">Sign in</button>
                <button className="shared-register-button">Register</button>
              </div>
            </div>
          </header>
        </div>

        {/* Search Controls */}
        <div className="job-search-controls">
          <button className="job-search-control-button">Search Users</button>
          <button className="job-search-control-button active">
            Search Jobs
          </button>

          <div className="job-search-input-wrapper">
            <input
              className="job-search-input"
              placeholder="Search Reports"
              type="text"
            />
            <img className="job-search-search-icon" alt="Search" src={search} />
          </div>
        </div>

        {/* Main Content */}
        <div className="job-search-main-content">
          <div className="job-search-content-wrapper">
            {/* Filter Menu */}
            <div className="job-search-filter-menu">
              <div className="job-search-filter-section">
                <div className="job-search-section-title-wrapper">
                  <div className="job-search-section-title">Keywords</div>
                </div>

                <div className="job-search-keyword-list">
                  <div className="job-search-tag">
                    <div className="job-search-tag-text">Painter</div>
                    <img className="job-search-tag-icon" alt="X" src={x} />
                  </div>
                  <div className="job-search-tag">
                    <div className="job-search-tag-text">Rating</div>
                    <img className="job-search-tag-icon" alt="X" src={x} />
                  </div>
                  <div className="job-search-tag">
                    <div className="job-search-tag-text">Woman</div>
                    <img className="job-search-tag-icon" alt="X" src={x} />
                  </div>
                </div>
              </div>

              <div className="job-search-filter-section">
                <div className="job-search-checkboxes-section">
                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Verified worker</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Available today</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Top rated</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="job-search-filter-section">
                <div className="job-search-slider-label">
                  <div className="job-search-label">Hourly rate</div>
                  <div className="job-search-slider-output">
                    <div className="job-search-price">$25-100</div>
                  </div>
                </div>

                <div className="job-search-slider">
                  <div className="job-search-slider-track">
                    <div className="job-search-slider-thumb" />
                    <div className="job-search-slider-fill" />
                    <div className="job-search-slider-thumb" />
                  </div>
                </div>
              </div>

              <div className="job-search-filter-section">
                <div className="job-search-section-title-wrapper">
                  <div className="job-search-section-title">Location</div>
                </div>

                <div className="job-search-options-wrapper">
                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Sacramento</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Elk Grove</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Roseville</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="job-search-filter-section">
                <div className="job-search-section-title-wrapper">
                  <div className="job-search-section-title">Size</div>
                </div>

                <div className="job-search-options-wrapper">
                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Beginner</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Intermediate</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper">
                      <div className="job-search-checkbox">
                        <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />
                      </div>
                      <div className="job-search-label">Expert</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="job-search-product-grid">
              <div className="job-search-cards-grid">
                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">
                      Commission mural painting
                    </div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Painter</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service offered
                    </div>
                  </div>
                </div>

                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">
                      Tutor Needed!
                    </div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Tutor</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service requested
                    </div>
                  </div>
                </div>

                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">
                      Electrician needed
                    </div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Electrician</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service requested
                    </div>
                  </div>
                </div>

                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">Gardener</div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Gardener</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service offered
                    </div>
                  </div>
                </div>

                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">
                      Movers (includes going upstairs)
                    </div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Mover</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service requested
                    </div>
                  </div>
                </div>

                <div className="job-search-job-card">
                  <div className="job-search-card-body">
                    <div className="job-search-card-heading">
                      Housekeeping and co.
                    </div>
                    <div className="job-search-card-info-row">
                      <div className="job-search-card-avatar"></div>
                      <div className="job-search-card-role">Housekeeper</div>
                    </div>
                    <div className="job-search-card-footer">
                      Service offered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};