const mongoose = require("mongoose");

const AttemptAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    selectedIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false }
);

const QuizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    lessonId: { type: mongoose.Schema.Types.ObjectId, default: null },

    totalQuestions: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    score: { type: Number, required: true }, // ví dụ 0-100

    answers: { type: [AttemptAnswerSchema], default: [] },

    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// để query attempt theo user+quiz nhanh
QuizAttemptSchema.index({ userId: 1, quizId: 1, submittedAt: -1 });

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);