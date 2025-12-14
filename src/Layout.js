import "./css/layout.css";
import anhlogo from "./assets/images/banner (2).png";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // --- PHẦN SỬA LỖI QUAN TRỌNG ---
  useEffect(() => {
    // 1. Hàm kiểm tra User từ LocalStorage
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log("Đã đăng nhập:", parsedUser.username, "| Role:", parsedUser.role);
        } catch (e) {
          console.error("Lỗi đọc dữ liệu user", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser(); // Chạy ngay lập tức

    // 2. Xử lý sự kiện cuộn trang
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);

  }, [location.pathname]); // <--- THÊM CÁI NÀY: Chạy lại mỗi khi đổi trang

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Kiểm tra quyền Admin an toàn (không phân biệt hoa thường)
  const isAdmin = user?.role && user.role.toLowerCase() === "admin";

  return (
    <div className="app-root">
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          
          {/* --- TẦNG 1: TOP BAR --- */}
          <div className="header-top-bar">
            <div className="top-left">
               {/* Giữ chỗ cho các link phụ nếu cần */}
            </div>

            <div className="top-right">
              {user ? (
                <div className="user-info">
                  {/* Link tới trang thông tin cá nhân */}
                  <Link to="/profile" className="user-name-link">
                    Xin chào, <strong>{user.username}</strong>
                  </Link>
                  <button onClick={handleLogout} className="logout-link">
                    (Đăng xuất)
                  </button>
                </div>
              ) : (
                <Link to="/login" className="login-link">
                  Đăng nhập 
                </Link>
              )}
            </div>
          </div>

          {/* --- TẦNG 2: MAIN BAR --- */}
          <div className="header-main-bar">
            {/* Logo */}
            <div className="header-col-left">
              <Link to="/" className="logo-wrapper">
                <img src={anhlogo} alt="Logo" />
              </Link>
            </div>

            {/* MENU CHÍNH */}
            <div className="header-col-center">
              <nav className={`main-nav ${isMenuOpen ? "mobile-active" : ""}`}>
                
                {/* --- NÚT ADMIN (Đã sửa logic hiển thị) --- */}
                {isAdmin && (
                  <Link
                    to="/admin/products"
                    className={`nav-item admin-link ${isActive("/admin/products")}`}
                  >
                  ⚙️ QUẢN TRỊ
                  </Link>
                )}

                <Link
                  to="/topproduct_sp"
                  className={`nav-item highlight ${isActive("/topproduct_sp")}`}
                >
                  Top Collection 🔥
                </Link>
                <Link
                  to="/listproduct_sp"
                  className={`nav-item ${isActive("/listproduct_sp")}`}
                >
                  Sản phẩm
                </Link>
                <Link to="/chat" className={`nav-item ${isActive("/chat")}`}>
                  AI Chat 🤖
                </Link>
                <Link to="/about" className={`nav-item ${isActive("/about")}`}>
                  Thông tin
                </Link>

                <button
                  className="close-menu"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ×
                </button>
              </nav>
            </div>

            {/* Search & Cart */}
            <div className="header-col-right">
              <div className="search-box-stylish">
                <input type="text" placeholder="Tìm sản phẩm..." />
                <button>🔍</button>
              </div>

              <Link to="/cart" className="cart-btn-stylish">
                <span className="cart-icon">🛒</span>
                {totalQuantity > 0 && (
                  <span className="cart-count">{totalQuantity}</span>
                )}
              </Link>

              <button
                className="mobile-toggle"
                onClick={() => setIsMenuOpen(true)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      {/* FOOTER MỚI ĐẸP */}
      <footer className="site-footer">
        <div className="footer-container">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="footer-col">
            <h3 className="footer-logo">
              SNEAKER AP<span className="dot">.</span>
            </h3>
            <p className="footer-desc">
              Nơi đam mê cất bước. Chúng tôi cam kết mang đến những đôi giày
              chính hãng với chất lượng và dịch vụ tốt nhất thị trường.
            </p>
            <div className="social-links">
                {/* Facebook */}
                <a href="#" className="social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="#" className="social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* TikTok */}
                <a href="#" className="social-btn" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9v12z"></path>
                  </svg>
                </a>

                {/* YouTube */}
                <a href="#" className="social-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff"></polygon>
                  </svg>
                </a>
              </div>
          </div>

          {/* Cột 2: Đường dẫn nhanh */}
          <div className="footer-col">
            <h4>Khám Phá</h4>
            <ul className="footer-links">
              <li><Link to="/about">Về chúng tôi</Link></li>
              <li><Link to="/listproduct_sp">Sản phẩm mới</Link></li>
              <li><Link to="/promotions">Khuyến mãi Hot</Link></li>
              <li><Link to="/chat">AI Tư vấn</Link></li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ & Đăng ký */}
          <div className="footer-col">
            <h4>Hỗ Trợ & Liên Hệ</h4>
            <ul className="footer-links">
              <li>📍 111/2 Đường số 1</li>
              <li>📞 0792331205</li>
              <li>✉️ support@sneakerstore.com</li>
            </ul>

            <div className="newsletter-box">
              <input type="email" placeholder="Nhập email..." />
              <button>➜</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Sneaker Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;