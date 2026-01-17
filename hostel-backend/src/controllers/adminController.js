const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ success: true, message: "Login successful" });
};
