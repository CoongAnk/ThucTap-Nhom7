const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // lessonId là _id của subdocument lessons trong Course
    lessonId: { type: mongoose.Schema.Types.ObjectId, required: true },

    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },

    // optional: lưu vị trí video (nếu bạn muốn)
    lastVideoSecond: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// 1 user chỉ có 1 progress record cho 1 lesson
ProgressSchema.index(
  { userId: 1, courseId: 1, lessonId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Progress", ProgressSchema);