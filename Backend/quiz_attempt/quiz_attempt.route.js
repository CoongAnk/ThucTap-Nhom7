// routes/quizAttempt.route.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/auth.middleware");

const {
  submitQuizAttemptController,
  getMyAttemptsByQuizController,
  getMyAttemptsByCourseController,
} = require("../quiz_attempt/quiz_attempt.controller");

// Submit attempt
router.post("/:quizId/submit", authMiddleware, submitQuizAttemptController);

// History
router.get("/:quizId/my-attempts", authMiddleware, getMyAttemptsByQuizController);
router.get("/course/:courseId/my-attempts", authMiddleware, getMyAttemptsByCourseController);

module.exports = router;