import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";

export default function Login() {
  return (
    <div className="login-wrapper">
      {/* LEFT */}
      <div className="login-left">
        <img
          src="https://cdn.kastatic.org/images/lohp/hero_student_collage_IN_2x.png"
          className="hero"
          alt="hero"
        />

        <h2>Did you know?</h2>
        <p>
          Mastering just one more skill everyday boosts your learning progress
          tremendously.
        </p>
      </div>

      {/* RIGHT */}
      <div className="login-box">
        <h1>Log in now!</h1>

        <button className="social google">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="social-row">
          <button className="square fb">
            <FaFacebookF />
          </button>

          <button className="square apple">
            <FaApple />
          </button>

          <button className="square ms">
            <BsMicrosoft />
          </button>
        </div>

        <div className="divider">Or login with email</div>

        {/* EMAIL */}
        <div className="input-group">
          <AiOutlineMail className="icon" />
          <input placeholder="Email or username" />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input type="password" placeholder="Password" />
        </div>

        <span className="forgot">Forgot password?</span>

        <button className="login-btn">Log in</button>

        <p className="signup">
          Need an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}
