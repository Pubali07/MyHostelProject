import React from "react";
import { useParams } from "react-router-dom";
import './Rooms.css';

const roomsData = {
  1: [
    { id: 1, type: "Single Room", price: 5000 },
    { id: 2, type: "Double Room", price: 8000 }
  ],
  2: [
    { id: 1, type: "Single Room", price: 4500 },
    { id: 2, type: "Double Room", price: 7500 }
  ],
  3: [
    { id: 1, type: "Single Room", price: 5500 },
    { id: 2, type: "Double Room", price: 8500 }
  ],
  4: [
    { id: 1, type: "Single Room", price: 6000 },
    { id: 2, type: "Double Room", price: 9000 }
  ]
};

function Rooms() {
  const { hostelId } = useParams();
  const rooms = roomsData[hostelId] || [];

  return (
    <div className="rooms-container">
      <h2>Rooms in Hostel {hostelId}</h2>
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <h3>{room.type}</h3>
            <p>Price: ₹{room.price}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
