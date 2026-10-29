
import { useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";

const links = [
  { label: "Discover", href: "#home" },
  { label: "Collections", href: "#categories" },
  { label: "Trending", href: "#trending" },
  { label: "AI Stylist", href: "#stylist" },
  { label: "About", href: "#about" },
{ label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-shell">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Sparkles size={20} strokeWidth={1.7} />
          </span>

          <span>
            AI <span className="brand-serif">MUSE</span>
          </span>
        </a>

        <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {links.map((link) => (
            <a
              href={link.href}
              key={link.label}
              onClick={closeMenu}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#stylist"
            className="nav-mobile-cta"
            onClick={closeMenu}
          >
            Find my style <ArrowUpRight size={17} />
          </a>
        </div>

        <a href="#stylist" className="nav-cta">
          Find my style <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
    </header>
  );
}
