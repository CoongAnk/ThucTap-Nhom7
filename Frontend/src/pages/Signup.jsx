import React from "react";
import "../styles/Signup.css";
import { ChevronRight } from "lucide-react";

export default function Signup() {
  return (
    <div className="signup-wrapper">

      {/* LEFT */}
      <div className="signup-left">
        <img
          src="https://cdn.kastatic.org/images/lohp/hero_student_collage_IN_2x.png"
          alt="students"
        />

        <h2>Did you know?</h2>
        <p>
          Regardless of who you are, mastering even one more skill on Khan
          Academy results in huge learning gains.
        </p>
      </div>

      {/* RIGHT */}
      <div className="signup-right">
        <h1>Sign up for Khan Academy</h1>

        <button className="role-btn">
          I'm a learner
          <ChevronRight size={22} />
        </button>

        <button className="role-btn">
          I'm a teacher
          <ChevronRight size={22} />
        </button>

        <button className="role-btn">
          I'm a parent
          <ChevronRight size={22} />
        </button>

        <p className="login-link">
          Already have an account? <span>Log in</span>
        </p>
      </div>
    </div>
  );
}
