import React, { useState } from "react";
import "./style.css";

export const ReportUserOrJob = () => {
  const [formData, setFormData] = useState({
    reason: "",
    additionalInfo: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const reportReasons = [
    "Inappropriate content",
    "Spam or scam",
    "Harassment or bullying",
    "False information",
    "Violation of terms",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reason) {
      newErrors.reason = "Please select a reason";
    }
    
    if (formData.additionalInfo.length > 500) {
      newErrors.additionalInfo = "Maximum 500 characters allowed";
    }
    
    return newErrors;
  };

  const handleReasonSelect = (reason) => {
    setFormData(prev => ({ ...prev, reason }));
    setIsOpen(false);
    setErrors(prev => ({ ...prev, reason: "" }));
  };

  const handleAdditionalInfoChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, additionalInfo: value }));
    
    if (value.length > 500) {
      setErrors(prev => ({ ...prev, additionalInfo: "Maximum 500 characters allowed" }));
    } else {
      setErrors(prev => ({ ...prev, additionalInfo: "" }));
    }
  };

  const handleConfirm = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // TODO: Backend API call here
    console.log("Report submitted:", formData);
    // Example: await fetch('/api/report', { method: 'POST', body: JSON.stringify(formData) })
    
    // Close modal or navigate away
    handleCancel();
  };

  const handleCancel = () => {
    // TODO: Close modal or navigate back
    console.log("Report cancelled");
    // Example: onClose() or navigate(-1)
  };

  return (
    <div className="report-modal-overlay">
      <div className="report-user-or-job">
        <h2 className="modal-title">Report</h2>
        <p className="modal-subtitle">Why are you reporting?</p>
        
        <div className="form-section">
          <div className="dropdown-container">
            <button
              type="button"
              className={`dropdown-trigger ${errors.reason ? 'error' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={formData.reason ? '' : 'placeholder'}>
                {formData.reason || 'Select option'}
              </span>
              <svg
                className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            
            {isOpen && (
              <div className="dropdown-menu">
                {reportReasons.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    className="dropdown-item"
                    onClick={() => handleReasonSelect(reason)}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {errors.reason && (
            <span className="error-message">{errors.reason}</span>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="additionalInfo" className="textarea-label">
            Anything else you want us to know?
          </label>
          <textarea
            id="additionalInfo"
            className={`textarea ${errors.additionalInfo ? 'error' : ''}`}
            placeholder="Optional: Provide additional details..."
            value={formData.additionalInfo}
            onChange={handleAdditionalInfoChange}
            maxLength={500}
          />
          <div className="character-count">
            {formData.additionalInfo.length}/500
          </div>
          {errors.additionalInfo && (
            <span className="error-message">{errors.additionalInfo}</span>
          )}
        </div>

        <div className="button-group">
          <button
            type="button"
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};