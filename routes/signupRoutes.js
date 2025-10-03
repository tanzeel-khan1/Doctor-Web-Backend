const express = require("express");
const jwt = require("jsonwebtoken");
const Signup = require("../models/Signup"); // ✅ tumhara schema ka naam Signup hai
const router = express.Router();

// ✅ SIGNUP API
router.post("/", async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Pehle check karo user already exist to nahi
    const exist = await Signup.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Naya user banao (Signup model se)
    const newUser = new Signup({ username, email, password, isAdmin });
    await newUser.save();

    // JWT Token generate karo
    const token = jwt.sign({ id: newUser._id }, "yourSecretKey", {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
