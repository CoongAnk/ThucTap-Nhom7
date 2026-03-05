import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="Khan Academy Logo" />
              <h3>Khan Academy</h3>
            </div>
            <p className="footer-tagline">
              Giáo dục miễn phí, chất lượng cao cho mọi người, mọi nơi.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Về chúng tôi</h4>
              <Link to="/about">Giới thiệu</Link>
              <Link to="/mission">Sứ mệnh</Link>
              <Link to="/team">Đội ngũ</Link>
              <Link to="/careers">Tuyển dụng</Link>
              <Link to="/press">Báo chí</Link>
            </div>

            <div className="footer-column">
              <h4>Học tập</h4>
              <Link to="/math">Toán học</Link>
              <Link to="/science">Khoa học</Link>
              <Link to="/programming">Lập trình</Link>
              <Link to="/economics">Kinh tế</Link>
              <Link to="/history">Lịch sử</Link>
            </div>

            <div className="footer-column">
              <h4>Tài nguyên</h4>
              <Link to="/teachers">Dành cho giáo viên</Link>
              <Link to="/parents">Dành cho phụ huynh</Link>
              <Link to="/students">Dành cho học sinh</Link>
              <Link to="/help">Trung tâm trợ giúp</Link>
              <Link to="/blog">Blog</Link>
            </div>

            <div className="footer-column">
              <h4>Hỗ trợ</h4>
              <Link to="/donate" className="highlight-link">Quyên góp</Link>
              <Link to="/partners">Đối tác</Link>
              <Link to="/volunteer">Tình nguyện viên</Link>
              <Link to="/contact">Liên hệ</Link>
              <Link to="/faq">Câu hỏi thường gặp</Link>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <div className="contact-item">
            <MapPin size={18} />
            <span>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>+84 123 456 789</span>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <span>support@khanacademy.vn</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} Khan Academy. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy">Chính sách bảo mật</Link>
            <span className="divider">•</span>
            <Link to="/terms">Điều khoản sử dụng</Link>
            <span className="divider">•</span>
            <Link to="/cookies">Cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}