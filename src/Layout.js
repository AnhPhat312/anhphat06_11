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
                  Đăng nhập / Đăng ký
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
              SNEAKER<span className="dot">.</span>
            </h3>
            <p className="footer-desc">
              Nơi đam mê cất bước. Chúng tôi cam kết mang đến những đôi giày
              chính hãng với chất lượng và dịch vụ tốt nhất thị trường.
            </p>
            <div className="social-links">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">TT</a>
              <a href="#">YT</a>
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