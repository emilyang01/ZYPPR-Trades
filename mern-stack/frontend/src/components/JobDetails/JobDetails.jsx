import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IMG12821 from "./IMG-1282-1.png";
import IMG12581 from "./IMG-1258-1.png";
import chatCircleDots from "./chat-circle-dots.svg";
import "./JobDetails.css";

export const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const handleBack = () => navigate(-1);

  const handleNavClick = (nav) => {
    if (nav === "Jobs") navigate("/jobs");
  };

  const handleContactClient = () => {
    console.log("Contact client (TODO)");
  };

  // ✅ IMPORTANT: route to confirmation page with job data
  // (If you don’t have this route yet, keep it for later — it won’t break anything unless clicked)
  const handleApply = () => {
    if (!job) return;
    navigate(`/jobs/${jobId}/confirm`, { state: { job } });
  };

  const handleReport = () => {
    navigate(`/report/job/${jobId}`);
  };

  // ✅ Load the job from backend
  // Since your backend currently has GET /api/jobs (list) and NOT /api/jobs/:id,
  // we fetch the list then find the one matching jobId.
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErrMsg("");

        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();

        if (!res.ok) {
          setErrMsg(data?.message || "Failed to load jobs");
          setJob(null);
          return;
        }

        const found = Array.isArray(data)
          ? data.find((j) => String(j?._id) === String(jobId))
          : null;

        if (!found) {
          setErrMsg("Job not found.");
          setJob(null);
          return;
        }

        setJob(found);
      } catch (e) {
        console.error(e);
        setErrMsg("Server error while loading job.");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) load();
  }, [jobId]);

  // Helpers (no CSS changes)
  const postedDate = job?.createdAt
    ? new Date(job.createdAt).toLocaleDateString()
    : "";

  const clientName =
    job?.posted_by?.name ||
    [job?.posted_by?.first_name, job?.posted_by?.last_name].filter(Boolean).join(" ") ||
    "Client";

  const clientCity = job?.posted_by?.city || job?.city || "";

  const imageUrl = job?.attachments?.[0]?.url || IMG12821;

  const payText =
    typeof job?.hourly_rate === "number"
      ? `$${job.hourly_rate}/hr`
      : "$0/hr";

  const descriptionLines = (job?.description || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="job-details">
      <header className="job-header">
        <div className="header-content">
          <button className="back-button" aria-label="Go back" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="logo-section">
            <img className="logo-image" alt="ZYPPR logo" src={IMG12581} />
            <h1 className="logo-text">YPPR Trades</h1>
          </div>

          <nav className="main-navigation" aria-label="Main navigation">
            <button className="nav-link" onClick={() => handleNavClick("Jobs")}>
              Jobs
            </button>
            <button className="nav-link" onClick={() => handleNavClick("About ZYPPR")}>
              About ZYPPR
            </button>
            <button className="nav-link" onClick={() => handleNavClick("Customer Service")}>
              Customer Service
            </button>
          </nav>

          <div className="header-auth">
            <button className="user-button">
              <span>Your Name</span>
              <div className="avatar" />
            </button>
          </div>
        </div>
      </header>

      <div className="job-content">
        <article className="job-card">
          <header className="job-card-header">
            <button className="back-link" aria-label="Go back" onClick={handleBack}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <h2 className="card-title">Job Details</h2>

            <time className="posted-date">{postedDate ? `Posted on ${postedDate}` : ""}</time>
          </header>

          {loading && <div style={{ padding: 12 }}>Loading...</div>}
          {!loading && errMsg && <div style={{ padding: 12, color: "red" }}>{errMsg}</div>}

          {!loading && job && (
            <>
              <h3 className="job-title">{job.title || "Untitled Job"}</h3>

              <div className="job-info-grid">
                <section className="client-section">
                  <h4 className="section-heading">Client</h4>

                  <address className="client-info">
                    <p className="client-name">{clientName}</p>
                    <p className="client-phone"></p>
                    <p className="client-address">{clientCity}</p>
                  </address>

                  <button className="contact-button" onClick={handleContactClient}>
                    <img src={chatCircleDots} alt="" />
                    <span>Contact Client</span>
                  </button>
                </section>

                <section className="images-section">
                  <h4 className="section-heading">Job Images</h4>
                  <div className="job-image-container">
                    <img src={imageUrl} alt="Job" className="job-image" />
                  </div>
                </section>
              </div>

              <section className="job-description">
                <h4 className="section-heading">Job Info</h4>
                <ul className="job-requirements">
                  {descriptionLines.length ? (
                    descriptionLines.map((line, idx) => <li key={idx}>{line}</li>)
                  ) : (
                    <li>No description.</li>
                  )}
                </ul>
              </section>

              <footer className="job-card-footer">
                <div className="payment-info">
                  <span className="pay-label">Pays:</span>
                  <span className="pay-amount">{payText}</span>
                </div>
                <button className="apply-button" onClick={handleApply}>
                  Apply
                </button>
              </footer>
            </>
          )}
        </article>

        <footer className="page-footer">
          <button className="report-link" onClick={handleReport}>
            Report listing
          </button>
        </footer>
      </div>
    </main>
  );
};
