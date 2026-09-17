import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { profile } from "../data/profile";
import Magnetic from "./Magnetic";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "DSA", href: "#dsa" },
  { label: "GitHub", href: "#github" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-content mx-auto px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Primary">
        <Link to="/#home" data-cursor="link" className="font-bold tracking-tight text-ink text-lg focus-ring rounded">
          SS<span className="text-accent">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-cursor="link"
                className="px-3 py-2 text-sm font-medium text-muted hover:text-ink transition-colors rounded-full focus-ring"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            data-cursor="button"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink hover:bg-surface-2 transition-colors focus-ring"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Magnetic as="span" className="hidden sm:inline-block rounded-full">
            <a
              href={profile.resumeUrl}
              download
              data-cursor="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink text-bg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity focus-ring"
            >
              <Download size={14} /> Resume
            </a>
          </Magnetic>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            data-cursor="button"
            className="lg:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center text-ink focus-ring"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-border">
          <ul className="max-w-content mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-ink hover:text-accent transition-colors rounded-lg focus-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
