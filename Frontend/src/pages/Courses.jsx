import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subjects } from '../data/subjects';
import '../styles/Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('courses');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleMenuClick = (menuId) => {
    setActiveSidebar(menuId);

    switch (menuId) {
      case 'progress':
        navigate('/progress');
        break;
      case 'courses':
        break;
      case 'account':
        navigate('/account');
        break;
      case 'progress-detail':
        navigate('/progress-detail');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      default:
        break;
    }
  };

  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  if (isLoading) {
    return null;
  }

  const menuItems = [
    { id: 'progress', label: 'Quá trình tự học', icon: '📊' },
    { id: 'courses', label: 'Các khóa học', icon: '📚' },
    { id: 'account', label: 'Tài khoản của tôi', icon: '👤' },
    { id: 'progress-detail', label: 'Tiến trình', icon: '📈' },
    { id: 'profile', label: 'Hồ sơ', icon: '📋' },
    { id: 'teacher', label: 'Giáo viên', icon: '👨‍🏫' },
  ];

  const getCourses = () => {
    const courseIcons = ['📐', '🎨', '🗄️', '🎮', '🧠', '🌟', '🔬', '💻', '📝', '🎯'];
    const courseColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#74b9ff', '#a29bfe', '#fdcb6e', '#6c5ce7'];

    return subjects.map((subject, index) => ({
      id: subject.slug,
      icon: courseIcons[index % courseIcons.length],
      title: subject.title || subject.grade,
      description: subject.description,
      progress: subject.lessons
        ? Math.round(
            (subject.lessons.filter(l => l.done).length /
              subject.lessons.length) * 100
          )
        : 0,
      color: courseColors[index % courseColors.length],
      slug: subject.slug
    }));
  };

  const courses = getCourses();

  const quizItems = [
    { id: 5, title: "Bài kiểm tra Toán", icon: "📐", color: "#6c5ce7" },
    { id: 4, title: "Bài kiểm tra Tiếng Anh", icon: "📘", color: "#ff6b6b" },
    { id: 3, title: "Bài kiểm tra Lập trình", icon: "💻", color: "#00b894" }
  ];

  // Quiz mặc định (quiz đầu tiên)
  const defaultQuizId = quizItems.length > 0 ? quizItems[0].id : null;

  return (
    <div className="courses-page">
      <div className="courses-container">
        {/* SIDEBAR */}
        <aside className="courses-sidebar">
          <div className="sidebar-user">
            <div className="user-avatar">
              {userData.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <p className="user-name">{userData.fullName || 'Người dùng'}</p>
              <p className="user-label">
                Chọn tên đại diện - <span className="edit-profile">Thêm tiểu sử của bạn</span>
              </p>
            </div>
            <button className="edit-profile-btn">Chỉnh sửa hồ sơ</button>
          </div>

          <nav className="sidebar-menu">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-item ${activeSidebar === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="courses-main">
          <div className="courses-header">
            <h1>Các khóa học của tôi</h1>

            <div className="header-buttons">
              <button className="btn-add-course">Chỉnh sửa khóa học</button>

            </div>
          </div>

          

          {/* QUIZ SECTION */}
          <div className="quiz-section">
            <h2 className="quiz-title">Bài kiểm tra tổng hợp</h2>

            <div className="quiz-grid">
              {quizItems.map((quiz) => (
                <div
                  key={quiz.id}
                  className="quiz-card"
                  onClick={() => navigate(`/quiz?quizId=${quiz.id}`)}
                >
                  <div
                    className="quiz-icon"
                    style={{ backgroundColor: quiz.color }}
                  >
                    {quiz.icon}
                  </div>

                  <h3 className="quiz-card-title">{quiz.title}</h3>

                  <button className="quiz-start-btn">
                    Làm bài
                  </button>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Courses;