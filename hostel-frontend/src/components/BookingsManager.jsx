// src/components/BookingsManager.jsx
import React, { useState, useEffect } from 'react';
import styles from './BookingsManager.module.css';

const defaultSlots = [
  '08:00 - 10:00',
  '10:30 - 12:30',
  '13:30 - 15:30',
  '16:00 - 18:00',
  '19:00 - 21:00',
];

export default function BookingsManager({ hostels, initialHostelId = null }) {
  const [hostelId, setHostelId] = useState(initialHostelId || (hostels[0] && hostels[0].id));
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState(defaultSlots[0]);
  const [bookings, setBookings] = useState(() => {
    // sample initial bookings (you can fetch from API instead)
    return [
      { id: 1, hostelId: 1, hostelName: 'Sunrise Hostel', date: '2025-12-01', slot: defaultSlots[0], guest: 'Aman' },
      { id: 2, hostelId: 2, hostelName: 'GreenLeaf Hostel', date: '2025-12-05', slot: defaultSlots[1], guest: 'Priya' },
    ];
  });
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    // when hostel list or initialHostelId changes, keep selected consistent
    if (!hostelId && hostels && hostels.length) setHostelId(hostels[0].id);
  }, [hostels, hostelId]);

  const handleBook = () => {
    if (!date) {
      alert('Please choose a date.');
      return;
    }
    if (!guestName.trim()) {
      alert('Please enter guest name.');
      return;
    }

    // check conflicts
    const conflict = bookings.find(b => b.hostelId === +hostelId && b.date === date && b.slot === slot);
    if (conflict) {
      alert(`Slot already booked for ${conflict.hostelName} on ${date} (${slot}). Choose another.`);
      return;
    }

    const hostel = hostels.find(h => h.id === +hostelId);
    const newBooking = {
      id: Date.now(),
      hostelId: +hostelId,
      hostelName: hostel ? hostel.name : 'Unknown',
      date,
      slot,
      guest: guestName.trim(),
    };

    setBookings(prev => [newBooking, ...prev]);
    setGuestName('');
    alert(`Booked ${newBooking.hostelName} on ${date} (${slot}) for ${newBooking.guest}`);
  };

  const bookingsForHostel = bookings.filter(b => b.hostelId === +hostelId);
  const bookingsByDate = bookings.reduce((acc, b) => {
    acc[b.date] = acc[b.date] || [];
    acc[b.date].push(b);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h3>Book a Room</h3>

        <label>Hostel</label>
        <select value={hostelId ?? ''} onChange={e => setHostelId(e.target.value)}>
          {hostels.map(h => (
            <option key={h.id} value={h.id}>
              {h.name} — {h.location}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />

        <label>Time Slot</label>
        <select value={slot} onChange={e => setSlot(e.target.value)}>
          {defaultSlots.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Your name</label>
        <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Enter your name" />

        <button className={styles.bookBtn} onClick={handleBook}>📅 Book Now</button>
      </div>

      <div className={styles.listCard}>
        <h3>Upcoming bookings for selected hostel</h3>
        {bookingsForHostel.length === 0 ? (
          <p className={styles.empty}>No bookings yet for this hostel.</p>
        ) : (
          <ul className={styles.bookingsList}>
            {bookingsForHostel.map(b => (
              <li key={b.id} className={styles.bookingItem}>
                <div>
                  <strong>{b.date}</strong> <span className={styles.slot}>({b.slot})</span>
                </div>
                <div className={styles.meta}>
                  {b.guest} • {b.hostelName}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h4>All bookings (grouped by day)</h4>
        <div className={styles.grouped}>
          {Object.keys(bookingsByDate).length === 0 && <p className={styles.empty}>No bookings yet.</p>}
          {Object.entries(bookingsByDate).map(([d, arr]) => (
            <div key={d} className={styles.dayGroup}>
              <div className={styles.dayHeader}>{d}</div>
              <div className={styles.dayList}>
                {arr.map(x => (
                  <div key={x.id} className={styles.smallCard}>
                    <div className={styles.smallTitle}>{x.hostelName}</div>
                    <div className={styles.smallMeta}>{x.slot} • {x.guest}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
