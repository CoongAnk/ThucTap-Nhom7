package com.education.feature.quiz.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AnswerSubmissionDTO {

    @NotNull(message = "questionId không được null")
    private Integer questionId;

    @NotEmpty(message = "Phải chọn ít nhất một đáp án")
    private List<Integer> selectedAnswerIds;
}