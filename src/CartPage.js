// src/CartPage.js
import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
// Đã xóa import supabase vì không sử dụng trực tiếp ở đây để code gọn hơn

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();

  // Hàm format tiền tệ (Đã bỏ type :number của TS)
  const formatMoney = (amount) => {
    return amount ? amount.toLocaleString("vi-VN") : "0";
  };

  // --- TRƯỜNG HỢP GIỎ HÀNG TRỐNG ---
  if (!cartItems || cartItems.length === 0)
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-icon">🛒</div>
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Có vẻ như bạn chưa thêm đôi giày nào vào đây cả.</p>
        <button onClick={() => navigate("/listproduct_sp")} className="btn-secondary">
          ⬅ Quay lại mua sắm
        </button>
        <StyleSheet />
      </div>
    );

  // --- TRƯỜNG HỢP CÓ SẢN PHẨM ---
  return (
    <div className="cart-page-wrapper">
      <div className="cart-header">
        <h2>Giỏ hàng <span>({cartItems.length} sản phẩm)</span></h2>
      </div>

      <div className="cart-layout">
        {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
        <div className="cart-items-section">
          {cartItems.map((item) => {
            // Kiểm tra an toàn để tránh lỗi nếu dữ liệu sản phẩm bị thiếu
            if (!item || !item.product) return null;

            return (
              <div key={item.product.id} className="cart-item-card">
                {/* Ảnh sản phẩm */}
                <div 
                  className="item-image" 
                  onClick={() => navigate(`/detail/${item.product.id}`)}
                >
                  <img
                    // Fallback: Ưu tiên image_url, nếu không có thì dùng image
                    src={item.product.image_url || item.product.image || 'https://via.placeholder.com/150'}
                    alt={item.product.name}
                  />
                </div>

                {/* Thông tin chi tiết */}
                <div className="item-details">
                  <div className="item-info-top">
                    <h4 onClick={() => navigate(`/detail/${item.product.id}`)}>
                      {/* Fallback: Ưu tiên name, nếu không có thì dùng title */}
                      {item.product.name || item.product.title}
                    </h4>
                    <span className="item-category">
                      {item.product.category || 'Giày hiệu'}
                    </span>
                  </div>
                  
                  <div className="item-actions-mobile">
                     <div className="item-price">
                        {formatMoney(item.product.price)} đ
                     </div>
                     
                     <div className="quantity-control">
                        <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.product.id)}>+</button>
                     </div>
                  </div>
                </div>

                {/* Tổng tiền item & Nút xóa (Desktop) */}
                <div className="item-right">
                  <div className="item-total-price">
                    {formatMoney(item.product.price * item.quantity)} đ
                  </div>
                  <button 
                    className="btn-remove"
                    onClick={() => removeFromCart(item.product.id)}
                    title="Xóa sản phẩm"
                  >
                    {/* Icon thùng rác SVG */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CỘT PHẢI: TỔNG KẾT & THANH TOÁN */}
        <div className="cart-summary-section">
          <div className="summary-card">
            <h3>Tóm tắt đơn hàng</h3>
            
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{formatMoney(totalPrice)} đ</span>
            </div>
            
            <div className="summary-row">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Tổng cộng</span>
              <span className="total-price">{formatMoney(totalPrice)} đ</span>
            </div>

            <button className="btn-checkout">Thanh toán ngay</button>
            
            <button onClick={() => navigate("/listproduct_sp")} className="btn-continue">
              Tiếp tục mua hàng
            </button>
          </div>
        </div>
      </div>
      
      {/* Component chứa CSS */}
      <StyleSheet />
    </div>
  );
}

// --- CSS NẰM GỌN TRONG COMPONENT NÀY ---
const StyleSheet = () => (
  <style>{`
    /* -- RESET & FONTS -- */
    .cart-page-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #111;
      background-color: #fff;
      min-height: 100vh;
    }

    /* -- EMPTY STATE -- */
    .empty-cart-container {
      text-align: center;
      padding-top: 80px;
    }
    .empty-cart-icon {
      font-size: 80px;
      margin-bottom: 20px;
      opacity: 0.5;
    }
    .empty-cart-container h3 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .empty-cart-container p {
      color: #757575;
      margin-bottom: 30px;
    }

    /* -- HEADER -- */
    .cart-header {
      margin-bottom: 30px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 20px;
    }
    .cart-header h2 {
      font-size: 28px;
      font-weight: 700;
    }
    .cart-header h2 span {
      font-weight: 400;
      color: #757575;
      font-size: 20px;
      margin-left: 10px;
    }

    /* -- LAYOUT GRID 2 CỘT -- */
    .cart-layout {
      display: grid;
      grid-template-columns: 2fr 1fr; /* Trái 2 phần, Phải 1 phần */
      gap: 40px;
    }

    /* -- ITEM CARD -- */
    .cart-item-card {
      display: flex;
      padding: 24px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    
    .item-image {
      width: 120px;
      height: 120px;
      background: #f5f5f5;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      flex-shrink: 0;
    }
    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
    }

    .item-details {
      flex: 1;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .item-info-top h4 {
      font-size: 18px;
      margin: 0 0 5px;
      cursor: pointer;
    }
    .item-info-top h4:hover { text-decoration: underline; }
    
    .item-category {
      color: #757575;
      font-size: 14px;
    }

    .item-price {
      font-weight: 500;
      color: #111;
      margin-bottom: 10px;
    }

    /* -- QUANTITY CONTROL -- */
    .quantity-control {
      display: inline-flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .quantity-control button {
      width: 32px;
      height: 32px;
      background: #fff;
      border: none;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .quantity-control button:hover { background: #f0f0f0; }
    .quantity-control span {
      width: 40px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }

    /* -- ITEM RIGHT (Total & Delete) -- */
    .item-right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }
    .item-total-price {
      font-size: 18px;
      font-weight: 700;
      color: #111;
    }
    .btn-remove {
      background: none;
      border: none;
      color: #757575;
      cursor: pointer;
      padding: 8px;
      transition: color 0.2s;
    }
    .btn-remove:hover { color: #d32f2f; background: #fff0f0; border-radius: 50%; }

    /* -- SUMMARY BOX -- */
    .summary-card {
      background: #f9f9f9;
      padding: 24px;
      border-radius: 12px;
      position: sticky;
      top: 20px;
    }
    .summary-card h3 {
      margin-top: 0;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      color: #555;
    }
    .summary-divider {
      height: 1px;
      background: #e5e5e5;
      margin: 20px 0;
    }
    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 24px;
      color: #111;
    }
    
    /* -- BUTTONS -- */
    .btn-checkout {
      width: 100%;
      background: #111;
      color: #fff;
      padding: 16px;
      border: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 12px;
      transition: transform 0.2s, background 0.2s;
    }
    .btn-checkout:hover {
      background: #333;
      transform: translateY(-2px);
    }
    
    .btn-continue, .btn-secondary {
      width: 100%;
      background: #fff;
      color: #111;
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-continue:hover, .btn-secondary:hover {
      background: #f5f5f5;
      border-color: #111;
    }

    /* -- MOBILE RESPONSIVE -- */
    @media (max-width: 768px) {
      .cart-layout {
        grid-template-columns: 1fr; /* Xếp chồng 1 cột */
        gap: 20px;
      }
      
      .cart-item-card {
        flex-wrap: wrap;
        position: relative;
      }
      
      .item-image {
        width: 80px;
        height: 80px;
      }
      
      .item-details {
        padding-right: 0;
      }
      
      .item-actions-mobile {
        margin-top: 10px;
      }

      .item-right {
        position: absolute;
        top: 24px;
        right: 0;
        flex-direction: row-reverse;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        pointer-events: none; /* Để click xuyên qua vùng trống */
      }
      .item-right button { pointer-events: auto; }
      .item-total-price { display: none; } /* Ẩn tổng tiền item trên mobile cho gọn */
    }
  `}</style>
);