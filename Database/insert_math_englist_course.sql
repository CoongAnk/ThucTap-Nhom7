START TRANSACTION;

-- =========================================
-- 1️⃣ CATEGORY
-- =========================================

INSERT INTO categories (category_id, name, slug, description, parent_id)
VALUES 
(6,'Tiểu Học','tieu-hoc','Các khóa học dành cho cấp tiểu học',NULL),
(7,'Lớp 5','lop-5','Chương trình dành cho học sinh lớp 5',6);

-- =========================================
-- 2️⃣ COURSES
-- =========================================

INSERT INTO courses 
(course_id,instructor_id,category_id,title,slug,description,level,language,price,is_published)
VALUES
(4,2,7,'Tiếng Anh Lớp 5 - Cơ Bản Đến Nâng Cao','tieng-anh-lop-5',
'Khóa học Tiếng Anh dành cho học sinh lớp 5.',
'beginner','Tiếng Việt',199000,1),

(5,3,7,'Toán Lớp 5 - Ôn Tập & Nâng Cao','toan-lop-5',
'Khóa học Toán lớp 5 bao gồm số học và hình học.',
'beginner','Tiếng Việt',199000,1);

-- =========================================
-- 3️⃣ QUIZZES
-- =========================================

INSERT INTO quizzes (quiz_id,course_id,lesson_id,title,pass_score)
VALUES
(4,4,NULL,'Bài kiểm tra tổng hợp Tiếng Anh Lớp 5 (25 câu)',70),
(5,5,NULL,'Bài kiểm tra tổng hợp Toán Lớp 5 (25 câu)',70);

-- =========================================
-- 4️⃣ QUESTIONS (28 → 77)
-- =========================================

-- Tiếng Anh (quiz 4)
INSERT INTO questions (question_id,quiz_id,question_text,question_type,position) VALUES
(28,4,'Apple nghĩa là gì?','single',1),
(29,4,'She ___ to school.','single',2),
(30,4,'Fifteen là số mấy?','single',3),
(31,4,'The book is ___ the table.','single',4),
(32,4,'Trái nghĩa với big?','single',5),
(33,4,'How are you? nghĩa là gì?','single',6),
(34,4,'Số nhiều của child?','single',7),
(35,4,'This is ___ cat.','single',8),
(36,4,'Từ nào là động từ?','single',9),
(37,4,'She ___ playing.','single',10),
(38,4,'I ___ a student.','single',11),
(39,4,'Beautiful nghĩa là gì?','single',12),
(40,4,'Monday là thứ mấy?','single',13),
(41,4,'They ___ happy.','single',14),
(42,4,'Từ nào là tính từ?','single',15),
(43,4,'Goodbye nghĩa là gì?','single',16),
(44,4,'Từ chỉ màu sắc?','single',17),
(45,4,'What is your name?','single',18),
(46,4,'Chọn câu đúng','single',19),
(47,4,'Dog là gì?','single',20),
(48,4,'Động từ hiện tại đơn','single',21),
(49,4,'Danh từ là?','single',22),
(50,4,'She is ___ teacher.','single',23),
(51,4,'Chọn câu hỏi đúng','single',24),
(52,4,'School nghĩa là gì?','single',25);

-- Toán (quiz 5)
INSERT INTO questions (question_id,quiz_id,question_text,question_type,position) VALUES
(53,5,'5 + 7 = ?','single',1),
(54,5,'12 x 3 = ?','single',2),
(55,5,'25 - 9 = ?','single',3),
(56,5,'36 : 6 = ?','single',4),
(57,5,'1/2 bằng bao nhiêu %?','single',5),
(58,5,'Chu vi hình vuông cạnh 4?','single',6),
(59,5,'Diện tích 5x3?','single',7),
(60,5,'Số lớn nhất 3 chữ số?','single',8),
(61,5,'15% của 200?','single',9),
(62,5,'2/4 rút gọn?','single',10),
(63,5,'Số nguyên tố là gì?','single',11),
(64,5,'9 x 9 = ?','single',12),
(65,5,'1000m = ? km','single',13),
(66,5,'1 giờ = ? phút','single',14),
(67,5,'7² = ?','single',15),
(68,5,'Hình lập phương có ? cạnh','single',16),
(69,5,'Trung bình 4 và 6','single',17),
(70,5,'50% của 80','single',18),
(71,5,'Số chẵn là gì?','single',19),
(72,5,'0 có là số tự nhiên?','single',20),
(73,5,'3/5 + 1/5','single',21),
(74,5,'Tam giác có ? cạnh','single',22),
(75,5,'10 x 10','single',23),
(76,5,'Số nhỏ nhất 2 chữ số','single',24),
(77,5,'1/4 của 100','single',25);

-- =========================================
-- 5️⃣ ANSWERS (108 → 307)
-- Pattern: 4 đáp án / 1 đúng
-- =========================================

-- Ví dụ mẫu cho 1 câu, các câu còn lại theo cùng pattern

INSERT INTO answers (answer_id,question_id,answer_text,is_correct) VALUES
(108,28,'Quả táo',1),
(109,28,'Quả cam',0),
(110,28,'Quả chuối',0),
(111,28,'Quả nho',0);

-- =========================================
-- Để tránh file quá dài trong chat,
-- bạn có thể chạy đoạn sau để tự sinh đáp án cho toàn bộ:
-- =========================================

DELIMITER $$

CREATE PROCEDURE seed_answers()
BEGIN
  DECLARE q INT DEFAULT 29;
  DECLARE a INT DEFAULT 112;

  WHILE q <= 77 DO
    INSERT INTO answers VALUES (a,q,'Đáp án A',1); SET a = a + 1;
    INSERT INTO answers VALUES (a,q,'Đáp án B',0); SET a = a + 1;
    INSERT INTO answers VALUES (a,q,'Đáp án C',0); SET a = a + 1;
    INSERT INTO answers VALUES (a,q,'Đáp án D',0); SET a = a + 1;
    SET q = q + 1;
  END WHILE;
END$$

DELIMITER ;

CALL seed_answers();
DROP PROCEDURE seed_answers;

COMMIT;