import { motion } from "motion/react";
import { useState, useEffect } from "react";
import "./QuestionView.css";

export const QuestionView = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  userAnswers,
  onOptionSelect,
  onNext,
  onBack,
  isLastQuestion
}) => { 

  console.log("Current Question:", currentQuestion);
  console.log("Options:", currentQuestion.options);

  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
  const savedAnswer = userAnswers[currentQuestion.id] || null;
  setSelectedOptionId(savedAnswer);
  setIsChecked(false);
  setAiFeedback("");
  setLoadingAI(false);
}, [currentQuestionIndex, currentQuestion.id, userAnswers]);

  if (!currentQuestion || !currentQuestion.options) {
    return <div>Loading...</div>;
  }

  // Lấy id đáp án đúng
  const correctOption = currentQuestion.options.find(
    (o) => Number(o.id) === Number(currentQuestion.correctOptionId)
  );

  // So sánh id
  const isCorrect =
    Number(selectedOptionId) === Number(currentQuestion.correctOptionId);

  const isSelected = (optionId) =>
    Number(selectedOptionId) === Number(optionId);

  const handleCheckAnswer = async () => {
    if (!selectedOptionId) return;

    setIsChecked(true);

    // Nếu đúng thì không gọi AI
    if (isCorrect) {
      setAiFeedback("🎉 Chính xác! Em đã làm rất tốt.");
      return;
    }

    // Nếu sai mới gọi AI
    setLoadingAI(true);
    setAiFeedback("");

    const selectedAnswerText =
      currentQuestion.options.find(
        (o) => Number(o.id) === Number(selectedOptionId)
      )?.text;

    try {
      const res = await fetch("http://localhost:3000/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "1",
          message: `
  Câu hỏi: ${currentQuestion.text}
  Đáp án học sinh chọn: ${selectedAnswerText}
  Học sinh trả lời sai. Hãy giải thích lại nhẹ nhàng.
  `,
          lessonContext: {
            level: "beginner",
            subject: "Quiz",
            lesson: currentQuestion.text,
            goal: "Understand the concept"
          }
        })
      });

      const data = await res.json();
      setAiFeedback(data.reply);

    } catch (err) {
      setAiFeedback("Có lỗi khi gọi AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <motion.div
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="question-container"
    >
      {/* HEADER */}
      <div className="question-header">
        <h1 className="question-title">Thử thách của khóa học</h1>

        {/* <div className="question-links">
          <a href="#" className="external-link">
            <img
              src="https://www.gstatic.com/classroom/logo_square_48.png"
              alt="Classroom"
              className="link-icon-img"
            />
            Google Classroom <ExternalLink size={14} />
          </a>

          <a href="#" className="external-link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
              alt="Teams"
              className="link-icon-img"
            />
            Microsoft Teams <ExternalLink size={14} />
          </a>
        </div> */}
      </div>

      {/* BODY */}
      <div className="question-body">
        <div className="question-content">
          <p className="question-text">{currentQuestion.text}</p>

          {currentQuestion.subText && (
            <p className="question-subtext">{currentQuestion.subText}</p>
          )}

          <p className="choose-label">Hãy chọn 1 đáp án:</p>

          <div className="options">
            {currentQuestion.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => {
                const id = Number(option.id);
                setSelectedOptionId(id);
                onOptionSelect(currentQuestion.id, id);
              }}
              className={`option-btn ${
                isSelected(option.id) ? "option-selected" : ""
              }`}
            >
              <div
                className={`option-circle ${
                  isSelected(option.id)
                    ? "circle-selected"
                    : "circle-default"
                }`}
              >
                {index + 1}
              </div>

              <span
                className={`option-text ${
                  isSelected(option.id) ? "option-text-selected" : ""
                }`}
              >
                {option.text}
              </span>
            </button>
          ))}
          </div>
          <button
            className="btn-check"
            disabled={!selectedOptionId}
            onClick={handleCheckAnswer}
          >
            Kiểm tra đáp án
          </button>
          {isChecked && (
            <div className="ai-feedback">
              {loadingAI && <p>AI đang phân tích...</p>}
              {!loadingAI && aiFeedback && (
                <>
                  <h4>Nhận xét từ AI:</h4>
                  <p>{aiFeedback}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="question-footer">
      
        <div className="footer-center">
          <span className="progress-label">
            {currentQuestionIndex + 1} trong {totalQuestions}
          </span>

          <div className="progress-dots">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={`dot ${
                  i < currentQuestionIndex
                    ? "dot-done"
                    : i === currentQuestionIndex
                    ? "dot-current"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="footer-right">
          {currentQuestionIndex > 0 && (
            <button onClick={onBack} className="btn-back">
              Quay lại
            </button>
          )}

          <button
            disabled={!userAnswers[currentQuestion.id]}
            onClick={onNext}
            className={`btn-next ${
              userAnswers[currentQuestion.id]
                ? "btn-active"
                : "btn-disabled"
            }`}
          >
            {isLastQuestion ? "Nộp bài" : "Tiếp theo"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionView;