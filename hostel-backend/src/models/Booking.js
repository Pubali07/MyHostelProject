const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  roomType: String,
  roomId: String,
  moveInDate: Date,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Booking", BookingSchema);
