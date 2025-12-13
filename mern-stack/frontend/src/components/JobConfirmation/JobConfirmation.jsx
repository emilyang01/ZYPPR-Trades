import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IMG12581 from "./IMG_1258 1.png";
import "./JobConfirmation.css";
import "../SharedHeader/SharedHeader.css";

export const JobConfirmation = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { jobId } = useParams();

  const [job, setJob] = useState(state?.job || null);
  const [loading, setLoading] = useState(!state?.job);
  const [err, setErr] = useState("");

  useEffect(() => {
    // if user refreshed page, state is gone -> refetch
    const load = async () => {
      if (job) return;

      setLoading(true);
      setErr("");

      try {
        // 1) try GET /api/jobs/:jobId (if you have it)
        let res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data);
          return;
        }

        // 2) fallback to GET /api/jobs and find by _id (you DO have this)
        res = await fetch(`http://localhost:5000/api/jobs`);
        const list = await res.json();

        if (!res.ok) {
          setErr(list?.message || "Failed to load job");
          return;
        }

        const found = Array.isArray(list) ? list.find((j) => j?._id === jobId) : null;
        if (!found) {
          setErr("Job not found.");
          return;
        }

        setJob(found);
      } catch (e) {
        setErr("Server error loading job");
      } finally {
        setLoading(false);
      }
    };

    load();
    // IMPORTANT: don't include `job` in deps or it can re-run unnecessarily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  const title = job?.title || "Job";
  const dateStr = job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "";
  const client =
    job?.posted_by?.first_name || job?.posted_by?.last_name
      ? `${job.posted_by.first_name || ""} ${job.posted_by.last_name || ""}`.trim()
      : "Client";

  const addressLine = job?.city ? `${job.city}` : "";
  const price = job?.hourly_rate != null ? `$${job.hourly_rate}/hr` : "$0/hr";


  const getAuthToken = () => {
  // common patterns
  const direct =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token");

  if (direct) return direct;

  // also common: user object stored as JSON
  const userRaw = localStorage.getItem("user") || localStorage.getItem("userInfo");
  if (userRaw) {
    try {
      const u = JSON.parse(userRaw);
      return u?.token || u?.accessToken || u?.jwt || null;
    } catch {
      return null;
    }
  }

  return null;
};

 const onPaypal = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      alert("Login token not found in storage. (You are logged in, but token key is different.)");
      return;
    }

    const res = await fetch("http://localhost:5000/api/payments/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId, currency: "USD" }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data?.message || "Failed to create PayPal order");
      return;
    }

    const approveLink = data?.paypalOrder?.links?.find((l) => l.rel === "approve")?.href;
    if (!approveLink) {
      console.log("paypalOrder:", data?.paypalOrder);
      alert("No PayPal approval link returned.");
      return;
    }

    window.location.href = approveLink;
  } catch (e) {
    console.error(e);
    alert("PayPal error creating order");
  }
};


  if (loading) {
    return <div style={{ padding: 24 }}>Loading confirmation...</div>;
  }

  if (err) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ color: "red", marginBottom: 12 }}>{err}</div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.name || (user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : user?.email?.split('@')[0] || "User");

  return (
    <div className="confirm-page">
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
            <button className="confirm-userchip" onClick={() => navigate("/dashboard")}>
              <span>{userName}</span>
              <div className="confirm-avatar" />
            </button>
          </div>
        </div>
      </header>

      <div className="confirm-center">
        <h1 className="confirm-title">Job: {title}</h1>
        {dateStr && <div className="confirm-sub">Date : {dateStr}</div>}
        <div className="confirm-sub">Client : {client}</div>
        {addressLine && <div className="confirm-sub">Address : {addressLine}</div>}

        <div className="confirm-card">
          <div className="confirm-price-label">Price :</div>
          <div className="confirm-price">{price}</div>
        </div>

        <div className="confirm-note">Choose one of the payment options</div>

        {/* only clickable thing */}
        <button className="confirm-paypal" onClick={onPaypal}>
          PayPal
        </button>

        <div className="confirm-card-small">
          <div className="confirm-card-small-title">Pay by card</div>
          <div className="confirm-card-small-text">
            To pay, please enter your VISA, MasterCard or Maestro payment card information.
          </div>
        </div>
      </div>
    </div>
  );
};
