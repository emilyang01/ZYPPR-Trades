import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Messages.css";

// Import assets - adjust paths as needed for your project structure
import IMG12581 from "./IMG-1258-1.png";

const API_URL = "http://localhost:5000/api";

// SVG Icons as components
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WriteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Messages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatbotActive, setIsChatbotActive] = useState(false);

  // Get auth token and current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          // Check if there's a user in localStorage (from login)
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              setCurrentUser(userData);
              await fetchConversations(userData._id || userData.id, token);
              setLoading(false);
              return;
            } catch (e) {
              console.error("Error parsing stored user:", e);
            }
          }
          setError("Please log in to view messages");
          setLoading(false);
          return;
        }

        console.log("Fetching user data with token:", token ? "present" : "missing");
        const response = await fetch(`${API_URL}/me/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Error response:", errorData);
          
          // Try using stored user as fallback
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setCurrentUser(userData);
            await fetchConversations(userData._id || userData.id, token);
            setLoading(false);
            return;
          }
          throw new Error(errorData.message || "Failed to fetch user data");
        }
        
        const userData = await response.json();
        console.log("User data fetched:", userData);
        setCurrentUser(userData);
        
        // Fetch conversations after getting current user
        await fetchConversations(userData._id || userData.id, token);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setError(err.message || "Failed to connect to server. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle preselected user from navigation state
  useEffect(() => {
    const preSelectedUserId = location.state?.userId;
    const userName = location.state?.userName;
    const userEmail = location.state?.userEmail;
    
    if (preSelectedUserId && currentUser) {
      console.log("Preselecting user:", preSelectedUserId, userName);
      
      // Check if user exists in conversations
      const userExists = conversations.find(c => c._id === preSelectedUserId || c.id === preSelectedUserId);
      
      // If user doesn't exist in conversations yet, add them temporarily
      if (!userExists && userName && conversations.length > 0) {
        const tempUser = {
          _id: preSelectedUserId,
          id: preSelectedUserId,
          first_name: userName.split(' ')[0],
          last_name: userName.split(' ')[1] || '',
          email: userEmail || '',
          isBot: false
        };
        setConversations(prev => [...prev, tempUser]);
      }
      
      setActiveChat(preSelectedUserId);
      setIsChatbotActive(false);
      const token = localStorage.getItem("authToken");
      fetchMessages(preSelectedUserId, token);
    }
  }, [location.state?.userId, location.state?.userName, conversations.length, currentUser]);

  // Fetch all conversations (users you've messaged with)
  const fetchConversations = async (userId, token) => {
    try {
      // Fetch all users
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch conversations");
      
      const users = await response.json();
      const filteredUsers = users.filter(u => (u._id || u.id) !== userId);
      
      // Add Zip chatbot to conversations
      const zipBot = {
        _id: 'chatbot-zip',
        id: 'chatbot-zip',
        first_name: 'Zip',
        last_name: 'Bot',
        email: 'zip@zyppr.com',
        role: 'assistant',
        isBot: true,
      };
      
      setConversations([zipBot, ...filteredUsers]);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (otherUserId, token = null) => {
    try {
      const authToken = token || localStorage.getItem("authToken");
      if (!authToken) return;

      const response = await fetch(`${API_URL}/messages/${otherUserId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.warn("Failed to fetch messages:", response.status);
        // Start with empty messages if none exist yet
        setMessages([]);
        return;
      }
      
      const messageData = await response.json();
      setMessages(messageData);
    } catch (err) {
      console.error("Error fetching messages:", err);
      // Don't set a critical error, just start with empty messages
      setMessages([]);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = (userId, isBot = false) => {
    setActiveChat(userId);
    setIsChatbotActive(isBot);
    if (!isBot) {
      fetchMessages(userId);
    } else {
      // Clear messages for bot (will be handled by bot interaction)
      setMessages([]);
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeChat || !currentUser) return;

    try {
      const token = localStorage.getItem("authToken");
      
      // Handle chatbot messages
      if (isChatbotActive && activeChat === 'chatbot-zip') {
        // Add user message to display
        const userMessage = {
          _id: Date.now().toString(),
          content: messageInput.trim(),
          senderId: currentUser.id,
          createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMessage]);
        const userInput = messageInput.trim();
        setMessageInput("");

        // Call chatbot API
        const botResponse = await fetch(`${API_URL}/bot/message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        if (!botResponse.ok) throw new Error("Failed to get bot response");
        
        const botData = await botResponse.json();
        const botMessage = {
          _id: (Date.now() + 1).toString(),
          content: botData.reply || botData.response || "I'm here to help!",
          senderId: 'chatbot-zip',
          createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }

      // Handle regular user messages
      const senderId = currentUser._id || currentUser.id;
      
      console.log("Sending message:", {
        senderId,
        receiverId: activeChat,
        content: messageInput.trim()
      });
      
      const response = await fetch(`${API_URL}/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderId,
          receiverId: activeChat,
          content: messageInput.trim(),
        }),
      });

      console.log("Send message response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Send message error:", errorData);
        throw new Error(errorData.message || "Failed to send message");
      }
      
      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setMessageInput("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert(`Failed to send message: ${err.message}`);
    }
  };

  const activeContact = conversations.find(c => c._id === activeChat);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="messages-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading messages...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="messages-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <p>{error}</p>
          <a href="/login" style={{ marginTop: '1rem', color: '#007bff' }}>Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      {/* Header */}
      <header className="messages-header">
        <div className="header-left">
          <button className="back-button" aria-label="Go back" onClick={() => window.history.back()}>
            <BackIcon />
          </button>
          <button className="brand" onClick={() => navigate("/")} style={{background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src={IMG12581} alt="ZYPPR Logo" className="brand-logo" />
            <span className="brand-name">YPPR Trades</span>
          </button>
        </div>
        <nav className="header-nav">
          <a href="/jobs" className="nav-link">Jobs</a>
          <a href="/customer-service" className="nav-link">Customer Service</a>
        </nav>
        <div className="header-right">
          <button className="user-button" onClick={() => navigate("/dashboard")}>
            <span>{currentUser?.name || (currentUser?.first_name && currentUser?.last_name ? `${currentUser.first_name} ${currentUser.last_name}` : currentUser?.email?.split('@')[0] || "User")}</span>
            <div className="user-avatar-small">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" 
                alt="User avatar" 
              />
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="messages-content">
        {/* Sidebar */}
        <aside className="messages-sidebar">
          <ul className="contact-list">
            {conversations.length === 0 ? (
              <li className="contact-item">
                <div className="contact-info">
                  <span className="contact-name">No conversations yet</span>
                </div>
              </li>
            ) : (
              conversations.map((contact) => (
                <li
                  key={contact._id}
                  className={`contact-item ${activeChat === contact._id ? "active" : ""}`}
                  onClick={() => handleSelectConversation(contact._id, contact.isBot)}
                >
                  <div className="contact-avatar">
                    {contact.isBot ? (
                      <img src={IMG12581} alt="Zip Bot" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${contact.first_name || contact.email}&background=random`} 
                        alt={`${contact.first_name || ''} ${contact.last_name || ''}`} 
                      />
                    )}
                  </div>
                  <div className="contact-info">
                    <span className="contact-name">
                      {contact.isBot 
                        ? `${contact.first_name} (AI Assistant)` 
                        : (contact.first_name && contact.last_name 
                            ? `${contact.first_name} ${contact.last_name}` 
                            : contact.email)}
                    </span>
                    <span className="contact-message">
                      {contact.isBot ? "AI chatbot ready to help!" : (contact.city || "Click to start chatting")}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
          <button className="fab-button" aria-label="New message">
            <WriteIcon />
          </button>
        </aside>

        {/* Chat Window */}
        <main className="chat-window">
          {activeContact ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-contact-info">
                  <h2 className="chat-contact-name">
                    {activeContact.first_name && activeContact.last_name 
                      ? `${activeContact.first_name} ${activeContact.last_name}` 
                      : activeContact.email}
                  </h2>
                  <span className="chat-status">
                    {activeContact.role || "User"}
                  </span>
                </div>
                <button className="more-button" aria-label="More options">
                  <MoreIcon />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="chat-messages">
                <div className="messages-list">
                  {messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message._id}
                        className={`message ${message.senderId === currentUser?.id ? "sent" : "received"}`}
                      >
                        <div className="message-bubble">
                          <span className="message-text">{message.content}</span>
                          <span className="message-time">{formatTime(message.createdAt)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Input */}
              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    aria-label="Type your message"
                  />
                  <button 
                    className="send-button" 
                    onClick={handleSendMessage}
                    aria-label="Send message"
                    disabled={!messageInput.trim()}
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              color: '#999'
            }}>
              Select a conversation to start messaging
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Messages;