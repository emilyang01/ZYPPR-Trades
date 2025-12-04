import React from "react";
import IMG12581 from "./IMG-1258-1.png";
import check from "./check.svg";
import clipPathGroup from "./clip-path-group.png";
import x from "./x.svg";
import "./UserSearch.css";

const NavigationPills = () => (
  <nav className="user-search-navigation-pill-list">
    <div className="user-search-navigation-pill">
      <span className="user-search-nav-title">About ZYPPR</span>
    </div>
    <div className="user-search-navigation-pill">
      <span className="user-search-nav-title">Customer Service</span>
    </div>
  </nav>
);

const AuthButtons = () => (
  <div className="user-search-header-auth">
    <button className="user-search-auth-button">
      <span className="user-search-button-text">Sign in</span>
    </button>
    <button className="user-search-auth-button-register">
      <span className="user-search-button-text">Register</span>
    </button>
  </div>
);

const Header = () => (
  <header className="user-search-header">
    <NavigationPills />
    <AuthButtons />
  </header>
);

const TradesHeader = () => (
  <div className="user-search-trades-header">
    <button className="user-search-back-button">
      <img src={clipPathGroup} alt="Back" className="user-search-back-icon" />
    </button>
    <div className="user-search-trades-content">
      <img className="user-search-logo" alt="Logo" src={IMG12581} />
      <h1 className="user-search-title">YPPR Trades</h1>
    </div>
  </div>
);

const KeywordTags = () => (
  <div className="user-search-keyword-list">
    {["Painter", "Rating", "Woman"].map((tag) => (
      <div className="user-search-tag" key={tag}>
        <span className="user-search-tag-text">{tag}</span>
        <img className="user-search-tag-icon" alt="Remove tag" src={x} />
      </div>
    ))}
  </div>
);

const Checkbox = ({ label }) => (
  <div className="user-search-checkbox-field">
    <div className="user-search-checkbox-wrapper">
      <div className="user-search-checkbox">
        <img className="user-search-check-icon" alt="Check" src={check} />
      </div>
      <label className="user-search-label">{label}</label>
    </div>
  </div>
);

const FilterSection = ({ title, options }) => (
  <section className="user-search-filter-section">
    <div className="user-search-section-title-wrapper">
      <span className="user-search-section-title">{title}</span>
    </div>
    <div className="user-search-options-wrapper">
      {options.map((option) => (
        <Checkbox key={option} label={option} />
      ))}
    </div>
  </section>
);

const HourlyRateSlider = () => (
  <section className="user-search-filter-section">
    <div className="user-search-slider-label">
      <label className="user-search-label">Hourly rate</label>
      <div className="user-search-slider-output">
        <span className="user-search-price">$25–100</span>
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

const FilterMenu = () => (
  <aside className="user-search-filter-menu">
    <div className="user-search-filter-section">
      <div className="user-search-section-title-wrapper">
        <span className="user-search-section-title">Keywords</span>
      </div>
      <KeywordTags />
    </div>
    <section className="user-search-checkboxes-section">
      {["Verified worker", "Available today", "Top rated"].map((label) => (
        <Checkbox key={label} label={label} />
      ))}
    </section>
    <HourlyRateSlider />
    <FilterSection
      title="Location"
      options={["Sacramento", "Elk Grove", "Roseville"]}
    />
    <FilterSection
      title="Size"
      options={["Beginner", "Intermediate", "Expert"]}
    />
  </aside>
);

const UserCard = ({ name, rating, location, price, imageClass }) => (
  <article className="user-search-user-card">
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

const ProductGrid = () => (
  <section className="user-search-product-grid">
    <div className="user-search-cards-grid">
      <UserCard
        name="Martha Williams"
        rating="4.9"
        location="Sacramento, CA"
        price="45"
        imageClass="user-search-image-1"
      />
      <UserCard
        name="Kade Brown"
        rating="4.8"
        location="Elk Grove, CA"
        price="40"
        imageClass="user-search-image-2"
      />
      <UserCard
        name="Sophie Breault"
        rating="4.7"
        location="Roseville, CA"
        price="35"
        imageClass="user-search-image-3"
      />
      <UserCard
        name="Jack Maddocks"
        rating="4.7"
        location="Sacramento, CA"
        price="38"
        imageClass="user-search-image-4"
      />
      <UserCard
        name="Kate Walker"
        rating="4.6"
        location="Elk Grove, CA"
        price="39"
        imageClass="user-search-image-5"
      />
      <UserCard
        name="Mark Miller"
        rating="4.4"
        location="Sacramento, CA"
        price="43"
        imageClass="user-search-image-6"
      />
    </div>
  </section>
);

const SearchControls = () => (
  <div className="user-search-controls">
    <button className="user-search-control-button active">
      <span>Search Users</span>
    </button>
    <button className="user-search-control-button">
      <span>Search Jobs</span>
    </button>
    <div className="user-search-input-wrapper">
      <input className="user-search-input" placeholder="Search" type="text" />
      <span className="user-search-search-icon">🔍</span>
    </div>
  </div>
);

export const UserSearch = () => {
  return (
    <main className="user-search">
      <div className="user-search-container">
        <div className="user-search-header-section">
          <Header />
          <TradesHeader />
        </div>
        <div className="user-search-main-content">
          <SearchControls />
          <div className="user-search-content-wrapper">
            <FilterMenu />
            <ProductGrid />
          </div>
        </div>
      </div>
    </main>
  );
};