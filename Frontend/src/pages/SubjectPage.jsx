import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { subjects } from "../data/subjects";
import "../styles/LessonDetail.css";

const LessonDetail = () => {
  const { subjectSlug, lessonSlug } = useParams();

  const subject = subjects.find((s) => s.slug === subjectSlug);
  const lesson = subject?.lessons.find((l) => l.slug === lessonSlug);

  const [box, setBox] = useState([]);
  const [message, setMessage] = useState("");

  if (!subject || !lesson) {
    return <h2 style={{ padding: "40px" }}>Không tìm thấy bài học</h2>;
  }

  // ========================
  // DRAG DROP LOGIC
  // ========================
  const handleDragStart = (e) => {
    e.dataTransfer.setData("item", lesson.data?.item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("item");
    setBox([...box, item]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkResult = () => {
    if (box.length === lesson.data.required) {
      setMessage("🎉 Chính xác!");
    } else {
      setMessage("❌ Chưa đúng, hãy thử lại.");
    }
  };

  // ========================
  // RENDER
  // ========================
  return (
    <div className="lesson-detail-page">
      <div className="container lesson-detail-container">

        {/* Sidebar */}
        <aside className="lesson-detail-sidebar">
          <h3>{subject.title}</h3>
          <ul>
            {subject.lessons.map((l) => (
              <li key={l.slug} className={l.slug === lessonSlug ? "active" : ""}>
                <Link to={`/subject/${subject.slug}/${l.slug}`}>
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main className="lesson-detail-content">
          <h1>{lesson.title}</h1>

          {/* ===== THEORY ===== */}
          {lesson.type === "theory" && (
            <div className="lesson-content">
              <p style={{ whiteSpace: "pre-line" }}>
                {lesson.content}
              </p>
            </div>
          )}

          {/* ===== DRAG DROP ===== */}
          {lesson.type === "drag-drop" && (
            <div className="exercise-card">
              <h2>Bài tập</h2>
              <p>{lesson.data.question}</p>

              <div className="exercise-area">

                <div
                  className="item"
                  draggable
                  onDragStart={handleDragStart}
                >
                  {lesson.data.item}
                </div>

                <div
                  className="drop-zone"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {box.length === 0
                    ? "Thả vào đây"
                    : box.map((item, index) => (
                        <span key={index}>{item}</span>
                      ))}
                </div>

              </div>

              <button
                className="btn btn-primary"
                onClick={checkResult}
              >
                Kiểm tra kết quả
              </button>

              {message && (
                <p style={{ marginTop: "16px", fontWeight: "bold" }}>
                  {message}
                </p>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
};

export default LessonDetail;