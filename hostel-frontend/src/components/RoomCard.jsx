function RoomCard({ room }) {
    return (
      <div className="room-card">
        <h3>{room.type}</h3>
        <p>Price: ₹{room.price}/month</p>
        <button>Book Now</button>
      </div>
    );
  }
  export default RoomCard;
  