import React from "react";
import { Link } from "react-router-dom";
import "./css/home.css";

// Dữ liệu giả lập cho sản phẩm nổi bật (Sau này sẽ lấy từ API)
const TRENDING_PRODUCTS = [
  {
    id: 1,
    name: "Nike Air Jordan 1 High",
    price: "4.500.000₫",
    img: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bd4cf472-051a-4699-964b-443b3364b2bb/WMNS+AIR+JORDAN+1+MID.png",
    tag: "HOT"
  },
  {
    id: 2,
    name: "Adidas Yeezy Boost 350",
    price: "5.200.000₫",
    img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=2000&auto=format&fit=crop",
    tag: "NEW"
  },
  {
    id: 3,
    name: "New Balance 550 White",
    price: "3.800.000₫",
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop",
    tag: "SALE"
  },
  {
    id: 4,
    name: "Nike Dunk Low Retro",
    price: "3.100.000₫",
    img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=2000&auto=format&fit=crop",
    tag: "BEST"
  },
];

const Home = () => {
  return (
    <div className="home-container">
      
      {/* 1. HERO BANNER: Phần mở đầu ấn tượng */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">BỘ SƯU TẬP MỚI 2025</span>
          <h1 className="hero-title">
            BƯỚC CHÂN <br /> <span className="text-stroke">KHẲNG ĐỊNH</span> <br /> PHONG CÁCH
          </h1>
          <p className="hero-desc">
            Khám phá những mẫu Sneaker độc quyền, chính hãng và đẳng cấp nhất.
          </p>
          <div className="hero-btns">
            <Link to="/" className="btn-primary">MUA NGAY</Link>
            <Link to="/about" className="btn-secondary">VỀ CHÚNG TÔI</Link>
          </div>
        </div>
      </section>

      {/* 2. BRANDS: Logo các thương hiệu */}
      <section className="brands-scroller">
        <div className="brands-track">
          <span>NIKE</span>
          <span>ADIDAS</span>
          <span>PUMA</span>
          <span>NEW BALANCE</span>
          <span>CONVERSE</span>
          <span>VANS</span>
          {/* Lặp lại để tạo hiệu ứng chạy vô tận */}
          <span>NIKE</span>
          <span>ADIDAS</span>
          <span>PUMA</span>
        </div>
      </section>

      {/* 3. TRENDING NOW: Sản phẩm nổi bật */}
      <section className="trending-section container">
        <div className="section-header">
          <h2>SẢN PHẨM <span className="highlight">NỔI BẬT 🔥</span></h2>
          <Link to="/products" className="view-all">Xem tất cả ➔</Link>
        </div>

        <div className="product-grid">
          {TRENDING_PRODUCTS.map((item) => (
            <div key={item.id} className="product-card">
              <div className="card-image">
                <span className={`tag ${item.tag}`}>{item.tag}</span>
                <img src={item.img} alt={item.name} />
                <button className="add-cart-btn">THÊM VÀO GIỎ</button>
              </div>
              <div className="card-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROMO BANNER: Banner quảng cáo giữa trang */}
      <section className="promo-banner">
        <div className="promo-content">
          <h2>GIẢM GIÁ TỚI 50%</h2>
          <h3>BLACK FRIDAY SNEAKER SALE</h3>
          <p>Cơ hội duy nhất trong năm để sở hữu những đôi giày mơ ước.</p>
          <Link to="/promotions" className="btn-white">SĂN DEAL NGAY</Link>
        </div>
      </section>

      {/* 5. SERVICES: Cam kết dịch vụ */}
      <section className="services-section container">
        <div className="service-box">
          <div className="icon">🚚</div>
          <h3>Miễn Phí Vận Chuyển</h3>
          <p>Cho đơn hàng từ 2.000.000₫</p>
        </div>
        <div className="service-box">
          <div className="icon">💯</div>
          <h3>Chính Hãng 100%</h3>
          <p>Cam kết hoàn tiền nếu giả</p>
        </div>
        <div className="service-box">
          <div className="icon">🎧</div>
          <h3>Hỗ Trợ 24/7</h3>
          <p>Luôn sẵn sàng tư vấn</p>
        </div>
      </section>

    </div>
  );
};

export default Home;