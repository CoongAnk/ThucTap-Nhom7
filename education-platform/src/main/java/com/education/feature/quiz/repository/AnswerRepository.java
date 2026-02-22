package com.education.feature.quiz.repository;

import com.education.feature.quiz.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findByQuestionId(Integer questionId);

    List<Answer> findByQuestionIdAndIsCorrectTrue(Integer questionId);
}
