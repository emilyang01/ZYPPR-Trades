import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // your CSS file for colors/layout

export const UserDashboard = () => {
  const navigate = useNavigate();

  // optional: show name from storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handlePostJob = () => {
    navigate("/jobs/new"); // ✅ only button that needs to work now
  };

  return (
    <div className="user-dashboard">
      <header className="ud-header">
        <button className="ud-back" onClick={() => window.history.back()}>←</button>
        <div className="ud-logo">ZYPPR Trades</div>
        <div className="ud-topnav">
          <button onClick={() => navigate("/jobs")}>Jobs</button>
          <button>About ZYPPR</button>
          <button>Customer Service</button>
          <button className="ud-userchip">{user?.name || "Your Name"}</button>
        </div>
      </header>

      <div className="ud-body">
        <aside className="ud-sidebar">
          <button className="ud-sideitem active">Dashboard</button>
          <button className="ud-sideitem">Messages</button>
          <button className="ud-sideitem">Notifications</button>
        </aside>

        <main className="ud-main">
          {/* your cards/layout… keep as static for now */}

          <section className="ud-quickactions">
            <div className="ud-qa-title">Quick Actions</div>

            <div className="ud-qa-row">
              <button className="ud-qa-btn">Find Work</button>
              <button className="ud-qa-btn">Edit Skills</button>

              {/* ✅ ONLY THIS NEEDS TO WORK */}
              <button className="ud-qa-btn primary" onClick={handlePostJob}>
                Post job
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
