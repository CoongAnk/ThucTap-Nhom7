import express from "express";
import { register, login } from "./auth.controller.js";

console.log("🔥 AUTH ROUTE FILE LOADED");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
