// services/enrollment.service.js

const {
  enrollCourseUsecase,
  unenrollCourseUsecase,
  getMyEnrollmentsUsecase,
  checkEnrolledUsecase,
  getEnrollmentsByCourseUsecase,
} = require("../enrollment/enrollment.usecase");

const enrollmentService = {
  enrollCourse: enrollCourseUsecase,
  unenrollCourse: unenrollCourseUsecase,
  getMyEnrollments: getMyEnrollmentsUsecase,
  checkEnrolled: checkEnrolledUsecase,
  getEnrollmentsByCourse: getEnrollmentsByCourseUsecase,
};

module.exports = enrollmentService;