package com.education.feature.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuestionResponseDTO {

    private Integer questionId;
    private String questionText;
    private String questionType;
    private List<AnswerResponseDTO> answers;
}