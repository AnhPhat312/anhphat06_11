// src/App.tsx
import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- CÁC COMPONENT CỦA BẠN ---
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import LoginPage from "./LoginPage";
// @ts-ignore
import LogoutPage from "./LogoutPage";
// @ts-ignore
import ProtectedRoute from "./ProtectedRoute";
// @ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
// @ts-ignore
import EditProduct from "./EditProduct";

import ChatPage from "./ChatPage";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import TopProducts_SP from "./TopProducts_SP"; // Đảm bảo component Bục Olympic nằm ở đây hoặc đổi tên import
// @ts-ignore
import About from "./About";
// @ts-ignore
import Home from "./Home";

// --- IMPORT MỚI CHO GIỎ HÀNG ---
import { CartProvider } from "./CartContext";
import CartPage from "./CartPage";

export default function App() {
  return (
    // ✅ 1. Bọc Provider ở ngoài cùng
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Trang chủ */}
            <Route index element={<Home />} />

            {/* ✅ 2. Giỏ Hàng */}
            <Route path="cart" element={<CartPage />} />

            {/* Các trang chức năng */}
            <Route path="chat" element={<ChatPage />} />
            <Route path="trang1" element={<Trang1 />} />
            <Route path="trang2" element={<Trang2 />} />
            
            {/* Chi tiết sản phẩm (lưu ý bạn đang có 2 route detail, nên thống nhất 1 cái) */}
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="detail/:id" element={<ProductDetail />} />

            <Route path="topproduct_sp" element={<TopProducts_SP />} />
            <Route path="listproduct_sp" element={<ListProducts_SP />} />
            
            <Route path="about" element={<About />} />
            <Route path="home" element={<Home />} />
            
            {/* Auth */}
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />

            {/* --- KHU VỰC ADMIN (Đã sửa lỗi) --- */}
            {/* Sửa <Routes> thành <Route> */}
            <Route 
              path="admin/products" 
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/admin/edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}