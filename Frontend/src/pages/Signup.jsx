import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Signup.css";
import { ChevronRight, ChevronLeft, User, Mail, Lock, Calendar } from "lucide-react";
import { register, setAccessToken } from "../api/auth.api.js";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    birthDay: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate birthday (must be at least 13 years old)
  const validateBirthday = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle role selection
  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setStep(2);
  };

  // Handle birthday submit
  const handleBirthdaySubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.birthDay) {
      newErrors.birthDay = "Please select your birth date";
    } else if (!validateBirthday(formData.birthDay)) {
      newErrors.birthDay = "You must be at least 13 years old";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(3);
  };

  // Handle final registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Map frontend roles to backend roles
      const roleMap = {
        learner: "student",
        teacher: "teacher",
        parent: "parent"
      };

      const response = await register({
        email: formData.email,
        fullName: formData.name,
        password: formData.password,
        role: roleMap[formData.role] || "student",
        birthDay: formData.birthDay
      });

      // Store token
      setAccessToken(response.accessToken);
      
      // Redirect to home
      navigate("/");
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed. Please try again." });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  return (
    <div className="signup-wrapper">
      {/* LEFT */}
      <div className="signup-left">
        <div className="left-content">
          <img
            src="https://cdn.kastatic.org/images/lohp/hero_student_collage_IN_2x.png"
            alt="students"
            className="hero-image"
          />

          <div className="info-section">
            <h2>Did you know?</h2>
            <p>
              Regardless of who you are, mastering even one more skill on Khan
              Academy results in huge learning gains.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="progress-indicator">
            <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <div className="progress-line"></div>
            <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <div className="progress-line"></div>
            <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="signup-right">
        <div className="signup-box">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="step-content fade-in">
              <h1>Sign up for Khan Academy</h1>
              <p className="step-description">Choose your role to get started</p>

              <div className="roles-container">
                <button 
                  className="role-btn"
                  onClick={() => handleRoleSelect('learner')}
                >
                  <div className="role-content">
                    <div className="role-icon learner">🎓</div>
                    <div className="role-text">
                      <h3>I'm a learner</h3>
                      <p>Start your learning journey</p>
                    </div>
                  </div>
                  <ChevronRight size={24} />
                </button>

                <button 
                  className="role-btn"
                  onClick={() => handleRoleSelect('teacher')}
                >
                  <div className="role-content">
                    <div className="role-icon teacher">👨‍🏫</div>
                    <div className="role-text">
                      <h3>I'm a teacher</h3>
                      <p>Manage and teach students</p>
                    </div>
                  </div>
                  <ChevronRight size={24} />
                </button>

                <button 
                  className="role-btn"
                  onClick={() => handleRoleSelect('parent')}
                >
                  <div className="role-content">
                    <div className="role-icon parent">👪</div>
                    <div className="role-text">
                      <h3>I'm a parent</h3>
                      <p>Monitor your child's progress</p>
                    </div>
                  </div>
                  <ChevronRight size={24} />
                </button>
              </div>

              <p className="login-link">
                Already have an account? <Link to="/login"><span>Login</span></Link>
              </p>
            </div>
          )}

          {/* Step 2: Birthday */}
          {step === 2 && (
            <div className="step-content fade-in">
              <button className="back-btn" onClick={handleBack}>
                <ChevronLeft size={20} />
                Back
              </button>

              <h1>When's your birthday?</h1>
              <p className="step-description">We need this to provide age-appropriate content</p>

              <form onSubmit={handleBirthdaySubmit}>
                <div className="input-group">
                  <Calendar className="icon" size={20} />
                  <input
                    type="date"
                    value={formData.birthDay}
                    onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                    max={new Date().toISOString().split('T')[0]}
                    className={errors.birthDay ? 'error' : ''}
                  />
                </div>
                {errors.birthDay && (
                  <p className="error-message">{errors.birthDay}</p>
                )}

                <button type="submit" className="continue-btn">
                  Continue
                  <ChevronRight size={20} />
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Account Details */}
          {step === 3 && (
            <div className="step-content fade-in">
              <button className="back-btn" onClick={handleBack}>
                <ChevronLeft size={20} />
                Back
              </button>

              <h1>Create your account</h1>
              <p className="step-description">Just a few more details to get started</p>

              <form onSubmit={handleRegister}>
                {/* Name */}
                <div className="input-group">
                  <User className="icon" size={20} />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <p className="error-message">{errors.name}</p>}

                {/* Email */}
                <div className="input-group">
                  <Mail className="icon" size={20} />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? 'error' : ''}
                  />
                </div>
                {errors.email && <p className="error-message">{errors.email}</p>}

                {/* Password */}
                <div className="input-group">
                  <Lock className="icon" size={20} />
                  <input
                    type="password"
                    placeholder="Password (min. 6 characters)"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? 'error' : ''}
                  />
                </div>
                {errors.password && <p className="error-message">{errors.password}</p>}

                {/* Confirm Password */}
                <div className="input-group">
                  <Lock className="icon" size={20} />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}

                {errors.submit && (
                  <p className="error-message submit-error">{errors.submit}</p>
                )}

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="terms">
                  By signing up, you agree to our{' '}
                  <a href="/terms" target="_blank">Terms of Service</a> and{' '}
                  <a href="/privacy" target="_blank">Privacy Policy</a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}