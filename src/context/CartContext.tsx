"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  HijabVariant,
  BRAND_CONFIG,
  HIJAB_VARIANTS,
  formatIDR,
} from "@/data/hijabVariants";

export interface CartItem {
  variant: HijabVariant;
  quantity: number;
}

export interface CartToastState {
  visible: boolean;
  variant: HijabVariant | null;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    variant: HijabVariant,
    quantity?: number,
    openDrawerImmediately?: boolean
  ) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  originalSubtotal: number;
  totalSavings: number;
  toast: CartToastState;
  dismissToast: () => void;
  buildWhatsAppUrl: (customNotes?: string, customerName?: string) => string;
  buildDirectBuyWhatsAppUrl: (variant: HijabVariant) => string;
  buildPromoInquiryUrl: (variantName?: string) => string;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "levarca_modal_viscose_cart_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<CartToastState>({
    visible: false,
    variant: null,
  });
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validIds = new Set(HIJAB_VARIANTS.map((v) => v.id));
          const synced = parsed
            .filter(
              (item) => item?.variant?.id && validIds.has(item.variant.id)
            )
            .map((item) => {
              const latestVariant =
                HIJAB_VARIANTS.find((v) => v.id === item.variant.id) ||
                item.variant;
              return {
                variant: latestVariant,
                quantity: Number(item.quantity) || 1,
              };
            });
          setItems(synced);
        }
      }
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  const dismissToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const openCart = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (
      variant: HijabVariant,
      quantity = 1,
      openDrawerImmediately = false
    ) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.variant.id === variant.id
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [...prev, { variant, quantity }];
      });

      if (openDrawerImmediately) {
        setIsOpen(true);
      } else {
        // Show non-intrusive floating toast bar so customer can seamlessly keep browsing other colors
        setToast({ visible: true, variant });
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        toastTimerRef.current = setTimeout(() => {
          setToast((prev) => ({ ...prev, visible: false }));
        }, 4500);
      }
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variant.id !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.variant.id !== variantId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );
  const originalSubtotal = items.reduce(
    (acc, item) => acc + item.variant.originalPrice * item.quantity,
    0
  );
  const totalSavings = Math.max(0, originalSubtotal - subtotal);

  const buildWhatsAppUrl = useCallback(
    (customNotes?: string, customerName?: string) => {
      const lines: string[] = [
        "Halo Admin *LEVARCA*, saya ingin memesan *Pashmina Modal Viscose*:",
        "",
      ];

      if (customerName && customerName.trim()) {
        lines.push(`*Nama Pemesan:* ${customerName.trim()}`);
        lines.push("");
      }

      lines.push("*Detail Pesanan:*");
      items.forEach((item, idx) => {
        const lineTotal = formatIDR(item.variant.price * item.quantity);
        lines.push(
          `${idx + 1}. *${item.variant.name}* (${item.variant.sku}) — ${item.quantity} pcs × ${item.variant.priceFormatted} _(Harga Normal ${item.variant.originalPriceFormatted})_ = ${lineTotal}`
        );
      });

      lines.push("");
      lines.push(`*Total Item:* ${totalItems} pcs`);
      lines.push(`*Harga Normal:* ~${formatIDR(originalSubtotal)}~`);
      lines.push(`*Total Harga Promo:* ${formatIDR(subtotal)}`);

      if (customNotes && customNotes.trim()) {
        lines.push("");
        lines.push(`*Alamat / Catatan:* ${customNotes.trim()}`);
      }

      lines.push("");
      if (totalItems >= 2) {
        lines.push(
          `Saya memesan *${totalItems} pcs*, mohon info ketersediaan stok, ongkir dari Cikarang, dan apakah ada *promo bundling / diskon tambahan* untuk pembelian ${totalItems} pcs ini. Terima kasih!`
        );
      } else {
        lines.push(
          "Mohon info ketersediaan pesanan, ongkir dari Cikarang, dan apakah ada promo lebih lanjut yang sedang berlaku. Terima kasih!"
        );
      }

      const text = encodeURIComponent(lines.join("\n"));
      return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`;
    },
    [items, totalItems, subtotal, originalSubtotal]
  );

  const buildDirectBuyWhatsAppUrl = useCallback((variant: HijabVariant) => {
    const lines = [
      `Halo Admin *LEVARCA*, saya ingin pesan langsung *Pashmina Modal Viscose*:`,
      "",
      `• *Warna:* ${variant.name} (${variant.sku})`,
      `• *Ukuran:* ${variant.dimensions} (${variant.finishing})`,
      `• *Harga Promo:* ${variant.priceFormatted} _(Normal ${variant.originalPriceFormatted})_`,
      "",
      "Mohon info ketersediaan warna ini, ongkir dari Cikarang, dan apakah ada promo bundling jika saya ambil lebih dari 1 pcs. Terima kasih!",
    ];
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, []);

  const buildPromoInquiryUrl = useCallback((variantName?: string) => {
    const msg = variantName
      ? `Halo Admin LEVARCA, saya tertarik dengan Pashmina Modal Viscose warna *${variantName}* (Promo Rp 89.000 dari Rp 129.000). Boleh info promo bundling / diskon lebih lanjut yang sedang berlaku?`
      : `Halo Admin LEVARCA, saya tertarik dengan koleksi Pashmina Modal Viscose (Promo Rp 89.000 dari Rp 129.000). Boleh info promo bundling / diskon lebih lanjut yang sedang berlaku?`;
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, []);

  return (
    <CartContext.Provider
      value={{
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
        buildDirectBuyWhatsAppUrl,
        buildPromoInquiryUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
