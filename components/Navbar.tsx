"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="9" cy="9" r="3.5"/>
      <line x1="9" y1="1.5" x2="9" y2="3"/>
      <line x1="9" y1="15" x2="9" y2="16.5"/>
      <line x1="1.5" y1="9" x2="3" y2="9"/>
      <line x1="15" y1="9" x2="16.5" y2="9"/>
      <line x1="3.6" y1="3.6" x2="4.7" y2="4.7"/>
      <line x1="13.3" y1="13.3" x2="14.4" y2="14.4"/>
      <line x1="14.4" y1="3.6" x2="13.3" y2="4.7"/>
      <line x1="4.7" y1="13.3" x2="3.6" y2="14.4"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 10.5A7 7 0 0 1 5.5 2.5a7.002 7.002 0 0 0 8 8z"/>
    </svg>
  );
}

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("shema-theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <header
      className="sticky top-0 z-50 navbar-glass"
      style={{
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none">
          {/* Leaf mark */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1 C11 4 12 8 9 11 C7.5 12.5 4.5 12.5 3 11 C0 8 2 4 7 1Z"
                fill="white"
                fillOpacity="0.9"
              />
              <path
                d="M7 2 L7 11"
                stroke="white"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeOpacity="0.5"
                strokeDasharray="1.5 2"
              />
            </svg>
          </div>
          <span
            className="text-sm font-bold tracking-[0.22em] uppercase"
            style={{
              color: "var(--txt-primary)",
              fontFamily: "var(--font-inter)",
              letterSpacing: "0.22em",
            }}
          >
            Shema
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Changer le thème"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--txt-secondary)",
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
