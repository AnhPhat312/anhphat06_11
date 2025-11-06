// Sửa ngày 4/11/2025 - Giao diện mới theo phong cách Google / Facebook
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập xác thực
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: "admin", role: "admin" })
        );
        alert("✅ Đăng nhập thành công với quyền Admin!");
        navigate("/admin/products");
      } else if (username && password) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "user" })
        );
        alert("✅ Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[380px] text-center border border-gray-200">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Logo"
          className="w-12 h-12 mx-auto mb-3"
        />

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Đăng nhập vào tài khoản
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Sử dụng tài khoản của bạn để tiếp tục
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Bạn chưa có tài khoản?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Tạo tài khoản mới
            </a>
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">
              Đăng nhập Google
            </span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-700">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
