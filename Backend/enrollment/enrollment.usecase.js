// usecases/enrollment.usecase.js

const Enrollment = require("../enrollment/enrollment.model");
const Course = require("../models/course.model");

async function enrollCourseUsecase({ userId, courseId }) {
  // Check course tồn tại
  const course = await Course.findById(courseId).select("_id");
  if (!course) throw new Error("COURSE_NOT_FOUND");

  // Create enrollment (unique index sẽ chặn trùng)
  try {
    const enrollment = await Enrollment.create({
      userId,
      courseId,
    });

    return enrollment;
  } catch (err) {
    if (err.code === 11000) throw new Error("ALREADY_ENROLLED");
    throw err;
  }
}

async function unenrollCourseUsecase({ userId, courseId }) {
  const deleted = await Enrollment.findOneAndDelete({
    userId,
    courseId,
  });

  if (!deleted) throw new Error("ENROLLMENT_NOT_FOUND");

  return deleted;
}

async function getMyEnrollmentsUsecase({ userId }) {
  const enrollments = await Enrollment.find({ userId })
    .populate("courseId", "title thumbnail description category author isPublished")
    .sort({ createdAt: -1 });

  return enrollments;
}

async function checkEnrolledUsecase({ userId, courseId }) {
  const exist = await Enrollment.exists({ userId, courseId });
  return !!exist;
}

async function getEnrollmentsByCourseUsecase({ courseId }) {
  const enrollments = await Enrollment.find({ courseId })
    .populate("userId", "name email role")
    .sort({ createdAt: -1 });

  return enrollments;
}

module.exports = {
  enrollCourseUsecase,
  unenrollCourseUsecase,
  getMyEnrollmentsUsecase,
  checkEnrolledUsecase,
  getEnrollmentsByCourseUsecase,
};