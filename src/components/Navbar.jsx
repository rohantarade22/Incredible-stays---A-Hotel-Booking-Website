import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser, FiMoon, FiSun, FiMenu, FiX, FiHeart } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/hotels", label: "Hotels" },
  { to: "/offers", label: "Offers" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { darkMode, toggleDarkMode, wishlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const isTransparent = isHome && !scrolled && !menuOpen && !searchOpen;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/hotels?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className={`is-navbar ${isTransparent ? "is-navbar--transparent" : "is-navbar--solid"}`}>
      <div className="container-custom is-navbar__inner">
        <NavLink to="/" className="is-navbar__logo">
          <span className="is-navbar__logo-mark">IS</span>
          <span className="is-navbar__logo-text font-display">Incredible Stays</span>
        </NavLink>

        <nav className={`is-navbar__links ${menuOpen ? "is-navbar__links--open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `is-navbar__link ${isActive ? "is-navbar__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
              {l.to === "/wishlist" && wishlist.length > 0 && (
                <span className="is-navbar__count">{wishlist.length}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="is-navbar__actions">
          <button className="is-navbar__icon-btn" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
            <FiSearch />
          </button>
          <button className="is-navbar__icon-btn" aria-label="Toggle dark mode" onClick={toggleDarkMode}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <NavLink to="/wishlist" className="is-navbar__icon-btn is-navbar__icon-btn--mobile-hide" aria-label="Wishlist">
            <FiHeart />
          </NavLink>
          <button className="is-navbar__icon-btn is-navbar__icon-btn--mobile-hide" aria-label="Account">
            <FiUser />
          </button>
          <button className="is-navbar__icon-btn is-navbar__menu-toggle" aria-label="Menu" onClick={() => setMenuOpen((s) => !s)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="is-navbar__search-panel animate-fade-up">
          <form className="container-custom is-navbar__search-form" onSubmit={handleSearch}>
            <FiSearch />
            <input
              autoFocus
              type="text"
              placeholder="Search by city, hotel name or destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn-gradient">Search</button>
          </form>
        </div>
      )}
    </header>
  );
}
