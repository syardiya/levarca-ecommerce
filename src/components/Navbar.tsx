"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { useCart } from "@/context/CartContext";
import { BRAND_CONFIG } from "@/data/hijabVariants";

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "3D Showcase", href: "#showcase" },
    { label: "Hijab Rack", href: "#hijab-rack" },
    { label: "Spesifikasi", href: "#craftsmanship" },
    { label: "Katalog Warna", href: "#collection-grid" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 bg-black text-stone-100 border-b border-amber-200/15 ${
        scrolled ? "py-2.5 shadow-xl" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.25em] text-stone-300 hover:text-amber-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          className="lg:hidden p-2 rounded-full bg-stone-900 border border-amber-200/20 text-stone-200 hover:text-amber-200"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Center Brand Logo (/logo.png or /logo.svg on pure black background) */}
        <a
          href="#showcase"
          className="flex items-center justify-center group focus:outline-none"
        >
          <BrandLogo
            size="md"
            className="border-none shadow-none px-0 py-0 rounded-none"
          />
        </a>

        {/* Right Navigation & Shopping Bag */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-stone-300 hover:text-amber-200 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={openCart}
            aria-label="Buka Keranjang Belanja"
            className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-100 border border-amber-200/25 transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-amber-200" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] font-medium">
              Tas Belanja
            </span>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-amber-200 text-stone-950 text-[11px] font-semibold">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-amber-200/15 px-6 py-6 mt-2.5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-xs uppercase tracking-[0.26em] text-stone-200 hover:text-amber-200 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 uppercase tracking-[0.18em]">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Pashmina Modal Viscose
            </span>
            <span>{BRAND_CONFIG.location}</span>
          </div>
        </div>
      )}
    </header>
  );
}
