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
    </div>
  );
};

export default SubjectPage;