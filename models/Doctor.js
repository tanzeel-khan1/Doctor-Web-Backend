const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  image: String,
  pesha: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
