// usecases/progress.usecase.js

const Progress = require("../quiz/progress.model");
const Enrollment = require("../enrollment/enrollment.model");

async function upsertProgressUsecase({
  userId,
  courseId,
  lessonId,
  isCompleted,
  lastVideoSecond,
}) {
  // Bảo vệ: chỉ cho update progress nếu user đã enroll
  const enrolled = await Enrollment.exists({ userId, courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  const update = {};

  if (typeof lastVideoSecond === "number") {
    update.lastVideoSecond = Math.max(0, lastVideoSecond);
  }

  // Nếu đánh dấu hoàn thành
  if (typeof isCompleted === "boolean") {
    update.isCompleted = isCompleted;
    update.completedAt = isCompleted ? new Date() : null;
  }

  const progress = await Progress.findOneAndUpdate(
    { userId, courseId, lessonId },
    { $set: update, $setOnInsert: { userId, courseId, lessonId } },
    { new: true, upsert: true }
  );

  return progress;
}

async function getProgressByCourseUsecase({ userId, courseId }) {
  const enrolled = await Enrollment.exists({ userId, courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  const list = await Progress.find({ userId, courseId }).sort({ updatedAt: -1 });

  return list;
}

async function getProgressByLessonUsecase({ userId, courseId, lessonId }) {
  const enrolled = await Enrollment.exists({ userId, courseId });
  if (!enrolled) throw new Error("NOT_ENROLLED");

  const progress = await Progress.findOne({ userId, courseId, lessonId });
  return progress; // có thể null
}

module.exports = {
  upsertProgressUsecase,
  getProgressByCourseUsecase,
  getProgressByLessonUsecase,
};