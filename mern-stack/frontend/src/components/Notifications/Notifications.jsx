import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

// SVG Icons as components for cleaner code
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ConnectIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PaymentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2"/>
    <path d="M12 6V18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 9.5C15 8.12 13.657 7 12 7C10.343 7 9 8.12 9 9.5C9 10.88 10.343 12 12 12C13.657 12 15 13.12 15 14.5C15 15.88 13.657 17 12 17C10.343 17 9 15.88 9 14.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ProfileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const JobAlertIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="12" r="2" fill="black"/>
    <circle cx="12" cy="12" r="2" fill="black"/>
    <circle cx="19" cy="12" r="2" fill="black"/>
  </svg>
);

export const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user and notifications
  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        // Fetch current user data
        const userResponse = await fetch("http://localhost:5000/api/me/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setCurrentUser(userData);

        // Fetch notifications for the user
        const notificationsResponse = await fetch(
          `http://localhost:5000/api/notifications/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!notificationsResponse.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAndNotifications();
  }, [navigate]);

  // Get the appropriate icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "message":
        return <BellIcon />;
      case "job_application":
      case "job_accepted":
      case "job_rejected":
        return <JobAlertIcon />;
      case "review_received":
        return <ProfileIcon />;
      case "follower":
        return <ConnectIcon />;
      case "system":
        return <BellIcon />;
      default:
        return <BellIcon />;
    }
  };

  // Format time ago
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffMs = now - notificationTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs !== 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <main className="notifications">
      <button 
        className="notifications__back-btn" 
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>

      <section className="notifications__card">
        <header className="notifications__header">
          <h1 className="notifications__title">Notifications</h1>
          <BellIcon />
        </header>

        {loading ? (
          <div className="notifications__loading">Loading notifications...</div>
        ) : error ? (
          <div className="notifications__error">Error: {error}</div>
        ) : notifications.length === 0 ? (
          <div className="notifications__empty">No notifications yet</div>
        ) : (
          <ul className="notifications__list">
            {notifications.map((notification) => (
              <li 
                key={notification._id} 
                className={`notifications__item ${notification.read ? 'notifications__item--read' : ''}`}
                onClick={() => !notification.read && markAsRead(notification._id)}
              >
                <div className="notifications__item-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <p className="notifications__item-text">{notification.message}</p>
                <div className="notifications__item-meta">
                  <span className="notifications__item-time">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                  <button className="notifications__item-more" aria-label="More options">
                    <MoreIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Notifications;