import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import Listproduct from "./Listproduct";

// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import ProductDetail from "./ProductDetail";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";

const App = () => {
  //return <Layout />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListProducts_SP />} />
          <Route path="trang1" element={<Trang1 />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="trang2" element={<Trang2 />} />
          <Route path="Listproduct" element={<Listproduct />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          {/* <Route path="detail/:id" element={<ProductDetail />} /> */}

          {/* ✅ Trang đăng nhập (nằm trong Layout) */}
          <Route path="login" element={<LoginPage />} />

          {/* ✅ Trang đăng xuất */}
          <Route path="logout" element={<LogoutPage />} />
        </Route>
        {/* ✅ Trang quản trị (nằm trong Layout, chỉ Admin truy cập) */}
        <Route
          path="admin/products"
          element={
            <ProtectedRoute>
              <ListProducts_SP_Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
