
function Login() {
  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <a href="#" className="explore">Explore ▾</a>
            <input
              type="text"
              placeholder="Search"
              className="search"
            />
          </div>

          <div className="logo">Khan Academy</div>

          <div className="header-right">
            <a href="#">Donate</a>
            <a href="#">Log in</a>
            <a href="#" className="btn-signup">Sign up</a>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main className="main">
        <div className="main-container">
          {/* LEFT */}
          <div className="left">
            {/* ẢNH TỪ PUBLIC */}
            <img
              src="/images/hero-main.jpg"
              alt="Learning"
            />

            <h3>Did you know?</h3>
            <p>
              Regardless of who you are, mastering even just one more
              skill on Khan Academy results in learning gains.
            </p>
          </div>

          {/* RIGHT */}
          <div className="right">
            <h2>Log in now!</h2>

            <button className="btn-social google">
              Continue with Google
            </button>

            <div className="divider">
              <span>Or log in with email</span>
            </div>

            <form>
              <label>
                Email or username <span>required</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
              />

              <label>
                Password <span>required</span>
              </label>
              <input type="password" />

              <a href="#" className="forgot">
                Forgot password?
              </a>

              <button className="btn-login" disabled>
                Log in
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2026 Khan Academy Clone</p>
      </footer>
    </>
  );
}
export default Login;