const BASE_URL = "http://localhost:8088/api/v1";

import { getAccessToken } from "./auth.api";

/* ================================
   TYPES
================================ */

// Wrapper chung từ backend
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp: string;
}

// Quiz Detail DTO từ backend
export interface QuizDetailDTO {
  quizId: number;
  title: string;
  passScore: number;
  questions: QuestionDTO[];
}

export interface QuestionDTO {
  questionId: number;
  questionText: string;
  questionType: string;
  answers: AnswerDTO[];
}

export interface AnswerDTO {
  answerId: number;
  answerText: string;
}

// Submit Response DTO (tuỳ backend bạn trả gì)
export interface SubmitQuizResponseDTO {
  score: number;
  passed: boolean;
}

/* ================================
   COMMON RESPONSE HANDLER
================================ */

const handleResponse = async <T>(
  response: Response
): Promise<T> => {
  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data.data; // 👈 trả thẳng phần data cho UI
};

/* ================================
   GET QUIZ DETAIL
================================ */

export const getQuizDetail = async (
  quizId: number
): Promise<QuizDetailDTO> => {
  const token = getAccessToken();

  console.log("========== DEBUG QUIZ ==========");
  console.log("Quiz ID:", quizId);
  console.log("Access Token:", token);
  console.log("Token length:", token?.length);
  console.log("================================");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${BASE_URL}/quizzes/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return handleResponse<QuizDetailDTO>(response);
};

/* ================================
   SUBMIT QUIZ
================================ */

export const submitQuiz = async (
  quizId: number,
  answers: {
    questionId: number;
    selectedAnswerIds: number[];
  }[]
): Promise<SubmitQuizResponseDTO> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${BASE_URL}/quizzes/${quizId}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ answers }),
  });

  return handleResponse<SubmitQuizResponseDTO>(response);
};