package com.education.feature.quiz.service;

import com.education.common.exception.AppException;
import com.education.feature.auth.entity.User;
import com.education.feature.auth.repository.UserRepository;
import com.education.feature.quiz.dto.*;
import com.education.feature.quiz.entity.Answer;
import com.education.feature.quiz.entity.Question;
import com.education.feature.quiz.entity.Quiz;
import com.education.feature.quiz.entity.QuizAttempt;
import com.education.feature.quiz.repository.AnswerRepository;
import com.education.feature.quiz.repository.QuestionRepository;
import com.education.feature.quiz.repository.QuizAttemptRepository;
import com.education.feature.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final QuizAttemptRepository attemptRepository;
    private final UserRepository userRepository;

    // ─── GET QUIZ DETAIL ─────────────────────────────

    @Transactional(readOnly = true)
    public QuizDetailResponseDTO getQuizDetail(Integer quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() ->
                        new AppException(404, "Không tìm thấy bài quiz"));

        return buildQuizDetail(quiz);
    }

    // ─── SUBMIT QUIZ ─────────────────────────────────

    @Transactional
    public SubmitQuizResponseDTO submitQuiz(
            String email,
            Integer quizId,
            SubmitQuizRequestDTO request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new AppException(404, "Không tìm thấy người dùng"));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() ->
                        new AppException(404, "Không tìm thấy bài quiz"));

        List<Question> questions =
                questionRepository.findByQuizIdOrderByPositionAsc(quizId);

        if (questions.isEmpty()) {
            throw new AppException(400, "Bài quiz chưa có câu hỏi");
        }

        int correctCount = 0;

        for (AnswerSubmissionDTO submission : request.getAnswers()) {

            Question question = questions.stream()
                    .filter(q -> q.getQuestionId().equals(submission.getQuestionId()))
                    .findFirst()
                    .orElseThrow(() ->
                            new AppException(400, "Câu hỏi không hợp lệ"));

            List<Answer> answers =
                    answerRepository.findByQuestionId(question.getQuestionId());

            List<Integer> correctIds = answers.stream()
                    .filter(Answer::getIsCorrect)
                    .map(Answer::getAnswerId)
                    .toList();

            // Kiểm tra answer có thuộc question không
            for (Integer selectedId : submission.getSelectedAnswerIds()) {
                boolean exists = answers.stream()
                        .anyMatch(a -> a.getAnswerId().equals(selectedId));

                if (!exists) {
                    throw new AppException(400, "Đáp án không hợp lệ");
                }
            }

            if (new HashSet<>(correctIds).containsAll(submission.getSelectedAnswerIds())
                    && new HashSet<>(submission.getSelectedAnswerIds()).containsAll(correctIds)) {
                correctCount++;
            }
        }

        int totalQuestions = questions.size();
        int score = (correctCount * 100) / totalQuestions;
        boolean isPassed = score >= quiz.getPassScore();

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(user.getUserId());
        attempt.setQuizId(quizId);
        attempt.setScore(score);
        attempt.setIsPassed(isPassed);
        attempt.setAttemptedAt(LocalDateTime.now());

        attemptRepository.save(attempt);

        log.info("User {} submitted quiz {} with score {}",
                email, quizId, score);

        return new SubmitQuizResponseDTO(score, isPassed);
    }

    //Map DTO => Entity
    private QuizDetailResponseDTO buildQuizDetail(Quiz quiz) {

        List<Question> questions =
                questionRepository.findByQuizIdOrderByPositionAsc(
                        quiz.getQuizId());

        List<QuestionResponseDTO> questionDTOs = questions.stream().map(q -> {

            List<Answer> answers =
                    answerRepository.findByQuestionId(q.getQuestionId());

            List<AnswerResponseDTO> answerDTOs = answers.stream()
                    .map(a -> new AnswerResponseDTO(
                            a.getAnswerId(),
                            a.getAnswerText()
                    ))
                    .toList();

            return new QuestionResponseDTO(
                    q.getQuestionId(),
                    q.getQuestionText(),
                    q.getQuestionType().name(),
                    answerDTOs
            );

        }).toList();

        return new QuizDetailResponseDTO(
                quiz.getQuizId(),
                quiz.getTitle(),
                quiz.getPassScore(),
                questionDTOs
        );
    }
}


