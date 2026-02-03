import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <main className="container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Nền giáo dục miễn phí cho mọi người, ở mọi nơi</h1>
          <p>Học tập cá nhân hóa giúp người học tiến bộ vững chắc.</p>

          <div className="role-buttons">
            <button className="role-btn">Người học</button>
            <button className="role-btn">Giáo viên</button>
            <button className="role-btn">Phụ huynh</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/hero-main.jpg" alt="Hero" />
        </div>
      </section>

      {/* EXPLORE DARK SECTION */}
      <section className="explore-dark">
        <h2>Khám phá môn học</h2>

        <details>
          <summary>Toán học theo lớp</summary>
          <div className="explore-content">
            <img src="/images/explore-math.jpg" alt="Math" />
            <p>Nội dung toán học từ tiểu học đến THPT</p>
          </div>
        </details>

        <details>
          <summary>Toán học theo chuyên đề</summary>
          <div className="explore-content">
            <img src="/images/explore-science.jpg" alt="Science" />
            <p>Đại số, hình học, xác suất.</p>
          </div>
        </details>

        <details>
          <summary>Kỹ năng đời sống</summary>
          <div className="explore-content">
            <img src="/images/explore-life.jpg" alt="Life" />
            <p>Kỹ năng tài chính và tư duy.</p>
          </div>
        </details>

        <details>
          <summary>Khoa học máy tính & lập trình</summary>
          <div className="explore-content">
            <img src="/images/explore-cs.jpg" alt="CS" />
            <p>Lập trình và tư duy máy tính.</p>
          </div>
        </details>

        <details>
          <summary>Dành cho giáo viên & quản lý</summary>
          <div className="explore-content">
            <img src="/images/explore-teacher.jpg" alt="Teacher" />
            <p>Công cụ giảng dạy và quản lý lớp.</p>
          </div>
        </details>
      </section>

      {/* EFFECTIVENESS */}
      <section className="effectiveness">
        <h2>Lý do nền tảng hiệu quả</h2>

        <div className="effect-grid">
          <div>
            <img src="/images/effectiveness-1.jpg" alt="Effect 1" />
            <p>Cá nhân hóa lộ trình học.</p>
          </div>

          <div>
            <img src="/images/effectiveness-2.jpg" alt="Effect 2" />
            <p>Phản hồi tức thì.</p>
          </div>

          <div>
            <img src="/images/effectiveness-3.jpg" alt="Effect 3" />
            <p>Miễn phí và đáng tin cậy.</p>
          </div>
        </div>
      </section>

      {/* TEACHER */}
      <section className="teacher">
        <img src="/images/teacher-section.jpg" alt="Teacher" />
        <div>
          <h2>Dành cho giáo viên</h2>
          <p>Công cụ hỗ trợ giảng dạy hiệu quả.</p>
          <a className="primary-btn">Nếu bạn là giáo viên, bắt đầu tại đây</a>
        </div>
      </section>

      {/* LEARNER */}
      <section className="learner">
        <div>
          <h2>NGƯỜI HỌC VÀ HỌC SINH</h2>
          <p>Bạn có thể học bất cứ điều gì.</p>
          <p>
            Xây dựng nền tảng kiến thức vững chắc về toán học,
            khoa học và nhiều bộ môn khác.
          </p>
          <a className="primary-btn">Nếu bạn là người học, bắt đầu tại đây</a>
        </div>

        <img src="/images/learner-section.jpg" alt="Learner" />
      </section>

      {/* QUOTE */}
      <section className="quote">
        <img src="/images/quote-section.jpg" alt="Quote" />
        <blockquote>
          “Giáo dục là nền tảng của một xã hội tiến bộ.”
        </blockquote>
      </section>

      {/* DONATION */}
      <section className="donation">
        <img src="/images/donation-section.jpg" alt="Donation" />
        <div>
          <h2>Cùng chúng tôi tạo nên sự khác biệt</h2>
          <p>Tất cả trẻ em đều xứng đáng có cơ hội học tập.</p>
          <a className="donate-btn">Giúp các em có cơ hội học tập</a>
        </div>
      </section>

      {/* JOIN */}
      <section className="join">
        <h2>Tham gia Khan Academy ngay hôm nay</h2>
        <div className="role-buttons">
          <a className="role-btn">Người học</a>
          <a className="role-btn">Giáo viên</a>
          <a className="role-btn">Phụ huynh</a>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="sponsors">
        <h2>Những người hỗ trợ</h2>
        <p>Ann Doerr · Bill Gates · Google.org · Chan Zuckerberg Initiative</p>
      </section>
    </main>
  )
}

export default Home
