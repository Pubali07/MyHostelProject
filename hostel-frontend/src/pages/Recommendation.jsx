import React, { useState } from "react";
import axios from "axios";
import "./Recommendation.css";

function Recommendation() {
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/api/recommendation", {
        budget,
        location,
        roomType,
        amenities,
      });
      setResult(res.data.recommendation);
    } catch (err) {
      console.error(err);
      setResult("Failed to get recommendations");
    }
    setLoading(false);
  };

  return (
    <div className="recPage">
      <div className="recCard">
        <h2>AI Room Recommendations</h2>
        <form onSubmit={handleSubmit} className="recForm">
          <input
            type="text"
            placeholder="Budget (e.g., 5000/month)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Preferred Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Room Type (Single/Shared)"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amenities (WiFi, AC, etc.)"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
          <button type="submit">{loading ? "Loading..." : "Get Recommendations"}</button>
        </form>
        {result && (
          <div className="recResult">
            <h3>Recommendations:</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
