import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subjects } from '../data/subjects';
import '../styles/Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('courses');
  const [isLoading, setIsLoading] = useState(true);

  // Kiểm tra xem user đã đăng nhập hay chưa
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  // Xử lý click menu item
  const handleMenuClick = (menuId) => {
    setActiveSidebar(menuId);
    
    switch (menuId) {
      case 'progress':
        // Trang "Quá trình tự học"
        navigate('/progress');
        break;
      case 'courses':
        // Ở lại trang Courses
        break;
      case 'account':
        // Trang "Tài khoản của tôi"
        navigate('/account');
        break;
      case 'progress-detail':
        // Trang "Tiến trình"
        navigate('/progress-detail');
        break;
      case 'profile':
        // Trang "Hộ sơ"
        navigate('/profile');
        break;
      case 'teacher':
        // Trang "Giáo viên"
        navigate('/teacher');
        break;
      default:
        break;
    }
  };

  // Lấy thông tin user từ localStorage
  const userData = JSON.parse(localStorage.getItem('user') || '{}');

  if (isLoading) {
    return null;
  }

  const menuItems = [
    { id: 'progress', label: 'Quá trình tự học', icon: '📊' },
    { id: 'courses', label: 'Các khóa học', icon: '📚' },
    { id: 'account', label: 'Tài khoản của tôi', icon: '👤' },
    { id: 'progress-detail', label: 'Tiến trình', icon: '📈' },
    { id: 'profile', label: 'Hộ sơ', icon: '📋' },
    { id: 'teacher', label: 'Giáo viên', icon: '👨‍🏫' },
  ];

  // Chuyển đổi dữ liệu từ subjects thành courses
  const getCourses = () => {
    const courseIcons = ['📐', '🎨', '🗄️', '🎮', '🧠', '🌟', '🔬', '💻', '📝', '🎯'];
    const courseColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#74b9ff', '#a29bfe', '#fdcb6e', '#6c5ce7'];

    return subjects.map((subject, index) => ({
      id: subject.slug,
      icon: courseIcons[index % courseIcons.length],
      title: subject.title || subject.grade,
      description: subject.description,
      progress: subject.lessons ? Math.round((subject.lessons.filter(l => l.done).length / subject.lessons.length) * 100) : 0,
      color: courseColors[index % courseColors.length],
      slug: subject.slug
    }));
  };

  const courses = getCourses();

  return (
    <div className="courses-page">
      <div className="courses-container">
        {/* SIDEBAR */}
        <aside className="courses-sidebar">
          <div className="sidebar-user">
            <div className="user-avatar">{userData.fullName?.charAt(0).toUpperCase() || 'U'}</div>
            <div className="user-info">
              <p className="user-name">{userData.fullName || 'Người dùng'}</p>
              <p className="user-label">Chọn tên đại diện - <span className="edit-profile">Thêm tiêu sự của bạn</span></p>
            </div>
            <button className="edit-profile-btn">Chỉnh sửa hộ sơ</button>
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
              <Link to="/quiz" className="btn-quiz">
                📝 Bài kiểm tra
              </Link>
              <Link to="/tutor" className="btn-tutor">
                🤖 AI Tutor
              </Link>
            </div>
          </div>

          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-icon" style={{ backgroundColor: course.color }}>
                  {course.icon}
                </div>
                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                </div>
                <Link to={`/subject/${course.slug}`} className="btn-continue">
                  Tiếp tục
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Courses;
