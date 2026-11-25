"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroShowcase from "@/components/HeroShowcase";
import InteractiveHijabRack from "@/components/InteractiveHijabRack";
import EditorialCraftSection from "@/components/EditorialCraftSection";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar />
      <HeroShowcase
        activeIndex={activeVariantIndex}
        onSelectIndex={setActiveVariantIndex}
      />
      <InteractiveHijabRack onSelectToHero={setActiveVariantIndex} />
      <EditorialCraftSection onSelectVariant={setActiveVariantIndex} />
      <Footer onSelectVariant={setActiveVariantIndex} />
      <CartDrawer />
    </main>
  );
}
