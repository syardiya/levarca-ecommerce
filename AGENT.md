# Project Rules: LEVARCA 3D E-Commerce

## Tech Stack & Architecture
- Framework: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, dan React Three Fiber.
- Wajib gunakan dynamic import dengan `ssr: false` untuk seluruh komponen Three.js atau Canvas 3D agar tidak error saat build produksi.
- Simpan seluruh data produk hijab di satu file konfigurasi modular agar mudah diganti dari simulasi 3D ke file `/models/hijab.glb` atau foto PNG transparan tanpa mengubah kode UI.

## Design & Editorial Guidelines
- Gaya visual: Luxury editorial fashion dengan tipografi serif elegan untuk judul besar dan sans-serif bersih untuk teks UI.
- Gunakan tombol berbentuk pill, spacing lega, dan hindari tampilan template kaku.
- Pastikan animasi transisi warna background gradasi selalu sinkron dengan varian warna hijab yang aktif.

## Production Standards
- Optimalkan performa rendering 3D agar ringan di mobile maupun desktop, lengkap dengan fallback loading state.
- Pastikan kode bebas error TypeScript dan ESLint saat menjalankan perintah build.