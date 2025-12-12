import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMG12581 from "./IMG-1258-1.png";
import arrowFall from "./arrow-fall.svg";
import arrowRise from "./arrow-rise.svg";
import arrowlinerightS from "./arrowlineright-s.svg";
import broadcast from "./broadcast.svg";
import chatsTeardrop from "./chats-teardrop.svg";
import cloudX from "./cloud-x.svg";
import dot from "./dot.svg";
import lineA from "./line-a.svg";
import magnifyingGlass from "./magnifying-glass.svg";
import userIcon from "./user.svg";
import "./styleguide.css";
import "./AdminDashboard.css";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState("users"); // "users" | "jobs" | "reports"
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); // user list for now
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const runAdminUserSearch = async (q) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setSearchError("Missing token. Please login again.");
      return;
    }

    setLoading(true);
    setSearchError("");

    try {
      const url = `http://localhost:5000/api/admin/search/users?q=${encodeURIComponent(q)}&page=1&limit=20`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setSearchError(data.message || "Search failed");
        setResults([]);
        return;
      }

      // IMPORTANT: your backend likely returns an object, not a raw array.
      // Try these common shapes:
      const users = Array.isArray(data) ? data : (data.users || data.results || []);
      setResults(data.data);

    } catch (err) {
      setSearchError("Server error while searching");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search: only for Users tab right now
  useEffect(() => {
    if (searchTab !== "users") return;

    const trimmed = query.trim();
    const t = setTimeout(() => {
      if (trimmed.length >= 2) runAdminUserSearch(trimmed);
      if (trimmed.length === 0) setResults([]);
    }, 300);

    return () => clearTimeout(t);
  }, [query, searchTab]);

  return (
    <main className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <button className="back-button" aria-label="Go back" onClick={() => window.history.back()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="header-logo">
          <img className="logo-image" alt="ZYPPR logo" src={IMG12581} />
          <h1 className="logo-text">YPPR Trades</h1>
        </div>

        <nav className="navigation" aria-label="Main navigation">
          <button className="nav-button" onClick={() => navigate("/jobs")}>Jobs</button>
          <button className="nav-button">About ZYPPR</button>
          <button className="nav-button">Customer Service</button>
        </nav>

        <div className="header-auth">
          <button className="user-button">
            <span>Your Name</span>
            <div className="avatar"></div>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Admin Dashboard</h2>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">Pages</span>
        </div>

        <div className="sidebar-menu">
          <button className="sidebar-item" onClick={() => navigate("/users")}>
            <img className="sidebar-arrow" alt="Arrow" src={arrowlinerightS} />
            <img className="sidebar-icon" alt="Search" src={magnifyingGlass} />
            <span>Search User Accounts</span>
          </button>

          <button className="sidebar-item" onClick={() => navigate("/admin/feedback")}>
            <img className="sidebar-arrow" alt="Arrow" src={arrowlinerightS} />
            <img className="sidebar-icon" alt="Chats" src={chatsTeardrop} />
            <span>View User Feedback</span>
          </button>
        </div>

        <p className="sidebar-timeframe">Select a time-frame</p>
      </aside>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        {/* Notifications */}
        <section className="notifications-section">
          <h3 className="section-title">Notifications</h3>
          <ul className="notifications-list">
            <li className="notification-item">
              <div className="notification-icon">
                <img alt="Cloud x" src={cloudX} />
              </div>
              <div className="notification-text">
                <p>Shamrit deleted a review.</p>
                <time>Just now</time>
              </div>
            </li>
            <li className="notification-item">
              <div className="notification-icon">
                <img alt="User" src={userIcon} />
              </div>
              <div className="notification-text">
                <p>New user registered.</p>
                <time>59 minutes ago</time>
              </div>
            </li>
            <li className="notification-item">
              <div className="notification-icon">
                <img alt="User" src={userIcon} />
              </div>
              <div className="notification-text">
                <p>New user registered.</p>
                <time>12 hours ago</time>
              </div>
            </li>
            <li className="notification-item">
              <div className="notification-icon">
                <img alt="Broadcast" src={broadcast} />
              </div>
              <div className="notification-text">
                <p>Andi Lane reported a user.</p>
                <time>Today, 11:59 AM</time>
              </div>
            </li>
          </ul>
        </section>

        {/* Contacts */}
        <section className="contacts-section">
          <h3 className="section-title">Contacts</h3>
          <ul className="contacts-list">
            {["Ansar", "Emily", "Irene", "Shamrit"].map((name) => (
              <li key={name} className="contact-item">
                <div className="contact-avatar"></div>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      {/* Main Content */}
      <div className="main-content">

                {/* Search Bar */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
          <button
            onClick={() => setSearchTab("users")}
            style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", background: searchTab === "users" ? "#eee" : "#fff" }}
          >
            Search Users
          </button>

          <button
            onClick={() => setSearchTab("jobs")}
            style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", background: searchTab === "jobs" ? "#eee" : "#fff" }}
          >
            Search Jobs
          </button>

          <button
            onClick={() => setSearchTab("reports")}
            style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ddd", background: searchTab === "reports" ? "#eee" : "#fff" }}
          >
            Search Reports
          </button>

          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, border: "1px solid #ddd", borderRadius: 10, padding: "10px 12px" }}>
            <img alt="Search" src={magnifyingGlass} style={{ width: 18, height: 18 }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchTab === "users" ? "Search users by name/email..." : "Search..."}
              style={{ border: "none", outline: "none", width: "100%" }}
            />
          </div>
        </div>

        {searchTab === "users" && (
          <>
            {loading && <div>Searching...</div>}
            {searchError && <div style={{ color: "red" }}>{searchError}</div>}

            {/* Results */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18, marginBottom: 24 }}>
              {results.map((u) => (
                <div key={u._id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700 }}>
                    {(u.first_name || "") + " " + (u.last_name || "")}
                  </div>
                  <div style={{ opacity: 0.8 }}>{u.email}</div>
                  <div style={{ opacity: 0.8 }}>{u.city}</div>
                  <div style={{ opacity: 0.8 }}>Role: {u.role}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Overview Header */}
        <div className="content-header">
          <h2 className="page-title">Overview</h2>
          <select className="time-select">
            <option value="default">Select an option</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <h3 className="stat-title">Job Postings</h3>
            <div className="stat-content">
              <span className="stat-value">7,265</span>
              <div className="stat-change positive">
                <span>+11.01%</span>
                <img alt="Arrow rise" src={arrowRise} />
              </div>
            </div>
          </div>

          <div className="stat-card gray">
            <h3 className="stat-title">Visits</h3>
            <div className="stat-content">
              <span className="stat-value">3,671</span>
              <div className="stat-change negative">
                <span>-0.03%</span>
                <img alt="Arrow fall" src={arrowFall} />
              </div>
            </div>
          </div>

          <div className="stat-card blue">
            <h3 className="stat-title">New Users</h3>
            <div className="stat-content">
              <span className="stat-value">256</span>
              <div className="stat-change positive">
                <span>+15.03%</span>
                <img alt="Arrow rise" src={arrowRise} />
              </div>
            </div>
          </div>

          <div className="stat-card wide blue">
            <h3 className="stat-title">Active Users</h3>
            <div className="stat-content">
              <span className="stat-value">2,318</span>
              <div className="stat-change positive">
                <span>+6.08%</span>
                <img alt="Arrow rise" src={arrowRise} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <section className="chart-section">
          <div className="chart-controls">
            <div className="time-tabs">
              <button className="time-tab active">This Year</button>
              <button className="time-tab">Last Year</button>
              <button className="time-tab">Select Year</button>
            </div>
            <div className="chart-legend">
              <span className="separator">|</span>
              <div className="legend-item">
                <img alt="Dot" src={dot} />
                <span>Job Postings</span>
              </div>
              <div className="legend-item">
                <img alt="Dot" src={dot} />
                <span>Users Accounts Created</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-y-axis">
              <span>30K</span>
              <span>20K</span>
              <span>10K</span>
              <span>0</span>
            </div>
            <div className="chart-area">
              <img className="chart-line" alt="Line chart" src={lineA} />
              <div className="chart-x-axis">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Table Section */}
        <section className="table-section">
          <h3 className="section-title">Top Performing Users</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Followers</th>
                <th>Jobs Completed</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>1020</td>
                <td>382</td>
                <td>$6,518.18</td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>714</td>
                <td>294</td>
                <td></td>
              </tr>
              <tr>
                <td>Hanna Montana</td>
                <td>603</td>
                <td>285</td>
                <td>$3,680.00</td>
              </tr>
              <tr>
                <td>Jean Simmons</td>
                <td>498</td>
                <td>251</td>
                <td>$2,559.36</td>
              </tr>
              <tr>
                <td>Dwayne Johnson</td>
                <td>497</td>
                <td>249</td>
                <td>$1,965.81</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};