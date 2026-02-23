import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import "./ResultModal.css";

export const ResultsModal = ({ isOpen, results, onRestart }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="modal-container"
          >
            {/* HEADER */}
            <div className="modal-header">
              <div className="success-icon">
                <CheckCircle2 size={48} />
              </div>

              <h2 className="modal-title">Hoàn thành thử thách!</h2>
              <p className="modal-subtitle">
                Bạn đã hoàn thành tất cả các câu hỏi.
              </p>
            </div>

            {/* BODY */}
            <div className="modal-body">
              <div className="stats-grid">
                <div className="stat-box stat-correct">
                  <p className="stat-label">Đúng</p>
                  <p className="stat-value">{results.correct}</p>
                </div>

                <div className="stat-box stat-incorrect">
                  <p className="stat-label">Sai</p>
                  <p className="stat-value">{results.incorrect}</p>
                </div>
              </div>

              {/* SCORE */}
              <div className="score-section">
                <div className="score-header">
                  <span className="score-label">Điểm số của bạn</span>
                  <span className="score-percentage">
                    {results.percentage}%
                  </span>
                </div>

                <div className="score-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${results.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="score-fill"
                  />
                </div>
              </div>

              <button onClick={onRestart} className="restart-btn">
                Làm lại thử thách
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultsModal;