require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Room = require("../models/Room");
const Admin = require("../models/Admin");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Room.deleteMany({});
  await Admin.deleteMany({});

  await Room.insertMany([
    { type: "Single Room", price: 7000, description: "Private room", available: true },
    { type: "Double Sharing", price: 4000, description: "Sharing for 2", available: true }
  ]);

  const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    passwordHash: hashed
  });

  console.log("Seeded successfully");
  mongoose.disconnect();
}

seed();
