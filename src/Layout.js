import "./css/layout.css";
import anhlogo from "./assets/images/banner (2).png";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "./CartContext";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="theme-black-red">
      {/* Toàn bộ header đặt trong một div có chiều rộng 100% */}
      <div className="full-width-header">
        <header className="header-container">
          {/* Top Header - Cùng hàng với logo và search */}
          <div className="top-header">
            <div className="container-full">
              <div className="top-header-content">
                <div className="top-links-left">
                  <ul className="top-links">
                    <li>
                      <Link to="/">TRANG CHỦ</Link>
                    </li>
                    <li>
                      <Link to="/trang1">EGOV</Link>
                    </li>
                    <li>
                      <Link to="/admin/products">QUẢN TRỊ</Link>
                    </li>
                  </ul>
                </div>
                
                {/* User info ở bên phải */}
                <div className="top-links-right">
                  {user ? (
                    <div className="user-info">
                      <span className="user-greeting">
                        <i className="user-icon">👤</i> {user.username}
                      </span>
                      <button className="logout-btn" onClick={handleLogout}>
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" className="login-link">
                      Đăng nhập
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Header - Logo, Search, Cart */}
          <div className="main-header">
            <div className="container-full">
              <div className="header-content">
                {/* Logo lớn hơn */}
                <div className="logo-container">
                  <Link to="/">
                    <img src={anhlogo} alt="Logo" className="logo-large" />
                  </Link>
                </div>

                {/* Search bar */}
                <div className="search-container-large">
                  <div className="search-box">
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm sản phẩm..." 
                      className="search-input"
                    />
                    <button className="search-btn">
                      <i className="search-icon">🔍</i>
                    </button>
                  </div>
                </div>

                {/* Cart và menu mobile */}
                <div className="header-actions">
                  <Link to="/cart" className="cart-btn">
                    <div className="cart-icon-container">
                      <i className="cart-icon">🛒</i>
                      {totalQuantity > 0 && (
                        <span className="cart-badge">{totalQuantity}</span>
                      )}
                    </div>
                  </Link>
                  
                  <button className="mobile-menu-btn" onClick={toggleMenu}>
                    ☰
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className={`main-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
            <div className="container-full">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/chat" className="nav-link">
                    <i className="nav-icon">💬</i> Chat với AI
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu2" className="nav-link">
                    <i className="nav-icon">🔥</i> Sản phẩm nổi bật
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu3" className="nav-link">
                    <i className="nav-icon">🎮</i> Khuyến mãi
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu4" className="nav-link">
                    <i className="nav-icon">📱</i> Liên hệ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/menu5" className="nav-link">
                    <i className="nav-icon">ℹ️</i> Giới thiệu
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>

      {/* Main content vẫn giữ nguyên */}
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">Về chúng tôi</h3>
              <p className="footer-text">
                Chúng tôi cung cấp các giải pháp công nghệ hiện đại với chất lượng hàng đầu.
              </p>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">Liên kết nhanh</h3>
              <ul className="footer-links">
                <li><Link to="/">Trang chủ</Link></li>
                <li><Link to="/trang1">EGOV</Link></li>
                <li><Link to="/admin/products">Quản trị</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="footer-title">Liên hệ</h3>
              <p className="footer-text">
                Email: contact@example.com<br />
                Hotline: 1900 1234
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 Bản quyền thuộc về Công ty chúng tôi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;