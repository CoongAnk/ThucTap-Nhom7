import express from "express";
import authRoutes from "../auth/auth.route.js"; 
import courseRoutes from "../course/course.route.js"
import enrollmentRoutes from "../enrollment/enrollment.route.js"
import progressRoute from "../progress/progress.route.js"
import quizRoute from "../quiz/quiz.route.js"
import quizAttemptRoute from "../quiz_attempt/quiz_attempt.route.js"


const app = express();

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes)
app.use("/api/progress", progressRoute)
app.use("/api/quiz", quizRoute)
app.use("/api/quiz_attempt", quizAttemptRoute)


export default app;

