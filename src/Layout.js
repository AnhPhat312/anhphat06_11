import "./assets/css/layout.css";
import logo from "./assets/images/Ten-truong-do-1000x159.png";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* Header */}
      <header>
        <div id="header" className="header">
          <div id="banner" className="banner">
            <div id="divmenutrai">
              <nav id="menutrai">
                <ul className="menutrai" style={{ width: "250px" }}>
                  <li>
                    <a href="/" className="menutrai">
                      TRANG CHU
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/trang1">
                      EGOV
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/trang2">
                      SINH VIEN
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/listsanpham">
                      LIST SAN PHAM
                    </a>
                  </li>
                  <li>
                    <a className="menutrai" href="/listproduct">
                      LISTPRODUCT
                    </a>
                  </li>
                  <li>
                    <a class="menutrai" href="/admin/products">
                      QUAN TRI
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div style={{ width: "1000px" }}>
              <img src={logo} width="500" height="80" alt="Logo" />
            </div>
            <div>Tim kiem</div>
          </div>
          <div id="menubar" className="menubar"></div>
        </div>
      </header>

      {/* Nội dung trang con */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <div
          style={{ textAlign: "center", padding: "10px", background: "#eee" }}
        >
          &copy; 2025 - Trường đại học XYZ
        </div>
      </footer>
    </>
  );
};

export default Layout;
