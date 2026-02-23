/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import "./Sidebar.css";

const SidebarIllustration = () => (
  <div className="sidebar-illustration">
    <svg viewBox="0 0 200 250" className="illustration-svg">
      <path d="M20 40 Q 40 20 60 40" stroke="#bae6fd" strokeWidth="2" fill="none" />
      <path d="M150 200 Q 170 180 190 200" stroke="#bae6fd" strokeWidth="2" fill="none" />

      <rect x="25" y="150" width="15" height="15" stroke="#facc15" strokeWidth="2" fill="none" transform="rotate(15 32 157)" />

      <g transform="translate(160, 190) scale(0.8)">
        <path d="M0 -15 L0 15 M-15 0 L15 0 M-10 -10 L10 10 M-10 10 L10 -10" stroke="#fb923c" strokeWidth="3" />
      </g>

      <rect x="40" y="60" width="120" height="150" fill="white" rx="4" />
      <rect x="40" y="60" width="10" height="150" fill="#166534" rx="2" />
      <rect x="50" y="60" width="110" height="150" fill="#f0fdf4" rx="2" />

      <g stroke="#d1d5db" strokeWidth="1.5">
        <path d="M65 85 H145" />
        <path d="M65 105 H145" />
        <path d="M65 125 H145" />
        <path d="M65 145 H145" />
        <path d="M65 165 H145" />
      </g>

      <path d="M70 110 Q 80 100 90 110 T 110 110" stroke="#374151" strokeWidth="2" fill="none" />
      <path d="M70 130 Q 80 120 90 130 T 110 130" stroke="#374151" strokeWidth="2" fill="none" />
      <path d="M70 150 Q 80 140 90 150 T 110 150" stroke="#374151" strokeWidth="2" fill="none" />

      <g transform="translate(110, 130) rotate(-10)">
        <path d="M0 0 L40 -20 Q 50 -25 45 -15 L15 15 Z" fill="#fde68a" stroke="#92400e" strokeWidth="1" />
        <path d="M10 10 L-5 25" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  </div>
);

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="sidebar-icon">
            <BookOpen size={24} />
          </div>
          <h2>An toàn Internet</h2>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">KHÓA HỌC: AN TOÀN INTERNET</p>
          <div className="sidebar-nav">
            <ChevronLeft size={20} />
            <span>Thử thách của khóa học</span>
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="sidebar-active">
          <h3>Thử thách của khóa học</h3>
          <p>Kiểm tra kiến thức của bạn về các kỹ năng trong khóa học này.</p>
        </div>

        <SidebarIllustration />

        <div className="sidebar-breadcrumb">
          <span>Kỹ năng sống</span>
          <span>&gt;</span>
          <span className="active">An toàn Internet</span>
          <span>&gt;</span>
          <span>Thử thách của khóa học</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <p>© 2026 Khan Academy</p>
        <div className="footer-links">
          <a href="#">Điều khoản sử dụng</a>
          <a href="#">Chính sách về quyền riêng tư</a>
          <a href="#">Thông báo về cookie</a>
          <a href="#">Tuyên bố về trợ năng</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
