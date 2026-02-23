import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
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

        <div className="start-links">
          <a href="#" className="start-link">
            <img
              src="https://www.gstatic.com/classroom/logo_square_48.png"
              alt="Classroom"
              className="start-link-icon"
            />
            Google Classroom <ExternalLink size={14} />
          </a>

          <a href="#" className="start-link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
              alt="Teams"
              className="start-link-icon"
            />
            Microsoft Teams <ExternalLink size={14} />
          </a>
        </div>
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