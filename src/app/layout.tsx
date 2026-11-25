import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import {
  BRAND_CONFIG,
  HIJAB_VARIANTS,
  PRODUCT_SPECS,
} from "@/data/hijabVariants";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND_CONFIG.siteUrl),
  title: {
    default:
      "LEVARCA — Pashmina Modal Viscose | Lembut, Adem & Jatuh Natural",
    template: "%s | LEVARCA",
  },
  description:
    "Beli Pashmina Modal Viscose LEVARCA ukuran ± 175 x 70 cm dengan finishing Jahit Double Stitch. Bahan lembut, adem, breathable, tidak menumpuk di leher, dan jatuh natural. Tersedia 5 warna: Midnight Navy, Sweet Candy, Dusty Rose, Butter Cream, dan Mocha Taupe. Promo Rp 89.000 dari Rp 129.000.",
  keywords: [
    "LEVARCA",
    "pashmina modal viscose",
    "hijab modal viscose",
    "pashmina viscose lembut adem",
    "hijab wanita LEVARCA",
    "pashmina jatuh natural",
    "pashmina double stitch",
    "pashmina midnight navy",
    "pashmina sweet candy",
    "pashmina dusty rose",
    "pashmina butter cream",
    "pashmina mocha taupe",
    "hijab online cikarang",
  ],
  authors: [{ name: "LEVARCA" }],
  creator: "LEVARCA",
  publisher: "LEVARCA",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BRAND_CONFIG.siteUrl,
    siteName: "LEVARCA",
    title: "LEVARCA — Pashmina Modal Viscose | Lembut, Adem & Jatuh Natural",
    description:
      "Koleksi Pashmina Modal Viscose LEVARCA (± 175 x 70 cm, Jahit Double Stitch). Breathable, ringan, jatuh natural, tidak menumpuk di leher. Promo Rp 89.000 (Normal Rp 129.000).",
    images: [
      {
        url: "/logo.png",
        width: 2000,
        height: 2000,
        alt: "LEVARCA — Pashmina Modal Viscose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEVARCA — Pashmina Modal Viscose | Lembut, Adem & Jatuh Natural",
    description:
      "Pashmina Modal Viscose LEVARCA (± 175 x 70 cm). Tersedia warna Midnight Navy, Sweet Candy, Dusty Rose, Butter Cream, dan Mocha Taupe. Harga Promo Rp 89.000.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_CONFIG.name,
    url: BRAND_CONFIG.siteUrl,
    logo: `${BRAND_CONFIG.siteUrl}/logo.png`,
    description:
      "Brand hijab wanita LEVARCA yang menghadirkan koleksi Pashmina Modal Viscose berkualitas tinggi yang lembut, adem, breathable, dan jatuh natural.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cikarang",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${BRAND_CONFIG.whatsappNumber}`,
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Koleksi Pashmina Modal Viscose LEVARCA",
    description: `${PRODUCT_SPECS.productType} ukuran ${PRODUCT_SPECS.dimensions} dengan finishing ${PRODUCT_SPECS.finishing}.`,
    numberOfItems: HIJAB_VARIANTS.length,
    itemListElement: HIJAB_VARIANTS.map((variant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `LEVARCA Pashmina Modal Viscose - ${variant.name}`,
        sku: variant.sku,
        color: variant.name,
        material: variant.material,
        size: variant.dimensions,
        description: variant.description,
        image: `${BRAND_CONFIG.siteUrl}/logo.png`,
        brand: {
          "@type": "Brand",
          name: BRAND_CONFIG.name,
        },
        offers: {
          "@type": "Offer",
          url: `${BRAND_CONFIG.siteUrl}/#${variant.id}`,
          priceCurrency: "IDR",
          price: variant.price,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      },
    })),
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-stone-900 selection:text-amber-100">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
