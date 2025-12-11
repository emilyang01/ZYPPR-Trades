import React from "react";
import IMG12581 from "./IMG-1258-1.png";
import clipPathGroup from "./clip-path-group.png";
import image from "./image.svg";
import star from "./star.svg";
import "./styleguide.css";
import "./Reviews.css";

const reviewsData = [
  {
    rating: [star, star, star, image, image],
    title: "Expected better...",
    text: "Arrived late",
    name: "Martin",
    date: "10/19",
  },
  {
    rating: [star, star, star, star, star],
    title: "Perfect!!",
    text: "",
    name: "Lou boudin",
    date: "10/18",
  },
  {
    rating: [star, star, star, star, image],
    title: "Good",
    text: "Very friendly",
    name: "Elena Mercioiu",
    date: "10/17",
  },
];

const ReviewCard = ({ rating, title, text, name, date }) => (
  <article className="review-card">
    <div
      className="rating"
      role="img"
      aria-label={`Rating: ${rating.filter((r) => r === star).length} out of 5 stars`}
    >
      {rating.map((src, index) => (
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
        <time className="review-date" dateTime={`2023-${date.replace("/", "-")}`}>
          {date}
        </time>
      </div>
    </footer>
  </article>
);

export const Reviews = () => {
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

        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        <div className="reviews-grid">
          {reviewsData.map((review, index) => (
            <ReviewCard key={`row2-${index}`} {...review} />
          ))}
        </div>
      </section>
    </main>
  );
};