import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "./quiz_component/Sidebar";
import StartView from "./quiz_component/StartView";
import QuestionView from "./quiz_component/QuestionView";
import ResultsModal from "./quiz_component/ResultModal";
import "../styles/Quiz.css";

import { getQuizDetail, submitQuiz } from "../api/quiz.api";

export default function Quiz() {
  const quizId = 3; // sau này có thể lấy từ params

  const [status, setStatus] = useState("start");
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

  // 🚀 Load quiz khi bấm start
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (optionId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      await handleSubmit();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // 🚀 Submit toàn bộ bài
  const handleSubmit = async () => {
    try {
      const formattedAnswers = Object.entries(userAnswers).map(
        ([questionId, answerId]) => ({
          questionId: Number(questionId),
          selectedAnswerIds: [Number(answerId)],
        })
      );

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

            {status === "start" && (
              <StartView
                totalQuestions={totalQuestions}
                onStart={handleStart}
              />
            )}

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

            <ResultsModal
              isOpen={status === "results"}
              results={results}
              onRestart={() => setStatus("start")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}