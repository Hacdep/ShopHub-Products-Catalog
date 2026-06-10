import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Shop</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/" className="nav-link">CATEGORY</Link>
          <Link to="/" className="nav-link">RATING</Link>
        </div>
      </div>
    </nav>
  );
}
