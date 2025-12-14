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
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      {/* Nút Back tinh tế hơn */}
      <button onClick={() => navigate(-1)} className="back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <div className="p-card">
        {/* Vòng tròn nền + Giá tiền (Hiệu ứng cũ) */}
        <div className="p-circle">
          <div className="p-price-box">
            <h3 className="p-title-preview">{product.name}</h3>
            <span className="p-price-value">
              {product.price?.toLocaleString('vi-VN')} <small>đ</small>
            </span>
          </div>
        </div>

        {/* Ảnh sản phẩm (Hiệu ứng cũ) */}
        <img
          src={product.image_url || product.image}
          alt={product.name}
          className="p-product-img"
        />

        {/* Nội dung chi tiết (Hiệu ứng cũ) */}
        <div className="p-content">
          <h2>{product.name}</h2>
          
          <div className="p-meta">
            <span className="badge-category">{product.category || 'Sneaker'}</span>
            <span className="rating">⭐ {product.rating_rate || 5.0}</span>
          </div>

          <div className="p-description">
            <p>
              {product.description || "Thiết kế tối giản, chất liệu cao cấp mang lại sự thoải mái tuyệt đối cho đôi chân của bạn."}
            </p>
          </div>

          <div className="action-group">
            <div className="price-tag-mobile">
                {product.price?.toLocaleString('vi-VN')} đ
            </div>
            <button className="btn-add" onClick={(e) => handleAddToCart(e, product)}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      <StyleSheet />
    </div>
  );
};

// Tách CSS ra component riêng cho gọn code
const StyleSheet = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

    :root {
      --clr-accent: #ff3f34; /* Màu đỏ cam hiện đại hơn */
      --clr-bg: #1e272e;      /* Màu nền xám xanh đen */
      --clr-card: #2f3640;    /* Màu card */
      --clr-text: #f5f6fa;
    }

    /* --- LOADING --- */
    .loading-container {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100vh; background: var(--clr-bg); color: #fff; font-family: 'Inter', sans-serif;
    }
    .loader {
      border: 4px solid #f3f3f3; border-top: 4px solid var(--clr-accent);
      border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 15px;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    /* --- LAYOUT CHUNG --- */
    .detail-page-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--clr-bg);
      background-image: radial-gradient(circle at top right, #353b48 0%, var(--clr-bg) 60%);
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      position: relative;
    }

    .back-btn {
      position: absolute;
      top: 30px; left: 30px;
      background: rgba(255,255,255,0.1);
      color: #fff;
      border: none;
      width: 44px; height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: 0.3s ease;
      z-index: 100;
      backdrop-filter: blur(5px);
    }
    .back-btn:hover {
      background: var(--clr-accent);
      transform: translateX(-5px);
    }

    /* --- CARD CONTAINER (GIỮ NGUYÊN HIỆU ỨNG CŨ) --- */
    .p-card {
      position: relative;
      width: 300px; /* Nhỏ gọn ban đầu */
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Hiệu ứng nảy nhẹ */
      background: transparent;
      z-index: 10;
    }

    /* Khi hover: Card mở rộng ra */
    .p-card:hover {
      width: 700px;
    }

    /* --- VÒNG TRÒN & BACKGROUND --- */
    .p-circle {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    /* Hình tròn bên trong */
    .p-circle::before {
      content: "";
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      border-radius: 20px;
      background: var(--clr-card); /* Màu card cơ bản */
      clip-path: circle(100px at center); /* Bắt đầu là hình tròn nhỏ */
      transition: 0.5s;
    }

    /* Khi hover: Hình tròn biến thành hình chữ nhật nền */
    .p-card:hover .p-circle::before {
      clip-path: circle(800px at center); /* Mở rộng toàn bộ */
      background: var(--clr-card);
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }

    /* --- GIÁ TIỀN & TÊN (PREVIEW) --- */
    .p-price-box {
      position: relative;
      z-index: 10;
      text-align: center;
      transition: 0.5s;
      opacity: 1;
    }

    .p-title-preview {
      color: #fff;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 5px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .p-price-value {
      color: var(--clr-accent);
      font-size: 2rem;
      font-weight: 800;
    }
    .p-price-value small { font-size: 1rem; font-weight: 400; color: #aaa; }

    /* Khi hover: Ẩn giá preview đi */
    .p-card:hover .p-price-box {
      opacity: 0;
      transform: scale(0.5);
    }

    /* --- ẢNH SẢN PHẨM (ANIMATION QUAN TRỌNG) --- */
    .p-product-img {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%) rotate(-15deg); /* Góc nghiêng ban đầu */
      height: 200px;
      max-width: 90%;
      object-fit: contain;
      transition: 0.6s ease-in-out;
      z-index: 20;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
    }

    /* Khi hover: Ảnh to lên, xoay và bay sang phải */
    .p-card:hover .p-product-img {
      top: 50%;
      left: 72%; /* Đẩy sang phải */
      height: 350px; /* Phóng to */
      transform: translate(-50%, -50%) rotate(0deg); /* Về thẳng hoặc góc khác */
    }

    /* --- NỘI DUNG CHI TIẾT --- */
    .p-content {
      position: absolute;
      width: 45%;
      left: 5%;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      visibility: hidden;
      transition: 0.5s;
      z-index: 25;
      text-align: left;
      color: var(--clr-text);
    }

    /* Khi hover: Nội dung hiện ra bên trái */
    .p-card:hover .p-content {
      opacity: 1;
      visibility: visible;
      transition-delay: 0.3s; /* Hiện sau khi card mở xong */
    }

    .p-content h2 {
      font-size: 2.2rem;
      line-height: 1.1;
      margin-bottom: 10px;
      font-weight: 800;
      text-transform: uppercase;
      background: linear-gradient(to right, #fff, #bbb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .p-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .badge-category {
      background: rgba(255,255,255,0.1);
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .rating { color: #f1c40f; font-weight: 600; }

    .p-description {
      font-size: 0.95rem;
      line-height: 1.6;
      color: #b2bec3;
      margin-bottom: 30px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .btn-add {
      background: var(--clr-accent);
      color: #fff;
      padding: 14px 30px;
      border-radius: 50px;
      border: none;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 1px;
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(255, 63, 52, 0.3);
      transition: 0.3s;
    }

    .btn-add:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 25px rgba(255, 63, 52, 0.5);
    }
    
    .price-tag-mobile { display: none; }

    /* --- RESPONSIVE MOBILE --- */
    @media (max-width: 768px) {
      .detail-page-container {
         padding: 20px;
         height: auto;
         min-height: 100vh;
      }
      
      .p-card {
        width: 100% !important;
        height: auto;
        flex-direction: column;
        background: var(--clr-card);
        border-radius: 20px;
        padding: 40px 20px;
        margin-top: 60px; /* Chừa chỗ cho nút back */
      }
      
      /* Tắt hiệu ứng hover trên mobile, hiện tất cả ra */
      .p-circle, .p-circle::before { display: none; }
      .p-price-box { display: none; } /* Ẩn giá preview */

      .p-product-img {
        position: static;
        transform: rotate(-10deg) !important;
        height: 250px;
        margin-bottom: 30px;
        filter: drop-shadow(0 15px 15px rgba(0,0,0,0.4));
      }
      
      .p-card:hover .p-product-img {
         transform: rotate(-10deg) !important;
         height: 250px;
      }

      .p-content {
        position: static;
        width: 100%;
        opacity: 1;
        visibility: visible;
        transform: none;
      }
      
      .p-content h2 { font-size: 1.8rem; }
      
      .action-group {
         display: flex;
         align-items: center;
         justify-content: space-between;
         margin-top: 20px;
         background: rgba(0,0,0,0.2);
         padding: 10px;
         border-radius: 50px;
      }
      
      .price-tag-mobile {
         display: block;
         font-size: 1.1rem;
         font-weight: 700;
         color: #fff;
         margin-left: 15px;
      }
      
      .btn-add {
         padding: 10px 20px;
         font-size: 0.8rem;
      }
    }
  `}</style>
);

export default ProductDetail;