package com.education.feature.quiz.repository;

import com.education.feature.quiz.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {
    List<Quiz> findByCourseId(Integer courseId);
<<<<<<< HEAD
}
=======
}
>>>>>>> 39d27d2a4848387d14dab7d5d2ad3186e793e60f
