// controllers/quizAttempt.controller.js

const quizAttemptService = require("../quiz_attempt/quiz_attempt.service");

async function submitQuizAttemptController(req, res) {
  try {
    const userId = req.user?.id;
    const { quizId } = req.params;
    const { answers } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!quizId) return res.status(400).json({ message: "quizId is required" });

    const attempt = await quizAttemptService.submitAttempt({
      userId,
      quizId,
      answers,
    });

    return res.status(201).json({
      message: "Submit quiz successfully",
      data: attempt,
    });
  } catch (err) {
    if (err.message === "QUIZ_NOT_FOUND") {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    if (err.message === "ANSWERS_INVALID") {
      return res.status(400).json({ message: "answers must be an array" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getMyAttemptsByQuizController(req, res) {
  try {
    const userId = req.user?.id;
    const { quizId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!quizId) return res.status(400).json({ message: "quizId is required" });

    const attempts = await quizAttemptService.getMyAttemptsByQuiz({
      userId,
      quizId,
    });

    return res.status(200).json({
      message: "Get attempts successfully",
      data: attempts,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getMyAttemptsByCourseController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const attempts = await quizAttemptService.getMyAttemptsByCourse({
      userId,
      courseId,
    });

    return res.status(200).json({
      message: "Get attempts by course successfully",
      data: attempts,
    });
  } catch (err) {
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  submitQuizAttemptController,
  getMyAttemptsByQuizController,
  getMyAttemptsByCourseController,
};