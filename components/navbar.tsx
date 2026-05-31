"use client";

import { useEffect, useState } from "react";

interface NavbarProps {
  onNewSearch: () => void;
  showNewSearch: boolean;
}

export function Navbar({ onNewSearch, showNewSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 glass border-b border-border" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="group flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            if (showNewSearch) onNewSearch();
          }}
        >
          <span className="text-gold/60 group-hover:text-gold transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
          <span className="font-semibold tracking-wide text-foreground group-hover:text-gold transition-colors">
            XRECAP
          </span>
        </a>
        
        {/* Navigation */}
        <div className="flex items-center gap-8">
          {!showNewSearch && (
            <ul className="hidden md:flex items-center gap-8">
              <li>
                <a 
                  href="#how" 
                  className="relative text-sm text-muted hover:text-foreground transition-colors group"
                >
                  How it works
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="#features" 
                  className="relative text-sm text-muted hover:text-foreground transition-colors group"
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>
          )}
          
          {showNewSearch && (
            <button
              onClick={onNewSearch}
              className="group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gold border border-gold/30 rounded-xl hover:bg-gold/5 hover:border-gold/50 transition-all duration-300"
            >
              <svg 
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              New Recap
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
