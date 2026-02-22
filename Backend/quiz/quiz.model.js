const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },

    // options dạng ["A", "B", "C", "D"]
    options: {
      type: [String],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 2;
        },
        message: "A question must have at least 2 options",
      },
      required: true,
    },

    // index đáp án đúng
    correctAnswerIndex: {
      type: Number,
      required: true,
      min: 0,
    },

    explanation: { type: String, default: "" },

    order: { type: Number, required: true },
  },
  { _id: true }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // nếu quiz theo lesson thì set lessonId, nếu quiz toàn course thì null
    lessonId: { type: mongoose.Schema.Types.ObjectId, default: null },

    isPublished: { type: Boolean, default: true },

    questions: { type: [QuestionSchema], default: [] },

    timeLimitSeconds: { type: Number, default: 0 }, // 0 = không giới hạn
    passScore: { type: Number, default: 0 }, // ví dụ 70
  },
  { timestamps: true }
);

// index tìm quiz theo course + lesson
QuizSchema.index({ courseId: 1, lessonId: 1 });

module.exports = mongoose.model("Quiz", QuizSchema);