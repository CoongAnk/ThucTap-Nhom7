package com.education.feature.quiz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "quiz_id", nullable = false)
    private Integer quizId;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "question_type", nullable = false)
    private QuestionType questionType; // single | multiple | true_false

    @Column(name = "position", nullable = false)
    private Integer position;
    
    @OneToMany(mappedBy = "question")
    private List<Answer> answers;

    public enum QuestionType{
        single, multiple, true_false
    }
}