import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";
<<<<<<< HEAD
import { login, setAccessToken } from "../api/auth.api.js";
=======
import { login, setUser } from "../api/auth.api.js";
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f

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

<<<<<<< HEAD
    // Validation
    if (!email || !password) {
      setError("Please enter email and password");
=======
    // ✅ Validation
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
      return;
    }

    setLoading(true);
    try {
<<<<<<< HEAD
      const response = await login({ email, password });
      
      // Store token
      setAccessToken(response.accessToken);
      
      // Redirect to home/dashboard
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
=======
      // ✅ Gọi hàm login từ auth.api.js
      const { user, accessToken } = await login({ email, password });

      // ✅ Dispatch event để Navbar cập nhật
      window.dispatchEvent(
        new CustomEvent("userLoggedIn", { detail: user })
      );

      console.log("Login successful:", user);

      // ✅ Redirect to courses
      navigate("/courses");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
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
<<<<<<< HEAD
            <h2>Did you know?</h2>
            <p>Mastering just one more skill everyday boosts your learning progress tremendously.</p>
=======
            <h2>Bạn có biết?</h2>
            <p>Học một kỹ năng mới mỗi ngày sẽ giúp bạn tiến bộ nhanh hơn.</p>
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
          </div>

          <div className="stats">
            <div className="stat-item">
              <h3>50K+</h3>
<<<<<<< HEAD
              <p>Active Learners</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Courses</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Success Rate</p>
=======
              <p>Học viên đang học</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Khóa học chất lượng</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Tỷ lệ hài lòng</p>
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-box">
          <div className="login-header">
<<<<<<< HEAD
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
=======
            <h1>Chào mừng trở lại!</h1>
            <p>Đăng nhập để tiếp tục hành trình học tập của bạn</p>
          </div>

          {/* SOCIAL LOGIN */}
          <button className="social google" type="button">
            <FcGoogle size={20} />
            <span>Tiếp tục với Google</span>
          </button>

          <div className="social-row">
            <button className="square fb" type="button">
              <FaFacebookF size={18} />
            </button>
            <button className="square apple" type="button">
              <FaApple size={20} />
            </button>
            <button className="square ms" type="button">
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
              <BsMicrosoft size={18} />
            </button>
          </div>

          <div className="divider">
<<<<<<< HEAD
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
=======
            <span>Hoặc đăng nhập bằng email</span>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className="input-group">
              <AiOutlineMail className="icon" size={20} />
              <input 
                type="email" 
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <AiOutlineLock className="icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                <span>Nhớ tôi</span>
              </label>
              <Link to="/forgot-password" className="forgot">Quên mật khẩu?</Link>
            </div>

            {/* ERROR MESSAGE */}
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

            {/* LOGIN BUTTON */}
            <button 
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <div className="signup">
            Chưa có tài khoản? <Link to="/signup"><span>Đăng ký ngay</span></Link>
>>>>>>> 1c55220677df837788aad0117a6783d9363c162f
          </div>
        </div>
      </div>
    </div>
  );
}