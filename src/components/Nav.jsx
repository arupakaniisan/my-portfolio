import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PROFILE } from "../data.js";

const NAV_NAME_STORAGE_KEY = "portfolio_hidden_display_name";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState(PROFILE.displayName);
  const [editingTitle, setEditingTitle] = useState(false);
  const [draftName, setDraftName] = useState(PROFILE.displayName);
  const titleInputRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const saved = window.localStorage.getItem(NAV_NAME_STORAGE_KEY);
    if (saved && saved.trim()) {
      setDisplayName(saved);
      setDraftName(saved);
    }
  }, []);

  useEffect(() => {
    if (!editingTitle) return;
    titleInputRef.current?.focus();
  }, [editingTitle]);

  const startEditingTitle = () => {
    setDraftName(displayName);
    setEditingTitle(true);
  };

  const commitEditingTitle = () => {
    const next = draftName.trim() || PROFILE.displayName;
    setDisplayName(next);
    setDraftName(next);
    setEditingTitle(false);
    window.localStorage.setItem(NAV_NAME_STORAGE_KEY, next);
  };

  const cancelEditingTitle = () => {
    setDraftName(displayName);
    setEditingTitle(false);
  };

  const links = [
    { to: "/home",    label: "Home" },
    { to: "/about",   label: "About" },
    { to: "/works",   label: "Works" },
    { to: "/home#contact", label: "Contact" },
    { to: "/history", label: "History" },
    { to: "/blog",    label: "Blog" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " solid" : ""}`}>
        <div className="nav-brand">
          <NavLink to="/" className="nav-logo" aria-label="Go to splash home">
          <img src="/arupaka.jpg" alt="arupaka icon" className="nav-logo-icon" />
          </NavLink>
          {editingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              className="nav-title-editor"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={commitEditingTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEditingTitle();
                if (e.key === "Escape") cancelEditingTitle();
              }}
              maxLength={40}
              aria-label="Edit display name"
            />
          ) : (
            <span className="nav-logo-text" onDoubleClick={startEditingTitle}>
              {displayName}
            </span>
          )}
        </div>
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
