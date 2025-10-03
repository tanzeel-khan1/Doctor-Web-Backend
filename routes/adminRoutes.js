const express = require("express");
const Signup = require("../models/Signup");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// ✅ Sirf Admin hi sare users dekh sakta hai
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await Signup.find().select("-password"); // password hide
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
