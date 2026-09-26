# ⚡ DEDICATEREALITE — Urban Dark-Grunge Web Catalog & Battle-Room

> **Aplikasi Web Katalog Digital Mobile-First, Squeeze Carousel Showcase & Interactive Battle-Room Comparison Matrix untuk Brand Apparel Indie "Dedicaterealite" (Yogyakarta)**  
> *Proyek Tugas Kelompok Interaksi Manusia & Komputer (IMK) — Kelompok 7 Sistem Informasi, UPN "Veteran" Yogyakarta.*  
> 📞 **Nomor WhatsApp Resmi Admin:** `+62 821-1407-2159` (`6282114072159`)

---

## 📸 Overview & Problem Statement

Brand indie streetwear asal Yogyakarta, **Dedicaterealite (@dedicaterealite)**, mengusung DNA desain *dark-grunge*, *Y2K typography*, *oversized boxy-fit tees*, dan budaya underground anak muda urban. Berdasarkan riset pengguna dengan metodologi *Double Diamond* pada demografi usia 18–22 tahun, ditemukan beberapa *pain points* utama:
1. **Informasi Terfragmentasi:** Spesifikasi kaos (GSM katun, siluet boxy, sablon, size chart) sulit dibaca dari caption Instagram yang cepat hilang.
2. **Ketiadaan Showcase Interaktif (Carousel):** Calon pembeli tidak dapat melihat visual pakaian dari berbagai sudut pandang dalam satu wadah geser (*swipeable*).
3. **Ketiadaan Alat Komparasi Kaos:** Pembeli kesulitan membandingkan 2–3 kaos secara objektif sebelum memesan.
4. **Friksi Pemesanan Manual:** Saat chat WhatsApp/DM admin, pembeli sering lupa menyertakan detail ukuran atau kode SKU.
5. **Keterbatasan Anggaran Brand:** Dibutuhkan sistem katalog profesional & admin CMS yang berjalan tanpa biaya sewa server bulanan (*Zero-Cost Infrastructure*).

---

## 🔥 Solusi & Fitur Unggulan (PRD Compliance)

### 1. 🎠 Squeeze Carousel Hero Showcase (`/components/ui/carousel-squeeze.tsx`)
- Mengintegrasikan komponen modern **SqueezeCarousel** di folder standar shadcn `/components/ui/`:
  - 4 kolom dinamis (`SHARES = [-0.06, 0.61, 0.3, 0.15]`) dengan bilah slat samping.
  - Efek pelebaran saat kursor diarahkan (*hover grow* / `STRETCHED`).
  - Animasi transisi geser horizontal berbasis *cubic-bezier* (`0.16, 1, 0.3, 1`) dengan kurva halus.
  - Teks deskripsi dan tombol Call-to-Action yang melakukan transisi silang (*cross-fade*).
  - Foto model *streetwear* resolusi tinggi kurasi Unsplash (Boxy Tees, Collab Drop, Acid Washed, Longsleeve, Zip Hoodie).

### 2. 👕 Multi-Angle Product Detail Gallery
- Setiap item pakaian dilengkapi **4 sudut pandang visual**:
  1. **Tampak Depan (Front View):** Siluet boxy, rib kerah 3.5cm, dan logo grafis dada.
  2. **Tampak Belakang (Back Graphic):** Sablon punggung lebar khas streetwear Y2K & barcode arsip.
  3. **Detail Sablon (Print Macro Detail):** Pembesaran makro tekstur rajutan katun combed 16s dan tekstur sablon plastisol high-density.
  4. **Tampilan Model (On-Body Look):** Siluet fitting streetwear urban, drape bahu turun (*drop shoulder*), dan styling celana kargo.

### 3. ⚔️ Creative "Battle-Room" Comparison Matrix
- **Floating Bottom Bar:** Menampilkan thumbnail hingga 3 kaos yang dipilih dengan lencana status.
- **Side-by-Side Comparison Matrix:** Memperbandingkan atribut penting secara berdampingan:
  - Pratinjau visual & siluet pakaian
  - Nominal harga & status ketersediaan (*Ready Stock / PO / Sold Out*)
  - Bahan katun & meteran densitas gramasi (*GSM density meter*)
  - Siluet potongan (*Boxy Cut* vs *Loose Oversized* vs *Regular*)
  - Karakter teknik sablon (*High-Density Plastisol* vs *Discharge* vs *Cracked Ink*)
  - Perbandingan langsung tabel *Size Chart* (Lebar Dada & Panjang Badan)
  - Tombol langsung **"Beli Ini via WA"** di tiap kolom produk.

### 4. 📲 Direct WhatsApp Order Redirection Engine (Nomor: `+62 821-1407-2159`)
- Mengonversi pilihan ukuran (S/M/L/XL/XXL) dan kuantitas menjadi format draf pesan WhatsApp resmi yang langsung mengarah ke `https://wa.me/6282114072159`:
  ```text
  Halo Admin Dedicaterealite! 🔥
  Saya ingin memesan produk berikut:

  • Produk : [Nama Produk]
  • SKU    : [Kode SKU]
  • Varian : Regular Black / Size [Ukuran]
  • Qty    : [Jumlah] pcs
  • Harga  : Rp [Harga] (Total: Rp [Total])
  • Link   : [URL Produk]

  Data Pembeli:
  • Nama Lengkap : [Nama Pembeli]
  • Kota / Alamat : [Alamat / Kota]

  Apakah varian ini masih tersedia untuk diproses? Terima kasih!
  ```

### 5. 🛡️ Embedded Admin Portal CMS
- Terproteksi dengan sandi admin (Passcode: `dedicate2024` atau `admin123`).
- Pengaturan nomor WhatsApp toko terverifikasi (`6282114072159`).
- CRUD produk, quick stock switcher, dan backup JSON.

---

## 📁 Struktur Komponen shadcn & TypeScript

```text
dedicaterealite-site/
├── components/
│   └── ui/
│       ├── carousel-squeeze.tsx   # Komponen utama SqueezeCarousel
│       └── demo.tsx               # Demonstrasi dengan streetwear slides
├── lib/
│   └── utils.ts                   # Helper cn (clsx + tailwind-merge)
├── src/
│   ├── App.tsx                    # Aplikasi lengkap Dedicaterealite
│   ├── main.tsx                   # React root mount
│   └── index.css                  # Tailwind styles & variable tokens
├── components.json                # shadcn configuration
├── tailwind.config.js             # Tailwind + container-queries plugin
├── tsconfig.json                  # Path aliases (@/*)
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Cara Menjalankan

```bash
# Menjalankan development server Vite
npm start
# atau
npm run dev
```

Buka peramban di: **`http://localhost:3000`**
