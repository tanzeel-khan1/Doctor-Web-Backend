const express = require("express");
const jwt = require("jsonwebtoken");
const Signup = require("../models/Signup"); // ✅ ab User model import hoga
const router = express.Router();

// LOGIN API
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Email se user find
    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Password check
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Token generate
    const token = jwt.sign({ id: user._id }, "yourSecretKey", {
      expiresIn: "1h",
    });

    // Response
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
