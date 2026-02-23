INSERT INTO quizzes (course_id, lesson_id, title, pass_score)
VALUES (1, NULL, 'Bài kiểm tra tổng hợp Python (25 câu)', 80);

INSERT INTO questions (quiz_id, question_text, question_type, position) VALUES
(3, 'Python là ngôn ngữ gì?', 'single', 1),
(3, 'Kiểu dữ liệu của 10 là gì?', 'single', 2),
(3, 'Toán tử nhân trong Python là gì?', 'single', 3),
(3, 'type("Hello") trả về gì?', 'single', 4),
(3, 'Cách khai báo biến đúng?', 'single', 5),
(3, 'Từ khóa kiểm tra điều kiện là gì?', 'single', 6),
(3, 'elif dùng để làm gì?', 'single', 7),
(3, 'Khối lệnh Python xác định bằng gì?', 'single', 8),
(3, 'range(5) tạo ra dãy nào?', 'single', 9),
(3, 'while dùng khi nào?', 'single', 10),
(3, 'break có tác dụng gì?', 'single', 11),
(3, 'continue có tác dụng gì?', 'single', 12),
(3, 'Khai báo hàm dùng từ khóa gì?', 'single', 13),
(3, 'Hàm trả về giá trị dùng từ khóa gì?', 'single', 14),
(3, 'Hàm không có return trả về gì?', 'single', 15),
(3, 'len("abc") trả về?', 'single', 16),
(3, 'List khai báo bằng ký hiệu nào?', 'single', 17),
(3, 'Tuple khai báo bằng ký hiệu nào?', 'single', 18),
(3, 'Dictionary khai báo bằng ký hiệu nào?', 'single', 19),
(3, 'Toán tử so sánh bằng là gì?', 'single', 20),
(3, 'Toán tử khác là gì?', 'single', 21),
(3, 'Boolean có giá trị nào?', 'single', 22),
(3, 'Comment 1 dòng dùng ký hiệu gì?', 'single', 23),
(3, 'Import thư viện dùng từ khóa gì?', 'single', 24),
(3, 'input() dùng để làm gì?', 'single', 25);

INSERT INTO answers (question_id, answer_text, is_correct) VALUES

-- Câu 1
(3,'Biên dịch',0),
(3,'Thông dịch',1),
(3,'Máy',0),
(3,'Nhị phân',0),

-- Câu 2
(4,'float',0),
(4,'string',0),
(4,'int',1),
(4,'boolean',0),

-- Câu 3
(5,'+',0),
(5,'-',0),
(5,'*',1),
(5,'/',0),

-- Câu 4
(6,'int',0),
(6,'str',1),
(6,'list',0),
(6,'tuple',0),

-- Câu 5
(7,'var x = 10',0),
(7,'int x = 10',0),
(7,'x = 10',1),
(7,'let x = 10',0),

-- Câu 6
(8,'when',0),
(8,'if',1),
(8,'check',0),
(8,'condition',0),

-- Câu 7
(9,'Kết thúc chương trình',0),
(9,'Thêm điều kiện phụ',1),
(9,'Tạo vòng lặp',0),
(9,'Import thư viện',0),

-- Câu 8
(10,'{}',0),
(10,'()',0),
(10,'Thụt lề',1),
(10,'begin-end',0),

-- Câu 9
(11,'1-5',0),
(11,'0-4',1),
(11,'0-5',0),
(11,'1-4',0),

-- Câu 10
(12,'Lặp biết trước số lần',0),
(12,'Lặp theo điều kiện',1),
(12,'Lặp mảng',0),
(12,'Lặp tuple',0),

-- Câu 11
(13,'Bỏ qua lần lặp',0),
(13,'Dừng vòng lặp',1),
(13,'Tạo lỗi',0),
(13,'In kết quả',0),

-- Câu 12
(14,'Kết thúc loop',0),
(14,'Bỏ qua lần lặp hiện tại',1),
(14,'Reset loop',0),
(14,'Thoát chương trình',0),

-- Câu 13
(15,'function',0),
(15,'def',1),
(15,'fun',0),
(15,'lambda',0),

-- Câu 14
(16,'output',0),
(16,'return',1),
(16,'print',0),
(16,'yield',0),

-- Câu 15
(17,'0',0),
(17,'None',1),
(17,'False',0),
(17,'""',0),

-- Câu 16
(18,'2',0),
(18,'3',1),
(18,'4',0),
(18,'1',0),

-- Câu 17
(19,'{}',0),
(19,'[]',1),
(19,'()',0),
(19,'<>',0),

-- Câu 18
(20,'[]',0),
(20,'{}',0),
(20,'()',1),
(20,'<>',0),

-- Câu 19
(21,'[]',0),
(21,'()',0),
(21,'{}',1),
(21,'<>',0),

-- Câu 20
(22,'=',0),
(22,'==',1),
(22,'===',0),
(22,'!=',0),

-- Câu 21
(23,'!=',1),
(23,'<>',0),
(23,'~=',0),
(23,'><',0),

-- Câu 22
(24,'1 và 0',0),
(24,'True và False',1),
(24,'Yes/No',0),
(24,'On/Off',0),

-- Câu 23
(25,'//',0),
(25,'#',1),
(25,'--',0),
(25,'/* */',0),

-- Câu 24
(26,'using',0),
(26,'include',0),
(26,'import',1),
(26,'require',0),

-- Câu 25
(27,'In dữ liệu',0),
(27,'Nhận dữ liệu từ người dùng',1),
(27,'Lưu file',0),
(27,'Tạo biến',0);