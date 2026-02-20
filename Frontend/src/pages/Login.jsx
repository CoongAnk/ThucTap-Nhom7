import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";
import { login, setAccessToken } from "../api/auth.api.js";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await login({ email, password });
      
      // Store token
      setAccessToken(response.accessToken);
      
      // Redirect to home/dashboard
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT */}
      <div className="login-left">
        <div className="left-content">
          <div className="logo-section">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 className="brand-name">LearnHub</h1>
          </div>
          
          <div className="hero-section">
            <img src="/hero.png" alt="Hero" className="hero" />
          </div>

          <div className="info-card">
            <div className="info-icon">💡</div>
            <h2>Did you know?</h2>
            <p>Mastering just one more skill everyday boosts your learning progress tremendously.</p>
          </div>

          <div className="stats">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Active Learners</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Courses</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Log in to continue your learning journey</p>
          </div>

          {/* SOCIAL LOGIN */}
          <button className="social google">
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <div className="social-row">
            <button className="square fb">
              <FaFacebookF size={18} />
            </button>
            <button className="square apple">
              <FaApple size={20} />
            </button>
            <button className="square ms">
              <BsMicrosoft size={18} />
            </button>
          </div>

          <div className="divider">
            <span>Or login with email</span>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <AiOutlineMail className="icon" size={20} />
            <input 
              type="email" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <AiOutlineLock className="icon" size={20} />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot">Forgot password?</Link>
          </div>

          {error && (
            <div 
              style={{
                background: "#fee",
                color: "#c33",
                padding: "10px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                marginBottom: "10px",
                border: "1px solid #fcc",
              }}
            >
              {error}
            </div>
          )}

          <button 
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="signup">
            Need an account? <Link to="/signup"><span>Sign up</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}