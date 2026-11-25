"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { HIJAB_VARIANTS, PRODUCT_SPECS, formatIDR } from "@/data/hijabVariants";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    originalSubtotal,
    totalSavings,
    toast,
    dismissToast,
    buildWhatsAppUrl,
    buildPromoInquiryUrl,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(notes, customerName);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-stone-950/45 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FAF7F2] text-stone-900 shadow-2xl border-l border-stone-900/10 flex flex-col justify-between"
            aria-label="Keranjang Belanja LEVARCA"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-stone-900/10 flex items-center justify-between bg-white/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-200 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 leading-none">
                    Tas Belanja LEVARCA
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500 mt-1">
                    {totalItems} Item • {PRODUCT_SPECS.productType}
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                aria-label="Tutup Keranjang"
                className="w-9 h-9 rounded-full bg-stone-200/70 hover:bg-stone-900 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-500">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-serif text-2xl text-stone-800">
                      Tas Belanja Anda Masih Kosong
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      Pilih varian warna Pashmina Modal Viscose favorit Anda dari
                      3D Showcase atau tambahkan langsung dari 5 pilihan warna di
                      bawah.
                    </p>
                  </div>

                  {/* Quick Add Swatches when empty */}
                  <div className="w-full pt-4 border-t border-stone-900/10">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500 mb-3">
                      Tambah Cepat • Promo Rp 89.000
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {HIJAB_VARIANTS.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => addItem(v, 1)}
                          className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white border border-stone-900/10 hover:border-stone-900 text-left transition-all"
                        >
                          <span
                            className="w-7 h-7 rounded-full border border-black/15 shrink-0"
                            style={{
                              background: `radial-gradient(circle at 30% 30%, ${v.sheenHex}, ${v.fabricHex})`,
                            }}
                          />
                          <div className="overflow-hidden">
                            <p className="font-serif text-sm text-stone-900 truncate">
                              {v.name}
                            </p>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-[10px] font-semibold text-stone-900">
                                {v.priceFormatted}
                              </span>
                              <span className="text-[9px] text-stone-400 line-through">
                                {v.originalPriceFormatted}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {items.map(({ variant, quantity }) => (
                      <div
                        key={variant.id}
                        className="p-4 rounded-2xl bg-white border border-stone-900/10 shadow-xs flex items-center gap-4"
                      >
                        {/* Color Preview */}
                        <div
                          className="w-16 h-20 rounded-xl border border-black/10 shadow-inner shrink-0 relative overflow-hidden"
                          style={{
                            background: `radial-gradient(circle at 30% 25%, ${variant.sheenHex} 0%, ${variant.fabricHex} 60%, ${variant.shadowHex} 100%)`,
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-35"
                            style={{
                              background:
                                "repeating-linear-gradient(125deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0) 7px, rgba(0,0,0,0.18) 14px)",
                            }}
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400">
                                {variant.sku} • {variant.dimensions}
                              </p>
                              <h4 className="font-serif text-xl text-stone-900 leading-tight">
                                {variant.name}
                              </h4>
                            </div>
                            <button
                              onClick={() => removeItem(variant.id)}
                              aria-label={`Hapus ${variant.name}`}
                              className="text-stone-400 hover:text-red-700 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span className="text-xs font-semibold text-stone-800">
                              {variant.priceFormatted}
                            </span>
                            <span className="text-[11px] text-stone-400 line-through">
                              {variant.originalPriceFormatted}
                            </span>
                            <span className="text-[10px] text-stone-500">
                              / pcs
                            </span>
                          </div>

                          {/* Quantity Controls & Line Subtotal */}
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1 border border-stone-900/10">
                              <button
                                onClick={() =>
                                  updateQuantity(variant.id, quantity - 1)
                                }
                                aria-label="Kurangi jumlah"
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-medium w-6 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(variant.id, quantity + 1)
                                }
                                aria-label="Tambah jumlah"
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="font-serif text-lg font-semibold text-stone-900 block leading-none">
                                {formatIDR(variant.price * quantity)}
                              </span>
                              <span className="text-[10px] text-stone-400 line-through">
                                {formatIDR(variant.originalPrice * quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bundling Promo Incentive Banner */}
                  <div className="p-3.5 rounded-2xl bg-amber-900/10 border border-amber-900/20 flex items-center justify-between gap-3">
                    <div className="text-xs text-stone-800">
                      {totalItems < 2 ? (
                        <span>
                          <strong>Tips Hemat:</strong> Tambah{" "}
                          <strong>1 pcs warna lagi</strong> untuk tanya{" "}
                          <span className="text-amber-900 font-semibold">
                            Harga Bundling
                          </span>{" "}
                          di WhatsApp!
                        </span>
                      ) : (
                        <span>
                          🎉 Anda memilih <strong>{totalItems} pcs</strong>!
                          Pesan WA otomatis menyertakan klaim{" "}
                          <strong className="text-amber-900">
                            Info Promo Bundling
                          </strong>
                          .
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Add More Colors Bar */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-stone-500">
                        Tambah Warna Lainnya
                      </span>
                      <button
                        onClick={clearCart}
                        className="text-[10px] uppercase tracking-[0.18em] text-stone-400 hover:text-stone-700 underline"
                      >
                        Kosongkan Tas
                      </button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {HIJAB_VARIANTS.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => addItem(v, 1, true)}
                          title={`+ Tambah ${v.name}`}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-900/10 hover:border-stone-900 text-xs transition-all"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/15"
                            style={{ backgroundColor: v.fabricHex }}
                          />
                          <span>+ {v.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Personalization / Customer Info for WhatsApp Message */}
                  <div className="space-y-3 pt-3 border-t border-stone-900/10">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
                      Data Pengiriman dari Cikarang (Opsional)
                    </p>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nama Anda (contoh: Aisyah)"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-900/15 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
                    />
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Kecamatan & Kota tujuan (untuk cek ongkir) atau catatan pesanan..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-900/15 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 resize-none"
                    />
                    <p className="text-[11px] text-stone-500 leading-snug">
                      {PRODUCT_SPECS.shippingAndPaymentInfo}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer & WhatsApp Instant Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-900/10 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Harga Normal ({totalItems} pcs)</span>
                    <span className="line-through">
                      {formatIDR(originalSubtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
                    <span>Total Hemat Promo</span>
                    <span>-{formatIDR(totalSavings)}</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1.5 border-t border-stone-900/10">
                    <span className="text-xs uppercase tracking-[0.24em] text-stone-700 font-medium">
                      Total Harga Promo
                    </span>
                    <span className="font-serif text-3xl text-stone-900 font-semibold">
                      {formatIDR(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 px-6 rounded-full bg-[#1C1A19] hover:bg-stone-800 text-white flex items-center justify-center gap-3 text-xs uppercase tracking-[0.22em] font-medium shadow-lg hover:shadow-xl transition-all group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Checkout via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div className="text-center space-y-1">
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {PRODUCT_SPECS.promoNote}
                  </p>
                  <a
                    href={buildPromoInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-amber-900 hover:text-stone-900 underline font-medium"
                  >
                    Tanya Promo Lebih Lanjut ke Admin WhatsApp →
                  </a>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}

      {/* Non-Intrusive Floating Mini Cart Toast Bar when user adds a color */}
      {!isOpen && toast.visible && toast.variant && (
        <motion.div
          key="cart-toast-bar"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md bg-stone-950 text-stone-100 rounded-full px-4 py-3 shadow-2xl border border-amber-200/25 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-7 h-7 rounded-full border border-white/25 shrink-0"
              style={{ backgroundColor: toast.variant.fabricHex }}
            />
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">
                ✓ {toast.variant.name} masuk tas
              </p>
              <p className="text-[10px] text-amber-200/90 truncate">
                Total {totalItems} pcs • {formatIDR(subtotal)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openCart}
              className="px-4 py-2 rounded-full bg-amber-200 hover:bg-amber-100 text-stone-950 text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors"
            >
              Lihat Tas ({totalItems})
            </button>
            <button
              onClick={dismissToast}
              aria-label="Tutup notifikasi"
              className="p-1.5 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
