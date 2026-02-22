package com.education.feature.quiz.controller;

import com.education.common.response.ApiResponse;
import com.education.feature.quiz.dto.QuizDetailResponseDTO;
import com.education.feature.quiz.dto.SubmitQuizRequestDTO;
import com.education.feature.quiz.dto.SubmitQuizResponseDTO;
import com.education.feature.quiz.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Quiz Controller
 * Base URL: /api/v1/quizzes
 *
 * GET  /{quizId}           → Lấy chi tiết bài quiz
 * POST /{quizId}/submit    → Nộp bài và chấm điểm
 */
@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    // ─── GET QUIZ DETAIL ─────────────────────────────────────────────

    /**
     * Lấy chi tiết bài quiz bao gồm danh sách câu hỏi và đáp án.
     *
     * Ví dụ:
     * GET /api/v1/quizzes/5
     */
    @GetMapping("/{quizId}")
    public ResponseEntity<ApiResponse<QuizDetailResponseDTO>> getQuizDetail(
            @PathVariable Integer quizId) {

        QuizDetailResponseDTO data = quizService.getQuizDetail(quizId);

        return ResponseEntity.ok(
                ApiResponse.success(data)
        );
    }

    // ─── SUBMIT QUIZ ─────────────────────────────────────────────────

    /**
     * Nộp bài quiz.
     * Header: Authorization: Bearer <token>
     *
     * Ví dụ:
     * POST /api/v1/quizzes/5/submit
     *
     * Request body:
     * {
     *   "answers": [
     *     {
     *       "questionId": 10,
     *       "selectedAnswerIds": [25]
     *     }
     *   ]
     * }
     */
    @PostMapping("/{quizId}/submit")
    public ResponseEntity<ApiResponse<SubmitQuizResponseDTO>> submitQuiz(
            @PathVariable Integer quizId,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody SubmitQuizRequestDTO request) {

        SubmitQuizResponseDTO data = quizService.submitQuiz(
                userDetails.getUsername(),
                quizId,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.success("Nộp bài thành công 🎉", data)
        );
    }
}