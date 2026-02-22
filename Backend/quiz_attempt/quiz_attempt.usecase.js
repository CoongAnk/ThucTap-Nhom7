// usecases/quizAttempt.usecase.js

const Quiz = require("../quiz/quiz.model");
const QuizAttempt = require("../quiz/quiz_attempt.model");
const Enrollment = require("../enrollment/enrollment.model");

function calculateScore({ total, correct }) {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

async function submitQuizAttemptUsecase({ userId, quizId, answers }) {
  // Load quiz
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new Error("QUIZ_NOT_FOUND");

  // Check enrolled
  const enrolled = await Enrollment.exists({ userId, courseId: quiz.courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  // Validate answers
  if (!Array.isArray(answers)) throw new Error("ANSWERS_INVALID");

  const questionMap = new Map();
  quiz.questions.forEach((q) => questionMap.set(String(q._id), q));

  let correctCount = 0;
  const attemptAnswers = [];

  for (const ans of answers) {
    const q = questionMap.get(String(ans.questionId));
    if (!q) continue;

    const selectedIndex = Number(ans.selectedIndex);
    const isCorrect = selectedIndex === q.correctAnswerIndex;

    if (isCorrect) correctCount++;

    attemptAnswers.push({
      questionId: q._id,
      selectedIndex,
      isCorrect,
    });
  }

  const totalQuestions = quiz.questions.length;
  const score = calculateScore({ total: totalQuestions, correct: correctCount });

  const attempt = await QuizAttempt.create({
    userId,
    quizId: quiz._id,
    courseId: quiz.courseId,
    lessonId: quiz.lessonId || null,
    totalQuestions,
    correctCount,
    score,
    answers: attemptAnswers,
    startedAt: new Date(),
    submittedAt: new Date(),
  });

  return attempt;
}

async function getMyAttemptsByQuizUsecase({ userId, quizId }) {
  const attempts = await QuizAttempt.find({ userId, quizId })
    .sort({ submittedAt: -1 })
    .limit(50);

  return attempts;
}

async function getMyAttemptsByCourseUsecase({ userId, courseId }) {
  const enrolled = await Enrollment.exists({ userId, courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  const attempts = await QuizAttempt.find({ userId, courseId })
    .sort({ submittedAt: -1 })
    .limit(50);

  return attempts;
}

module.exports = {
  submitQuizAttemptUsecase,
  getMyAttemptsByQuizUsecase,
  getMyAttemptsByCourseUsecase,
};