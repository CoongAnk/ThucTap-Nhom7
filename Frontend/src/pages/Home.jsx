const Home = () => {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>For every student,<br />every classroom.</h1>
          <p>Real results. Trusted content.</p>

          <div className="role-buttons">
            <a href="#" className="role-btn">Learners</a>
            <a href="#" className="role-btn">Teachers</a>
            <a href="#" className="role-btn">Parents</a>
          </div>
        </div>

        <div>
          <img src="https://via.placeholder.com/500" alt="Hero" />
        </div>
      </section>

      {/* EFFECTIVENESS */}
      <section className="effectiveness">
        <h2>Why Khan Academy works</h2>

        <div className="effect-grid">
          <div>
            <h3>Personalized</h3>
            <p>Practice at your own pace</p>
          </div>
          <div>
            <h3>Trusted</h3>
            <p>Created by experts</p>
          </div>
          <div>
            <h3>Free</h3>
            <p>For everyone</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
