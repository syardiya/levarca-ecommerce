"use client";

import React from "react";
import BrandLogo from "@/components/BrandLogo";
import { HIJAB_VARIANTS, BRAND_CONFIG, PRODUCT_SPECS } from "@/data/hijabVariants";
import { MessageCircle, MapPin, Sparkles, Info } from "lucide-react";

interface FooterProps {
  onSelectVariant?: (index: number) => void;
}

export default function Footer({ onSelectVariant }: FooterProps) {
  return (
    <footer className="bg-black text-stone-300 border-t border-amber-200/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand Identity with crisp original /logo.png on pure black background */}
          <div className="md:col-span-5 space-y-5">
            <a href="#showcase" className="inline-block">
              <BrandLogo
                size="lg"
                className="border-none shadow-none px-0 py-0 rounded-none"
              />
            </a>
            <p className="text-xs uppercase tracking-[0.24em] text-amber-200/90 font-medium">
              {BRAND_CONFIG.subtitle}
            </p>
            <p className="text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Brand hijab wanita <strong>LEVARCA</strong> menghadirkan koleksi{" "}
              {PRODUCT_SPECS.productType} ({PRODUCT_SPECS.dimensions}) dengan
              finishing {PRODUCT_SPECS.finishing}. Ringan, breathable, tidak
              menumpuk di leher, serta jatuh natural untuk tampilan mewah dan
              effortless setiap hari.
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs text-stone-300">
              <MapPin className="w-4 h-4 text-amber-300/80 shrink-0" />
              <span>Lokasi Operasional: {BRAND_CONFIG.location}</span>
            </div>
          </div>

          {/* Column 2: The 5 Active Modal Viscose Shades */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.28em] text-white font-medium">
              5 Varian Warna Pashmina Modal Viscose
            </h3>
            <ul className="grid grid-cols-2 gap-2.5">
              {HIJAB_VARIANTS.map((variant, idx) => (
                <li key={variant.id}>
                  <button
                    onClick={() => {
                      if (onSelectVariant) onSelectVariant(idx);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2.5 text-xs text-stone-400 hover:text-white transition-colors py-1"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/25 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: variant.fabricHex }}
                    />
                    <span>{variant.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-1 text-xs text-stone-400">
              <p>
                Harga Promo:{" "}
                <strong className="text-amber-200">
                  {PRODUCT_SPECS.promoPriceFormatted}
                </strong>{" "}
                <span className="line-through text-stone-500 ml-1">
                  {PRODUCT_SPECS.originalPriceFormatted}
                </span>
              </p>
              <p className="text-[11px] text-stone-500 flex items-start gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 text-amber-300/70 shrink-0 mt-0.5" />
                <span>{PRODUCT_SPECS.colorDisclaimer}</span>
              </p>
            </div>
          </div>

          {/* Column 3: Pemesanan & Info Promo WhatsApp */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.28em] text-white font-medium">
              Pemesanan &amp; Info Promo
            </h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Pemesanan online dikirim dari Cikarang. Tanya ketersediaan warna
              atau info promo lebih lanjut langsung melalui Admin WhatsApp
              LEVARCA ({BRAND_CONFIG.whatsappDisplay}).
            </p>
            <a
              href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Halo Admin LEVARCA, saya ingin bertanya mengenai koleksi Pashmina Modal Viscose (Promo Rp 89.000) dan info promo lebih lanjut."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-stone-900 hover:bg-stone-800 border border-amber-200/25 text-xs uppercase tracking-[0.2em] text-amber-200 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat WhatsApp Admin</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 uppercase tracking-[0.2em]">
          <p>
            © {new Date().getFullYear()} LEVARCA • {BRAND_CONFIG.location}. All
            Rights Reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300/70" />
            <span>Pashmina Modal Viscose • 3D Interactive Catalog</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
