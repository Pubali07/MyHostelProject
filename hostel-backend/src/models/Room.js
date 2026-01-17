const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  type: String,
  price: Number,
  description: String,
  available: Boolean
});

module.exports = mongoose.model("Room", RoomSchema);
