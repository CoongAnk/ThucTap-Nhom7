package com.education.feature.course.service;

import com.education.common.exception.AppException;
import com.education.feature.auth.entity.User;
import com.education.feature.auth.repository.UserRepository;
import com.education.feature.course.dto.CourseResponseDTO;
import com.education.feature.course.entity.Course;
import com.education.feature.course.entity.Enrollment;
import com.education.feature.course.repository.CourseRepository;
import com.education.feature.course.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    // ─── GET ALL COURSES ─────────────────────────────

    @Transactional(readOnly = true)
    public List<CourseResponseDTO> getAllCourses() {

        List<Course> courses = courseRepository.findAll();

        return courses.stream()
                .map(this::mapToDTO)
                .toList();
    }

    // ─── GET MY COURSES ─────────────────────────────

    @Transactional(readOnly = true)
    public List<CourseResponseDTO> getMyCourses(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new AppException(404, "Không tìm thấy người dùng"));

        List<Enrollment> enrollments =
                enrollmentRepository.findByUserId(user.getUserId());

        if (enrollments.isEmpty()) {
            return List.of();
        }

        List<Integer> courseIds = enrollments.stream()
                .map(Enrollment::getCourseId)
                .toList();

        List<Course> courses =
                courseRepository.findAllById(courseIds);

        return courses.stream()
                .map(this::mapToDTO)
                .toList();
    }

    private CourseResponseDTO mapToDTO(Course course) {
        return CourseResponseDTO.builder()
                .courseId(course.getCourseId())
                .title(course.getTitle())
                .description(course.getDescription())
                .build();
    }
}