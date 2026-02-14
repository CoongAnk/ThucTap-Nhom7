// controllers/progress.controller.js

const progressService = require("../progress/progress.service");

async function upsertProgressController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId, lessonId } = req.params;
    const { isCompleted, lastVideoSecond } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId || !lessonId) {
      return res.status(400).json({ message: "courseId and lessonId are required" });
    }

    const progress = await progressService.upsertProgress({
      userId,
      courseId,
      lessonId,
      isCompleted,
      lastVideoSecond,
    });

    return res.status(200).json({
      message: "Progress updated",
      data: progress,
    });
  } catch (err) {
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getProgressByCourseController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId) return res.status(400).json({ message: "courseId is required" });

    const list = await progressService.getProgressByCourse({ userId, courseId });

    return res.status(200).json({
      message: "Get progress successfully",
      data: list,
    });
  } catch (err) {
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getProgressByLessonController(req, res) {
  try {
    const userId = req.user?.id;
    const { courseId, lessonId } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!courseId || !lessonId) {
      return res.status(400).json({ message: "courseId and lessonId are required" });
    }

    const progress = await progressService.getProgressByLesson({
      userId,
      courseId,
      lessonId,
    });

    return res.status(200).json({
      message: "Get progress successfully",
      data: progress,
    });
  } catch (err) {
    if (err.message === "NOT_ENROLLED") {
      return res.status(403).json({ message: "You must enroll this course first" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  upsertProgressController,
  getProgressByCourseController,
  getProgressByLessonController,
};