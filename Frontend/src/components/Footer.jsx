import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cols">
        <div>
          <h4>Về chúng tôi</h4>
          <a href="#">Giới thiệu</a>
          <a href="#">Sứ mệnh</a>
        </div>
        <div>
          <h4>Học tập</h4>
          <a href="#">Toán</a>
          <a href="#">Khoa học</a>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <a href="#">Quyên góp</a>
          <a href="#">Liên hệ</a>
        </div>
      </div>
    </footer>
  );
}