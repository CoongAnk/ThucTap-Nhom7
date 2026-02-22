// routes/progress.route.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/auth.middleware");

const {
  upsertProgressController,
  getProgressByCourseController,
  getProgressByLessonController,
} = require("../progress/progress.controller");

// Update progress 1 lesson
router.put(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  upsertProgressController
);

// Get all progress of a course
router.get("/:courseId", authMiddleware, getProgressByCourseController);

// Get progress of a lesson
router.get(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  getProgressByLessonController
);

module.exports = router;