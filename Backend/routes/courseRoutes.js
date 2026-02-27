const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');

// 1. Lấy tất cả khóa học (để hiện ở trang chủ)
router.get('/', async (req, res) => {
    const courses = await Course.find().select('-lessons'); // Không lấy lessons để giảm dung lượng
    res.json(courses);
});

// 2. Lấy chi tiết 1 khóa học bao gồm tất cả bài học bên trong
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.json(course);
});

module.exports = router;