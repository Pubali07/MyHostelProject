// src/pages/Booking.jsx
import React from 'react';
import BookingsManager from '../components/BookingsManager';

// the same hostels list you used in Hostels.jsx
const hostels = [
  { id: 1, name: 'Sunrise Hostel', location: 'Downtown' },
  { id: 2, name: 'GreenLeaf Hostel', location: 'University Area' },
  { id: 3, name: 'Skyline Hostel', location: 'City Center' },
  { id: 4, name: 'OceanView Hostel', location: 'Beachside' },
  { id: 5, name: 'Maple Residency', location: 'Uptown' },
  { id: 6, name: 'Aurora Hostel', location: 'Suburbs' },
  { id: 7, name: 'Harmony Hostel', location: 'Downtown' },
  { id: 8, name: 'Cedar Lodge', location: 'Near Mall' },
  { id: 9, name: 'Lotus Hostel', location: 'University Area' },
  { id: 10, name: 'Sunset Hostel', location: 'City Center' },
  { id: 11, name: 'Pearl Residency', location: 'Beachside' },
  { id: 12, name: 'RiverSide Hostel', location: 'Riverside' },
  { id: 13, name: 'Pine Hill Hostel', location: 'Suburbs' },
  { id: 14, name: 'Golden Gate Hostel', location: 'Uptown' },
  { id: 15, name: 'Crystal Hostel', location: 'City Center' },
];

export default function Booking() {
  return (
    <div style={{ background: '#fff8f0', minHeight: '100vh' }}>
      <header style={{ padding: '28px', textAlign: 'center' }}>
        <h2 style={{ color: '#d67c4f', margin: 0 }}>📅 Book Your Stay</h2>
        <p style={{ color: '#6e5b54' }}>Select hostel, date and timeslot to reserve a room.</p>
      </header>

      <BookingsManager hostels={hostels} />
    </div>
  );
}
