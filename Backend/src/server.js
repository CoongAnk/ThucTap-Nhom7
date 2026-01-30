require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

console.log("🔥 server.js started");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
