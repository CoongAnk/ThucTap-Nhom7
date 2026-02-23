import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, BookOpen, Microscope, Code, Lightbulb, GraduationCap, Heart, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUser, logout as logoutUser } from '../api/auth.api.js';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const exploreItems = [
    { icon: <BookOpen size={20} />, title: 'Toán học', desc: 'Từ cơ bản đến nâng cao', link: '/math' },
    { icon: <Microscope size={20} />, title: 'Khoa học', desc: 'Vật lý, Hóa học, Sinh học', link: '/science' },
    { icon: <Code size={20} />, title: 'Lập trình', desc: 'Web, Python, JavaScript', link: '/programming' },
    { icon: <Lightbulb size={20} />, title: 'Kỹ năng', desc: 'Tư duy phản biện, Sáng tạo', link: '/skills' },
    { icon: <GraduationCap size={20} />, title: 'Giáo viên', desc: 'Tài nguyên cho giáo viên', link: '/teachers' },
  ];

  // ✅ Kiểm tra user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
      console.log('✅ User loaded from localStorage:', storedUser);
    }
  }, []);

  // ✅ Lắng nghe event đăng nhập từ Login component
  useEffect(() => {
    const handleUserLoggedIn = (event) => {
      const userData = event.detail;
      console.log('✅ userLoggedIn event received:', userData);
      setUser(userData);
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
    };
  }, []);

  // ✅ Đăng xuất
  const handleLogout = () => {
    logoutUser(); // Xóa token, user, v.v. từ localStorage
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    console.log('✅ User logged out');
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* LEFT */}
        <div className="header-left">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Explore Menu */}
          <div className="explore-wrapper">
            <button 
              className="explore-btn"
              onClick={() => setIsExploreOpen(!isExploreOpen)}
            >
              Khám phá <ChevronDown size={18} className={isExploreOpen ? 'rotate' : ''} />
            </button>
            
            {isExploreOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setIsExploreOpen(false)}></div>
                <div className="explore-dropdown">
                  <div className="dropdown-header">
                    <h3>Khám phá nội dung học tập</h3>
                    <p>Chọn môn học bạn muốn học</p>
                  </div>
                  <div className="dropdown-grid">
                    {exploreItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.link}
                        className="dropdown-item"
                        onClick={() => setIsExploreOpen(false)}
                      >
                        <div className="item-icon">{item.icon}</div>
                        <div className="item-content">
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Search */}
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text"
              className="search-input" 
              placeholder="Tìm kiếm khóa học, bài học..." 
            />
          </div>
        </div>

        {/* CENTER - Logo */}
        <Link to="/" className="header-center">
          <div className="logo-wrapper">
            <img src="/images/logo.png" alt="logo" />
          </div>
          <span className="brand-name">Khan Academy</span>
        </Link>

        {/* RIGHT */}
        <div className={`header-right ${isMenuOpen ? 'mobile-open' : ''}`}>
          {user ? (
            // ✅ User đã đăng nhập - Hiển thị profile menu
            <div className="user-menu-wrapper">
              <button 
                className="user-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} />
                  ) : (
                    <span className="avatar-initials">
                      {user.fullName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="user-info">
                  <span className="user-name">{user.fullName}</span>
                  <span className="user-role">
                    {user.role === 'student' ? 'Học viên' : user.role === 'teacher' ? 'Giáo viên' : 'Phụ huynh'}
                  </span>
                </div>
                <ChevronDown 
                  size={18} 
                  className={`dropdown-icon ${isUserMenuOpen ? 'rotate' : ''}`}
                />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="dropdown-overlay" onClick={() => setIsUserMenuOpen(false)}></div>
                  <div className="user-dropdown">
                    <Link 
                      to="/profile" 
                      className="user-dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>Hồ sơ của tôi</span>
                    </Link>
                    <button 
                      className="user-dropdown-item logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            // ✅ User chưa đăng nhập - Hiển thị login/signup buttons
            <>
              <Link to="/login" className="nav-link">
                Đăng nhập
              </Link>
              <Link to="/signup" className="signup-btn">
                Đăng ký
              </Link>
              <a href="/donate" className="donate-btn">
                <Heart size={18} />
                <span>Quyên góp</span>
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}