import mongoose from "mongoose";

const aiMemorySchema = new mongoose.Schema({
  userId: String,
  lesson: String,
  mistake: String,
  createdAt: { type: Date, default: Date.now }
});

const AiMemory = mongoose.model("AiMemory", aiMemorySchema);

export default AiMemory;