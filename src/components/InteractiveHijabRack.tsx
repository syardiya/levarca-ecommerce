"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  MoveHorizontal,
  Sparkles,
  Check,
  MessageCircle,
} from "lucide-react";
import { HIJAB_VARIANTS, HijabVariant } from "@/data/hijabVariants";
import { useCart } from "@/context/CartContext";

const RackHijabCanvas = dynamic(
  () => import("@/components/three/RackHijabCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-24 h-48 rounded-2xl bg-stone-200/70 animate-pulse" />
      </div>
    ),
  }
);

interface InteractiveHijabRackProps {
  onSelectToHero?: (index: number) => void;
}

export default function InteractiveHijabRack({
  onSelectToHero,
}: InteractiveHijabRackProps) {
  const { addItem, buildPromoInquiryUrl } = useCart();
  const [centeredIndex, setCenteredIndex] = useState<number>(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(containerCenter - itemCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setCenteredIndex(closestIdx);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;

    const containerWidth = container.clientWidth;
    const itemLeft = item.offsetLeft;
    const itemWidth = item.clientWidth;

    const targetScrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2;
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
    setCenteredIndex(index);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const activeVariant: HijabVariant =
    HIJAB_VARIANTS[centeredIndex] || HIJAB_VARIANTS[0];

  const handleQuickAdd = (variant: HijabVariant) => {
    addItem(variant, 1);
    setAddedId(variant.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section
      id="hijab-rack"
      className="relative w-full py-24 md:py-32 bg-[#FAF8F5] text-stone-900 overflow-hidden border-t border-stone-900/10"
    >
      {/* Bright Studio Ambient Lighting Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${activeVariant.bgGradientCenter} 0%, #FAF8F5 72%)`,
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Studio Display • Katalog Rak Interaktif</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 font-normal tracking-tight">
            Interactive Horizontal Hijab Rack
          </h2>
          <p className="text-sm text-stone-600 max-w-xl font-light leading-relaxed">
            Geser rak gantung secara horizontal untuk melihat 5 varian warna
            Pashmina Modal Viscose LEVARCA. Hijab yang berada tepat di tengah
            rel otomatis berputar menghadap ke depan beserta detail harga promo.
          </p>
        </div>

        {/* Rack Navigation Buttons */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-stone-900/10 text-xs text-stone-600">
            <MoveHorizontal className="w-4 h-4 text-amber-800" />
            <span>Geser atau Klik Warna</span>
          </div>

          <button
            onClick={() =>
              scrollToIndex(
                (centeredIndex - 1 + HIJAB_VARIANTS.length) %
                  HIJAB_VARIANTS.length
              )
            }
            aria-label="Geser rak ke kiri"
            className="w-11 h-11 rounded-full bg-white border border-stone-900/15 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              scrollToIndex((centeredIndex + 1) % HIJAB_VARIANTS.length)
            }
            aria-label="Geser rak ke kanan"
            className="w-11 h-11 rounded-full bg-white border border-stone-900/15 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* STUDIO RACK ARCHITECTURE: Thin Brushed Metal Rail & Hanging 3D Hijabs */}
      <div className="relative z-10 w-full">
        <div className="hidden lg:block absolute left-16 top-12 bottom-20 w-[3px] bg-gradient-to-b from-stone-400 via-stone-600 to-stone-300 opacity-50 pointer-events-none" />
        <div className="hidden lg:block absolute right-16 top-12 bottom-20 w-[3px] bg-gradient-to-b from-stone-400 via-stone-600 to-stone-300 opacity-50 pointer-events-none" />

        <div className="relative w-full">
          <div className="absolute left-0 right-0 top-[56px] z-20 pointer-events-none">
            <div className="w-full h-[5px] bg-gradient-to-r from-stone-400 via-stone-800 to-stone-400 shadow-md" />
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-amber-200/80 to-transparent -mt-[4px]" />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 top-[34px] z-20 pointer-events-none flex flex-col items-center">
            <span className="px-3 py-0.5 rounded-full bg-stone-900 text-[9px] uppercase tracking-[0.28em] text-amber-200 shadow-sm">
              Center Stage
            </span>
            <div className="w-2.5 h-2.5 rotate-45 bg-stone-900 -mt-1" />
          </div>
        </div>

        {/* Horizontal Scrollable Rack Track */}
        <div
          ref={scrollContainerRef}
          className="relative flex items-center overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pt-8 pb-6 px-[18vw] sm:px-[28vw] lg:px-[36vw] gap-4 sm:gap-8"
          style={{ scrollbarWidth: "none" }}
        >
          {HIJAB_VARIANTS.map((variant, index) => {
            const isCentered = index === centeredIndex;
            const offsetFromCenter = index - centeredIndex;

            return (
              <div
                key={variant.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => scrollToIndex(index)}
                className={`snap-center shrink-0 w-[250px] sm:w-[290px] md:w-[320px] flex flex-col items-center cursor-pointer select-none transition-all duration-500 ${
                  isCentered
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-65 hover:opacity-90 scale-95"
                }`}
              >
                <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center">
                  <RackHijabCanvas
                    fabricHex={variant.fabricHex}
                    sheenHex={variant.sheenHex}
                    shadowHex={variant.shadowHex}
                    isCentered={isCentered}
                    offsetFromCenter={offsetFromCenter}
                    phaseOffset={index * 1.38}
                  />

                  <div
                    className={`pointer-events-none absolute bottom-3 w-36 h-5 rounded-full blur-md transition-all duration-500 ${
                      isCentered
                        ? "opacity-45 scale-110"
                        : "opacity-20 scale-75"
                    }`}
                    style={{ backgroundColor: variant.shadowHex }}
                  />
                </div>

                <div className="mt-1 flex items-center gap-2 pointer-events-none">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border border-black/20 transition-transform duration-300 ${
                      isCentered
                        ? "scale-125 ring-2 ring-stone-900 ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: variant.fabricHex }}
                  />
                  <span
                    className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                      isCentered
                        ? "text-stone-900 font-semibold"
                        : "text-stone-400"
                    }`}
                  >
                    0{index + 1} • {variant.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM REVEAL PANEL: Centered Hijab Color Name, Promo Price & Quick Action */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`rack-info-${activeVariant.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-xl border border-stone-900/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div
                className="w-16 h-16 rounded-2xl border border-black/15 shadow-inner shrink-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${activeVariant.sheenHex}, ${activeVariant.fabricHex} 65%, ${activeVariant.shadowHex})`,
                }}
              />
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                    {activeVariant.material} • {activeVariant.dimensions}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {activeVariant.fabricHex}
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">
                  {activeVariant.name}
                </h3>
                <div className="flex items-baseline justify-center sm:justify-start gap-2.5 mt-0.5">
                  <span className="font-serif text-2xl text-amber-900 font-semibold">
                    {activeVariant.priceFormatted}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    {activeVariant.originalPriceFormatted}
                  </span>
                </div>
                <a
                  href={buildPromoInquiryUrl(activeVariant.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-800 hover:text-stone-900 underline underline-offset-2 mt-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Tanya info promo lebih lanjut via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onSelectToHero && (
                <button
                  onClick={() => {
                    onSelectToHero(centeredIndex);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-5 py-3.5 rounded-full border border-stone-900/20 hover:border-stone-900 text-xs uppercase tracking-[0.2em] text-stone-800 transition-colors"
                >
                  Lihat di 3D Hero
                </button>
              )}

              <button
                onClick={() => handleQuickAdd(activeVariant)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-[0.22em] font-medium transition-all shadow-md"
              >
                {addedId === activeVariant.id ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Tersimpan di Tas</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pilih Varian Ini</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Pill Dots for All 5 Colors Below Card */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          {HIJAB_VARIANTS.map((v, idx) => {
            const active = idx === centeredIndex;
            return (
              <button
                key={v.id}
                onClick={() => scrollToIndex(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                  active
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white/70 text-stone-600 hover:bg-white border border-stone-900/10"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: v.fabricHex }}
                />
                <span className="tracking-wider">{v.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
