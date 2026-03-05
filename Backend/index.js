const express = require('express');
const connectDB = require('./config/db.js');
const courseRoutes = require('./routes/courseRoutes.js');
const authRoutes = require("./auth/auth.route.js"); // 👈 THÊM

require('dotenv').config();

const app = express();
connectDB(); // Gọi kết nối DB

app.use(express.json());
app.use("/api/auth", authRoutes); // 👈 AUTH
app.use('/api/courses', courseRoutes); // Sử dụng route khóa học

app.listen(5000, () => console.log('🚀 Server is running on port 5000'));