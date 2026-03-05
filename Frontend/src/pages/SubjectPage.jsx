<<<<<<< HEAD
import "../styles/SubjectPage.css";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import { useMemo } from "react";
import { subjects } from "../data/subjects";

const SubjectPage = () => {
  const { subjectSlug } = useParams();

  const subject = subjects.find(
    (s) => s.slug === subjectSlug
  );

  if (!subject) {
    return <h2 style={{ padding: "100px" }}>Không tìm thấy môn học</h2>;
  }

  const progress = useMemo(() => {
    const doneLessons = subject.lessons.filter(l => l.done);
    return Math.round((doneLessons.length / subject.lessons.length) * 100);
  }, [subject]);

  return (
    <div className="subject-page">
      {/* HERO */}
      <section className="subject-hero">
        <div className="container">
          <div className="subject-hero-content">
            <div>
              <span className="subject-badge">{subject.grade}</span>

              <h1 className="subject-title">
                <span className="gradient-text">
                  {subject.title}
                </span>
              </h1>

              <p className="subject-description">
                {subject.description}
              </p>
            </div>

            <div className="subject-progress-card">
              <h4>Tiến độ</h4>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p>{progress}% hoàn thành</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="subject-content">
        <div className="container">

          <div className="subject-section">
            <h2>Danh sách bài học</h2>

            <div className="subject-list">
              {subject.lessons.map((lesson) => (
                <div key={lesson.slug} className="subject-item">
                  <div className="subject-item-left">
                    {lesson.done ? (
                      <CheckCircle className="icon done" />
                    ) : lesson.type === "theory" ? (
                      <PlayCircle className="icon video" />
                    ) : (
                      <Lock className="icon lock" />
                    )}

                    <span>{lesson.title}</span>
                  </div>

                  <Link
                    to={`/subject/${subject.slug}/${lesson.slug}`}
                    className="btn btn-secondary small"
                  >
                    Học
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="final-test-card">
            <h3>Bài kiểm tra cuối chương</h3>
            <p>Kiểm tra kiến thức bạn đã học.</p>
            <button className="btn btn-primary">
              Bắt đầu
            </button>
          </div>

        </div>
      </section>
=======
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
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
    </div>
  );
};

<<<<<<< HEAD
export default SubjectPage;
=======
export default LessonDetail;
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
