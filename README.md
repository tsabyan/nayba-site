# Nayba — draft 2

Situs perusahaan Nayba. Next.js 16 (App Router, Turbopack) + Tailwind 4.
Produksi: **https://nayba.id** (Vercel).

## Jalan lokal

```bash
npm install
cp .env.example .env.local   # lalu isi nilainya
npm run dev
```

`npm run build` menjalankan `npm run periksa` lebih dulu dan gagal kalau ada
nilai kontak yang belum diisi. Itu disengaja — lihat bagian Pemeriksaan.

## Environment variables

Semua nilai kontak dan analitik hidup di environment variable, bukan di kode.
Daftar lengkap ada di [`.env.example`](.env.example).

| Variabel | Wajib | Isi |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP` | ya | Nomor WhatsApp bisnis, format `62…`, tanpa `+` dan spasi |
| `NEXT_PUBLIC_EMAIL` | ya | Inbox tujuan formulir brief |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | ya | Access key Web3Forms yang terikat ke inbox di atas |
| `NEXT_PUBLIC_SITE_URL` | tidak | Host kanonik tanpa garis miring akhir. Kosong = `https://nayba.id` |
| `NEXT_PUBLIC_KOTA` | tidak | Kota basis kerja. Kosong = `Yogyakarta` |
| `NEXT_PUBLIC_GA_ID` | tidak | GA4 measurement id, `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | tidak | GTM container id, `GTM-XXXXXXX` |
| `NEXT_PUBLIC_INSTAGRAM` | tidak | URL profil, masuk ke JSON-LD `sameAs` |
| `NEXT_PUBLIC_LINKEDIN` | tidak | URL profil, masuk ke JSON-LD `sameAs` |
| `IZINKAN_CONTOH` | tidak | `1` = izinkan studi kasus contoh ikut terbit |

Dua hal yang gampang menggigit:

1. **`NEXT_PUBLIC_` dibekukan saat build.** Mengubah nilainya di Vercel tidak
   berpengaruh apa pun sampai proyek di-redeploy. Ubah → Redeploy.
2. **Nilainya terlihat publik** di HTML yang terkirim ke browser. Tidak masalah
   untuk semua variabel di atas — nomor WhatsApp memang untuk dibaca orang, dan
   access key Web3Forms memang dirancang publik serta terikat ke satu inbox.
   Jangan pernah menaruh rahasia asli (kunci API berbayar, kredensial database)
   dengan awalan `NEXT_PUBLIC_`.

### Mengisinya di Vercel

Project → Settings → Environment Variables → tambah satu per satu, centang
**Production**, **Preview**, dan **Development**. Setelah semua masuk:
Deployments → deployment terakhir → ⋯ → **Redeploy**.

## Domain

Domain utama di Vercel adalah apex `nayba.id`; `www.nayba.id` mengarah ke sana
dengan 308. Itu harus tetap sejalan dengan `NEXT_PUBLIC_SITE_URL` (atau nilai
bawaannya), karena sitemap, `robots.txt`, tag OpenGraph, dan JSON-LD semuanya
dibangun dari satu nilai itu. Kalau host utama di Vercel diganti ke `www`,
`NEXT_PUBLIC_SITE_URL` harus ikut diganti — kalau tidak, mesin pencari menerima
dua alamat untuk halaman yang sama dan sinyalnya terbelah.

## Analitik

Dua lapis, karena keduanya menutupi kelemahan yang lain.

**Vercel Web Analytics** — aktif otomatis lewat `<Analytics />` di
`app/layout.tsx`. Tidak butuh kunci, tidak pakai cookie, jadi tidak perlu
banner persetujuan. Aktifkan sekali di Vercel: Project → **Analytics** →
*Enable*. Paket Hobby: 50.000 event/bulan gratis, tapi datanya hanya disimpan
**1 bulan** dan tidak mendukung custom event atau parameter UTM.

**Google Analytics 4** — untuk ingatan panjang (retensi 14 bulan) dan laporan
yang lebih dalam. Tidak aktif sampai `NEXT_PUBLIC_GA_ID` diisi.

Isi **salah satu** dari `NEXT_PUBLIC_GA_ID` atau `NEXT_PUBLIC_GTM_ID`, jangan
keduanya — kalau GA4 dipasang langsung *dan* lewat container GTM, setiap
kunjungan terhitung dua kali. `npm run periksa` menolak build kalau keduanya
terisi.

### Menyiapkan GA4 (`NEXT_PUBLIC_GA_ID`)

Pakai ini kalau yang dibutuhkan hanya statistik kunjungan.

1. Buka <https://analytics.google.com> → **Admin** → **Create** → **Property**.
   Isi nama properti, zona waktu **(GMT+07:00) Jakarta**, mata uang **IDR**.
2. Lanjut sampai **Data collection** → pilih platform **Web**.
3. Isi Website URL `https://nayba.id`, beri nama stream, **Create stream**.
4. Salin **Measurement ID** di kanan atas — bentuknya `G-XXXXXXXXXX`.
5. Masukkan sebagai `NEXT_PUBLIC_GA_ID` di Vercel, lalu **Redeploy**.
6. Cek di GA4 → **Reports** → **Realtime** sambil membuka situs. Kunjungan
   harus muncul dalam hitungan detik.

Laporan yang menjawab pertanyaan paling sering:

- Total pengunjung → **Reports → Life cycle → Acquisition → Overview**
- Halaman pertama yang dibuka → **Reports → Engagement → Landing page**
- Halaman paling ramai → **Reports → Engagement → Pages and screens**
- Asal trafik (Google, WhatsApp, Instagram) → **Acquisition → Traffic acquisition**

### Menyiapkan GTM (`NEXT_PUBLIC_GTM_ID`)

Pakai ini kalau nanti mau menambah Google Ads, Meta Pixel, atau tag lain tanpa
menyentuh kode lagi.

1. Buka <https://tagmanager.google.com> → **Create Account**. Target platform
   **Web**, container URL `nayba.id`.
2. Salin **Container ID** — bentuknya `GTM-XXXXXXX`.
3. Masukkan sebagai `NEXT_PUBLIC_GTM_ID` di Vercel (dan **kosongkan**
   `NEXT_PUBLIC_GA_ID`), lalu **Redeploy**.
4. Di dalam GTM, tambah tag GA4: **Tags** → **New** → *Google Tag* → isi
   Measurement ID `G-XXXXXXXXXX` → trigger **All Pages** → **Save** →
   **Submit**.

Catatan hukum: GA4 dan GTM menaruh cookie. Situs ini belum punya banner
persetujuan. Untuk pengunjung Indonesia itu belum jadi kewajiban, tapi begitu
ada trafik Uni Eropa yang serius, banner persetujuan wajib ditambahkan.

## Portofolio

Satu berkas MDX per proyek di `content/portofolio/`. Frontmatter-nya dibaca
`lib/content.ts`; isi di bawah frontmatter dirender sebagai MDX.

Nama klien hanya muncul kalau `izinNama: true`. Gerbangnya ada di lapisan data
(`namaKlien()`), bukan di template, supaya NDA tidak bisa bocor karena lupa —
tanpa izin, yang tampil adalah `Sektor, Kota`.

### Gambar

Dua berkas per proyek, karena satu potongan tidak bisa melayani dua bentuk:
memotong tangkapan layar 16:11 menjadi 2,5:1 membuang sebagian besar antarmuka
yang justru ingin ditunjukkan.

| Bidang | Rasio | Ukuran yang disiapkan | Dipakai di |
|---|---|---|---|
| `gambarUtama` | 16:11 | **1600 × 1100** | Kartu di beranda dan indeks portofolio |
| `gambarLebar` | 2,5:1 | **2880 × 1150** | Spanduk penuh di halaman studi kasus |

Angka itu 2× dari ukuran render sebenarnya pada layar 1920px (547 × 376 dan
1905 × 760), karena isinya tangkapan layar — teks di dalamnya butuh kerapatan
piksel. Taruh berkasnya di `public/images/mockup/`, lalu tulis jalurnya di
frontmatter:

```yaml
gambarUtama: /images/mockup/nama-proyek-kartu.png
gambarLebar: /images/mockup/nama-proyek-spanduk.png
```

Nama berkas harus ASCII. Tanda kali Unicode (`×`) yang ikut tersalin dari
ukuran gambar terlihat sama dengan huruf `x` tapi harus dikodekan di URL, dan
perilakunya berbeda antar sistem berkas dan CDN.

PNG atau WebP sama saja sebagai sumber — Next mengubahnya ke AVIF/WebP saat
disajikan, dan PNG 1,5 MB keluar sekitar 48 kB pada lebar 1200px. Yang penting
resolusinya, bukan ukuran berkasnya. Tanpa gambar, slotnya memakai panel fakta
proyek itu sendiri dan tetap rapi.

Kalau data di layar tidak boleh terlihat, ganti isinya dengan data contoh yang
masuk akal, jangan diburamkan. Buram terbaca sebagai ada yang disembunyikan.

## Formulir brief & hCaptcha

Brief dikirim langsung dari browser ke Web3Forms — tidak ada route handler di
proyek ini. Tiga lapis penyaring, dan hanya satu di antaranya yang berarti:

| Lapis | Menahan | Batasnya |
|---|---|---|
| Honeypot (`website-perusahaan`) | bot yang mengisi semua kolom | hanya yang memakai formulir ini |
| Jeda minimum 3 detik | bot yang mengisi lebih cepat dari manusia membaca | sama |
| hCaptcha | siapa pun, termasuk yang mengirim langsung ke API | — |

Access key Web3Forms memang publik dan terbaca di HTML halaman ini. Artinya dua
lapis pertama bisa dilewati begitu saja dengan mengirim POST sendiri ke
`api.web3forms.com`. hCaptcha satu-satunya yang tidak bisa, karena token-nya
diperiksa di sisi Web3Forms.

**Dua tempat ini harus selalu sejalan.** hCaptcha aktif di dasbor Web3Forms
membuat token wajib pada setiap kiriman; formulir yang tidak mengirim
`h-captcha-response` ditolak mentah-mentah. Jadi kalau captcha dimatikan di
dasbor, komponen `<HCaptcha>` di `components/BriefForm.tsx` boleh ikut dicabut —
dan sebaliknya, jangan pernah menyalakannya di dasbor tanpa memasang widgetnya.

Site key bawaan (`50b2fe65-…`) adalah kunci bersama untuk paket gratis
Web3Forms — publik, dan tidak perlu disembunyikan. Paket berbayar memakai kunci
sendiri; isi lewat `NEXT_PUBLIC_HCAPTCHA_KEY`.

hCaptcha memuat skrip, iframe, dan gayanya dari `hcaptcha.com`, jadi keempat
host itu terdaftar di CSP (`script-src`, `style-src`, `frame-src`,
`connect-src`) di `next.config.ts`. Menghapusnya dari sana membuat kotak
verifikasi tidak muncul sama sekali.

## Pemeriksaan

`npm run periksa` jalan otomatis sebelum `npm run build`. Tiga kelompok:

1. **Data lead** — `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`, dan
   `NEXT_PUBLIC_WEB3FORMS_KEY` harus terisi dan bukan nilai contoh. Tidak bisa
   dilewati. Situs dengan tautan WhatsApp mati dan formulir yang ditolak
   Web3Forms terlihat hidup tapi tidak menghasilkan apa pun — itu cara paling
   mahal untuk rusak.
2. **Studi kasus contoh** — `content/portofolio/contoh-*.mdx` memblokir build
   kecuali `IZINKAN_CONTOH=1`. Empat contoh yang sempat tayang sudah dihapus,
   jadi flag itu tidak lagi diperlukan dan harus dicabut dari Vercel. Kalau
   flag masih aktif sementara tidak ada berkas contoh, `periksa` memperingatkan
   — bypass yang menyala tanpa dipakai adalah bypass yang dilupakan.
3. **Klaim terlarang** — tanpa `PT`/`CV`, alamat jalan, atau superlatif. Tidak
   bisa dilewati.

Sebelum perubahan ini, kelompok 1 dan 2 memakai flag yang sama. Menyalakan
bypass portofolio ikut mematikan pemeriksaan kontak — itu sebabnya nomor
WhatsApp contoh dan access key `GANTI-…` sempat tayang di produksi.

## Aturan isi

Nayba belum berbadan hukum dan belum punya kantor. Situs ini tidak boleh memuat
awalan `PT`/`CV`, alamat jalan, jumlah karyawan, tahun berdiri, logo klien, atau
testimoni. Nama klien hanya muncul kalau `izinNama: true` di frontmatter
portofolio. Rinciannya di [`AGENTS.md`](AGENTS.md).
