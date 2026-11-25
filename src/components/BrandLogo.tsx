"use client";

import React, { useState } from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Renders the original /logo.png (or /logo.svg if present) with its pure black
 * background intact, without CSS filter/invert/blur, and cropped cleanly via SVG viewBox
 * to the exact wordmark bounding box (2000x2000 -> viewBox="170 710 1660 440")
 * so the 2000x2000 high-resolution image stays razor-sharp at any Navbar or Footer size.
 */
export default function BrandLogo({
  size = "md",
  className = "",
}: BrandLogoProps) {
  const [src, setSrc] = useState<string>(
    process.env.NEXT_PUBLIC_LOGO_PATH || "/logo.png"
  );

  const sizeClasses = {
    sm: "h-8 sm:h-9",
    md: "h-9 sm:h-11",
    lg: "h-12 sm:h-14",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center bg-black rounded-lg px-2.5 py-1 border border-amber-200/15 shadow-sm select-none ${className}`}
      title="LEVARCA — Pashmina Modal Viscose"
    >
      <svg
        viewBox="170 710 1660 440"
        className={`w-auto ${sizeClasses} block`}
        role="img"
        aria-label="LEVARCA"
      >
        <image
          href={src}
          width="2000"
          height="2000"
          preserveAspectRatio="xMidYMid meet"
          onError={() => {
            if (src.endsWith(".png")) setSrc("/logo.svg");
            else if (src.endsWith(".svg")) setSrc("/logo.png");
          }}
        />
      </svg>
    </span>
  );
}
