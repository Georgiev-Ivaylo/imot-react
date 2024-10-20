import { Link, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();

  return (
    <header className="nav-grid">
      <Link
        to="/"
        className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
      >
        Home
      </Link>

      <Link
        to="/estates?order_by=price"
        className={`nav-btn ${
          location.pathname === "/estates" ? "active" : ""
        }`}
      >
        Estates
      </Link>
    </header>
  );
};

export default MainNavigation;
