import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const TopProducts_SP = () => {
  const [top3, setTop3] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTop3 = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("rating_rate", { ascending: false })
          .order("rating_count", { ascending: false })
          .limit(3);

        if (error) throw error;
        setTop3(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTop3();
  }, []);

  if (top3.length < 3) return null;

  // Sắp xếp: Bạc (1) - Vàng (0) - Đồng (2)
  const podiumOrder = [
    { ...top3[1], rank: 2, color: "#C0C0C0", height: "140px", stepHeight: "90px" },
    { ...top3[0], rank: 1, color: "#FFD700", height: "180px", stepHeight: "150px" },
    { ...top3[2], rank: 3, color: "#CD7F32", height: "120px", stepHeight: "70px" },
  ];

  return (
    <div className="podium-container">
      {/* --- PHẦN CSS STYLE (Nhúng trực tiếp để tạo hiệu ứng) --- */}
      <style>{`
        .podium-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          font-family: Arial, sans-serif;
          background-color: #252432; 
          min-height: 100vh;
        }

        /* Khung chứa thẻ 3D */
        .t-card {
          width: 200px; /* Chiều rộng thẻ */
          height: 280px; /* Chiều cao thẻ */
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          perspective: 2500px; /* Tạo chiều sâu */
          cursor: pointer;
          margin-bottom: 10px;
          z-index: 10;
        }

        /* Lớp vỏ bọc (Nền thẻ) */
        .t-wrapper {
          transition: all 0.5s;
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid transparent; /* Chuẩn bị cho border màu */
        }

        /* Hiệu ứng bóng đổ mờ ảo bên dưới */
        .t-wrapper::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.1) 100%);
          opacity: 0;
          transition: opacity 0.5s;
        }

        /* KHI HOVER VÀO THẺ (.t-card) */
        .t-card:hover .t-wrapper {
          transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
          box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
        }
        
        .t-card:hover .t-wrapper::before {
          opacity: 1;
        }

        /* Ảnh sản phẩm (Nhân vật) */
        .t-character {
          width: 90%;
          max-height: 150px;
          object-fit: contain;
          opacity: 1; 
          transition: all 0.5s;
          position: absolute;
          top: 30px; /* Vị trí mặc định */
          z-index: 5;
        }

        /* Khi hover: Ảnh nhảy ra ngoài (Pop-out 3D) */
        .t-card:hover .t-character {
          transform: translate3d(0%, -40px, 80px); /* Nhảy lên và ra trước */
          filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); /* Bóng đổ cho ảnh */
        }

        /* Thông tin chữ (Title) */
        .t-info {
          width: 100%;
          padding: 10px;
          text-align: center;
          transition: transform 0.5s;
          position: absolute;
          bottom: 20px;
          z-index: 6;
        }

        /* Khi hover: Chữ bay nhẹ lên để tránh bị che */
        .t-card:hover .t-info {
          transform: translate3d(0%, -10px, 40px);
        }

        .crown-icon {
           position: absolute;
           top: -40px;
           left: 50%;
           transform: translateX(-50%);
           font-size: 2.5rem;
           z-index: 20;
           animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
          100% { transform: translateX(-50%) translateY(0px); }
        }
      `}</style>

      <h2 style={{ marginBottom: "60px", textTransform: "uppercase", letterSpacing: "2px", color: "#fff" }}>
        🏆 Bảng vàng thành tích 🏆
      </h2>

      {/* Container của Bục vinh quang */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "20px" }}>
        {podiumOrder.map((product) => (
          <div
            key={product.id}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onClick={() => navigate(`/detail/${product.id}`)}
          >
            {/* --- PHẦN THẺ 3D MỚI --- */}
            <div className="t-card">
              
              {/* Icon vương miện cho Top 1 */}
              {product.rank === 1 && <div className="crown-icon">👑</div>}

              {/* Lớp vỏ nền (sẽ ngả ra sau khi hover) */}
              <div 
                className="t-wrapper" 
                style={{ borderColor: product.color }} // Viền màu theo huy chương
              >
                 {/* Bạn có thể thêm ảnh nền mờ ở đây nếu muốn */}
              </div>

              {/* Ảnh sản phẩm (sẽ nhảy ra ngoài khi hover) */}
              <img 
                src={product.image} 
                alt={product.title} 
                className="t-character" 
              />

              {/* Thông tin sản phẩm */}
              <div className="t-info">
                <h4 style={{ 
                    margin: "0 0 5px", 
                    fontSize: "0.9rem", 
                    color: "#333", 
                    whiteSpace: "nowrap", 
                    overflow: "hidden", 
                    textOverflow: "ellipsis" 
                }}>
                  {product.title}
                </h4>
                <div style={{ fontWeight: "bold", color: "#e63946" }}>${product.price}</div>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>⭐ {product.rating_rate}</div>
              </div>
            </div>
            {/* --- HẾT PHẦN THẺ 3D --- */}

            {/* --- Phần Bục đứng (Giữ nguyên) --- */}
            <div
              style={{
                width: "200px", // Bằng chiều rộng thẻ
                height: product.stepHeight,
                backgroundColor: product.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "10px",
                color: "#fff",
                fontSize: "2.5rem",
                fontWeight: "bold",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.5)",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                position: "relative",
                zIndex: 1
              }}
            >
              {product.rank}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts_SP;