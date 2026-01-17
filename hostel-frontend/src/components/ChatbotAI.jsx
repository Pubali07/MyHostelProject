import React, { useState, useRef, useEffect } from 'react';
import './ChatbotAI.css';

const ChatbotAI = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! 👋 I'm your Hostel Hub AI assistant. How can I help you today?", 
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hostel Hub knowledge base - UPDATE THIS WITH YOUR ACTUAL DATA
  const systemPrompt = `You are a friendly and helpful customer support assistant for Hostel Hub, a student-focused hostel booking platform in India.

IMPORTANT INFORMATION ABOUT HOSTEL HUB:

LOCATIONS: Mumbai (Andheri, Bandra), Bangalore (Koramangala, Whitefield), Delhi (Karol Bagh, Dwarka), Pune (Kothrud, Viman Nagar)

PRICING:
- Single AC Room: ₹12,000/month
- Single Non-AC Room: ₹9,000/month
- Double AC Room: ₹10,000/month
- Double Non-AC Room: ₹7,000/month
- Triple AC Room: ₹7,000/month
- Student Discount: 10% off for verified students
- Security Deposit: Equal to one month's rent (refundable)

AMENITIES: Free WiFi, 24/7 Security, Laundry Service, Parking, Common Areas, Gym (select locations), Meal Services (select locations), AC/Non-AC rooms

BOOKING PROCESS:
1. Browse available hostels on our website
2. Select your preferred room type and dates
3. Complete booking form with your details
4. Make payment online (secure payment gateway)
5. Receive confirmation email with check-in details

CHECK-IN/OUT:
- Check-in: 12:00 PM
- Check-out: 11:00 AM
- Early check-in/late check-out available on request

CANCELLATION POLICY: Full refund if cancelled 7+ days before check-in. Cancellations within 7 days subject to 50% deduction.

REQUIRED DOCUMENTS: Valid Government ID (Aadhar/Passport/Driver's License), Passport-size photo, Student ID for discounts

PAYMENT METHODS: UPI, Credit/Debit Cards, Net Banking, Cash (at property)

CONTACT:
- Email: support@hostelhub.com
- Phone: +91 12345 67890
- Website: www.hostelhub.com

GUIDELINES:
- Be warm, friendly, and conversational
- Keep responses concise but informative (2-4 sentences)
- If asked about specific availability, suggest they check the website or contact us
- For complex issues, provide contact information
- Emphasize student-friendly features and discounts
- Use emojis sparingly to keep it friendly but professional

Remember: You're helping students find their home away from home!`;

  // AI-powered response using Claude
  const getAIResponse = async (userMessage) => {
    try {
      const conversationHistory = messages
        .filter(msg => msg.sender === 'user' || msg.sender === 'bot')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: [
            ...conversationHistory,
            { role: 'user', content: userMessage }
          ]
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0] && data.content[0].text) {
        return data.content[0].text;
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('AI Error:', error);
      return getFallbackResponse(userMessage);
    }
  };

  // Fallback responses if AI fails
  const getFallbackResponse = (message) => {
    const lower = message.toLowerCase();
    
    if (lower.includes('price') || lower.includes('cost') || lower.includes('fee')) {
      return "Our room prices range from ₹7,000 to ₹12,000 per month. Students get 10% off! Would you like to know about specific room types?";
    }
    if (lower.includes('location') || lower.includes('where') || lower.includes('city')) {
      return "We have hostels in Mumbai, Bangalore, Delhi, and Pune. Which city are you interested in?";
    }
    if (lower.includes('book') || lower.includes('reserve')) {
      return "You can book directly on our website by selecting your preferred hostel, room type, and dates. Need help with the booking process?";
    }
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('email')) {
      return "You can reach us at:\n📧 support@hostelhub.com\n📞 +91 12345 67890\n\nWe're available 24/7!";
    }
    if (lower.includes('amenity') || lower.includes('facility')) {
      return "Our hostels offer: Free WiFi, 24/7 Security, Laundry, Parking, Common Areas, Gym, and more. What specific amenity are you looking for?";
    }
    
    return "I'm here to help! You can ask me about pricing, locations, booking process, amenities, or anything else about our hostels. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    const botResponseText = await getAIResponse(currentInput);
    
    const botMessage = {
      id: messages.length + 2,
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: "💰 Pricing", query: "What are your room prices and any student discounts?" },
    { label: "📍 Locations", query: "Where are your hostels located?" },
    { label: "📅 How to Book", query: "How do I book a room?" },
    { label: "🏠 Amenities", query: "What facilities do you provide?" }
  ];

  const handleQuickAction = (query) => {
    setInputText(query);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h3>Hostel Hub AI</h3>
              <span className="chatbot-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose}>✕</button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'message-user' : 'message-bot'}`}
            >
              <div className="message-content">
                {message.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message message-bot">
              <div className="message-content typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <div className="chatbot-quick-actions">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action.query)}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="chatbot-input"
          />
          <button 
            className="chatbot-send-btn" 
            onClick={handleSendMessage}
            disabled={inputText.trim() === '' || isTyping}
          >
            <span>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAI;