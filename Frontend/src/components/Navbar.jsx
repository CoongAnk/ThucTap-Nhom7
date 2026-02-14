import { Link } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, BookOpen, Microscope, Code, Lightbulb, GraduationCap, Heart } from 'lucide-react';
import { useState } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const exploreItems = [
    { icon: <BookOpen size={20} />, title: 'Toán học', desc: 'Từ cơ bản đến nâng cao', link: '/math' },
    { icon: <Microscope size={20} />, title: 'Khoa học', desc: 'Vật lý, Hóa học, Sinh học', link: '/science' },
    { icon: <Code size={20} />, title: 'Lập trình', desc: 'Web, Python, JavaScript', link: '/programming' },
    { icon: <Lightbulb size={20} />, title: 'Kỹ năng', desc: 'Tư duy phản biện, Sáng tạo', link: '/skills' },
    { icon: <GraduationCap size={20} />, title: 'Giáo viên', desc: 'Tài nguyên cho giáo viên', link: '/teachers' },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* LEFT */}
        <div className="header-left">
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        </div>
      </div>
    </header>
  );
}