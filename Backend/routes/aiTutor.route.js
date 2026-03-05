<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { chatWithTutor } = require("../controllers/aiTutor.controller");

router.post("/tutor", chatWithTutor);

module.exports = router;
=======
import express from "express";
import { chatWithTutor } from "../controllers/aiTutor.controller.js";

const router = express.Router();
router.post("/tutor", chatWithTutor);

export default router;
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
