import React from "react";
import { Flame, AlertCircle } from "lucide-react";
import "./Banner.css";

export const Banner = () => {
  return (
    <div className="banner">
      <p className="banner-text">
        Bắt đầu tăng cấp độ tích lũy kỹ năng và kéo dài số tuần liên tiếp có kỹ năng mới đạt cấp độ Thành thạo trở lên nào!
      </p>

      <div className="banner-right">
        <div className="streak">
          <Flame size={20} className="icon-fill" />
          <span className="streak-number">0</span>
        </div>

        <div className="level-section">
          <span className="level-label">Cấp độ 1</span>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <AlertCircle size={16} className="icon-muted" />
        </div>
      </div>
    </div>
  );
};

export default Banner;