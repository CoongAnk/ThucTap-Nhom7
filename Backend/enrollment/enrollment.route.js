// routes/enrollment.route.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../auth/auth.middleware");

const {
  enrollCourseController,
  unenrollCourseController,
  getMyEnrollmentsController,
  checkEnrolledController,
  getEnrollmentsByCourseController,
} = require("./enrollment.controller.js");

// Student
router.post("/", authMiddleware, enrollCourseController);
router.delete("/:courseId", authMiddleware, unenrollCourseController);
router.get("/my-courses", authMiddleware, getMyEnrollmentsController);
router.get("/check/:courseId", authMiddleware, checkEnrolledController);

// Admin / debug
router.get("/course/:courseId", getEnrollmentsByCourseController);

module.exports = router;