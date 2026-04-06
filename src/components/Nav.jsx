import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PROFILE } from "../data.js";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const links = [
    { to: "/home",    label: "Home" },
    { to: "/about",   label: "About" },
    { to: "/works",   label: "Works" },
    { to: "/history", label: "History" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <NavLink to="/" className="nav-logo">
          {PROFILE.displayName}
          <span className="nav-cursor" />
        </NavLink>
        <div className="nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => isActive ? "active" : ""}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mmenu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => isActive ? "active" : ""}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
