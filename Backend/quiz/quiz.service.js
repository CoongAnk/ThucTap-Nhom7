const {
  createQuizUsecase,
  getQuizListUsecase,
  getQuizDetailUsecase,
} = require("../quiz/quiz.usecase");

const quizService = {
  createQuiz: createQuizUsecase,
  getQuizList: getQuizListUsecase,
  getQuizDetail: getQuizDetailUsecase,
};

module.exports = quizService;