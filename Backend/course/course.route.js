import express from "express";
import { courseController } from "./course.controller.js";

// Nếu bạn có auth middleware thì import vào đây
// import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

// Public
router.get("/", courseController.getCourses);
router.get("/:courseId", courseController.getCourseDetail);

// Admin (tạm thời để public luôn cho dễ test)
// router.post("/", requireAuth, courseController.createCourse);
router.post("/", courseController.createCourse);
router.patch("/:courseId", courseController.updateCourse);
router.delete("/:courseId", courseController.deleteCourse);

// Lessons
router.post("/:courseId/lessons", courseController.addLesson);
router.patch("/:courseId/lessons/:lessonId", courseController.updateLesson);
router.delete("/:courseId/lessons/:lessonId", courseController.deleteLesson);

export default router;