package com.education.feature.quiz.repository;

import com.education.feature.quiz.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByQuizIdOrderByPositionAsc(Integer quizId);
}
