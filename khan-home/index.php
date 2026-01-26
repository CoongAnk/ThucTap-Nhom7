<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Khan Academy Clone</title>

  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/header.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/footer.css">
</head>
<body>

<!-- HEADER -->
<?php include 'header.php'; ?>

<!-- HERO -->
<section class="hero">
  <div class="hero-text">
    <h1>Nền giáo dục miễn phí cho mọi người, ở mọi nơi</h1>
    <p>Học tập cá nhân hóa giúp người học tiến bộ vững chắc.</p>

    <div class="role-buttons">
      <a class="role-btn">Người học</a>
      <a class="role-btn">Giáo viên</a>
      <a class="role-btn">Phụ huynh</a>
    </div>
  </div>

  <div class="hero-image">
    <img src="images/hero-main.jpg">
  </div>
</section>

<!-- EXPLORE DARK -->
<section class="explore-dark">
  <h2>Khám phá môn học</h2>

  <details>
    <summary>Toán học theo lớp</summary>
    <div class="explore-content">
      <img src="images/explore-math.jpg">
      <p>Toán tiểu học đến trung học phổ thông.</p>
    </div>
  </details>

  <details>
    <summary>Toán học theo chuyên đề</summary>
    <div class="explore-content">
      <img src="images/explore-science.jpg">
      <p>Đại số, hình học, xác suất.</p>
    </div>
  </details>

  <details>
    <summary>Kỹ năng đời sống</summary>
    <div class="explore-content">
      <img src="images/explore-life.jpg">
      <p>Kỹ năng tài chính và tư duy.</p>
    </div>
  </details>

  <details>
    <summary>Khoa học máy tính & lập trình</summary>
    <div class="explore-content">
      <img src="images/explore-cs.jpg">
      <p>Lập trình và tư duy máy tính.</p>
    </div>
  </details>

  <details>
    <summary>Dành cho giáo viên & quản lý</summary>
    <div class="explore-content">
      <img src="images/explore-teacher.jpg">
      <p>Công cụ giảng dạy và quản lý lớp.</p>
    </div>
  </details>
</section>

<!-- EFFECTIVENESS -->
<section class="effectiveness">
  <h2>Lý do nền tảng hiệu quả</h2>
  <div class="effect-grid">
    <div>
      <img src="images/effectiveness-1.jpg">
      <p>Cá nhân hóa lộ trình học.</p>
    </div>
    <div>
      <img src="images/effectiveness-2.jpg">
      <p>Phản hồi tức thì.</p>
    </div>
    <div>
      <img src="images/effectiveness-3.jpg">
      <p>Miễn phí và đáng tin cậy.</p>
    </div>
  </div>
</section>

<!-- TEACHER -->
<section class="teacher">
  <img src="images/teacher-section.jpg">
  <div>
    <h2>Dành cho giáo viên</h2>
    <p>Công cụ hỗ trợ giảng dạy hiệu quả.</p>
    <a class="primary-btn">Nếu bạn là giáo viên, bắt đầu tại đây</a>
  </div>
</section>

<!-- LEARNER -->
<section class="learner">
  <div>
    <h2>NGƯỜI HỌC VÀ HỌC SINH</h2>
    <p>Bạn có thể học bất cứ điều gì.</p>
    <p>Xây dựng nền tảng kiến thức vững chắc về toán học, khoa học và nhiều bộ môn khác.</p>
    <a class="primary-btn">Nếu bạn là người học, bắt đầu tại đây</a>
  </div>
  <img src="images/learner-section.jpg">
</section>

<!-- QUOTE -->
<section class="quote">
  <img src="images/quote-section.jpg">
  <blockquote>
    “Giáo dục là nền tảng của một xã hội tiến bộ.”
  </blockquote>
</section>

<!-- DONATION -->
<section class="donation">
  <img src="images/donation-section.jpg">
  <div>
    <h2>Cùng chúng tôi tạo nên sự khác biệt</h2>
    <p>Tất cả trẻ em đều xứng đáng có cơ hội học tập.</p>
    <a class="donate-btn">Giúp các em có cơ hội học tập</a>
  </div>
</section>

<!-- JOIN -->
<section class="join">
  <h2>Tham gia Khan Academy ngay hôm nay</h2>
  <div class="role-buttons">
    <a class="role-btn">Người học</a>
    <a class="role-btn">Giáo viên</a>
    <a class="role-btn">Phụ huynh</a>
  </div>
</section>

<!-- SPONSORS -->
<section class="sponsors">
  <h2>Những người hỗ trợ</h2>
  <p>Ann Doerr · Bill Gates · Google.org · Chan Zuckerberg Initiative</p>
</section>

<!-- FOOTER -->
<?php include 'footer.php'; ?>

</body>
</html>
