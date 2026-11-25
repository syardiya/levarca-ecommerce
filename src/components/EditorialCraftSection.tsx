"use client";

import React from "react";
import {
  Sparkles,
  Feather,
  Wind,
  Layers,
  Ruler,
  Scissors,
  Info,
  MessageCircle,
} from "lucide-react";
import {
  HIJAB_VARIANTS,
  HijabVariant,
  PRODUCT_SPECS,
} from "@/data/hijabVariants";
import { useCart } from "@/context/CartContext";

interface EditorialCraftSectionProps {
  onSelectVariant: (index: number) => void;
}

export default function EditorialCraftSection({
  onSelectVariant,
}: EditorialCraftSectionProps) {
  const { addItem, buildPromoInquiryUrl } = useCart();

  const pillars = [
    {
      icon: Feather,
      title: "Karakter Bahan Tipis & Ringan",
      description:
        "Bahan tipis sesuai karakteristik alami Modal Viscose yang lembut, sehingga disarankan memakai ciput/inner untuk hasil tertutup sempurna.",
    },
    {
      icon: Layers,
      title: "Tidak Menumpuk di Leher",
      description:
        "Tidak menumpuk saat dililit di leher karena karakter bahan tipis dan jatuh natural mengikuti siluet wajah.",
    },
    {
      icon: Wind,
      title: "Breathable Seharian",
      description:
        "Serat Modal Viscose memiliki sirkulasi udara sangat baik, terasa adem, breathable, dan nyaman digunakan seharian.",
    },
    {
      icon: Sparkles,
      title: "Mewah, Elegan & Effortless",
      description:
        "Memberikan tampilan mewah, elegan, dan effortless dengan finishing Jahit Double Stitch yang rapi di setiap tepi.",
    },
  ];

  return (
    <section
      id="craftsmanship"
      className="relative py-24 md:py-32 bg-[#F4EFE8] text-stone-900 border-t border-stone-900/10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-[0.28em] text-amber-800 font-medium">
              Karakteristik Produk • {PRODUCT_SPECS.productType}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.08]">
              Jatuh Natural, Adem &amp; Nyaman Dipakai Seharian.
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
              Pashmina LEVARCA menggunakan bahan <strong>Modal Viscose</strong>{" "}
              pilihan dengan ukuran <strong>{PRODUCT_SPECS.dimensions}</strong>{" "}
              dan finishing <strong>{PRODUCT_SPECS.finishing}</strong>. Dirancang
              agar mudah di-styling untuk tampilan kasual maupun formal tanpa
              terasa gerah atau berat di leher.
            </p>
          </div>
        </div>

        {/* Specifications & Buyer Notes Highlight Box */}
        <div className="bg-white/85 backdrop-blur-md border border-stone-900/10 rounded-3xl p-6 sm:p-8 mb-14 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-stone-900/10">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-200 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Material Utama
                </p>
                <p className="font-serif text-2xl text-stone-900 font-medium">
                  {PRODUCT_SPECS.material}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Ringan, jatuh natural &amp; breathable
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-200 flex items-center justify-center shrink-0">
                <Ruler className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Ukuran Pashmina
                </p>
                <p className="font-serif text-2xl text-stone-900 font-medium">
                  {PRODUCT_SPECS.dimensions}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Proporsi ideal untuk berbagai gaya lilitan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-200 flex items-center justify-center shrink-0">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  Kualitas Tepi
                </p>
                <p className="font-serif text-2xl text-stone-900 font-medium">
                  {PRODUCT_SPECS.finishing}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Jahitan tepi kuat, presisi &amp; tahan lama
                </p>
              </div>
            </div>
          </div>

          {/* Color Similarity Note & WhatsApp Promo Banner */}
          <div className="pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-2.5 text-xs text-stone-700">
              <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong>Catatan Warna:</strong> {PRODUCT_SPECS.colorDisclaimer}
              </span>
            </div>

            <a
              href={buildPromoInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/10 hover:bg-amber-900/20 text-amber-950 text-xs font-medium transition-colors shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Promo Rp 89.000 (Normal Rp 129.000) • Tanya Promo Lanjutan di WA</span>
            </a>
          </div>
        </div>

        {/* 4 Material Characteristics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 backdrop-blur-md border border-stone-900/10 rounded-3xl p-7 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-2xl bg-stone-900 text-amber-200 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Care Instructions (Panduan Perawatan Modal Viscose) & Shipping Info */}
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 mb-24 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.26em] text-amber-300 font-medium">
                Care Guide • Panduan Perawatan
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                Cara Merawat Pashmina Modal Viscose
              </h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Agar serat lembut Modal Viscose tetap awet, jatuh natural, dan
                jahitan Double Stitch tetap rapi dalam jangka panjang:
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCT_SPECS.careInstructions.map((instruction, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-200/20 text-amber-200 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed font-light">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-300">
            <span>{PRODUCT_SPECS.shippingAndPaymentInfo}</span>
            <span className="text-amber-200 font-medium">
              Beli ≥ 2 pcs? Tanya Promo Bundling di WhatsApp
            </span>
          </div>
        </div>

        {/* Complete 5-Color Catalog Grid for Direct Comparison & Instant Purchase */}
        <div id="collection-grid" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-900/10 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.26em] text-stone-500">
                Katalog Lengkap • 5 Varian Warna Aktif
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">
                Koleksi Pashmina Modal Viscose LEVARCA
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-900 font-semibold">
                Harga Promo {PRODUCT_SPECS.promoPriceFormatted}{" "}
                <span className="line-through text-stone-400 font-normal ml-1">
                  {PRODUCT_SPECS.originalPriceFormatted}
                </span>
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {PRODUCT_SPECS.promoNote}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIJAB_VARIANTS.map((variant: HijabVariant, idx: number) => (
              <div
                key={variant.id}
                className="group bg-white/85 rounded-3xl border border-stone-900/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Drape Swatch Header */}
                <div
                  onClick={() => {
                    onSelectVariant(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="relative h-52 w-full cursor-pointer overflow-hidden p-6 flex flex-col justify-between"
                  style={{
                    background: `radial-gradient(circle at 25% 25%, ${variant.sheenHex} 0%, ${variant.fabricHex} 58%, ${variant.shadowHex} 100%)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30 group-hover:scale-105 transition-transform duration-700"
                    style={{
                      background:
                        "repeating-linear-gradient(115deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0) 18px, rgba(0,0,0,0.22) 36px)",
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[10px] uppercase tracking-[0.22em] text-stone-800 font-medium">
                      0{idx + 1} • {variant.sku}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono text-white">
                      {variant.fabricHex}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-100 text-[10px] uppercase tracking-[0.18em]">
                      Promo {variant.priceFormatted}
                    </span>
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-stone-900/75 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Lihat 3D ↑
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">
                      {variant.material} • {variant.dimensions} •{" "}
                      {variant.finishing}
                    </p>
                    <div className="flex items-baseline justify-between mt-1.5">
                      <h4 className="font-serif text-2xl text-stone-900">
                        {variant.name}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl text-stone-900 font-semibold">
                          {variant.priceFormatted}
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          {variant.originalPriceFormatted}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 font-light mt-2 line-clamp-2 leading-relaxed">
                      {variant.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-900/10 flex items-center gap-2.5">
                    <button
                      onClick={() => addItem(variant, 1)}
                      className="flex-1 py-3 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors"
                    >
                      + Tambah ke Tas
                    </button>
                    <button
                      onClick={() => {
                        onSelectVariant(idx);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="py-3 px-4 rounded-full border border-stone-900/15 hover:border-stone-900 text-[11px] uppercase tracking-[0.18em] text-stone-700 transition-colors"
                    >
                      3D View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
