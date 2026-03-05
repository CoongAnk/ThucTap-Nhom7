<<<<<<< HEAD
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
=======
import mongoose from "mongoose";

const aiMemorySchema = new mongoose.Schema({
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
  userId: String,
  lesson: String,
  mistake: String,
  createdAt: { type: Date, default: Date.now }
});

<<<<<<< HEAD
module.exports = mongoose.model("AiMemory", schema);
=======
const AiMemory = mongoose.model("AiMemory", aiMemorySchema);

export default AiMemory;
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
