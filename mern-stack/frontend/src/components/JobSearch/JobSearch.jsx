import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG_1258 1.png";
import search from "./Search.svg";
import clipPathGroup from "./Clip path group.png";
import x from "./x.svg";
import check from "./check.svg";
import "./JobSearch.css";
import "../SharedHeader/SharedHeader.css";

export const JobSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    verifiedWorker: false,
    availableToday: false,
    topRated: false,
    locations: { sacramento: false, elkGrove: false, roseville: false },
    sizes: { beginner: false, intermediate: false, expert: false },
    hourlyRate: { min: 25, max: 100 }
  });
  const [keywords, setKeywords] = useState(["Painter", "Rating", "Woman"]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFilter = (category, key) => {
    if (typeof filters[category] === 'object' && filters[category] !== null) {
      setFilters(prev => ({
        ...prev,
        [category]: { ...prev[category], [key]: !prev[category][key] }
      }));
    } else {
      setFilters(prev => ({ ...prev, [category]: !prev[category] }));
    }
  };

  const removeKeyword = (keyword) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleRateChange = (value, type) => {
    setFilters(prev => ({
      ...prev,
      hourlyRate: { ...prev.hourlyRate, [type]: value }
    }));
  };

    const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // search text -> q
      if (searchTerm.trim()) params.set("q", searchTerm.trim());

      // hourly rate -> minRate/maxRate
      if (filters.hourlyRate?.min) params.set("minRate", String(filters.hourlyRate.min));
      if (filters.hourlyRate?.max) params.set("maxRate", String(filters.hourlyRate.max));

      // locations -> city (pick the first checked)
      const selectedCity =
        (filters.locations.sacramento && "Sacramento") ||
        (filters.locations.elkGrove && "Elk Grove") ||
        (filters.locations.roseville && "Roseville") ||
        "";
      if (selectedCity) params.set("city", selectedCity);

      const url = `http://localhost:5000/api/jobs?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        console.error("Jobs fetch failed:", data);
        setJobs([]);
        return;
      }

      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Jobs fetch error:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce typing + refetch when filters change
  useEffect(() => {
    const t = setTimeout(() => {
      fetchJobs();
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchTerm,
    filters.hourlyRate.min,
    filters.hourlyRate.max,
    filters.locations.sacramento,
    filters.locations.elkGrove,
    filters.locations.roseville,
  ]);

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
                <button className="shared-signin-button" onClick={() => navigate("/login")}>Sign in</button>
                <button className="shared-register-button" onClick={() => navigate("/signup")}>Register</button>
              </div>
            </div>
          </header>
        </div>

        {/* Search Controls */}
        <div className="job-search-controls">
          <button className="job-search-control-button" onClick={() => navigate("/users")}>Search Users</button>
          <button className="job-search-control-button active">
            Search Jobs
          </button>

          <div className="job-search-input-wrapper">
            <input
              className="job-search-input"
              placeholder="Search Reports"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  {keywords.map((keyword) => (
                    <div className="job-search-tag" key={keyword}>
                      <div className="job-search-tag-text">{keyword}</div>
                      <img className="job-search-tag-icon" alt="X" src={x} onClick={() => removeKeyword(keyword)} style={{ cursor: 'pointer' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="job-search-filter-section">
                <div className="job-search-checkboxes-section">
                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('verifiedWorker')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.verifiedWorker ? '#007bff' : 'transparent' }}>
                        {filters.verifiedWorker && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Verified worker</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('availableToday')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.availableToday ? '#007bff' : 'transparent' }}>
                        {filters.availableToday && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Available today</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('topRated')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.topRated ? '#007bff' : 'transparent' }}>
                        {filters.topRated && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
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
                    <div className="job-search-price">${filters.hourlyRate.min}-{filters.hourlyRate.max}</div>
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
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('locations', 'sacramento')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.locations.sacramento ? '#007bff' : 'transparent' }}>
                        {filters.locations.sacramento && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Sacramento</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('locations', 'elkGrove')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.locations.elkGrove ? '#007bff' : 'transparent' }}>
                        {filters.locations.elkGrove && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Elk Grove</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('locations', 'roseville')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.locations.roseville ? '#007bff' : 'transparent' }}>
                        {filters.locations.roseville && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
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
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('sizes', 'beginner')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.sizes.beginner ? '#007bff' : 'transparent' }}>
                        {filters.sizes.beginner && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Beginner</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('sizes', 'intermediate')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.sizes.intermediate ? '#007bff' : 'transparent' }}>
                        {filters.sizes.intermediate && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
                      </div>
                      <div className="job-search-label">Intermediate</div>
                    </div>
                  </div>

                  <div className="job-search-checkbox-field">
                    <div className="job-search-checkbox-wrapper" onClick={() => toggleFilter('sizes', 'expert')} style={{ cursor: 'pointer' }}>
                      <div className="job-search-checkbox" style={{ backgroundColor: filters.sizes.expert ? '#007bff' : 'transparent' }}>
                        {filters.sizes.expert && <img
                          className="job-search-check-icon"
                          alt="Check"
                          src={check}
                        />}
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
                {loading && <div style={{ padding: 12 }}>Loading jobs...</div>}

                {!loading && jobs.length === 0 && (
                  <div style={{ padding: 12 }}>No jobs found.</div>
                )}

                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="job-search-job-card"
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="job-search-card-body">
                      <div className="job-search-card-heading">
                        {job.title}
                      </div>

                      <div className="job-search-card-info-row">
                        <div className="job-search-card-avatar"></div>
                        <div className="job-search-card-role">
                          {job.category}
                        </div>
                      </div>

                      <div className="job-search-card-footer">
                        {job.city || "Location not set"}
                        {job.hourly_rate ? ` • $${job.hourly_rate}/hr` : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
