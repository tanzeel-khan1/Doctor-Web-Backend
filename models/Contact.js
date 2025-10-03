const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    AdditionalInformation: {
      type: String,
      default: "",
    },
    DateandTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacts", ContactSchema);
