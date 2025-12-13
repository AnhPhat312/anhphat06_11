import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";
// import "./css/trang1.css"; // Import file CSS chứa hiệu ứng Electric

const Trang1 = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", background: "#000", minHeight: "100vh" }}>
      {/* SVG Filter Definition: 
        Đặt ở đây 1 lần để dùng chung cho tất cả các card.
        Style width/height = 0 để không chiếm diện tích hiển thị.
      */}
      <svg className="svg-container" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Tăng kích thước min lên một chút cho đẹp
          gap: "24px",
        }}
      >
        {products.map((p) => (
          // Bắt đầu cấu trúc Card Electric
          <div 
            className="card-container" 
            key={p.id} 
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{ cursor: "pointer" }} // Thêm con trỏ chuột
          >
            <div className="inner-container">
              <div className="border-outer">
                <div className="main-card">
                  {/* Có thể đặt hình ảnh mờ làm background ở đây nếu muốn */}
                </div>
              </div>
              <div className="glow-layer-1"></div>
              <div className="glow-layer-2"></div>
            </div>

            <div className="overlay-1"></div>
            <div className="overlay-2"></div>
            <div className="background-glow"></div>

            {/* Nội dung sản phẩm */}
            <div className="content-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="content-top">
                {/* Hiển thị Giá ở tag nhỏ phía trên */}
                <div className="scrollbar-glass">${p.price}</div>
                
                {/* Hình ảnh sản phẩm */}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <img 
                        src={p.image} 
                        alt={p.title} 
                        style={{ 
                            width: "120px", 
                            height: "120px", 
                            objectFit: "contain",
                            filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))" // Thêm chút hiệu ứng sáng cho ảnh
                        }} 
                    />
                </div>
                
                {/* Tên sản phẩm */}
                <p className="title" style={{ fontSize: '1.2rem', marginTop: '10px' }}>{p.title}</p>
              </div>

              <hr className="divider" />

              <div className="content-bottom">
                <p className="description">
                  Click để xem chi tiết sản phẩm.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trang1;