const BASE_URL = "http://localhost:8088/api/v1";

import { getAccessToken } from "./authApi"; // chỉnh path cho đúng

// ─────────────────────────────────────────────
// GET QUIZ DETAIL
// GET /api/v1/quizzes/{quizId}
// ─────────────────────────────────────────────

export const getQuizDetail = async (quizId) => {
  const response = await fetch(`${BASE_URL}/quizzes/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get quiz detail");
  }

  return data; 
  // vì backend trả ApiResponse.success(data)
  // nên cấu trúc sẽ là:
  // {
  //   success: true,
  //   data: { ...QuizDetailResponseDTO }
  // }
};

// ─────────────────────────────────────────────
// SUBMIT QUIZ
// POST /api/v1/quizzes/{quizId}/submit
// ─────────────────────────────────────────────

export const submitQuiz = async (quizId, answers) => {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/quizzes/${quizId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      answers, 
      // format:
      // [
      //   {
      //     questionId: 10,
      //     selectedAnswerIds: [25]
      //   }
      // ]
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Submit quiz failed");
  }

  return data;
  // {
  //   success: true,
  //   message: "Nộp bài thành công 🎉",
  //   data: { ...SubmitQuizResponseDTO }
  // }
};