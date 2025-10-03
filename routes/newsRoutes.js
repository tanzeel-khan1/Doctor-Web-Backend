const express = require("express");
const News = require("../models/News");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await News.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
