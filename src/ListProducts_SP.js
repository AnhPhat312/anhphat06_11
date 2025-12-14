import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("id", { ascending: false }); // Sản phẩm mới nhất lên đầu
        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Lọc sản phẩm theo tìm kiếm
  const filteredProducts = listProduct.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page-container">
      {/* --- HEADER SECTION --- */}
      <div className="page-header">
        <div className="header-content">
          <h2 className="page-title">Bộ Sưu Tập Mới</h2>
          <p className="page-subtitle">Khám phá những mẫu Sneaker hot nhất mùa này</p>
        </div>
        
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Đang tải sản phẩm...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>❌ Không tìm thấy sản phẩm nào phù hợp.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/detail/${p.id}`)}
            >
              {/* Image Area */}
              <div className="card-image">
                <img 
                  src={p.image_url} 
                  alt={p.name} 
                  onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                />
                
                {/* Overlay Button */}
                <div className="card-overlay">
                  <button className="btn-view">Xem chi tiết</button>
                </div>
                
                {/* Badge (Ví dụ: Nếu hàng ít thì hiện sắp hết) */}
                {p.stock < 5 && <span className="badge hot">Sắp hết</span>}
              </div>

              {/* Info Area */}
              <div className="card-info">
                <h3 className="product-name">{p.name}</h3>
                
                <div className="price-row">
                  <span className="current-price">
                    {p.price?.toLocaleString('vi-VN')} ₫
                  </span>
                  {/* Giả lập giá gốc để trông đẹp hơn */}
                  <span className="old-price">
                    {(p.price * 1.2)?.toLocaleString('vi-VN')} ₫
                  </span>
                </div>

                <div className="meta-row">
                  <span className="stock-status">
                     {p.stock > 0 ? (
                        <span style={{color: '#27ae60'}}>✔ Còn hàng</span>
                     ) : (
                        <span style={{color: '#c0392b'}}>✖ Hết hàng</span>
                     )}
                  </span>
                  <span className="rating">
                    ⭐ 4.8 (20)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductStyle />
    </div>
  );
};

const ProductStyle = () => (
  <style>{`
    :root {
      --primary: #ff3f34;
      --text-dark: #2d3436;
      --text-gray: #636e72;
      --bg-light: #f5f6fa;
    }

    /* Container */
    .product-page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: 'Inter', sans-serif;
    }

    /* Header */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 40px;
      border-bottom: 2px solid #eee;
      padding-bottom: 20px;
      flex-wrap: wrap; gap: 20px;
    }
    .page-title {
      font-size: 2rem; color: var(--text-dark); margin: 0; font-weight: 800;
      letter-spacing: -0.5px;
    }
    .page-subtitle {
      color: var(--text-gray); margin: 5px 0 0; font-size: 1rem;
    }

    /* Search Bar */
    .search-bar {
      position: relative;
      width: 300px;
    }
    .search-bar input {
      width: 100%; padding: 10px 10px 10px 40px;
      border: 1px solid #ddd; border-radius: 30px;
      outline: none; transition: 0.3s; font-size: 0.95rem;
    }
    .search-bar input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(255, 63, 52, 0.1); }
    .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #aaa; }

    /* Grid Layout */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 30px;
    }

    /* Card Design */
    .product-card {
      background: #fff;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #f0f0f0;
      position: relative;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.08);
      border-color: transparent;
    }

    /* Image Area */
    .card-image {
      width: 100%; height: 260px;
      position: relative;
      background: #f9f9f9;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .card-image img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-card:hover .card-image img { transform: scale(1.08); }

    /* Overlay Button */
    .card-overlay {
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.2);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: 0.3s;
    }
    .product-card:hover .card-overlay { opacity: 1; }
    
    .btn-view {
      background: #fff; color: var(--text-dark);
      border: none; padding: 10px 20px;
      border-radius: 30px; font-weight: 600;
      transform: translateY(20px); transition: 0.3s;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    .product-card:hover .btn-view { transform: translateY(0); }
    .btn-view:hover { background: var(--primary); color: #fff; }

    /* Badge */
    .badge {
      position: absolute; top: 10px; left: 10px;
      padding: 4px 10px; border-radius: 4px;
      font-size: 0.75rem; font-weight: 700; color: #fff;
      z-index: 2;
    }
    .badge.hot { background: #ff3f34; }

    /* Info Area */
    .card-info { padding: 15px; }
    
    .product-name {
      font-size: 1rem; color: var(--text-dark); margin: 0 0 8px;
      font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }

    .price-row { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
    .current-price { font-size: 1.1rem; color: var(--primary); font-weight: 700; }
    .old-price { font-size: 0.9rem; color: #b2bec3; text-decoration: line-through; }

    .meta-row {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.85rem; color: var(--text-gray);
      border-top: 1px solid #f0f0f0; padding-top: 10px;
    }
    .rating { font-size: 0.8rem; }

    /* Loading */
    .loading-container { text-align: center; padding: 50px; color: var(--text-gray); }
    .spinner {
      width: 40px; height: 40px; border: 4px solid #eee; border-top-color: var(--primary);
      border-radius: 50%; margin: 0 auto 15px; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Responsive */
    @media (max-width: 768px) {
      .page-header { flex-direction: column; align-items: flex-start; gap: 15px; }
      .search-bar { width: 100%; }
      .product-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
      .card-image { height: 180px; }
      .btn-view { display: none; } /* Mobile không cần hover button */
    }
  `}</style>
);

export default ListProducts_SP;