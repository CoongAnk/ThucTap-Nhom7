const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: String, // Link YouTube hoặc Cloudinary
    content: String,  // Nội dung bài đọc (Markdown hoặc HTML)
    order: Number     // Thứ tự bài học trong chương
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // VD: Toán, Lý, Lập trình
    thumbnail: String,
    description: String,
    author: { type: String, default: "Khan Academy Clone" },
    lessons: [LessonSchema], // Nhúng danh sách bài học vào trong Khóa học
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);