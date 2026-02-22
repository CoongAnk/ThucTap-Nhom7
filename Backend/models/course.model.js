import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, default: "" },
    content: { type: String, default: "" },
    order: { type: Number, required: true },
  },
  { _id: true }
);

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    description: { type: String, default: "" },
    author: { type: String, default: "Academy" },

    isPublished: { type: Boolean, default: true },

    lessons: { type: [LessonSchema], default: [] },
  },
  { timestamps: true }
);

export const CourseModel = mongoose.model("Course", CourseSchema);