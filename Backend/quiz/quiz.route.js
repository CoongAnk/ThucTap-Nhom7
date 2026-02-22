// routes/quiz.route.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/auth.middleware");

const {
  createQuizController,
  getQuizListController,
  getQuizDetailController,
} = require("../quiz/quiz.controller");

// Admin / system create quiz
router.post("/", createQuizController);

// Student
router.get("/:courseId", authMiddleware, getQuizListController);
router.get("/detail/:quizId", authMiddleware, getQuizDetailController);

module.exports = router;