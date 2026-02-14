// controllers/enrollment.controller.js

const enrollmentService = require("./enrollment.service.js");

async function enrollCourseController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const enrollment = await enrollmentService.enrollCourse({ userId, courseId });

    return res.status(201).json({
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (err) {
    if (err.message === "COURSE_NOT_FOUND") {
      return res.status(404).json({ message: "Course not found" });
    }

    if (err.message === "ALREADY_ENROLLED") {
      return res.status(409).json({ message: "You already enrolled this course" });
    }

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function unenrollCourseController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const deleted = await enrollmentService.unenrollCourse({ userId, courseId });

    return res.status(200).json({
      message: "Unenrolled successfully",
      data: deleted,
    });
  } catch (err) {
    if (err.message === "ENROLLMENT_NOT_FOUND") {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function getMyEnrollmentsController(req, res) {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const enrollments = await enrollmentService.getMyEnrollments({ userId });

    return res.status(200).json({
      message: "Get my enrollments successfully",
      data: enrollments,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function checkEnrolledController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const enrolled = await enrollmentService.checkEnrolled({ userId, courseId });

    return res.status(200).json({
      message: "Check enrolled successfully",
      data: { enrolled },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

async function getEnrollmentsByCourseController(req, res) {
  try {
    const { courseId } = req.params;

    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const enrollments = await enrollmentService.getEnrollmentsByCourse({ courseId });

    return res.status(200).json({
      message: "Get enrollments by course successfully",
      data: enrollments,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}

module.exports = {
  enrollCourseController,
  unenrollCourseController,
  getMyEnrollmentsController,
  checkEnrolledController,
  getEnrollmentsByCourseController,
};