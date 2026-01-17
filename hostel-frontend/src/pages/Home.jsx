import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ChatbotAI from "../components/ChatbotAI"; 
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false); 

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        
        {/* Floating decorative elements */}
        <div className="float blue"></div>
        <div className="float teal"></div>
        <div className="float light"></div>
        
        <div className="hero-content">
          <span className="hero-tagline">✨ Your Home Away From Home</span>
          
          <h1 className="hero-title">
            Welcome to <span className="highlight">Hostel Hub</span>
          </h1>
          
          <p className="hero-subtitle">
            Find your ideal hostel with cozy rooms, modern amenities, and friendly communities. 
            Experience comfort, convenience, and community all in one place.
          </p>
          
          <div className="hero-buttons">
            <button className="button-primary" onClick={() => navigate("/hostels")}>
              🏢 Explore Hostels
            </button>
            <button className="button-secondary" onClick={() => navigate("/booking")}>
              📅 Book Your Stay
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="features-title">What We Offer</h2>
        <p className="features-subtitle">
          Everything you need for a comfortable and memorable stay
        </p>
        
        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate("/hostels")}>
            <div className="feature-icon">🏘️</div>
            <h3>Multiple Hostels</h3>
            <p>
              Explore hostels across the city and choose the one that perfectly 
              fits your needs and lifestyle preferences.
            </p>
          </div>
          
          <div className="feature-card" onClick={() => navigate("/booking")}>
            <div className="feature-icon">⚡</div>
            <h3>Easy Booking</h3>
            <p>
              Reserve your room quickly and securely through our intuitive 
              platform with instant confirmation.
            </p>
          </div>
          
          <div className="feature-card" onClick={() => navigate("/rooms/1")}>
            <div className="feature-icon">🛏️</div>
            <h3>Comfortable Rooms</h3>
            <p>
              Fully furnished rooms with all essential amenities including 
              high-speed WiFi, storage, and comfortable beds.
            </p>
          </div>
          
          {/* ✅ Update this card to open chatbot */}
          <div className="feature-card" onClick={() => setIsChatOpen(true)}>
            <div className="feature-icon">💬</div>
            <h3>24/7 AI Support</h3>
            <p>
              Get instant assistance from our AI-powered chatbot anytime. 
              Ask questions about pricing, booking, amenities, and more!
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Floating Chat Button */}
      {!isChatOpen && (
        <button 
          className="chat-float-btn" 
          onClick={() => setIsChatOpen(true)}
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* ✅ Add Chatbot Component */}
      <ChatbotAI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default Home;