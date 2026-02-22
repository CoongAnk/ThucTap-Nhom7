package com.education.feature.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "quizzes")
@Getter
@Setter
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Integer quizId;

    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @Column(name = "lesson_id", nullable = true)
    private Integer lessonId; // nullable

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "pass_score", nullable = false)
    private Integer passScore;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}