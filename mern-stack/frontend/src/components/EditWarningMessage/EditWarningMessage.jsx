import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditWarningMessage.css";
import "../SharedHeader/SharedHeader.css";

export const EditWarningMessage = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSend = () => {
    // TODO: Send warning message to backend
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    navigate("/admin/feedback");
  };

  const handleOk = () => {
    setShowConfirmation(false);
    navigate("/admin/feedback");
  };

  return (
    <main className="edit-warning-message">
      <button className="shared-back-button" aria-label="Go back" onClick={() => navigate(-1)} style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 3 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

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
          <button type="button" className="btn cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="btn send" onClick={handleSend}>
            Send
          </button>
        </div>
      </footer>

      {/* Confirmation Popup Overlay */}
      {showConfirmation && (
        <section
          className="confirmation-pop-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmation-title"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div className="popup-container" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            minWidth: '300px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div className="popup-content">
              <h2 id="confirmation-title" className="popup-title" style={{
                fontSize: '24px',
                marginBottom: '24px',
                fontWeight: '600'
              }}>
                Sent!
              </h2>
              <button className="popup-button" type="button" onClick={handleOk} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 32px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Ok
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};