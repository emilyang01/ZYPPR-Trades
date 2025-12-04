import React from "react";
import "./ConfirmationPopUp.css";

export const ConfirmationPopUp = () => {
  return (
    <section
      className="confirmation-pop-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div className="popup-container">
        <div className="popup-content">
          <h2 id="confirmation-title" className="popup-title">
            Sent!
          </h2>
          <button className="popup-button" type="button">
            Ok
          </button>
        </div>
      </div>
    </section>
  );
};
