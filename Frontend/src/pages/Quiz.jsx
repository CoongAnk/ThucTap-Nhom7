import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "./quiz_component/Sidebar";
import StartView from "./quiz_component/StartView";
import QuestionView from "./quiz_component/QuestionView";
import ResultsModal from "./quiz_component/ResultModal";
import "../styles/Quiz.css";

import { getQuizDetail, submitQuiz } from "../api/quiz.api";

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const quizId = Number(searchParams.get("quizId"));

  // Guard nếu không có quizId
  if (!quizId) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Quiz không tồn tại</h2>
        <button
          onClick={() => navigate("/courses")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Quay lại khóa học
        </button>
      </div>
    );
  }

  const [status, setStatus] = useState("start"); // start | question | results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const totalQuestions = quiz?.questions?.length || 0;
  const currentQuestion =
    quiz?.questions?.[currentQuestionIndex] || null;

  const isLastQuestion =
    currentQuestionIndex === totalQuestions - 1;

  // ================= LOAD QUIZ =================
  const handleStart = async () => {
    try {
      setLoading(true);

      const data = await getQuizDetail(quizId);

      console.log("Quiz detail loaded:", data);

      setQuiz(data);
      setStatus("question");
      setCurrentQuestionIndex(0);
      setUserAnswers({});
    } catch (error) {
      console.error("Load quiz error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (questionId, answerId) => {
  setUserAnswers((prev) => ({
    ...prev,
    [questionId]: answerId,
  }));
};

  // ================= NEXT =================
  const handleNext = async () => {
    if (isLastQuestion) {
      await handleSubmit();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // ================= BACK =================
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
  try {
    const formattedAnswers = Object.entries(userAnswers).map(
      ([questionId, answerId]) => ({
        questionId: Number(questionId),
        selectedAnswerIds: [Number(answerId)],
      })
    );

    console.log("🚀 SUBMIT PAYLOAD:");
    console.log({
      quizId,
      answers: formattedAnswers,
      totalQuestions: quiz.questions.length,
    });

    const response = await submitQuiz(
      quizId,
      formattedAnswers,
      quiz.questions.length
    );

    setResults(response);
    setStatus("results");
  } catch (error) {
    console.error(error);
  }
};

  // ================= RESTART =================
  const handleRestart = () => {
    setStatus("start");
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults(null);
  };

  // ================= UI =================
  return (
    <div className="app-container">
      <main className="app-main">
        <Sidebar isOpen={isSidebarOpen} />

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`sidebar-toggle ${
            isSidebarOpen ? "open" : "closed"
          }`}
        >
          {isSidebarOpen ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>

        <div className="content-wrapper">
          <div className="content-card">

            {/* START VIEW */}
            {status === "start" && (
              <StartView
                totalQuestions={totalQuestions}
                onStart={handleStart}
                loading={loading}
              />
            )}

            {/* QUESTION VIEW */}
            {status === "question" && currentQuestion && (
              <QuestionView
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                userAnswers={userAnswers}
                onOptionSelect={handleOptionSelect}
                onNext={handleNext}
                onBack={handleBack}
                isLastQuestion={isLastQuestion}
              />
            )}

            {/* RESULT MODAL */}
            <ResultsModal
              isOpen={status === "results"}
              results={results}
              onRestart={handleRestart}
            />

          </div>
        </div>
      </main>
    </div>
  );
}