// usecases/quiz.usecase.js

const Quiz = require("../quiz/quiz.model");
const Enrollment = require("../enrollment/enrollment.model");

async function createQuizUsecase({
  title,
  courseId,
  lessonId = null,
  questions = [],
  timeLimitSeconds = 0,
  passScore = 0,
  isPublished = true,
}) {
  if (!title) throw new Error("TITLE_REQUIRED");
  if (!courseId) throw new Error("COURSE_REQUIRED");

  // Validate questions order
  const normalizedQuestions = questions.map((q, idx) => ({
    ...q,
    order: typeof q.order === "number" ? q.order : idx + 1,
  }));

  const quiz = await Quiz.create({
    title,
    courseId,
    lessonId,
    questions: normalizedQuestions,
    timeLimitSeconds,
    passScore,
    isPublished,
  });

  return quiz;
}

async function getQuizListUsecase({ userId, courseId, lessonId = null }) {
  // Chỉ cho xem quiz nếu đã enroll
  const enrolled = await Enrollment.exists({ userId, courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  const filter = { courseId, isPublished: true };

  // lesson quiz
  if (lessonId) filter.lessonId = lessonId;

  // course quiz (lessonId = null)
  if (lessonId === null) filter.lessonId = null;

  const quizzes = await Quiz.find(filter)
    .select("title courseId lessonId timeLimitSeconds passScore createdAt")
    .sort({ createdAt: -1 });

  return quizzes;
}

async function getQuizDetailUsecase({ userId, quizId }) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("QUIZ_NOT_FOUND");

  // Check enroll
  const enrolled = await Enrollment.exists({ userId, courseId: quiz.courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  // Trả về quiz full (có correctAnswerIndex)
  // Lưu ý: nếu bạn muốn bảo mật hơn, bạn nên có endpoint "start quiz"
  return quiz;
}

module.exports = {
  createQuizUsecase,
  getQuizListUsecase,
  getQuizDetailUsecase,
};