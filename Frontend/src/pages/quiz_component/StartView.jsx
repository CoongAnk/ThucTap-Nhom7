import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import "./StartView.css";

export const StartView = ({ totalQuestions, onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="start-container"
    >
      {/* HEADER */}
      <div className="start-header">
        <h1 className="start-title">Thử thách của khóa học</h1>
      </div>

      {/* MAIN */}
      <div className="start-main">
        <div className="start-content">
          <h2 className="start-heading">
            Bạn đã sẵn sàng để thực hiện thử thách của khóa học chưa?
          </h2>

          <p className="start-description">
            Kiểm tra các kỹ năng liên quan đến khóa học này và tích lũy điểm tinh
            thông qua những kiến thức mà bạn đã học được!
          </p>

          <div className="start-meta">
            {totalQuestions} câu hỏi • 30 - 45 phút
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decor-wrapper">
          <div className="decor-inner">
            <div className="decor-card decor-card-1"></div>
            <div className="decor-card decor-card-2"></div>
          </div>
        </div>

        <button onClick={onStart} className="start-button">
          Hãy cùng bắt đầu nào!
        </button>
      </div>
    </motion.div>
  );
};

export default StartView;