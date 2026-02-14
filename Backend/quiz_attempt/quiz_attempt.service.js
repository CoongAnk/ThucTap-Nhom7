// services/quizAttempt.service.js

const {
  submitQuizAttemptUsecase,
  getMyAttemptsByQuizUsecase,
  getMyAttemptsByCourseUsecase,
} = require("../quiz_attempt/quiz_attempt.usecase");

const quizAttemptService = {
  submitAttempt: submitQuizAttemptUsecase,
  getMyAttemptsByQuiz: getMyAttemptsByQuizUsecase,
  getMyAttemptsByCourse: getMyAttemptsByCourseUsecase,
};

module.exports = quizAttemptService;