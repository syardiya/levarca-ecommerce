# LEVARCA — Pashmina Modal Viscose (3D Interactive E-Commerce)

Website e-commerce 3D interaktif bergaya *luxury editorial fashion* untuk brand hijab wanita **LEVARCA** (`Cikarang (Online)`).

---

## Fitur Utama & Spesifikasi Produk

1. **Identitas Brand & Produk Utama**
   - **Brand**: LEVARCA (`Pashmina Modal Viscose • Lembut, Adem & Jatuh Natural`)
   - **Lokasi Operasional**: Cikarang (Online)
   - **Spesifikasi Pashmina**: Bahan **Modal Viscose**, ukuran **± 175 x 70 cm**, finishing **Jahit Double Stitch**.
   - **Harga Promo**: Harga normal ~~Rp 129.000~~ dicoret menjadi **Rp 89.000** (dengan fitur tanya promo lanjutan/bundling otomatis ke WhatsApp **`0858-9412-1730`**).

2. **5 Varian Warna Aktif (`src/data/hijabVariants.ts`)**
   - **Midnight Navy** (`#1C2942`)
   - **Sweet Candy** (`#CCC0BA`)
   - **Dusty Rose** (`#B3929E`)
   - **Butter Cream** (`#DFD6BC`)
   - **Mocha Taupe** (`#AAA096`)

3. **3D Hero Color-Morphing Showcase & Interactive Horizontal Hijab Rack (`/public/models/hijab.glb`)**
   - Menggunakan model produksi `/models/hijab.glb` (17.920 triangles) dengan 4 Shape Keys (`Sway_Side`, `Billow_Depth`, `Fold_Shift`, `Hem_Flutter`) yang dianimasikan secara prosedural (~10 detik per siklus) di dalam `useFrame` dengan *phase offset* berbeda di setiap gantungan rak.
   - Tekstur prosedural `CanvasTexture` ringan (di-cache secara singleton) untuk serat tenun *plain-weave* Modal Viscose (`bumpMap` & `roughnessMap`) serta detail kelim **Jahit Double Stitch** di sepanjang tepi UV kain.
   - Mendukung interaksi putar 3D manual (*drag-to-rotate* & *pointer tilt*) yang ramah layar HP (anti-nyangkut saat scroll vertikal halaman).

4. **Alur Belanja Nyaman & Konversi WhatsApp (`src/context/CartContext.tsx` & `src/components/CartDrawer.tsx`)**
   - Tombol **Beli Langsung (WA)** untuk pembelian cepat 1 warna.
   - **Floating Mini-Cart Toast Bar** saat menambah item ke tas belanja tanpa menutupi layar katalog.
   - Insentif otomatis **Harga Bundling** di keranjang dan format pesan WhatsApp otomatis untuk pembelian `≥ 2 pcs`.
   - Dilengkapi **Care Guide (Panduan Perawatan Modal Viscose)**, catatan kemiripan warna layar HP `85–95%`, serta info pengiriman harian dari Cikarang.

5. **Fondasi SEO Teknis (`src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`)**
   - Metadata lengkap (`lang="id"`, Open Graph, Twitter Card, Canonical URL), JSON-LD Structured Data (`Organization` & `ItemList` 5 produk), serta `/sitemap.xml` dan `/robots.txt` otomatis.

---

## Tempat Mengatur Produk, Warna, Harga & Nomor WhatsApp

Seluruh data produk, harga promo, warna, dan nomor WhatsApp terpusat di satu file:
👉 **[`src/data/hijabVariants.ts`](src/data/hijabVariants.ts)**

Untuk mengganti logo, cukup ganti file `/public/logo.png` (atau gunakan `/public/logo.svg` yang akan terdeteksi otomatis oleh [`next.config.mjs`](next.config.mjs)).

---

## Cara Menjalankan di Lokal

```bash
npm install
npm run dev
```
Buka **[http://localhost:3000](http://localhost:3000)** di browser.

Untuk memverifikasi build produksi dan linter:
```bash
npm run lint
npm run build
npm run start
```
