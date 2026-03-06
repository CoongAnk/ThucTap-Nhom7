import express from "express";
import { chatWithTutor } from "../controllers/aiTutor.controller.js";
import { chatWithAI } from "../controllers/aiTutor.controller.js";

const router = express.Router();
router.post("/tutor", chatWithTutor);
router.post("/chat", chatWithAI);

export default router;
