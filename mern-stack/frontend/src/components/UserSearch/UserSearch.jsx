import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG-1258-1.png";
import check from "./check.svg";
import x from "./x.svg";
import search from "./search.svg";
import "./UserSearch.css";
import "../SharedHeader/SharedHeader.css";

const KeywordTags = ({ keywords, onRemove }) => (
  <div className="user-search-keyword-list">
    {keywords.map((tag) => (
      <div className="user-search-tag" key={tag}>
        <span className="user-search-tag-text">{tag}</span>
        <img className="user-search-tag-icon" alt="Remove tag" src={x} onClick={() => onRemove(tag)} style={{ cursor: 'pointer' }} />
      </div>
    ))}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <div className="user-search-checkbox-field">
    <div className="user-search-checkbox-wrapper" onClick={onChange} style={{ cursor: 'pointer' }}>
      <div className="user-search-checkbox" style={{ backgroundColor: checked ? '#007bff' : 'transparent' }}>
        {checked && <img className="user-search-check-icon" alt="Check" src={check} />}
      </div>
      <label className="user-search-label">{label}</label>
    </div>
  </div>
);

const FilterSection = ({ title, options, filters, onToggle }) => (
  <section className="user-search-filter-section">
    <div className="user-search-section-title-wrapper">
      <span className="user-search-section-title">{title}</span>
    </div>
    <div className="user-search-options-wrapper">
      {options.map((option) => (
        <Checkbox key={option.key} label={option.label} checked={filters[option.key]} onChange={() => onToggle(option.key)} />
      ))}
    </div>
  </section>
);

const HourlyRateSlider = ({ min, max }) => (
  <section className="user-search-filter-section">
    <div className="user-search-slider-label">
      <label className="user-search-label">Hourly rate</label>
      <div className="user-search-slider-output">
        <span className="user-search-price">${min}–{max}</span>
      </div>
    </div>
    <div className="user-search-slider">
      <div className="user-search-slider-track">
        <div className="user-search-slider-thumb" />
        <div className="user-search-slider-fill" />
        <div className="user-search-slider-thumb" />
      </div>
    </div>
  </section>
);

const FilterMenu = ({ keywords, onRemoveKeyword, filters, onToggleFilter, hourlyRate }) => (
  <aside className="user-search-filter-menu">
    <div className="user-search-filter-section">
      <div className="user-search-section-title-wrapper">
        <span className="user-search-section-title">Keywords</span>
      </div>
      <KeywordTags keywords={keywords} onRemove={onRemoveKeyword} />
    </div>
    <section className="user-search-checkboxes-section">
      <Checkbox label="Verified worker" checked={filters.verifiedWorker} onChange={() => onToggleFilter('verifiedWorker')} />
      <Checkbox label="Available today" checked={filters.availableToday} onChange={() => onToggleFilter('availableToday')} />
      <Checkbox label="Top rated" checked={filters.topRated} onChange={() => onToggleFilter('topRated')} />
    </section>
    <HourlyRateSlider min={hourlyRate.min} max={hourlyRate.max} />
    <FilterSection
      title="Location"
      options={[
        { key: 'sacramento', label: 'Sacramento' },
        { key: 'elkGrove', label: 'Elk Grove' },
        { key: 'roseville', label: 'Roseville' }
      ]}
      filters={filters.locations}
      onToggle={(key) => onToggleFilter('locations', key)}
    />
    <FilterSection
      title="Size"
      options={[
        { key: 'beginner', label: 'Beginner' },
        { key: 'intermediate', label: 'Intermediate' },
        { key: 'expert', label: 'Expert' }
      ]}
      filters={filters.sizes}
      onToggle={(key) => onToggleFilter('sizes', key)}
    />
  </aside>
);

const UserCard = ({ name, rating, location, price, imageClass, userId, onClick }) => (
  <article className="user-search-user-card" onClick={() => onClick(userId)} style={{ cursor: 'pointer' }}>
    <div className={`user-search-card-image ${imageClass}`} />
    <div className="user-search-card-body">
      <div className="user-search-card-info">
        <p className="user-search-card-name">{name}</p>
        <p className="user-search-card-details">
          ⭐ {rating} | 📍{location}
        </p>
      </div>
      <div className="user-search-card-price-wrapper">
        <strong className="user-search-card-price">${price}</strong>
      </div>
    </div>
  </article>
);

const ProductGrid = ({ onUserClick }) => (
  <section className="user-search-product-grid">
    <div className="user-search-cards-grid">
      <UserCard
        userId="1"
        name="Martha Williams"
        rating="4.9"
        location="Sacramento, CA"
        price="45"
        imageClass="user-search-image-1"
        onClick={onUserClick}
      />
      <UserCard
        userId="2"
        name="Kade Brown"
        rating="4.8"
        location="Elk Grove, CA"
        price="40"
        imageClass="user-search-image-2"
        onClick={onUserClick}
      />
      <UserCard
        userId="3"
        name="Sophie Breault"
        rating="4.7"
        location="Roseville, CA"
        price="35"
        imageClass="user-search-image-3"
        onClick={onUserClick}
      />
      <UserCard
        userId="4"
        name="Jack Maddocks"
        rating="4.7"
        location="Sacramento, CA"
        price="38"
        imageClass="user-search-image-4"
        onClick={onUserClick}
      />
      <UserCard
        userId="5"
        name="Kate Walker"
        rating="4.6"
        location="Elk Grove, CA"
        price="39"
        imageClass="user-search-image-5"
        onClick={onUserClick}
      />
      <UserCard
        userId="6"
        name="Mark Miller"
        rating="4.4"
        location="Sacramento, CA"
        price="43"
        imageClass="user-search-image-6"
        onClick={onUserClick}
      />
    </div>
  </section>
);

const SearchControls = ({ searchTerm, onSearchChange, onNavigateToJobs }) => (
  <div className="user-search-controls">
    <button className="user-search-control-button active">
      Search Users
    </button>
    <button className="user-search-control-button" onClick={onNavigateToJobs}>
      Search Jobs
    </button>

    <div className="user-search-input-wrapper">
      <input
        className="user-search-input"
        placeholder="Search Reports"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <img className="user-search-search-icon" alt="Search" src={search} />
    </div>
  </div>
);

export const UserSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [keywords, setKeywords] = useState(["Painter", "Rating", "Woman"]);
  const [filters, setFilters] = useState({
    verifiedWorker: false,
    availableToday: false,
    topRated: false,
    locations: { sacramento: false, elkGrove: false, roseville: false },
    sizes: { beginner: false, intermediate: false, expert: false }
  });
  const [hourlyRate, setHourlyRate] = useState({ min: 25, max: 100 });

  const toggleFilter = (category, key) => {
    if (key) {
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

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="user-search">
      <div className="user-search-container">
        {/* Header Section */}
        <div className="user-search-header-section">
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
                <button className="shared-nav-link" onClick={() => navigate("/customer-service")}>Customer Service</button>
              </nav>

              <div className="shared-header-auth">
                <button className="shared-signin-button" onClick={() => navigate("/login")}>Sign in</button>
                <button className="shared-register-button" onClick={() => navigate("/signup")}>Register</button>
              </div>
            </div>
          </header>
        </div>

        {/* Search Controls */}
        <div className="user-search-main-content">
          <SearchControls 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            onNavigateToJobs={() => navigate("/jobs")}
          />
          <div className="user-search-content-wrapper">
            <FilterMenu 
              keywords={keywords}
              onRemoveKeyword={removeKeyword}
              filters={filters}
              onToggleFilter={toggleFilter}
              hourlyRate={hourlyRate}
            />
            <ProductGrid onUserClick={handleUserClick} />
          </div>
        </div>
      </div>
    </div>
  );
};