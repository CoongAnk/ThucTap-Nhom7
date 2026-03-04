package com.education.feature.course.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CourseResponseDTO {
    private Integer courseId;
    private String title;
    private String description;
    private List<Integer> quizIds;
}
