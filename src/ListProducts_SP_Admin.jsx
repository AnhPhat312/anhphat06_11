import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const ListProducts_SP_Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch dữ liệu
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false }); // Mới nhất lên đầu
      
    if (error) console.error("Lỗi:", error.message);
    else setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Xử lý xóa
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Bạn có chắc muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) alert("Lỗi khi xóa: " + error.message);
      else {
        // Cập nhật lại state mà không cần gọi API lại
        setProducts(products.filter((p) => p.id !== id));
      }
    }
  };

  // Lọc sản phẩm theo tìm kiếm
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* --- HEADER & TOOLBAR --- */}
      <div className="admin-header">
        <div>
          <h2 className="page-title">Quản lý sản phẩm</h2>
          <p className="page-subtitle">Quản lý kho hàng và danh sách sản phẩm của bạn</p>
        </div>
        <button className="btn-add" onClick={() => navigate("/admin/edit/new")}>
          <span className="icon">＋</span> Thêm sản phẩm mới
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="stats">
          Tổng số: <strong>{filteredProducts.length}</strong> sản phẩm
        </div>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">⏳ Đang tải dữ liệu...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">❌ Không tìm thấy sản phẩm nào.</div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th width="100">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>Kho hàng</th>
                <th className="text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="img-wrapper">
                      <img 
                        src={p.image_url} 
                        alt={p.name} 
                        onError={(e) => e.target.src = 'https://via.placeholder.com/60?text=No+Img'}
                      />
                    </div>
                  </td>
                  <td className="name-col">
                    <strong>{p.name}</strong>
                  </td>
                  <td className="price-col">
                    {p.price?.toLocaleString('vi-VN')} ₫
                  </td>
                  <td>
                    <span className={`stock-badge ${p.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                      {p.stock > 0 ? `Còn ${p.stock}` : 'Hết hàng'}
                    </span>
                  </td>
                  <td className="action-col">
                    <button
                      className="btn-icon edit"
                      onClick={() => navigate(`/admin/edit/${p.id}`)}
                      title="Chỉnh sửa"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDelete(p.id)}
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AdminStyle />
    </div>
  );
};

// CSS Styles
const AdminStyle = () => (
  <style>{`
    :root {
      --bg-dark: #1e272e;
      --card-bg: #2d3436;
      --text-main: #ecf0f1;
      --text-sub: #b2bec3;
      --primary: #ff3f34; /* Màu đỏ chủ đạo */
      --border: #485460;
      --hover-row: #3d4a53;
    }

    .admin-container {
      padding: 30px;
      background-color: var(--bg-dark);
      min-height: 100vh;
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
    }

    /* Header */
    .admin-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 25px;
    }
    .page-title { margin: 0; font-size: 24px; font-weight: 700; }
    .page-subtitle { margin: 5px 0 0; color: var(--text-sub); font-size: 14px; }

    /* Button Add */
    .btn-add {
      background: var(--primary);
      color: white; border: none; padding: 10px 20px;
      border-radius: 8px; font-weight: 600; cursor: pointer;
      display: flex; align-items: center; gap: 8px;
      box-shadow: 0 4px 12px rgba(255, 63, 52, 0.3);
      transition: all 0.2s;
    }
    .btn-add:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255, 63, 52, 0.5); }

    /* Toolbar Search */
    .toolbar {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--card-bg); padding: 15px 20px;
      border-radius: 12px 12px 0 0; border-bottom: 1px solid var(--border);
    }
    .search-box {
      position: relative; width: 300px;
    }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); opacity: 0.5; }
    .search-box input {
      width: 100%; padding: 10px 10px 10px 35px;
      border-radius: 6px; border: 1px solid var(--border);
      background: var(--bg-dark); color: white; outline: none;
    }
    .search-box input:focus { border-color: var(--primary); }

    /* Table Wrapper */
    .table-wrapper {
      background: var(--card-bg);
      border-radius: 0 0 12px 12px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    }

    /* Custom Table */
    .custom-table {
      width: 100%; border-collapse: collapse; text-align: left;
    }
    .custom-table th {
      background: #353b48; padding: 15px;
      font-weight: 600; color: var(--text-sub); text-transform: uppercase; font-size: 12px;
    }
    .custom-table td {
      padding: 15px; border-bottom: 1px solid var(--border); vertical-align: middle;
    }
    .custom-table tr:last-child td { border-bottom: none; }
    .custom-table tr:hover { background-color: var(--hover-row); }

    /* Column Styles */
    .img-wrapper img {
      width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border);
    }
    .name-col { font-size: 15px; }
    .price-col { color: #2ecc71; font-weight: 600; font-family: monospace; font-size: 15px; }
    .id-col { color: var(--text-sub); font-size: 13px; }

    /* Badge Stock */
    .stock-badge {
      padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
    }
    .in-stock { background: rgba(46, 204, 113, 0.15); color: #2ecc71; }
    .out-stock { background: rgba(231, 76, 60, 0.15); color: #e74c3c; }

    /* Actions */
    .action-col { text-align: right; }
    .btn-icon {
      background: none; border: none; cursor: pointer;
      font-size: 18px; padding: 8px; border-radius: 6px;
      transition: 0.2s; margin-left: 5px;
    }
    .btn-icon.edit:hover { background: rgba(52, 152, 219, 0.2); }
    .btn-icon.delete:hover { background: rgba(231, 76, 60, 0.2); }

    /* States */
    .loading-state, .empty-state {
      padding: 50px; text-align: center; color: var(--text-sub);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .admin-header { flex-direction: column; gap: 15px; align-items: flex-start; }
      .toolbar { flex-direction: column; gap: 10px; align-items: stretch; }
      .search-box { width: 100%; }
      .custom-table th:nth-child(1), 
      .custom-table td:nth-child(1) { display: none; } /* Hide ID on mobile */
    }
  `}</style>
);

export default ListProducts_SP_Admin;