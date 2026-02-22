import { courseService } from "./course.service.js";

export const courseUsecase = {
  async createCourse(payload) {
    // MVP: course admin-only thì bạn thêm check role ở controller
    if (!payload?.title || !payload?.category) {
      throw new Error("Missing required fields: title, category");
    }

    return courseService.createCourse({
      title: payload.title,
      category: payload.category,
      thumbnail: payload.thumbnail ?? "",
      description: payload.description ?? "",
      author: payload.author ?? "Academy",
      isPublished: payload.isPublished ?? true,
      lessons: [],
    });
  },

  async getCourses(query) {
    const search = query?.search?.trim() ?? "";
    const category = query?.category?.trim() ?? "";
    const isPublished =
      query?.isPublished === undefined
        ? true
        : query.isPublished === "true" || query.isPublished === true;

    return courseService.getCourses({
      search: search || undefined,
      category: category || undefined,
      isPublished,
    });
  },

  async getCourseDetail(courseId) {
    const course = await courseService.getCourseById(courseId);
    if (!course) throw new Error("Course not found");
    return course;
  },

  async updateCourse(courseId, payload) {
    const updated = await courseService.updateCourse(courseId, payload);
    if (!updated) throw new Error("Course not found");
    return updated;
  },

  async deleteCourse(courseId) {
    const deleted = await courseService.deleteCourse(courseId);
    if (!deleted) throw new Error("Course not found");
    return deleted;
  },

  // Lessons
  async addLesson(courseId, payload) {
    if (!payload?.title || payload?.order === undefined) {
      throw new Error("Missing required fields: title, order");
    }

    const course = await courseService.addLesson(courseId, {
      title: payload.title,
      videoUrl: payload.videoUrl ?? "",
      content: payload.content ?? "",
      order: payload.order,
    });

    if (!course) throw new Error("Course not found");
    return course;
  },

  async updateLesson(courseId, lessonId, payload) {
    const course = await courseService.updateLesson(courseId, lessonId, payload);
    if (!course) throw new Error("Course or lesson not found");
    return course;
  },

  async deleteLesson(courseId, lessonId) {
    const course = await courseService.deleteLesson(courseId, lessonId);
    if (!course) throw new Error("Course or lesson not found");
    return course;
  },
};