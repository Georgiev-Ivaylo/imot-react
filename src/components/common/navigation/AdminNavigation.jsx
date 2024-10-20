import { Link, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const location = useLocation();

  return (
    <header className="side-nav-grid">
      <Link
        to="/admin"
        className={`side-nav-btn ${
          location.pathname === "/admin" ? "active" : ""
        }`}
      >
        Dashboard
      </Link>

      <Link
        to="/admin/estates?order_by=price"
        className={`side-nav-btn ${
          location.pathname === "/admin/estates" ? "active" : ""
        }`}
      >
        Estates
      </Link>

      <Link
        to="/admin/account?order_by=price"
        className={`side-nav-btn align-bottom ${
          location.pathname === "/admin/account" ? "active" : ""
        }`}
      >
        Accountt
      </Link>
    </header>
  );
};

export default AdminNavigation;
