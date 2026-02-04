import express from "express";
import authRoutes from "../auth/auth.route.js"; // nhớ check path này

const app = express();

app.use(express.json());

console.log("👉 authRoutes =", authRoutes);

app.use("/auth", authRoutes);

app.use("/api/ai", require("./routes/aiTutor.route"));

export default app;
