import React from "react";
import { Link } from "react-router-dom";
import "./css/about.css";

// Bạn có thể thay ảnh này bằng ảnh thật của shop hoặc ảnh giày đẹp
import aboutBanner from "./assets/images/banner (2).png"; 

const About = () => {
  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>CHÚNG TÔI LÀ <span className="highlight">SNEAKER STORE</span></h1>
          <p>Nơi đam mê cất bước. Chất lượng khẳng định phong cách.</p>
        </div>
      </section>

      {/* 2. CÂU CHUYỆN (STORY) */}
      <section className="about-section container">
        <div className="story-grid">
          <div className="story-text">
            <h2>Câu Chuyện Của Chúng Tôi</h2>
            <p>
              Được thành lập vào năm 2024, chúng tôi bắt đầu với một niềm đam mê đơn giản: 
              <strong> Những đôi giày không chỉ để đi, mà là để thể hiện cá tính.</strong>
            </p>
            <p>
              Chúng tôi hiểu rằng việc tìm kiếm một đôi giày Sneaker chính hãng (Authentic) 
              giữa thị trường thật giả lẫn lộn là điều không dễ dàng. Đó là lý do 
              <strong> Sneaker Store</strong> ra đời – để trở thành điểm đến tin cậy nhất 
              cho cộng đồng yêu giày tại Việt Nam.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <h3>500+</h3>
                <span>Mẫu giày</span>
              </div>
              <div className="stat-item">
                <h3>10k+</h3>
                <span>Khách hàng</span>
              </div>
              <div className="stat-item">
                <h3>100%</h3>
                <span>Chính hãng</span>
              </div>
            </div>
          </div>
          <div className="story-image">
             {/* Dùng tạm ảnh banner logo hoặc ảnh shop thực tế */}
            <img src={aboutBanner} alt="Our Story" />
          </div>
        </div>
      </section>

      {/* 3. GIÁ TRỊ CỐT LÕI (WHY CHOOSE US) */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Tại Sao Chọn Chúng Tôi?</h2>
          <div className="features-grid">
            
            <div className="feature-card">
              <div className="icon">💎</div>
              <h3>100% Authentic</h3>
              <p>Cam kết hàng chính hãng trọn đời. Phát hiện hàng giả đền tiền gấp 10 lần.</p>
            </div>

            <div className="feature-card">
              <div className="icon">🚀</div>
              <h3>Giao Hàng Tốc Độ</h3>
              <p>Nhận hàng trong 2h tại nội thành. Đóng gói 2 lớp bảo vệ hộp giày (Double Box).</p>
            </div>

            <div className="feature-card">
              <div className="icon">🛡️</div>
              <h3>Bảo Hành Uy Tín</h3>
              <p>Hỗ trợ đổi trả trong 7 ngày. Bảo hành keo dán miễn phí trong 6 tháng.</p>
            </div>

            <div className="feature-card">
              <div className="icon">🔥</div>
              <h3>Luôn Cập Nhật</h3>
              <p>Săn các mẫu giày hot, limited edition mới nhất thị trường.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CTA (Kêu gọi hành động) */}
      <section className="about-cta">
        <h2>Bạn Đã Sẵn Sàng Thay Đổi Phong Cách?</h2>
        <p>Khám phá bộ sưu tập mới nhất ngay hôm nay.</p>
        <Link to="/products" className="cta-btn">MUA SẮM NGAY ➔</Link>
      </section>
    </div>
  );
};

export default About;