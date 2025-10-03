const express = require("express");
const jwt = require("jsonwebtoken");
const Signup = require("../models/Signup");
const router = express.Router();

// 🔑 LOGIN API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // JWT Token
    const token = jwt.sign({ id: user._id }, "yourSecretKey", { expiresIn: "1h" });

    // 🔥 Special message agar admin hai
    let specialMsg = "Login successful";
    if (user.isAdmin) {
      specialMsg = "Welcome Admin! You have full access.";
    }

    res.json({
      message: specialMsg,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
