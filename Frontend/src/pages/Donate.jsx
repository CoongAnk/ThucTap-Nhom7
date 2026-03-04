import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Donate.css";

const Donate = () => {
  const [selected, setSelected] = useState(100000);

  const amounts = [50000, 100000, 200000, 500000, 1000000];

  return (
    <div className="donate">

      {/* HERO */}
      <section className="donate-hero">
        <div className="donate-container">
          <h1>Hỗ trợ tri thức cho tương lai</h1>
          <p>
            Sự đóng góp của bạn giúp hàng triệu người tiếp cận giáo dục miễn phí.
            Cùng xây dựng một thế giới tốt đẹp hơn.
          </p>

          <div className="hero-glow"></div>
        </div>
      </section>

      {/* MAIN */}
      <section className="donate-main">
        <div className="donate-container grid">

          {/* LEFT */}
          <div className="donate-card">

            <h2>Chọn số tiền</h2>

            <div className="amount-grid">
              {amounts.map((a) => (
                <button
                  key={a}
                  className={`amount ${selected === a ? "active" : ""}`}
                  onClick={() => setSelected(a)}
                >
                  {a.toLocaleString()}đ
                </button>
              ))}
            </div>

            <input
              className="custom"
              placeholder="Số tiền khác..."
            />

            <div className="payment">
              <h3>Thanh toán</h3>

              <label className="pay">
                <input type="radio" name="pay" />
                Thẻ ngân hàng
              </label>

              <label className="pay">
                <input type="radio" name="pay" />
                Momo / ZaloPay
              </label>

              <label className="pay">
                <input type="radio" name="pay" />
                Chuyển khoản
              </label>
            </div>

            <button className="donate-btn">
              Quyên góp {selected.toLocaleString()}đ
            </button>
          </div>

          {/* RIGHT */}
          <div className="impact">

            <h2>Tác động của bạn</h2>

            <div className="impact-box">
              <h3>🌍 1 triệu+</h3>
              <p>Người học mỗi ngày</p>
            </div>

            <div className="impact-box">
              <h3>📚 100+</h3>
              <p>Quốc gia sử dụng</p>
            </div>

            <div className="impact-box">
              <h3>❤️ Miễn phí</h3>
              <p>Cho mọi người</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="donate-cta">
        <h2>Hãy trở thành người thay đổi thế giới</h2>
        <p>Cùng nhau xây dựng nền giáo dục công bằng.</p>
      </section>

    </div>
  );
};

export default Donate;