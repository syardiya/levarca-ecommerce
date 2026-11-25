export interface HijabVariant {
  id: string;
  name: string;
  collectionName: string;
  tagline: string;
  description: string;
  originalPrice: number;
  originalPriceFormatted: string;
  price: number;
  priceFormatted: string;
  fabricHex: string;
  sheenHex: string;
  shadowHex: string;
  bgGradientCenter: string;
  bgGradientEdge: string;
  accentHex: string;
  isDarkTheme?: boolean;
  material: string;
  dimensions: string;
  finishing: string;
  sku: string;
}

export const PRODUCT_SPECS = {
  productType: "Pashmina Modal Viscose",
  material: "Modal Viscose",
  dimensions: "± 175 x 70 cm",
  finishing: "Jahit Double Stitch",
  originalPrice: 129000,
  originalPriceFormatted: "Rp 129.000",
  promoPrice: 89000,
  promoPriceFormatted: "Rp 89.000",
  promoNote:
    "Info promo lebih lanjut (bundling / diskon tambahan) bisa langsung ditanyakan via WhatsApp.",
  colorDisclaimer:
    "Kemiripan warna 85-95% dengan warna asli, tergantung resolusi/pengaturan layar HP masing-masing.",
  characteristics: [
    "Bahan tipis (karakteristik bahannya), disarankan memakai ciput/inner.",
    "Tidak menumpuk saat dililit di leher karena karakter bahan tipis dan jatuh natural.",
    "Breathable dan nyaman digunakan seharian.",
    "Tampilan mewah, elegan, dan effortless.",
  ],
  careInstructions: [
    "Cuci lembut dengan tangan (hand wash) menggunakan air dingin & deterjen cair ringan.",
    "Hindari memeras kain terlalu keras atau menggunakan pemutih agar serat Modal Viscose tetap awet.",
    "Jemur di tempat teduh dan angin-anginkan dengan posisi digantung lurus.",
    "Setrika dengan suhu rendah (mode silk/rayon) atau gunakan steamer uap.",
  ],
  shippingAndPaymentInfo:
    "Pengiriman setiap hari dari Cikarang (Reguler & Instant) • Pembayaran via Transfer Bank, QRIS, atau konfirmasi Admin WhatsApp.",
};

export const HIJAB_VARIANTS: HijabVariant[] = [
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    collectionName: "LEVARCA Modal Viscose • 01",
    tagline:
      "Biru malam pekat yang elegan, tegas, dan effortless untuk setiap suasana.",
    description:
      "Pashmina berbahan Modal Viscose warna Midnight Navy yang ringan, adem, dan jatuh natural. Tidak menumpuk saat dililit di leher serta memberikan siluet wajah yang rapi seharian.",
    originalPrice: 129000,
    originalPriceFormatted: "Rp 129.000",
    price: 89000,
    priceFormatted: "Rp 89.000",
    fabricHex: "#1C2942",
    sheenHex: "#4F678E",
    shadowHex: "#101829",
    bgGradientCenter: "#EAEEF5",
    bgGradientEdge: "#C8D2E3",
    accentHex: "#1C2942",
    isDarkTheme: false,
    material: "Modal Viscose",
    dimensions: "± 175 x 70 cm",
    finishing: "Jahit Double Stitch",
    sku: "LVR-MVC-NVY",
  },
  {
    id: "sweet-candy",
    name: "Sweet Candy",
    collectionName: "LEVARCA Modal Viscose • 02",
    tagline: "Sentuhan warm blush-beige lembut yang manis, kalem, dan feminin.",
    description:
      "Varian Sweet Candy menghadirkan rona pastel hangat lembut dengan karakter kain Modal Viscose yang breathable, adem di kulit, dan jatuh mengalun natural tanpa terasa berat.",
    originalPrice: 129000,
    originalPriceFormatted: "Rp 129.000",
    price: 89000,
    priceFormatted: "Rp 89.000",
    fabricHex: "#CCC0BA",
    sheenHex: "#E2D9D4",
    shadowHex: "#9F938D",
    bgGradientCenter: "#F6F2F0",
    bgGradientEdge: "#DFD6D2",
    accentHex: "#8C7D76",
    isDarkTheme: false,
    material: "Modal Viscose",
    dimensions: "± 175 x 70 cm",
    finishing: "Jahit Double Stitch",
    sku: "LVR-MVC-SWC",
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    collectionName: "LEVARCA Modal Viscose • 03",
    tagline: "Kombinasi dusty mauve dan tea rose redam yang dewasa serta anggun.",
    description:
      "Warna Dusty Rose dirancang untuk tampilan mewah dan effortless. Karakter bahan Modal Viscose yang tipis dan halus membuatnya mudah di-styling tanpa menumpuk di bagian leher.",
    originalPrice: 129000,
    originalPriceFormatted: "Rp 129.000",
    price: 89000,
    priceFormatted: "Rp 89.000",
    fabricHex: "#B3929E",
    sheenHex: "#CDB2BC",
    shadowHex: "#856772",
    bgGradientCenter: "#F5EEF0",
    bgGradientEdge: "#DDD0D5",
    accentHex: "#7D5E69",
    isDarkTheme: false,
    material: "Modal Viscose",
    dimensions: "± 175 x 70 cm",
    finishing: "Jahit Double Stitch",
    sku: "LVR-MVC-DRS",
  },
  {
    id: "butter-cream",
    name: "Butter Cream",
    collectionName: "LEVARCA Modal Viscose • 04",
    tagline:
      "Krem hangat yang bersih, lembut, dan menyatu dengan berbagai warna outfit.",
    description:
      "Butter Cream menawarkan nuansa warm cream yang timeless. Dijahit rapi dengan finishing Jahit Double Stitch serta bahan Modal Viscose yang adem dipakai seharian.",
    originalPrice: 129000,
    originalPriceFormatted: "Rp 129.000",
    price: 89000,
    priceFormatted: "Rp 89.000",
    fabricHex: "#DFD6BC",
    sheenHex: "#EFE9D6",
    shadowHex: "#B2A88E",
    bgGradientCenter: "#FAF7F0",
    bgGradientEdge: "#E5DEC9",
    accentHex: "#8C8268",
    isDarkTheme: false,
    material: "Modal Viscose",
    dimensions: "± 175 x 70 cm",
    finishing: "Jahit Double Stitch",
    sku: "LVR-MVC-BTC",
  },
  {
    id: "mocha-taupe",
    name: "Mocha Taupe",
    collectionName: "LEVARCA Modal Viscose • 05",
    tagline:
      "Netral earthy-taupe hangat untuk gaya minimalis yang modern dan berkelas.",
    description:
      "Varian Mocha Taupe memadukan rona cokelat taupe keabu-abuan yang tenang dan elegan. Ringan, breathable, jatuh natural, dan sangat nyaman untuk aktivitas harian maupun acara spesial.",
    originalPrice: 129000,
    originalPriceFormatted: "Rp 129.000",
    price: 89000,
    priceFormatted: "Rp 89.000",
    fabricHex: "#AAA096",
    sheenHex: "#C6BEB5",
    shadowHex: "#7D746B",
    bgGradientCenter: "#F3F0ED",
    bgGradientEdge: "#D9D2CB",
    accentHex: "#6E655C",
    isDarkTheme: false,
    material: "Modal Viscose",
    dimensions: "± 175 x 70 cm",
    finishing: "Jahit Double Stitch",
    sku: "LVR-MVC-MTP",
  },
];

export const BRAND_CONFIG = {
  name: "LEVARCA",
  subtitle: "Pashmina Modal Viscose • Lembut, Adem & Jatuh Natural",
  location: "Cikarang (Online)",
  whatsappNumber: "6285894121730",
  whatsappDisplay: "0858-9412-1730",
  siteUrl: "https://levarca-ecommerce.vercel.app",
  logoPngPath: "/logo.png",
  logoSvgPath: "/logo.svg",
};

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
