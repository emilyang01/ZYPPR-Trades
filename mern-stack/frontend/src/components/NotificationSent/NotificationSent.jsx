import React from "react";
import "./NotificationSent.css";

export const NotificationSent = () => {
  return (
    <main
      className="notification-sent"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-title"
    >
      <section className="notification-card">
        <p id="notification-title" className="notification-message">
          Your Message Has Been Sent.
        </p>
        <button
          className="notification-button"
          type="button"
          aria-label="Acknowledge message"
        >
          OK
        </button>
      </section>
    </main>
  );
};
