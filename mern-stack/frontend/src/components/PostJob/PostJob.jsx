import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG_1258 1.png";
import "./PostJob.css";
import "../SharedHeader/SharedHeader.css";

export const PostJob = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [title, setTitle] = useState("Kitchen Sink Repair");
  const [description, setDescription] = useState("Pipe repair\nTools provided");
  const [category, setCategory] = useState("Plumbing");
  const [hourlyRate, setHourlyRate] = useState(60);
  const [city, setCity] = useState("Sacramento");

  const [imageFile, setImageFile] = useState(null);
  const cost = Number(hourlyRate || 0).toFixed(2);


  const pickImage = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile({
      url: URL.createObjectURL(file), // preview / placeholder
      filename: file.name,
      mimeType: file.type,
    });
  };

  const onPost = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please sign in again");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          hourly_rate: Number(hourlyRate),
          city,
          attachments: imageFile ? [imageFile] : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to post job");
        return;
      }

      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Server error while posting job");
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.email?.split('@')[0] || "User");

  return (
    <div className="postjob-page">
      {/* Header */}
      <header className="shared-header">
        <div className="shared-header-content">
          <button className="shared-back-button" aria-label="Go back" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="shared-logo-section" onClick={() => navigate("/")} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img className="shared-logo-image" alt="ZYPPR logo" src={IMG12581} />
            <h1 className="shared-logo-text">YPPR Trades</h1>
          </button>

          <nav className="shared-main-navigation" aria-label="Main navigation">
            <button className="shared-nav-link" onClick={() => navigate("/jobs")}>Jobs</button>
            <button className="shared-nav-link" onClick={() => navigate("/customer-service")}>Customer Service</button>
          </nav>

          <div className="shared-header-auth">
            <button className="postjob-userchip" onClick={() => navigate("/dashboard")}>
              <span>{userName}</span>
              <div className="postjob-avatar" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="postjob-wrap">
        <div className="postjob-card">
          <div className="postjob-card-header">
            <h2>Post a Job</h2>
          </div>

          <div className="postjob-body">
            <div className="postjob-form">
              {/* Job Title */}
              <div className="postjob-field">
                <label className="postjob-label">Job Title</label>
                <input
                  className="postjob-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Kitchen Sink Repair"
                />
              </div>

              {/* Job Description */}
              <div className="postjob-field">
                <label className="postjob-label">Job Description</label>
                <textarea
                  className="postjob-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the job details..."
                  rows={6}
                />
              </div>

              {/* Category and City Row */}
              <div className="postjob-row">
                <div className="postjob-field">
                  <label className="postjob-label">Category</label>
                  <select
                    className="postjob-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="postjob-field">
                  <label className="postjob-label">City</label>
                  <select
                    className="postjob-select"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Sacramento">Sacramento</option>
                    <option value="Elk Grove">Elk Grove</option>
                    <option value="Roseville">Roseville</option>
                    <option value="Folsom">Folsom</option>
                    <option value="Davis">Davis</option>
                  </select>
                </div>
              </div>

              {/* Hourly Rate */}
              <div className="postjob-field">
                <label className="postjob-label">Hourly Rate ($)</label>
                <input
                  className="postjob-input"
                  type="number"
                  min="0"
                  step="1"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="60"
                />
              </div>

              {/* Images */}
              <div className="postjob-field">
                <label className="postjob-label">Job Images (Optional)</label>
                <div className="postjob-images-row">
                  {imageFile?.url && (
                    <div className="postjob-image-box">
                      <img src={imageFile.url} alt="preview" />
                    </div>
                  )}

                  <button
                    type="button"
                    className="postjob-image-box postjob-add-image"
                    onClick={pickImage}
                    aria-label="Add image"
                  >
                    <div className="postjob-plus">+</div>
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={onFileChange}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="postjob-actions">
                <button className="postjob-cancel-btn" onClick={() => navigate(-1)} type="button">
                  Cancel
                </button>
                <button className="postjob-post-btn" onClick={onPost} type="button">
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
