
START TRANSACTION;

DELETE FROM answers 
WHERE question_id BETWEEN 28 AND 77;

-- 28
INSERT INTO answers VALUES
(108,28,'Quả táo',1),
(109,28,'Quả cam',0),
(110,28,'Quả chuối',0),
(111,28,'Quả nho',0);

-- 29
INSERT INTO answers VALUES
(112,29,'go',0),
(113,29,'goes',1),
(114,29,'going',0),
(115,29,'gone',0);

-- 30
INSERT INTO answers VALUES
(116,30,'13',0),
(117,30,'14',0),
(118,30,'15',1),
(119,30,'16',0);

-- 31
INSERT INTO answers VALUES
(120,31,'in',0),
(121,31,'on',1),
(122,31,'at',0),
(123,31,'under',0);

-- 32
INSERT INTO answers VALUES
(124,32,'small',1),
(125,32,'tall',0),
(126,32,'short',0),
(127,32,'long',0);

-- 33
INSERT INTO answers VALUES
(128,33,'Bạn tên gì?',0),
(129,33,'Bạn khỏe không?',1),
(130,33,'Bạn ở đâu?',0),
(131,33,'Bạn làm gì?',0);

-- 34
INSERT INTO answers VALUES
(132,34,'childs',0),
(133,34,'children',1),
(134,34,'childes',0),
(135,34,'childrens',0);

-- 35
INSERT INTO answers VALUES
(136,35,'a',1),
(137,35,'an',0),
(138,35,'the',0),
(139,35,'is',0);

-- 36
INSERT INTO answers VALUES
(140,36,'run',1),
(141,36,'blue',0),
(142,36,'apple',0),
(143,36,'happy',0);

-- 37
INSERT INTO answers VALUES
(144,37,'is',1),
(145,37,'are',0),
(146,37,'am',0),
(147,37,'be',0);

-- 38
INSERT INTO answers VALUES
(148,38,'is',0),
(149,38,'am',1),
(150,38,'are',0),
(151,38,'be',0);

-- 39
INSERT INTO answers VALUES
(152,39,'Xấu',0),
(153,39,'Đẹp',1),
(154,39,'Cao',0),
(155,39,'Thấp',0);

-- 40
INSERT INTO answers VALUES
(156,40,'Thứ 2',1),
(157,40,'Thứ 3',0),
(158,40,'Thứ 4',0),
(159,40,'Chủ nhật',0);

-- 41
INSERT INTO answers VALUES
(160,41,'is',0),
(161,41,'are',1),
(162,41,'am',0),
(163,41,'be',0);

-- 42
INSERT INTO answers VALUES
(164,42,'beautiful',1),
(165,42,'run',0),
(166,42,'eat',0),
(167,42,'play',0);

-- 43
INSERT INTO answers VALUES
(168,43,'Xin chào',0),
(169,43,'Tạm biệt',1),
(170,43,'Cảm ơn',0),
(171,43,'Xin lỗi',0);

-- 44
INSERT INTO answers VALUES
(172,44,'red',1),
(173,44,'run',0),
(174,44,'dog',0),
(175,44,'big',0);

-- 45
INSERT INTO answers VALUES
(176,45,'Tên bạn là gì?',1),
(177,45,'Bạn bao nhiêu tuổi?',0),
(178,45,'Bạn khỏe không?',0),
(179,45,'Bạn đi đâu?',0);

-- 46
INSERT INTO answers VALUES
(180,46,'She go to school.',0),
(181,46,'She goes to school.',1),
(182,46,'She going school.',0),
(183,46,'She gone school.',0);

-- 47
INSERT INTO answers VALUES
(184,47,'Con mèo',0),
(185,47,'Con chó',1),
(186,47,'Con gà',0),
(187,47,'Con bò',0);

-- 48
INSERT INTO answers VALUES
(188,48,'She plays.',1),
(189,48,'She played.',0),
(190,48,'She playing.',0),
(191,48,'She play yesterday.',0);

-- 49
INSERT INTO answers VALUES
(192,49,'Dog',1),
(193,49,'Run',0),
(194,49,'Quickly',0),
(195,49,'Beautiful',0);

-- 50
INSERT INTO answers VALUES
(196,50,'a',1),
(197,50,'an',0),
(198,50,'the',0),
(199,50,'is',0);

-- 51
INSERT INTO answers VALUES
(200,51,'You are how?',0),
(201,51,'How are you?',1),
(202,51,'Are how you?',0),
(203,51,'How you are?',0);

-- 52
INSERT INTO answers VALUES
(204,52,'Trường học',1),
(205,52,'Bệnh viện',0),
(206,52,'Chợ',0),
(207,52,'Công viên',0);


-- 53
INSERT INTO answers VALUES
(208,53,'12',1),
(209,53,'13',0),
(210,53,'11',0),
(211,53,'10',0);

-- 54
INSERT INTO answers VALUES
(212,54,'36',1),
(213,54,'30',0),
(214,54,'33',0),
(215,54,'39',0);

-- 55
INSERT INTO answers VALUES
(216,55,'16',1),
(217,55,'15',0),
(218,55,'14',0),
(219,55,'17',0);

-- 56
INSERT INTO answers VALUES
(220,56,'6',1),
(221,56,'5',0),
(222,56,'4',0),
(223,56,'7',0);

-- 57
INSERT INTO answers VALUES
(224,57,'50%',1),
(225,57,'25%',0),
(226,57,'100%',0),
(227,57,'75%',0);

-- 58
INSERT INTO answers VALUES
(228,58,'16',1),
(229,58,'8',0),
(230,58,'12',0),
(231,58,'20',0);

-- 59
INSERT INTO answers VALUES
(232,59,'15',1),
(233,59,'10',0),
(234,59,'20',0),
(235,59,'25',0);

-- 60
INSERT INTO answers VALUES
(236,60,'999',1),
(237,60,'1000',0),
(238,60,'900',0),
(239,60,'990',0);

-- 61
INSERT INTO answers VALUES
(240,61,'30',1),
(241,61,'25',0),
(242,61,'20',0),
(243,61,'35',0);

-- 62
INSERT INTO answers VALUES
(244,62,'1/2',1),
(245,62,'2/2',0),
(246,62,'1/4',0),
(247,62,'2/8',0);

-- 63
INSERT INTO answers VALUES
(248,63,'Số chỉ chia hết cho 1 và chính nó',1),
(249,63,'Số chẵn',0),
(250,63,'Số lẻ',0),
(251,63,'Số âm',0);

-- 64
INSERT INTO answers VALUES
(252,64,'81',1),
(253,64,'72',0),
(254,64,'99',0),
(255,64,'90',0);

-- 65
INSERT INTO answers VALUES
(256,65,'1',1),
(257,65,'10',0),
(258,65,'0.1',0),
(259,65,'100',0);

-- 66
INSERT INTO answers VALUES
(260,66,'60',1),
(261,66,'100',0),
(262,66,'30',0),
(263,66,'120',0);

-- 67
INSERT INTO answers VALUES
(264,67,'49',1),
(265,67,'14',0),
(266,67,'21',0),
(267,67,'28',0);

-- 68
INSERT INTO answers VALUES
(268,68,'12',1),
(269,68,'8',0),
(270,68,'6',0),
(271,68,'10',0);

-- 69
INSERT INTO answers VALUES
(272,69,'5',1),
(273,69,'4',0),
(274,69,'6',0),
(275,69,'7',0);

-- 70
INSERT INTO answers VALUES
(276,70,'40',1),
(277,70,'30',0),
(278,70,'20',0),
(279,70,'50',0);

-- 71
INSERT INTO answers VALUES
(280,71,'Chia hết cho 2',1),
(281,71,'Chia hết cho 3',0),
(282,71,'Số lẻ',0),
(283,71,'Số âm',0);

-- 72
INSERT INTO answers VALUES
(284,72,'Có',1),
(285,72,'Không',0),
(286,72,'Chỉ khi >0',0),
(287,72,'Chỉ khi <0',0);

-- 73
INSERT INTO answers VALUES
(288,73,'4/5',1),
(289,73,'3/5',0),
(290,73,'2/5',0),
(291,73,'1',0);

-- 74
INSERT INTO answers VALUES
(292,74,'3',1),
(293,74,'4',0),
(294,74,'5',0),
(295,74,'6',0);

-- 75
INSERT INTO answers VALUES
(296,75,'100',1),
(297,75,'10',0),
(298,75,'1000',0),
(299,75,'90',0);

-- 76
INSERT INTO answers VALUES
(300,76,'10',1),
(301,76,'11',0),
(302,76,'9',0),
(303,76,'1',0);

-- 77
INSERT INTO answers VALUES
(304,77,'25',1),
(305,77,'20',0),
(306,77,'30',0),
(307,77,'15',0);

COMMIT;