const express = require("express");
const router = express.Router();
const { chatWithTutor } = require("../controllers/aiTutor.controller");

router.post("/tutor", chatWithTutor);

module.exports = router;
