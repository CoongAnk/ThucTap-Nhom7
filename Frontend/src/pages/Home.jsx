import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Heart, Star, CheckCircle, Play, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [openExplore, setOpenExplore] = useState(null);

  const exploreCategories = [
    {
      id: 1,
      icon: '📐',
      title: 'Toán học theo lớp',
      image: '/images/explore-math.jpg',
      description: 'Nội dung toán học từ tiểu học đến THPT',
      subjects: ['Lớp 1-5', 'Lớp 6-9', 'Lớp 10-12', 'Giải tích', 'Đại số tuyến tính']
    },
    {
      id: 2,
      icon: '🔢',
      title: 'Toán học theo chuyên đề',
      image: '/images/explore-science.jpg',
      description: 'Đại số, hình học, xác suất',
      subjects: ['Đại số', 'Hình học', 'Giải tích', 'Xác suất thống kê', 'Lượng giác']
    },
    {
      id: 3,
      icon: '💡',
      title: 'Kỹ năng đời sống',
      image: '/images/explore-life.jpg',
      description: 'Kỹ năng tài chính và tư duy',
      subjects: ['Tài chính cá nhân', 'Tư duy phản biện', 'Kỹ năng giao tiếp', 'Quản lý thời gian']
    },
    {
      id: 4,
      icon: '💻',
      title: 'Khoa học máy tính & lập trình',
      image: '/images/explore-cs.jpg',
      description: 'Lập trình và tư duy máy tính',
      subjects: ['Python', 'JavaScript', 'HTML/CSS', 'Thuật toán', 'Cấu trúc dữ liệu']
    },
    {
      id: 5,
      icon: '👨‍🏫',
      title: 'Dành cho giáo viên & quản lý',
      image: '/images/explore-teacher.jpg',
      description: 'Công cụ giảng dạy và quản lý lớp',
      subjects: ['Quản lý lớp học', 'Theo dõi tiến độ', 'Tạo bài kiểm tra', 'Báo cáo chi tiết']
    }
  ];

  const stats = [
    { number: '500K+', label: 'Học viên đang học', icon: <Users size={32} /> },
    { number: '1000+', label: 'Khóa học chất lượng', icon: <BookOpen size={32} /> },
    { number: '95%', label: 'Tỷ lệ hài lòng', icon: <Award size={32} /> },
    { number: '24/7', label: 'Hỗ trợ liên tục', icon: <Heart size={32} /> }
  ];

  const effectiveness = [
    {
      title: 'Cá nhân hóa lộ trình học',
      description: 'Hệ thống AI thích ứng với tốc độ và phong cách học của từng người',
      icon: <TrendingUp size={48} />,
      color: '#667eea'
    },
    {
      title: 'Phản hồi tức thì',
      description: 'Nhận kết quả ngay lập tức và giải thích chi tiết cho mỗi bài tập',
      icon: <CheckCircle size={48} />,
      color: '#764ba2'
    },
    {
      title: 'Miễn phí và đáng tin cậy',
      description: 'Giáo dục chất lượng cao hoàn toàn miễn phí cho mọi người',
      icon: <Heart size={48} />,
      color: '#f093fb'
    }
  ];

  const sponsors = [
    'Ann Doerr',
    'Bill Gates',
    'Google.org',
    'Chan Zuckerberg Initiative',
    'Bank of America',
    'AT&T'
  ];

  return (
    <main className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Star size={16} />
                <span>Nền tảng học tập #1 Việt Nam</span>
              </div>
              
              <h1 className="hero-title">
                Nền giáo dục miễn phí cho <span className="gradient-text">mọi người</span>, ở mọi nơi
              </h1>
              
              <p className="hero-description">
                Học tập cá nhân hóa giúp người học tiến bộ vững chắc. 
                Hàng triệu học sinh đang tin tưởng và sử dụng nền tảng của chúng tôi.
              </p>

              <div className="hero-buttons">
<<<<<<< HEAD
                <Link to="/signup?role=learner" className="btn btn-primary">
=======
                <Link to="/quiz" className="btn btn-primary">
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
                  <Users size={20} />
                  <span>Bắt đầu học ngay</span>
                  <ArrowRight size={18} />
                </Link>
                
                <button className="btn btn-secondary">
                  <Play size={20} />
                  <span>Xem video giới thiệu</span>
                </button>
              </div>

              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <h3>{stat.number}</h3>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-image">
              <div className="image-wrapper">
                <img src="/images/hero-main.jpg" alt="Students learning" />
                <div className="floating-card card-1">
                  <CheckCircle size={24} className="card-icon" />
                  <div>
                    <p className="card-title">Hoàn thành bài học</p>
                    <p className="card-value">+15 điểm</p>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <Award size={24} className="card-icon" />
                  <div>
                    <p className="card-title">Huy hiệu mới</p>
                    <p className="card-value">Toán học cơ bản</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE SECTION */}
      <section className="explore-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Khám phá môn học</h2>
            <p className="section-description">
              Chọn lĩnh vực bạn muốn chinh phục
            </p>
          </div>

          <div className="explore-grid">
            {exploreCategories.map((category) => (
              <div 
                key={category.id}
                className={`explore-card ${openExplore === category.id ? 'active' : ''}`}
                onClick={() => setOpenExplore(openExplore === category.id ? null : category.id)}
              >
                <div className="explore-card-header">
                  <div className="explore-card-icon">{category.icon}</div>
                  <div className="explore-card-title">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                  <ArrowRight 
                    className={`explore-arrow ${openExplore === category.id ? 'rotate' : ''}`} 
                    size={20} 
                  />
                </div>
                
                {openExplore === category.id && (
                  <div className="explore-card-content">
                    <div className="explore-subjects">
                      {category.subjects.map((subject, idx) => (
                        <Link key={idx} to={`/course/${subject}`} className="subject-tag">
                          {subject}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EFFECTIVENESS SECTION */}
      <section className="effectiveness-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lý do nền tảng hiệu quả</h2>
            <p className="section-description">
              Được thiết kế dựa trên nghiên cứu khoa học về học tập
            </p>
          </div>

          <div className="effectiveness-grid">
            {effectiveness.map((item, index) => (
              <div key={index} className="effectiveness-card">
                <div className="effectiveness-icon" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHER SECTION */}
      <section className="feature-section teacher-section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-image">
              <img src="/images/teacher-section.jpg" alt="Teacher tools" />
            </div>
            
            <div className="feature-content">
              <div className="feature-badge">Dành cho giáo viên</div>
              <h2>Công cụ giảng dạy hiện đại</h2>
              <p>
                Trang bị đầy đủ công cụ để theo dõi tiến độ học sinh, 
                tạo bài kiểm tra, và quản lý lớp học hiệu quả hơn.
              </p>
              
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>Theo dõi tiến độ từng học sinh</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Tạo bài kiểm tra tự động</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Báo cáo chi tiết và trực quan</span>
                </li>
              </ul>
              
              <Link to="/signup?role=teacher" className="btn btn-primary">
                Bắt đầu ngay
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNER SECTION */}
      <section className="feature-section learner-section">
        <div className="container">
          <div className="feature-grid reverse">
            <div className="feature-content">
              <div className="feature-badge">Người học & Học sinh</div>
              <h2>Bạn có thể học bất cứ điều gì</h2>
              <p>
                Xây dựng nền tảng kiến thức vững chắc về toán học, 
                khoa học và nhiều bộ môn khác với phương pháp học tập 
                được cá nhân hóa riêng cho bạn.
              </p>
              
              <ul className="feature-list">
                <li>
                  <CheckCircle size={20} />
                  <span>Học theo tốc độ của riêng bạn</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Luyện tập không giới hạn</span>
                </li>
                <li>
                  <CheckCircle size={20} />
                  <span>Nhận huy hiệu và thành tựu</span>
                </li>
              </ul>
              
              <Link to="/signup?role=learner" className="btn btn-primary">
                Khám phá ngay
                <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="feature-image">
              <img src="/images/learner-section.jpg" alt="Student learning" />
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-content">
            <div className="quote-icon">"</div>
            <blockquote>
              Giáo dục là nền tảng của một xã hội tiến bộ. 
              Mục tiêu của chúng tôi là mang đến cơ hội học tập 
              chất lượng cao cho mọi người, bất kể hoàn cảnh.
            </blockquote>
            <div className="quote-author">
              <img src="/images/quote-section.jpg" alt="Founder" />
              <div>
                <p className="author-name">Salman Khan</p>
                <p className="author-title">Founder, Khan Academy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION SECTION */}
      <section className="donation-section">
        <div className="container">
          <div className="donation-content">
            <div className="donation-icon">
              <Heart size={64} />
            </div>
            <h2>Cùng chúng tôi tạo nên sự khác biệt</h2>
            <p>
              Tất cả trẻ em đều xứng đáng có cơ hội học tập. 
              Mỗi đóng góp của bạn giúp hàng triệu học sinh trên toàn thế giới 
              tiếp cận với giáo dục chất lượng cao hoàn toàn miễn phí.
            </p>
            
            <Link to="/donate" className="btn btn-donate">
              <Heart size={20} />
              Giúp các em có cơ hội học tập
            </Link>
            
            <p className="donation-note">
              Khan Academy là tổ chức phi lợi nhuận 501(c)(3). 
              Mọi đóng góp đều được khấu trừ thuế.
            </p>
          </div>
        </div>
      </section>

      {/* JOIN SECTION */}
      <section className="join-section">
        <div className="container">
          <h2>Tham gia Khan Academy ngay hôm nay</h2>
          <p>Chọn vai trò phù hợp với bạn để bắt đầu</p>
          
          <div className="join-cards">
            <Link to="/signup?role=learner" className="join-card">
              <div className="join-card-icon learner">
                <BookOpen size={32} />
              </div>
              <h3>Người học</h3>
              <p>Khám phá kiến thức mới mỗi ngày</p>
              <ArrowRight className="join-arrow" size={20} />
            </Link>

            <Link to="/signup?role=teacher" className="join-card featured">
              <div className="join-card-icon teacher">
                <Users size={32} />
              </div>
              <h3>Giáo viên</h3>
              <p>Quản lý và theo dõi học sinh</p>
              <ArrowRight className="join-arrow" size={20} />
            </Link>

            <Link to="/signup?role=parent" className="join-card">
              <div className="join-card-icon parent">
                <Heart size={32} />
              </div>
              <h3>Phụ huynh</h3>
              <p>Đồng hành cùng con em</p>
              <ArrowRight className="join-arrow" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* SPONSORS SECTION */}
      <section className="sponsors-section">
        <div className="container">
          <h3>Những người hỗ trợ chúng tôi</h3>
          <div className="sponsors-grid">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="sponsor-item">
                {sponsor}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;