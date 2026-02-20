-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 20, 2026 lúc 08:08 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `edu_platform`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ai_chat_messages`
--

CREATE TABLE `ai_chat_messages` (
  `message_id` int(10) UNSIGNED NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  `role` enum('user','assistant') NOT NULL COMMENT 'user = học viên, assistant = AI',
  `content` text NOT NULL,
  `tokens_used` int(10) UNSIGNED DEFAULT 0 COMMENT 'Số token tiêu thụ (để kiểm soát chi phí)',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lịch sử tin nhắn AI ChatBot';

--
-- Đang đổ dữ liệu cho bảng `ai_chat_messages`
--

INSERT INTO `ai_chat_messages` (`message_id`, `session_id`, `role`, `content`, `tokens_used`, `created_at`) VALUES
(1, 1, 'user', 'Vòng lặp for trong Python hoạt động như thế nào?', 15, '2026-02-20 13:35:31'),
(2, 1, 'assistant', 'Vòng lặp `for` trong Python dùng để duyệt qua các phần tử của một iterable (list, tuple, string...). Cú pháp: `for item in iterable: ...`', 60, '2026-02-20 13:35:31'),
(3, 1, 'user', 'Cho tôi ví dụ cụ thể được không?', 10, '2026-02-20 13:35:31'),
(4, 1, 'assistant', 'Tất nhiên! Ví dụ: `for i in range(5): print(i)` sẽ in ra các số từ 0 đến 4.', 40, '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ai_chat_sessions`
--

CREATE TABLE `ai_chat_sessions` (
  `session_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'Chat trong ngữ cảnh khóa học cụ thể',
  `title` varchar(200) DEFAULT 'Cuộc trò chuyện mới',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phiên chat AI ChatBot';

--
-- Đang đổ dữ liệu cho bảng `ai_chat_sessions`
--

INSERT INTO `ai_chat_sessions` (`session_id`, `user_id`, `course_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'Hỏi về vòng lặp Python', '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(2, 4, NULL, 'Câu hỏi tổng quát về lập trình', '2026-02-20 13:35:31', '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

CREATE TABLE `answers` (
  `answer_id` int(10) UNSIGNED NOT NULL,
  `question_id` int(10) UNSIGNED NOT NULL,
  `answer_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Đáp án trắc nghiệm';

--
-- Đang đổ dữ liệu cho bảng `answers`
--

INSERT INTO `answers` (`answer_id`, `question_id`, `answer_text`, `is_correct`) VALUES
(1, 1, 'if', 1),
(2, 1, 'when', 0),
(3, 1, 'check', 0),
(4, 1, 'cond', 0),
(5, 2, 'In ra: Đúng', 1),
(6, 2, 'Không in gì cả', 0),
(7, 2, 'Lỗi cú pháp', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `icon_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh mục khóa học (hỗ trợ danh mục cha-con)';

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `slug`, `icon_url`, `description`, `parent_id`, `created_at`) VALUES
(1, 'Lập Trình', 'lap-trinh', NULL, 'Các khóa học về lập trình và phát triển phần mềm', NULL, '2026-02-20 13:35:31'),
(2, 'Toán Học', 'toan-hoc', NULL, 'Toán học từ cơ bản đến nâng cao', NULL, '2026-02-20 13:35:31'),
(3, 'Khoa Học Máy Tính', 'khoa-hoc-may-tinh', NULL, 'AI, Machine Learning, Data Science', NULL, '2026-02-20 13:35:31'),
(4, 'Python', 'python', NULL, 'Lập trình Python', 1, '2026-02-20 13:35:31'),
(5, 'JavaScript', 'javascript', NULL, 'Lập trình JavaScript & Web', 1, '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `courses`
--

CREATE TABLE `courses` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `instructor_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `description` text DEFAULT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `level` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
  `language` varchar(50) NOT NULL DEFAULT 'Tiếng Việt',
  `price` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT '0 = miễn phí',
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng khóa học';

--
-- Đang đổ dữ liệu cho bảng `courses`
--

INSERT INTO `courses` (`course_id`, `instructor_id`, `category_id`, `title`, `slug`, `description`, `thumbnail_url`, `level`, `language`, `price`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 2, 4, 'Python Cơ Bản Cho Người Mới Bắt Đầu', 'python-co-ban', 'Khóa học Python từ zero đến biết code, phù hợp mọi đối tượng.', NULL, 'beginner', 'Tiếng Việt', 0.00, 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(2, 2, 5, 'JavaScript Nâng Cao & ES6+', 'javascript-nang-cao', 'Nắm vững JavaScript hiện đại với ES6, async/await và module.', NULL, 'intermediate', 'Tiếng Việt', 299000.00, 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(3, 3, 3, 'Nhập Môn Machine Learning với Python', 'nhap-mon-machine-learning', 'Tổng quan về AI và Machine Learning, thực hành với scikit-learn.', NULL, 'beginner', 'Tiếng Việt', 499000.00, 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `enrolled_at` datetime NOT NULL DEFAULT current_timestamp(),
  `completed_at` datetime DEFAULT NULL,
  `progress_pct` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Tiến độ 0-100%'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Ghi danh khóa học';

--
-- Đang đổ dữ liệu cho bảng `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `user_id`, `course_id`, `enrolled_at`, `completed_at`, `progress_pct`) VALUES
(1, 4, 1, '2026-02-20 13:35:31', NULL, 60),
(2, 5, 1, '2026-02-20 13:35:31', NULL, 20),
(3, 4, 3, '2026-02-20 13:35:31', NULL, 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lessons`
--

CREATE TABLE `lessons` (
  `lesson_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext DEFAULT NULL COMMENT 'Nội dung văn bản / HTML',
  `video_url` varchar(500) DEFAULT NULL,
  `duration_sec` int(10) UNSIGNED DEFAULT 0 COMMENT 'Thời lượng video (giây)',
  `position` smallint(5) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Thứ tự hiển thị',
  `is_free` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 = học thử miễn phí',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bài học trong khóa học';

--
-- Đang đổ dữ liệu cho bảng `lessons`
--

INSERT INTO `lessons` (`lesson_id`, `course_id`, `title`, `content`, `video_url`, `duration_sec`, `position`, `is_free`, `created_at`) VALUES
(1, 1, 'Giới thiệu Python & Cài đặt môi trường', 'Nội dung bài 1...', NULL, 600, 1, 1, '2026-02-20 13:35:31'),
(2, 1, 'Biến, kiểu dữ liệu và toán tử', 'Nội dung bài 2...', NULL, 900, 2, 1, '2026-02-20 13:35:31'),
(3, 1, 'Cấu trúc điều kiện if-else', 'Nội dung bài 3...', NULL, 720, 3, 0, '2026-02-20 13:35:31'),
(4, 1, 'Vòng lặp for và while', 'Nội dung bài 4...', NULL, 840, 4, 0, '2026-02-20 13:35:31'),
(5, 1, 'Hàm (Functions)', 'Nội dung bài 5...', NULL, 1080, 5, 0, '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lesson_progress`
--

CREATE TABLE `lesson_progress` (
  `progress_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `lesson_id` int(10) UNSIGNED NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `last_position` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Vị trí xem dở (giây)',
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tiến độ học từng bài của học viên';

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `notif_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(200) NOT NULL,
  `body` text DEFAULT NULL,
  `type` varchar(50) DEFAULT 'general' COMMENT 'general | course | quiz | ai | system',
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông báo cho người dùng';

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

CREATE TABLE `questions` (
  `question_id` int(10) UNSIGNED NOT NULL,
  `quiz_id` int(10) UNSIGNED NOT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('single','multiple','true_false') NOT NULL DEFAULT 'single',
  `position` smallint(5) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Câu hỏi trắc nghiệm';

--
-- Đang đổ dữ liệu cho bảng `questions`
--

INSERT INTO `questions` (`question_id`, `quiz_id`, `question_text`, `question_type`, `position`) VALUES
(1, 1, 'Từ khóa nào dùng để kiểm tra điều kiện trong Python?', 'single', 1),
(2, 1, 'Kết quả của `if 5 > 3: print(\"Đúng\")` là gì?', 'single', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `lesson_id` int(10) UNSIGNED DEFAULT NULL COMMENT 'NULL = quiz cuối khóa',
  `title` varchar(200) NOT NULL,
  `pass_score` tinyint(3) UNSIGNED NOT NULL DEFAULT 70 COMMENT 'Điểm qua môn (%)',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bài kiểm tra';

--
-- Đang đổ dữ liệu cho bảng `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `course_id`, `lesson_id`, `title`, `pass_score`, `created_at`) VALUES
(1, 1, 3, 'Kiểm tra: Cấu trúc điều kiện', 70, '2026-02-20 13:35:31'),
(2, 1, NULL, 'Bài kiểm tra cuối khóa Python', 80, '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quiz_attempts`
--

CREATE TABLE `quiz_attempts` (
  `attempt_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `quiz_id` int(10) UNSIGNED NOT NULL,
  `score` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Điểm đạt được (%)',
  `is_passed` tinyint(1) NOT NULL DEFAULT 0,
  `attempted_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lịch sử làm bài kiểm tra';

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL DEFAULT 5 COMMENT 'Điểm 1-5',
  `comment` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `course_id`, `rating`, `comment`, `created_at`) VALUES
(1, 4, 1, 5, 'Khóa học rất hay, giải thích dễ hiểu!', '2026-02-20 13:35:31'),
(2, 5, 1, 4, 'Nội dung tốt, mong có thêm bài tập thực hành.', '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar_url` varchar(500) DEFAULT NULL,
  `role` enum('student','instructor','admin') NOT NULL DEFAULT 'student',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng người dùng hệ thống';

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `avatar_url`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Admin Hệ Thống', 'admin@eduplatform.vn', '$2y$10$exampleHashAdmin', NULL, 'admin', 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(2, 'Nguyễn Văn An', 'instructor1@eduplatform.vn', '$2y$10$exampleHashInstructor1', NULL, 'instructor', 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(3, 'Trần Thị Bình', 'instructor2@eduplatform.vn', '$2y$10$exampleHashInstructor2', NULL, 'instructor', 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(4, 'Lê Hoàng Nam', 'student1@eduplatform.vn', '$2y$10$exampleHashStudent1', NULL, 'student', 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31'),
(5, 'Phạm Thị Mai', 'student2@eduplatform.vn', '$2y$10$exampleHashStudent2', NULL, 'student', 1, '2026-02-20 13:35:31', '2026-02-20 13:35:31');

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `vw_course_stats`
-- (See below for the actual view)
--
CREATE TABLE `vw_course_stats` (
`course_id` int(10) unsigned
,`title` varchar(200)
,`instructor_name` varchar(100)
,`total_students` bigint(21)
,`avg_rating` decimal(5,1)
,`total_reviews` bigint(21)
,`total_lessons` bigint(21)
,`total_duration_sec` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `vw_user_ai_usage`
-- (See below for the actual view)
--
CREATE TABLE `vw_user_ai_usage` (
`user_id` int(10) unsigned
,`full_name` varchar(100)
,`total_sessions` bigint(21)
,`total_messages` bigint(21)
,`total_tokens` decimal(32,0)
);

-- --------------------------------------------------------

--
-- Cấu trúc cho view `vw_course_stats`
--
DROP TABLE IF EXISTS `vw_course_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_course_stats`  AS SELECT `c`.`course_id` AS `course_id`, `c`.`title` AS `title`, `u`.`full_name` AS `instructor_name`, count(distinct `e`.`user_id`) AS `total_students`, ifnull(round(avg(`r`.`rating`),1),0) AS `avg_rating`, count(distinct `r`.`review_id`) AS `total_reviews`, count(distinct `l`.`lesson_id`) AS `total_lessons`, sum(`l`.`duration_sec`) AS `total_duration_sec` FROM ((((`courses` `c` join `users` `u` on(`u`.`user_id` = `c`.`instructor_id`)) left join `enrollments` `e` on(`e`.`course_id` = `c`.`course_id`)) left join `reviews` `r` on(`r`.`course_id` = `c`.`course_id`)) left join `lessons` `l` on(`l`.`course_id` = `c`.`course_id`)) GROUP BY `c`.`course_id`, `c`.`title`, `u`.`full_name` ;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `vw_user_ai_usage`
--
DROP TABLE IF EXISTS `vw_user_ai_usage`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_user_ai_usage`  AS SELECT `u`.`user_id` AS `user_id`, `u`.`full_name` AS `full_name`, count(distinct `s`.`session_id`) AS `total_sessions`, count(`m`.`message_id`) AS `total_messages`, ifnull(sum(`m`.`tokens_used`),0) AS `total_tokens` FROM ((`users` `u` left join `ai_chat_sessions` `s` on(`s`.`user_id` = `u`.`user_id`)) left join `ai_chat_messages` `m` on(`m`.`session_id` = `s`.`session_id`)) GROUP BY `u`.`user_id`, `u`.`full_name` ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ai_chat_messages`
--
ALTER TABLE `ai_chat_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `idx_session_time` (`session_id`,`created_at`);

--
-- Chỉ mục cho bảng `ai_chat_sessions`
--
ALTER TABLE `ai_chat_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `idx_user_session` (`user_id`);

--
-- Chỉ mục cho bảng `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Chỉ mục cho bảng `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_instructor` (`instructor_id`),
  ADD KEY `idx_category` (`category_id`),
  ADD KEY `idx_published` (`is_published`);

--
-- Chỉ mục cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD UNIQUE KEY `uq_user_course` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`lesson_id`),
  ADD KEY `idx_course_position` (`course_id`,`position`);

--
-- Chỉ mục cho bảng `lesson_progress`
--
ALTER TABLE `lesson_progress`
  ADD PRIMARY KEY (`progress_id`),
  ADD UNIQUE KEY `uq_user_lesson` (`user_id`,`lesson_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `idx_user_read` (`user_id`,`is_read`);

--
-- Chỉ mục cho bảng `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Chỉ mục cho bảng `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `lesson_id` (`lesson_id`);

--
-- Chỉ mục cho bảng `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD PRIMARY KEY (`attempt_id`),
  ADD KEY `quiz_id` (`quiz_id`),
  ADD KEY `idx_user_quiz` (`user_id`,`quiz_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD UNIQUE KEY `uq_user_course_review` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ai_chat_messages`
--
ALTER TABLE `ai_chat_messages`
  MODIFY `message_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `ai_chat_sessions`
--
ALTER TABLE `ai_chat_sessions`
  MODIFY `session_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `answers`
--
ALTER TABLE `answers`
  MODIFY `answer_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `lessons`
--
ALTER TABLE `lessons`
  MODIFY `lesson_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `lesson_progress`
--
ALTER TABLE `lesson_progress`
  MODIFY `progress_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notif_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  MODIFY `attempt_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ai_chat_messages`
--
ALTER TABLE `ai_chat_messages`
  ADD CONSTRAINT `ai_chat_messages_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `ai_chat_sessions` (`session_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `ai_chat_sessions`
--
ALTER TABLE `ai_chat_sessions`
  ADD CONSTRAINT `ai_chat_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ai_chat_sessions_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lesson_progress`
--
ALTER TABLE `lesson_progress`
  ADD CONSTRAINT `lesson_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `lesson_progress_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quizzes_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`lesson_id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `quiz_attempts`
--
ALTER TABLE `quiz_attempts`
  ADD CONSTRAINT `quiz_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quiz_attempts_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`quiz_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
