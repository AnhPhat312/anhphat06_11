import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`Đã thêm "${product.title}" vào giỏ hàng!`);
  };

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px", color: "#fff" }}>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Quay lại
      </button>

      <div className="p-card">
        {/* Vòng tròn + Giá tiền */}
        <div className="p-circle">
          <div className="p-price-box">
            <span className="p-price-label">Price</span>
            <span className="p-price-value">${product.price}</span>
          </div>
        </div>

        {/* Ảnh sản phẩm */}
        <img
          src={product.image}
          alt={product.title}
          className="p-product-img"
        />

        {/* Nội dung chi tiết */}
        <div className="p-content">
          <h2>{product.title}</h2>
          
          <div className="p-description">
            <p>
              {product.description
                ? product.description
                : "Sản phẩm chất lượng cao, thiết kế tinh tế phù hợp với mọi nhu cầu của bạn."}
            </p>
          </div>
          
          <div className="p-meta">
            ⭐ {product.rating_rate} / 5 ({product.rating_count} đánh giá)
          </div>

          <button onClick={(e) => handleAddToCart(e, product)}>
            Thêm vào giỏ
          </button>
        </div>
      </div>

      <style>{`
        /* --- CẤU HÌNH CHUNG --- */
        .detail-page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #151515;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          /* --- THAY ĐỔI MÀU CHỦ ĐẠO TẠI ĐÂY --- */
          --clr: #d52b1e; /* Màu ĐỎ rực rỡ */
        }

        .back-btn {
          position: absolute;
          top: 20px; left: 20px;
          background: #222; color: #fff;
          border: 1px solid #444;
          padding: 8px 16px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.9rem;
          z-index: 100;
          transition: 0.3s;
        }
        .back-btn:hover { 
          background: var(--clr); /* Hover vào nút quay lại cũng đỏ luôn */
          border-color: var(--clr);
        }

        /* --- CARD STYLE --- */
        .p-card {
          position: relative;
          width: 320px;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          transition-delay: 0.5s;
          background: transparent;
        }

        .p-card:hover {
          width: 650px;
          transition-delay: 0.5s;
        }

        /* Vòng tròn nền */
        .p-card .p-circle {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .p-card .p-circle::before {
          content: "";
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 50%;
          background: #191919;
          border: 8px solid var(--clr); /* Viền ĐỎ */
          transition: 0.5s, background 0.5s;
          transition-delay: 0.75s, 1s;
          transform: scale(0.9);
          box-shadow: 0 0 10px var(--clr), 0 0 60px var(--clr); /* Phát sáng ĐỎ */
        }

        .p-card:hover .p-circle::before {
          transition-delay: 0.5s;
          border-radius: 20px;
          background: var(--clr); /* Nền chuyển sang ĐỎ */
          transform: scale(1);
        }

        /* --- Typography Giá tiền --- */
        .p-price-box {
          position: relative;
          z-index: 10;
          color: #fff;
          text-align: center;
          transition: 0.5s;
          transition-delay: 0.5s;
          display: flex;
          flex-direction: column;
        }

        .p-price-label {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 300;
          opacity: 0.8;
        }

        .p-price-value {
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.1;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .p-card:hover .p-price-box {
          transform: scale(0);
          transition-delay: 0s;
        }

        /* Ảnh sản phẩm */
        .p-product-img {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0) rotate(315deg);
          height: 220px;
          max-width: 90%;
          object-fit: contain;
          transition: 0.5s ease-in-out;
          z-index: 20;
        }

        .p-card:hover .p-product-img {
          transition-delay: 0.75s;
          top: 30%;
          left: 75%;
          height: 380px;
          transform: translate(-50%, -50%) scale(1) rotate(15deg);
        }

        /* --- Nội dung chữ --- */
        .p-content {
          position: absolute;
          width: 50%;
          left: 20%;
          padding: 20px 0;
          opacity: 0;
          transition: 0.5s;
          visibility: hidden;
          z-index: 25;
          text-align: left;
        }

        .p-card:hover .p-content {
          transition-delay: 0.75s;
          opacity: 1;
          visibility: visible;
          left: 30px;
        }

        .p-content h2 {
          color: #fff;
          text-transform: uppercase;
          font-size: 1.6rem;
          line-height: 1.2;
          margin-bottom: 12px;
          font-weight: 700;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .p-description {
          color: rgba(255,255,255,0.9);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 15px;
          max-height: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .p-meta {
            color: #ffdd00; /* Sao vàng giữ nguyên cho nổi */
            font-size: 0.85rem;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .p-content button {
          color: var(--clr); /* Chữ màu ĐỎ */
          background: #fff; /* Nền trắng */
          padding: 10px 25px;
          border-radius: 30px;
          border: none;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }

        .p-content button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            background: #eee;
        }

        /* --- MOBILE --- */
        @media (max-width: 700px) {
           .p-card {
              width: 100% !important;
              max-width: 380px;
              height: auto;
              flex-direction: column;
              background: var(--clr); /* Nền ĐỎ trên mobile */
              border-radius: 20px;
              padding: 30px 20px;
           }
           .p-circle, .p-circle::before, .p-price-box { display: none; }
           
           .p-product-img {
              position: static;
              transform: none !important;
              scale: 1 !important;
              height: 200px;
              margin-bottom: 20px;
           }
           
           .p-content {
              position: static;
              width: 100%;
              opacity: 1;
              visibility: visible;
              padding: 0;
           }
           .p-content h2 { text-align: center; }
           .p-description { text-align: center; max-height: none; }
           .p-meta { text-align: center; }
           .p-content button { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;