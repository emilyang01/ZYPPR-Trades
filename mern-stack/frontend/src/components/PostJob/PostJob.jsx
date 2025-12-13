import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";

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

  return (
    <div className="postjob-page">
      {/* top header bar */}
      <header className="postjob-header">
        <div className="postjob-brand">
          <span style={{ fontSize: 30 }}>Z</span>
          <span>YPPR Trades</span>
        </div>

        <div className="postjob-nav">
          <button type="button">Jobs</button>
          <button type="button" className="link">
            About ZYPPR
          </button>
          <button type="button" className="link">
            Customer Service
          </button>
        </div>

        <div className="postjob-userchip">
          <span>Your Name</span>
          <div className="postjob-avatar" />
        </div>
      </header>

      {/* main card */}
      <div className="postjob-wrap">
        <div className="postjob-card">
          <div className="postjob-card-header">
            <button className="postjob-backbtn" onClick={() => navigate(-1)} type="button">
              &lt;
            </button>
            <span>Job Details</span>
          </div>

          <div className="postjob-body">
            {/* title row */}
            <div className="postjob-title-row">
              <input
                className="postjob-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* if you have an edit icon image, put it here */}
              {/* <img className="postjob-edit-icon" src={editIcon} alt="edit" /> */}
            </div>

            {/* two columns */}
            <div className="postjob-grid">
              {/* left */}
              <div>
                <div className="postjob-section-title">Job Info</div>
                <textarea
                  className="postjob-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* right */}
              <div>
                <div className="postjob-section-title">Insert Images</div>

                <div className="postjob-images-row">
                  <div className="postjob-image-box">
                    {imageFile?.url ? (
                      <img src={imageFile.url} alt="preview" />
                    ) : null}
                  </div>

                  <button
                    type="button"
                    className="postjob-image-box"
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

                <div className="postjob-actions">
                  <div className="postjob-cost">Cost: ${cost}</div>
                  <button className="postjob-postbtn" onClick={onPost} type="button">
                    Post
                  </button>
                </div>
              </div>
            </div>
<div style={{ marginTop: 12 }}>
  <div style={{ fontWeight: 700, marginBottom: 6 }}>Hourly Rate</div>
  <input
    type="number"
    min="0"
    step="1"
    value={hourlyRate}
    onChange={(e) => setHourlyRate(e.target.value)}
    style={{
      width: 180,
      height: 40,
      border: "1px solid #bdbdbd",
      padding: "0 12px",
      fontSize: 18,
      outline: "none",
    }}
  />
</div>

            {/* hidden fields for now (still posts correct values) */}
            {/* category/hourlyRate/city already in state */}
          </div>
        </div>
      </div>
    </div>
  );
};
