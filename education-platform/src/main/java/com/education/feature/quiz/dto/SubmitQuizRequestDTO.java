package com.education.feature.quiz.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubmitQuizRequestDTO {

    private Integer userId;
    private Integer quizId;
    @NotEmpty(message = "Danh sách câu trả lời không được để trống")
    private List<AnswerSubmissionDTO> answers;
}