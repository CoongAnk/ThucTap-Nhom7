const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: String,
  lesson: String,
  mistake: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AiMemory", schema);
