const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  name: String,
  image: String,
  pesha: String,
});

module.exports = mongoose.model("News", NewsSchema);
