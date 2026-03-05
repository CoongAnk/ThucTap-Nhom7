package com.education.feature.course.repository;

import com.education.feature.course.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Integer> {

    List<Enrollment> findByUserId(Integer userId);
}