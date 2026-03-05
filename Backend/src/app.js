import express from "express";
<<<<<<< HEAD
import authRoutes from "../auth/auth.route.js"; // nhớ check path này

const app = express();

app.use(express.json());

console.log("👉 authRoutes =", authRoutes);

app.use("/auth", authRoutes);

app.use("/api/ai", require("./routes/aiTutor.route"));

export default app;
=======
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import aiTutorRoutes from "../routes/aiTutor.route.js";
import authRoutes from "../auth/auth.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🍃 MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiTutorRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("🚀 Backend running on port 3000");
});
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
