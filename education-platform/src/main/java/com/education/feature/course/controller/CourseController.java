package com.education.feature.course.controller;

import com.education.common.response.ApiResponse;
import com.education.feature.course.dto.CourseResponseDTO;
import com.education.feature.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // ─── GET ALL COURSES ─────────────────────────────

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponseDTO>>> getAllCourses() {

        List<CourseResponseDTO> data = courseService.getAllCourses();

        return ResponseEntity.ok(
                ApiResponse.success(data)
        );
    }

    // ─── GET MY COURSES ─────────────────────────────

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<CourseResponseDTO>>> getMyCourses(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<CourseResponseDTO> data =
                courseService.getMyCourses(userDetails.getUsername());

        return ResponseEntity.ok(
                ApiResponse.success(data)
        );
    }
}