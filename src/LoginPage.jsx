import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Nếu bạn chưa có logo, code sẽ tự hiển thị Text Logo thay thế
import anhlogo1 from "./assets/images/keylogin.png"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Giả lập API call
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username, role: "admin" })
        );
        // alert("✅ Đăng nhập thành công!"); // Có thể bỏ alert cho mượt
        navigate("/");
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        
        {/* LOGO SECTION */}
        <div className="logo-section">
          <div className="logo-wrapper">
             {/* Fallback: Nếu ảnh lỗi hoặc chưa có, hiển thị icon */}
             <img src={anhlogo1} alt="Logo" className="app-logo" onError={(e) => e.target.style.display='none'} />
             <span className="logo-text">SneakerStore</span>
          </div>
          <h2 className="welcome-text">Chào mừng trở lại!</h2>
          <p className="sub-text">Vui lòng đăng nhập để tiếp tục mua sắm.</p>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Tên đăng nhập</label>
            <div className="input-field">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <input
                type="text"
                placeholder="Ví dụ: user123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <div className="input-field">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <div className="spinner"></div> : "Đăng nhập ngay"}
          </button>
        </form>

        {/* SOCIAL LOGIN */}
        <div className="divider">
          <span>Hoặc đăng nhập với</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
            <span>Google</span>
          </button>

          <button className="social-btn facebook">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook" />
            <span>Facebook</span>
          </button>
        </div>
        
        <p className="register-cta">
          Bạn chưa có tài khoản? <a href="#">Đăng ký miễn phí</a>
        </p>
      </div>

      <StyleSheet />
    </div>
  );
};

const StyleSheet = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
      --primary: #111;
      --accent: #ff3f34; /* Màu đỏ chủ đạo giống trang detail */
      --bg-dark: #1e272e;
      --text-gray: #7f8c8d;
      --border-color: #e2e6ea;
    }

    /* --- CONTAINER --- */
    .login-page-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--bg-dark); /* Nền tối đồng bộ */
      background-image: 
        radial-gradient(circle at top right, #353b48 0%, transparent 40%),
        radial-gradient(circle at bottom left, #2f3640 0%, transparent 40%);
      font-family: 'Inter', sans-serif;
      padding: 20px;
    }

    /* --- LOGIN CARD --- */
    .login-card {
      background: #fff;
      width: 100%;
      max-width: 440px;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* --- LOGO SECTION --- */
    .logo-section { text-align: center; margin-bottom: 30px; }
    
    .logo-wrapper { 
      display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px;
    }
    
    .app-logo { width: 40px; height: 40px; object-fit: contain; }
    
    .logo-text { font-weight: 800; font-size: 1.5rem; color: var(--primary); letter-spacing: -0.5px; }

    .welcome-text { font-size: 1.5rem; font-weight: 700; color: #2d3436; margin: 0 0 5px; }
    .sub-text { color: var(--text-gray); font-size: 0.95rem; }

    /* --- INPUT FIELDS --- */
    .input-group { margin-bottom: 20px; text-align: left; }
    .input-group label { display: block; font-size: 0.9rem; font-weight: 600; color: #2d3436; margin-bottom: 8px; }

    .input-field {
      position: relative;
      display: flex; align-items: center;
    }
    
    .input-field svg {
      position: absolute; left: 14px;
      color: #b2bec3; transition: 0.3s;
    }

    .input-field input {
      width: 100%;
      padding: 14px 14px 14px 45px; /* Chừa chỗ cho icon */
      border: 2px solid var(--border-color);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fdfdfd;
      color: #2d3436;
    }

    .input-field input:focus {
      border-color: var(--primary);
      background: #fff;
      outline: none;
    }
    .input-field input:focus + svg, 
    .input-field:focus-within svg { color: var(--primary); }

    /* --- OPTIONS (Checkbox & Forgot PW) --- */
    .form-options {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 25px; font-size: 0.9rem;
    }

    .checkbox-container {
      display: flex; align-items: center; cursor: pointer; color: var(--text-gray);
    }
    .checkbox-container input { margin-right: 8px; cursor: pointer; accent-color: var(--primary); }
    
    .forgot-password { color: var(--primary); font-weight: 600; text-decoration: none; transition: 0.2s; }
    .forgot-password:hover { text-decoration: underline; color: var(--accent); }

    /* --- BUTTON SUBMIT --- */
    .btn-submit {
      width: 100%;
      padding: 14px;
      background: var(--primary);
      color: #fff;
      border: none;
      border-radius: 30px; /* Bo tròn giống detail page */
      font-size: 1rem; font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
      display: flex; justify-content: center; align-items: center;
    }

    .btn-submit:hover {
      background: #333;
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
    
    .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

    /* --- SPINNER LOADING --- */
    .spinner {
      width: 20px; height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top: 2px solid #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

    /* --- DIVIDER --- */
    .divider {
      position: relative; text-align: center; margin: 30px 0 20px;
    }
    .divider::before {
      content: ""; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: #eee;
    }
    .divider span {
      position: relative; background: #fff; padding: 0 15px; color: var(--text-gray); font-size: 0.85rem;
    }

    /* --- SOCIAL LOGIN --- */
    .social-login { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
    
    .social-btn {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 12px;
      background: #fff; border: 1px solid var(--border-color);
      border-radius: 12px;
      cursor: pointer; transition: 0.2s;
      font-weight: 500; color: #2d3436; font-size: 0.95rem;
    }
    .social-btn img { width: 20px; height: 20px; }
    
    .social-btn:hover { background: #f8f9fa; border-color: #cbd5e0; }
    
    /* --- REGISTER LINK --- */
    .register-cta { text-align: center; font-size: 0.95rem; color: var(--text-gray); }
    .register-cta a { color: var(--primary); font-weight: 700; text-decoration: none; margin-left: 5px; }
    .register-cta a:hover { text-decoration: underline; color: var(--accent); }

    /* --- RESPONSIVE --- */
    @media (max-width: 480px) {
      .login-card { padding: 30px 20px; }
      .social-login { grid-template-columns: 1fr; }
    }
  `}</style>
);

export default LoginPage;