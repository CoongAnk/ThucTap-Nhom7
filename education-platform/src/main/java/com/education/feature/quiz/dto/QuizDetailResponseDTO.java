package com.education.feature.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class QuizDetailResponseDTO {

    private Integer quizId;
    private String title;
    private Integer passScore;
    private List<QuestionResponseDTO> questions;
}