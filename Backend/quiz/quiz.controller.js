// controllers/quiz.controller.js

const quizService = require("../quiz/quiz.service");

async function createQuizController(req, res) {
  try {
    // Nếu bạn chưa có admin role thì tạm cho create tự do
    const { title, courseId, lessonId, questions, timeLimitSeconds, passScore, isPublished } =
      req.body;

    const quiz = await quizService.createQuiz({
      title,
      courseId,
      lessonId,
      questions,
      timeLimitSeconds,
      passScore,
      isPublished,
    });

    return res.status(201).json({
      message: "Create quiz successfully",
      data: quiz,
    });
  } catch (err) {
    if (err.message === "TITLE_REQUIRED") {
      return res.status(400).json({ message: "title is required" });
    }
    if (err.message === "COURSE_REQUIRED") {
      return res.status(400).json({ message: "courseId is required" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getQuizListController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;
    const { lessonId } = req.query;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const quizzes = await quizService.getQuizList({
      userId,
      courseId,
      lessonId: lessonId || null,
    });

    return res.status(200).json({
      message: "Get quizzes successfully",
      data: quizzes,
    });
  } catch (err) {
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getQuizDetailController(req, res) {
  try {
    const userId = req.user?.id;
    const { quizId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!quizId) return res.status(400).json({ message: "quizId is required" });

    const quiz = await quizService.getQuizDetail({ userId, quizId });

    return res.status(200).json({
      message: "Get quiz detail successfully",
      data: quiz,
    });
  } catch (err) {
    if (err.message === "QUIZ_NOT_FOUND") {
      return res.status(404).json({ message: "Quiz not found" });
    }
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createQuizController,
  getQuizListController,
  getQuizDetailController,
};