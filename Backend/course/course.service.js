import mongoose from "mongoose";
import { CourseModel } from "../models/course.model.js";

export const courseService = {
  async createCourse(data) {
    const course = await CourseModel.create(data);
    return course;
  },

  async getCourses({ search, category, isPublished }) {
    const filter = {};

    if (typeof isPublished === "boolean") filter.isPublished = isPublished;
    if (category) filter.category = category;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const courses = await CourseModel.find(filter).sort({ createdAt: -1 });
    return courses;
  },

  async getCourseById(courseId) {
    if (!mongoose.isValidObjectId(courseId)) return null;
    return CourseModel.findById(courseId);
  },

  async updateCourse(courseId, data) {
    if (!mongoose.isValidObjectId(courseId)) return null;

    return CourseModel.findByIdAndUpdate(courseId, data, {
      new: true,
      runValidators: true,
    });
  },

  async deleteCourse(courseId) {
    if (!mongoose.isValidObjectId(courseId)) return null;
    return CourseModel.findByIdAndDelete(courseId);
  },

  // Lessons
  async addLesson(courseId, lessonData) {
    if (!mongoose.isValidObjectId(courseId)) return null;

    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    course.lessons.push(lessonData);
    await course.save();

    return course;
  },

  async updateLesson(courseId, lessonId, lessonData) {
    if (!mongoose.isValidObjectId(courseId)) return null;
    if (!mongoose.isValidObjectId(lessonId)) return null;

    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const lesson = course.lessons.id(lessonId);
    if (!lesson) return null;

    if (lessonData.title !== undefined) lesson.title = lessonData.title;
    if (lessonData.videoUrl !== undefined) lesson.videoUrl = lessonData.videoUrl;
    if (lessonData.content !== undefined) lesson.content = lessonData.content;
    if (lessonData.order !== undefined) lesson.order = lessonData.order;

    await course.save();
    return course;
  },

  async deleteLesson(courseId, lessonId) {
    if (!mongoose.isValidObjectId(courseId)) return null;
    if (!mongoose.isValidObjectId(lessonId)) return null;

    const course = await CourseModel.findById(courseId);
    if (!course) return null;

    const lesson = course.lessons.id(lessonId);
    if (!lesson) return null;

    lesson.deleteOne();
    await course.save();

    return course;
  },
};