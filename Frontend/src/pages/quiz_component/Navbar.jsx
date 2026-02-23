import React from "react";
import { Search, ChevronDown } from "lucide-react";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="nav-btn">
          Khám phá <ChevronDown size={16} />
        </button>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="search-input"
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>

      <div className="navbar-center">
        <div className="avatar">
          <span className="avatar-text">KA</span>
        </div>
        <span className="brand">Khan Academy</span>
      </div>

      <div className="navbar-right">
        <button className="nav-btn">
          Huy Nguyễn như <ChevronDown size={16} />
        </button>
      </div>
    </nav>
  );
};