import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatTutor from "./pages/ChatTutor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Quiz from "./pages/Quiz";
import SubjectPage from "./pages/SubjectPage";
import LessonDetail from "./pages/LessonDetail";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutor" element={<ChatTutor />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/subject/:subjectSlug" element={<SubjectPage />} />
        <Route path="/subject/:subjectSlug/:lessonSlug" element={<LessonDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;