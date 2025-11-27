import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// Giả định bạn vẫn giữ file ảnh logo ở đường dẫn này
import anhlogo from "./assets/images/banner (2).png";

// --- START: Component Layout Gộp Chung ---
const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const globalStyles = `
    /* --- CSS Gộp từ main.css --- */
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f0f2f5; 
        color: #333;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    /* --- HEADER / BANNER TOP --- */
    .header1 {
        background-color: #ffffff; 
        border-bottom: 1px solid #ddd;
    }

    .banner1 {
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        max-width: 1200px; 
        margin: 0 auto; 
        padding: 10px 20px;
    }

    #topleft .ul1 {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 20px;
    }

    #topleft .ul1 li a {
        color: #8c0000; 
        font-weight: bold;
        font-size: 0.85rem;
        padding: 5px;
        transition: color 0.2s;
    }

    #topleft .ul1 li a:hover {
        color: #e63946; 
    }

    /* LOGO */
    #logo img {
        max-width: 500px;
        height: auto;
        display: block; 
    }

    /* PHẦN TÌM KIẾM */
    #divtimkiem {
        font-size: 0.9rem;
        color: #666;
        text-align: right;
        width: 300px;
    }

    /* --- MENU BAR DƯỚI (MÀU ĐỎ) --- */
    .menubar {
        background-color: #a80000; 
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        max-width: 1200px;
        margin: 0 auto;
    }

    .menubar-left {
        display: flex;
        gap: 30px;
    }

    .menu-item {
        font-weight: 600;
        padding: 5px 0;
        transition: opacity 0.3s;
        color: white; 
    }

    .menu-item:hover {
        opacity: 0.8;
    }

    /* --- KHU VỰC USER/LOGIN (MENU BAR PHẢI) --- */
    .menubar-right {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .login-link {
        color: white;
        font-weight: 600;
        padding: 5px 10px;
        border: 1px solid white;
        border-radius: 4px;
        transition: background-color 0.2s, color 0.2s;
    }

    .login-link:hover {
        background-color: white;
        color: #a80000;
    }

    .username {
        color: white;
        font-weight: 600;
        margin-right: 5px;
    }

    .logout-btn {
        background-color: transparent;
        color: white;
        border: 1px solid white;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 0.9rem;
        transition: background-color 0.2s, color 0.2s;
    }

    .logout-btn:hover {
        background-color: #fff;
        color: #a80000;
    }

    /* --- CONTAINER NỘI DUNG CHÍNH --- */
    .container {
        max-width: 1200px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        min-height: 60vh;
    }

    /* --- FOOTER --- */
    footer {
        background-color: #333;
        color: white;
        text-align: center;
        margin-top: 30px;
    }
  `;

  return (
    <>
      {/* 1. Nhúng CSS vào thẻ <style> */}
      <style>{globalStyles}</style>

      <header>
        {/* Top Header: Logo, Menu Top, Tìm kiếm */}
        <div id="divheader" className="header1">
          <div id="banner" className="banner1">
            <div id="topleft">
              <ul className="ul1">
                <li>
                  <a href="/#">TRANG CHỦ</a>
                </li>
                <li>
                  <a href="/trang1">EGOV</a>
                </li>
                <li>
                  <a href="/admin/products">QUẢN TRỊ</a>
                </li>
              </ul>
            </div>
            <div id="logo" className="logo1">
              <img src={anhlogo} alt="Logo Banner" />
            </div>
            <div id="divtimkiem" style={{ width: "300px" }}>
              Phần tìm kiếm
            </div>
          </div>

          {/* Menu Bar Chính (Màu đỏ) */}
          <div id="menubar" className="menubar">
            <div className="menubar-left">
              <a href="/menu1" className="menu-item">
                Menu 1
              </a>
              <a href="/menu2" className="menu-item">
                Menu 2
              </a>
              <a href="/menu3" className="menu-item">
                Menu 3
              </a>
            </div>

            <div className="menubar-right">
              {user ? (
                <>
                  <span className="username">👤 {user.username}</span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <a href="/login" className="login-link">
                  Đăng nhập
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Container Nội dung chính (Outlet) */}
      <div id="container" className="container">
        <Outlet />
      </div>

      {/* Footer */}
      <footer>
        <p style={{ margin: 0, padding: "20px" }}>
          © 2025 Bản quyền thuộc về [Tên trang web của bạn]
        </p>
      </footer>
    </>
  );
};

export default Layout;
// --- END: Component Layout Gộp Chung ---
