import { courseUsecase } from "./course.usecase.js";

export const courseController = {
  async createCourse(req, res) {
    try {
      const course = await courseUsecase.createCourse(req.body);
      return res.status(201).json({ ok: true, data: course });
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  },

  async getCourses(req, res) {
    try {
      const courses = await courseUsecase.getCourses(req.query);
      return res.status(200).json({ ok: true, data: courses });
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  },

  async getCourseDetail(req, res) {
    try {
      const course = await courseUsecase.getCourseDetail(req.params.courseId);
      return res.status(200).json({ ok: true, data: course });
    } catch (err) {
      return res.status(404).json({ ok: false, message: err.message });
    }
  },

  async updateCourse(req, res) {
    try {
      const course = await courseUsecase.updateCourse(
        req.params.courseId,
        req.body
      );
      return res.status(200).json({ ok: true, data: course });
    } catch (err) {
      return res.status(404).json({ ok: false, message: err.message });
    }
  },

  async deleteCourse(req, res) {
    try {
      const course = await courseUsecase.deleteCourse(req.params.courseId);
      return res.status(200).json({ ok: true, data: course });
    } catch (err) {
      return res.status(404).json({ ok: false, message: err.message });
    }
  },

  // Lessons
  async addLesson(req, res) {
    try {
      const course = await courseUsecase.addLesson(
        req.params.courseId,
        req.body
      );
      return res.status(201).json({ ok: true, data: course });
    } catch (err) {
      return res.status(400).json({ ok: false, message: err.message });
    }
  },

  async updateLesson(req, res) {
    try {
      const course = await courseUsecase.updateLesson(
        req.params.courseId,
        req.params.lessonId,
        req.body
      );
      return res.status(200).json({ ok: true, data: course });
    } catch (err) {
      return res.status(404).json({ ok: false, message: err.message });
    }
  },

  async deleteLesson(req, res) {
    try {
      const course = await courseUsecase.deleteLesson(
        req.params.courseId,
        req.params.lessonId
      );
      return res.status(200).json({ ok: true, data: course });
    } catch (err) {
      return res.status(404).json({ ok: false, message: err.message });
    }
  },
};