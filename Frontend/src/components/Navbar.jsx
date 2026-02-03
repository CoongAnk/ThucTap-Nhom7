import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-left">
        <details className="explore-menu">
          <summary>Khám phá ▾</summary>
          <div className="dropdown">
            <a href="#">Toán học</a>
            <a href="#">Khoa học</a>
            <a href="#">Lập trình</a>
            <a href="#">Kỹ năng</a>
            <a href="#">Giáo viên</a>
          </div>
        </details>
        <input className="search" placeholder="Tìm kiếm" />
      </div>

      <div className="header-center">
        <img src="/images/logo.png" alt="logo" />
        <span>Khan Academy</span>
      </div>

      <div className="header-right">
        <Link to="/login">Đăng nhập</Link>
        <a href="#" className="signup-btn">Đăng ký</a>
        <a href="#" className="donate-link">Quyên góp</a>
      </div>
    </header>
  );
}