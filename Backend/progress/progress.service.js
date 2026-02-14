// services/progress.service.js

const {
  upsertProgressUsecase,
  getProgressByCourseUsecase,
  getProgressByLessonUsecase,
} = require("../progress/progress.usecase");

const progressService = {
  upsertProgress: upsertProgressUsecase,
  getProgressByCourse: getProgressByCourseUsecase,
  getProgressByLesson: getProgressByLessonUsecase,
};

module.exports = progressService;