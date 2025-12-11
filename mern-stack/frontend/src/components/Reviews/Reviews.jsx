import React, { useEffect, useState } from "react";
import IMG12581 from "./IMG-1258-1.png";
import clipPathGroup from "./clip-path-group.png";
import image from "./image.svg";
import star from "./star.svg";
import "./styleguide.css";
import "./Reviews.css";

// Convert numeric rating (1–5) into an array of star / empty icons
const buildRatingIcons = (ratingNumber) => {
  const full = Math.max(0, Math.min(5, Number(ratingNumber) || 0));
  const icons = [];

  for (let i = 0; i < 5; i++) {
    icons.push(i < full ? star : image);
  }
  return icons;
};

const ReviewCard = ({ rating, title, text, name, date }) => {
  const ratingIcons = buildRatingIcons(rating);

  return (
    <article className="review-card">
      <div
        className="rating"
        role="img"
        aria-label={`Rating: ${ratingIcons.filter((r) => r === star).length} out of 5 stars`}
      >
        {ratingIcons.map((src, index) => (
          <img key={index} className="star-icon" alt="" src={src} />
        ))}
      </div>
      <div className="review-content">
        <h3 className="review-title">{title}</h3>
        {text && <p className="review-text">{text}</p>}
      </div>
      <footer className="review-footer">
        <div className="avatar" role="img" aria-label={`${name}'s avatar`} />
        <div className="reviewer-info">
          <span className="reviewer-name">{name}</span>
          <time className="review-date">{date}</time>
        </div>
      </footer>
    </article>
  );
};

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/reviews");
        if (!res.ok) {
          throw new Error(`Failed to load reviews (status ${res.status})`);
        }

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Could not load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <main className="reviews">
      <header className="reviews-header">
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

          <div className="auth-buttons">
            <button className="btn-signin" type="button">
              Sign in
            </button>
            <button className="btn-register" type="button">
              Register
            </button>
          </div>
        </div>
      </header>

      <section className="reviews-section" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="section-heading">
          Latest reviews
        </h2>

        {loading && <p>Loading reviews...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="reviews-grid">
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  rating={review.rating}
                  title={review.title}
                  text={review.text}
                  name={review.name}
                  date={review.date}
                />
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
};
