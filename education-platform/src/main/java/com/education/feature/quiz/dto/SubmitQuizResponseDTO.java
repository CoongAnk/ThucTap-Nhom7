package com.education.feature.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SubmitQuizResponseDTO {

    private Integer score;
    private Boolean isPassed;
}
