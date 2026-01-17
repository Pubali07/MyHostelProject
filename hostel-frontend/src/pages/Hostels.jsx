// src/pages/Hostels.jsx
import React from "react";
import styles from "./Hostels.module.css";
import { useNavigate } from "react-router-dom";

// Import all hostel images
import {
  Image1,
  Image2,

  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
  Image15,
} from "../assets/Image";

const hostels = [
  { id: 1, name: "Sunrise Hostel", location: "Downtown", rooms: 20, price: 5000, image:Image1 },
  { id: 2, name: "GreenLeaf Hostel", location: "University Area", rooms: 25, price: 4500, image: Image2 },
  { id: 3, name: "Skyline Hostel", location: "City Center", rooms: 18, price: 5500, image: Image4},
  { id: 4, name: "OceanView Hostel", location: "Beachside", rooms: 15, price: 6000, image: Image4 },
  { id: 5, name: "Maple Residency", location: "Uptown", rooms: 22, price: 5200, image: Image5 },
  { id: 6, name: "Aurora Hostel", location: "Suburbs", rooms: 17, price: 4800, image: Image6 },
  { id: 7, name: "Harmony Hostel", location: "Downtown", rooms: 20, price: 5000, image: Image7 },
  { id: 8, name: "Cedar Lodge", location: "Near Mall", rooms: 25, price: 4700, image: Image8 },
  { id: 9, name: "Lotus Hostel", location: "University Area", rooms: 30, price: 4500, image: Image9 },
  { id: 10, name: "Sunset Hostel", location: "City Center", rooms: 18, price: 5500, image: Image10 },
  { id: 11, name: "Pearl Residency", location: "Beachside", rooms: 15, price: 6000, image: Image11 },
  { id: 12, name: "RiverSide Hostel", location: "Riverside", rooms: 20, price: 5000, image: Image12 },
  { id: 13, name: "Pine Hill Hostel", location: "Suburbs", rooms: 22, price: 4800, image: Image13 },
  { id: 14, name: "Golden Gate Hostel", location: "Uptown", rooms: 25, price: 5200, image: Image14 },
  { id: 15, name: "Crystal Hostel", location: "City Center", rooms: 18, price: 5500, image: Image15 },
];

const Hostels = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hostelsSection}>
      <h1>🏢 Explore Our Hostels</h1>

      <div className={styles.hostelsContainer}>
        {hostels.map((hostel) => (
          <div className={styles.hostelCard} key={hostel.id}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className={styles.hostelImage}
                />
                <h2>{hostel.name}</h2>
                <p>📍 Location: {hostel.location}</p>
                <p>🛏 Rooms: {hostel.rooms}</p>
                <p>💰 Price: ₹{hostel.price}/month</p>
              </div>

              <div className={styles.cardBack}>
                <h3>Book Your Room</h3>
                <button onClick={() => navigate("/booking")}>
                  📅 Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hostels;
