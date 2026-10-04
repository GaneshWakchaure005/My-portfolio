"use client";

import React, { useState, useEffect } from "react";
import { NAV_LINKS, DEVELOPER_INFO } from "@/lib/constants";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#020814]/85 backdrop-blur-md border-b border-cyan-500/15 py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-6"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between"
      >
        {/* Brand Logo / Identifier */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-wider uppercase text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-tight text-base font-sans">
              {DEVELOPER_INFO.name.split(" ")[0]}
              <span className="text-cyan-400">.</span>
            </span>
            <span className="text-[10px] text-slate-400 -mt-1 font-mono tracking-widest">
              SYS//DEV
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-950/40 border border-slate-800/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 transition-all duration-200 hover:text-cyan-300 hover:bg-cyan-500/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-amber-300 bg-amber-400/10 border border-amber-400/35 hover:bg-amber-400 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#020814]/95 backdrop-blur-xl border-b border-cyan-500/20 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-mono text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-mono text-xs font-semibold shadow-md shadow-amber-950/50"
            >
              CONNECT WITH GANESH
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
