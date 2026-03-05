package com.education.feature.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
@Getter
@Setter
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Integer attemptId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "quiz_id", nullable = false)
    private Integer quizId;

    @Column(name = "score", nullable = false)
    private Integer score;

    @Column(name = "is_passed", nullable = false)
    private Boolean isPassed;

    @Column(name = "attempted_at")
    private LocalDateTime attemptedAt;
}