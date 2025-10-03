const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { FullName, Email, PhoneNumber, Department, AdditionalInformation } = req.body;
    let { DateandTime } = req.body;

    if (!DateandTime) {
      DateandTime = Date.now();
    } else {
      DateandTime = new Date(DateandTime); 
    }

    if (!FullName || !Email || !PhoneNumber || !Department) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newContact = new Contact({
      FullName,
      Email,
      PhoneNumber,
      Department,
      AdditionalInformation: AdditionalInformation || "",
      DateandTime,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
