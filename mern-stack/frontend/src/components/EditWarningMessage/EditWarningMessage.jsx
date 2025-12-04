import React from "react";
import clipPathGroup from "./clip-path-group.png";
import "./EditWarningMessage.css";

export const EditWarningMessage = () => {
  return (
    <main className="edit-warning-message">
      <img
        className="clip-path-group"
        alt="Back"
        src={clipPathGroup}
        aria-hidden="true"
      />

      <section
        className="message-container"
        role="region"
        aria-labelledby="message-title"
      >
        <header className="message-header">
          <h1 id="message-title" className="message-title">
            Warning Message
          </h1>
        </header>

        <article className="message-body">
          <p>
            <strong>TO:</strong> Martha Williams
            <br />
            <strong>FROM:</strong> ZYPPR
            <br />
            <strong>SUBJECT:</strong> Your profile or content has been flagged
          </p>

          <p>
            This is a warning from ZYPPR. Your account has been reported as
            containing or promoting things against our Terms of Service. Your
            account is in danger of being banned. If you have any questions or
            you think there has been a mistake, please email us at{" "}
            <a href="mailto:zyppr@gmail.com">zyppr@gmail.com</a>
          </p>

          <p>Best wishes, the ZYPPR team.</p>
        </article>
      </section>

      <footer className="message-footer">
        <p className="edit-note">
          You may edit this message before sending it.
        </p>
        <div className="button-group">
          <button type="button" className="btn cancel">
            Cancel
          </button>
          <button type="button" className="btn send">
            Send
          </button>
        </div>
      </footer>
    </main>
  );
};