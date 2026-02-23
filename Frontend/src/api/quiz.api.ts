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
): Promise<any> => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("User not authenticated");
  }

  const response = await fetch(`${BASE_URL}/quizzes/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await handleResponse<QuizDetailDTO>(response);

  // 🔥 Normalize cho UI
  return {
    id: data.quizId,
    title: data.title,
    passScore: data.passScore,
    questions: data.questions.map(q => ({
      id: q.questionId,
      text: q.questionText,
      type: q.questionType,
      options: q.answers.map(a => ({
        id: a.answerId,
        text: a.answerText
      }))
    }))
  };
};

/* ================================
   SUBMIT QUIZ
================================ */

export const submitQuiz = async (
  quizId: number,
  answers: {
    questionId: number;
    selectedAnswerIds: number[];
  }[],
  totalQuestions: number // 👈 truyền thêm tổng câu hỏi
) => {
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

  const data = await handleResponse<any>(response);

  // 🔥 Normalize cho UI
  const percentage = data.score; // backend trả %

  const correct = Math.round((percentage / 100) * totalQuestions);
  const incorrect = totalQuestions - correct;

  return {
    percentage,
    correct,
    incorrect,
    isPassed: data.isPassed,
  };
};