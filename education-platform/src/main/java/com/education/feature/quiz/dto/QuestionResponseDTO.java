package com.education.feature.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuestionResponseDTO {
    private Long id;
    private String text;
    private String type;
    private Long correctOptionId;
    private List<OptionDTO> options;
}