"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Check,
  MessageCircle,
  Info,
} from "lucide-react";
import {
  HIJAB_VARIANTS,
  HijabVariant,
  PRODUCT_SPECS,
} from "@/data/hijabVariants";
import { useCart } from "@/context/CartContext";

const HeroHijabCanvas = dynamic(
  () => import("@/components/three/HeroHijabCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-40 h-56 rounded-full border border-stone-400/30 animate-pulse bg-white/20 backdrop-blur-sm" />
      </div>
    ),
  }
);

interface HeroShowcaseProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export default function HeroShowcase({
  activeIndex,
  onSelectIndex,
}: HeroShowcaseProps) {
  const { addItem, buildPromoInquiryUrl, buildDirectBuyWhatsAppUrl } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const safeIndex = activeIndex % HIJAB_VARIANTS.length;
  const activeVariant: HijabVariant = HIJAB_VARIANTS[safeIndex];
  const nextIndex = (safeIndex + 1) % HIJAB_VARIANTS.length;
  const prevIndex =
    (safeIndex - 1 + HIJAB_VARIANTS.length) % HIJAB_VARIANTS.length;
  const nextVariant: HijabVariant = HIJAB_VARIANTS[nextIndex];

  const handleNext = useCallback(() => {
    onSelectIndex(nextIndex);
  }, [nextIndex, onSelectIndex]);

  const handlePrev = useCallback(() => {
    onSelectIndex(prevIndex);
  }, [prevIndex, onSelectIndex]);

  const handleAddToCart = () => {
    addItem(activeVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  const hijabMorphVariants = {
    initial: {
      x: 360,
      y: 290,
      scale: 0.52,
      opacity: 0,
      rotateZ: 12,
    },
    animate: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      x: -60,
      y: -340,
      scale: 0.85,
      opacity: 0,
      rotateZ: -8,
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section
      id="showcase"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 pb-10 md:py-24 select-none transition-colors duration-1000"
    >
      {/* Dynamic Radial Gradient Studio Backdrop */}
      <motion.div
        key={`bg-${activeVariant.id}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 52% 46%, ${activeVariant.bgGradientCenter} 0%, ${activeVariant.bgGradientEdge} 68%, #D5CCC0 100%)`,
        }}
      />

      {/* Subtle architectural editorial grid lines & light aura */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-35">
        <div className="w-full h-full bg-[radial-gradient(#1c1a19_0.5px,transparent_0.5px)] [background-size:28px_28px] opacity-20" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-stone-900/15 to-transparent" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-stone-900/10 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 my-auto">
        {/* LEFT COLUMN: Editorial Typography, Specs, Promo Price & CTA */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col items-start text-left space-y-5 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${activeVariant.id}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-stone-900/10 text-[11px] uppercase tracking-[0.22em] text-stone-700 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{activeVariant.collectionName}</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.26em] text-stone-600 font-medium">
                  {PRODUCT_SPECS.productType} • {PRODUCT_SPECS.dimensions}
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-stone-900 leading-[1.03]">
                  {activeVariant.name}
                </h1>
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-stone-700 leading-relaxed max-w-md">
                &ldquo;{activeVariant.tagline}&rdquo;
              </p>

              <p className="text-sm text-stone-600 leading-relaxed max-w-md font-light">
                {activeVariant.description}
              </p>

              {/* Promo Price Display: Strikethrough Rp 129.000 -> Rp 89.000 */}
              <div className="pt-1 space-y-2">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-stone-900 font-semibold">
                    {activeVariant.priceFormatted}
                  </span>
                  <span className="text-base sm:text-lg text-stone-500 line-through decoration-red-700/70 font-light">
                    {activeVariant.originalPriceFormatted}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-900/90 text-amber-100 text-[10px] uppercase tracking-[0.2em] font-medium">
                    Hemat Rp 40.000
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                  <span className="uppercase tracking-[0.16em] font-medium">
                    {activeVariant.material}
                  </span>
                  <span>•</span>
                  <span>{activeVariant.dimensions}</span>
                  <span>•</span>
                  <span>{activeVariant.finishing}</span>
                </div>

                {/* WhatsApp Promo Inquiry Note */}
                <a
                  href={buildPromoInquiryUrl(activeVariant.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-1.5 text-xs text-amber-900 hover:text-stone-950 underline underline-offset-4 font-medium pt-0.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Tanya promo lebih lanjut via WhatsApp →</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Primary Actions: Add to Cart, Direct Buy via WA & Scroll to Rack */}
          <div className="pt-1 flex flex-wrap items-center gap-3 w-full sm:w-auto pointer-events-auto">
            <button
              onClick={handleAddToCart}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-stone-900 text-stone-50 text-xs uppercase tracking-[0.22em] font-medium overflow-hidden transition-all duration-300 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98]"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Masuk Tas Belanja</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>+ Tambah ke Tas</span>
                </>
              )}
            </button>

            <a
              href={buildDirectBuyWhatsAppUrl(activeVariant)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-emerald-900/90 hover:bg-emerald-950 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Beli Langsung (WA)</span>
            </a>

            <a
              href="#hijab-rack"
              className="inline-flex items-center gap-1.5 px-5 py-4 rounded-full bg-white/65 hover:bg-white/95 backdrop-blur-md border border-stone-900/15 text-stone-900 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
            >
              <span>Rak 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Color Swatch Selector & Arrow Controls */}
          <div className="pt-2 w-full max-w-md space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em] text-stone-600 font-medium">
                Pilih Varian Warna ({safeIndex + 1} / {HIJAB_VARIANTS.length})
              </span>
              <span className="text-[11px] font-mono text-stone-600 uppercase">
                HEX {activeVariant.fabricHex}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-3 bg-white/60 backdrop-blur-md p-2.5 rounded-full border border-stone-900/10 shadow-sm w-fit">
              <button
                onClick={handlePrev}
                aria-label="Warna sebelumnya"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-stone-900 hover:text-white text-stone-800 transition-colors border border-stone-900/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 px-1">
                {HIJAB_VARIANTS.map((variant, idx) => {
                  const isSelected = idx === safeIndex;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => onSelectIndex(idx)}
                      aria-label={`Pilih warna ${variant.name}`}
                      title={`${variant.name} — Promo ${variant.priceFormatted} (Normal ${variant.originalPriceFormatted})`}
                      className={`group relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "scale-110 ring-2 ring-stone-900 ring-offset-2 ring-offset-stone-100"
                          : "opacity-80 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full shadow-inner border border-black/15"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${variant.sheenHex}, ${variant.fabricHex} 65%, ${variant.shadowHex})`,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                aria-label="Warna berikutnya"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/80 hover:bg-stone-900 hover:text-white text-stone-800 transition-colors border border-stone-900/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle Color Similarity Disclaimer */}
            <p className="text-[11px] text-stone-600 flex items-start gap-1.5 leading-snug pt-0.5">
              <Info className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
              <span>{PRODUCT_SPECS.colorDisclaimer}</span>
            </p>
          </div>
        </div>

        {/* CENTER / RIGHT COLUMN: 3D Floating Hijab Simulation with Framer Motion Color-Morphing */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative h-[380px] sm:h-[470px] lg:h-[620px] w-full flex items-center justify-center">
          {/* Decorative Halo Ring behind 3D Cloth */}
          <motion.div
            key={`halo-${activeVariant.id}`}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute w-[280px] h-[280px] sm:w-[390px] sm:h-[390px] lg:w-[460px] lg:h-[460px] rounded-full border border-stone-900/10 pointer-events-none flex items-center justify-center"
            style={{
              boxShadow: `0 0 120px 20px ${activeVariant.sheenHex}55 inset`,
            }}
          >
            <div className="w-[82%] h-[82%] rounded-full border border-dashed border-stone-900/10" />
          </motion.div>

          {/* Framer Motion 3D Hijab Morphing Container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeVariant.id}
                variants={hijabMorphVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full flex items-center justify-center"
              >
                <HeroHijabCanvas
                  fabricHex={activeVariant.fabricHex}
                  sheenHex={activeVariant.sheenHex}
                  shadowHex={activeVariant.shadowHex}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Editorial Fabric Specs Badge (Top-Right of 3D Stage) */}
          <div className="hidden sm:flex flex-col items-end absolute top-4 right-2 bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-900/10 text-right pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
              Spesifikasi Pashmina
            </span>
            <span className="text-xs font-medium text-stone-800 mt-0.5">
              {activeVariant.material} • {activeVariant.dimensions}
            </span>
            <span className="text-[11px] text-stone-600">
              {activeVariant.finishing}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM-RIGHT CORNER: Next Color Preview Thumbnail Queue */}
      <div className="relative lg:absolute lg:bottom-8 lg:right-10 z-30 px-5 sm:px-8 lg:px-0 mt-6 lg:mt-0 flex justify-end pointer-events-none">
        <motion.button
          key={`next-thumb-${nextVariant.id}`}
          onClick={handleNext}
          initial={{ opacity: 0, x: 24, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-auto group flex items-center gap-4 pl-3 pr-5 py-2.5 rounded-2xl bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-stone-900/15 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
          aria-label={`Selanjutnya: ${nextVariant.name}`}
        >
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center border border-black/10 shadow-inner shrink-0">
            <div
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${nextVariant.sheenHex} 0%, ${nextVariant.fabricHex} 55%, ${nextVariant.shadowHex} 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-45"
              style={{
                background:
                  "repeating-linear-gradient(125deg, rgba(255,255,255,0.45) 0px, rgba(255,255,255,0.0) 7px, rgba(0,0,0,0.18) 14px)",
              }}
            />
            <span className="absolute bottom-1 right-1.5 text-[9px] font-mono uppercase px-1 py-0.2 rounded bg-black/40 text-white backdrop-blur-xs">
              0{nextIndex + 1}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500 flex items-center gap-1">
              <span>Warna Berikutnya</span>
              <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="font-serif text-xl text-stone-900 font-medium leading-tight">
              {nextVariant.name}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-semibold text-stone-900">
                {nextVariant.priceFormatted}
              </span>
              <span className="text-[11px] text-stone-400 line-through">
                {nextVariant.originalPriceFormatted}
              </span>
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
