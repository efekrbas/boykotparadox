# 🇹🇷 Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası

Paradox Interactive'in resmi Hearts of Iron IV Discord sunucusunda Gazi Mustafa Kemal Atatürk'e ve Türk oyunculara yönelik yapılan hakaretler ve taraflı moderasyon kararlarına karşı başlatılan topluluk boykot kampanyasının web platformu.

## 🔥 Özellikler

- **Çoklu Platform Desteği** — Steam, Metacritic, Trustpilot, Google, Epic Games, GOG, Xbox ve PlayStation üzerinden tek tıkla review sayfalarına erişim
- **Baskın Modu** — Tüm oyunların tüm platform review sayfalarını sırayla otomatik açma
- **Oyun Filtreleme & Arama** — Kategori bazlı filtreleme (Strateji, Epic, GOG) ve anlık arama
- **Kurumsal Hedefler** — Paradox Interactive'in Trustpilot, Google Maps ve Metacritic yayıncı sayfaları
- **Hazır Şablonlar** — Kopyala-yapıştır review metinleri (Türkçe & İngilizce)
- **Anti-Spam Rehberi** — Platform kurallarına uygun, etkili review yazma kılavuzu
- **3D İnteraktif Atatürk Anıtı** — Three.js ile oluşturulmuş tam boy dijital Atatürk heykeli
- **Haber Kaynakları** — Olayı belgeleyen medya haberleri ve kaynaklar
- **Paylaşım Araçları** — Twitter/X, Reddit, WhatsApp ve daha fazlası ile viral paylaşım

## 🛠 Teknoloji

| Katman | Teknoloji |
|--------|-----------|
| Framework | TanStack Start (React + Vite) |
| Dil | TypeScript |
| Stil | Tailwind CSS v4 |
| 3D Görsel | Three.js |
| Ses | Web Audio API (procedural) |
| Dağıtım | Cloudflare Workers |
| Hosting | Cloudflare Pages |

## 🚀 Yerel Geliştirme

```bash
git clone https://github.com/efekrbas/paradoxboykot.git
cd paradoxboykot
npm install
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── routes/
│   ├── index.tsx          # Ana sayfa — tüm bölümler
│   └── __root.tsx         # Root layout, meta tags, Toaster
├── components/
│   ├── Ataturk3DScene.tsx       # 3D interaktif Atatürk anıtı
│   ├── BulkLauncherModal.tsx    # Toplu platform açma modal
│   ├── CorporateTargetsSection  # Kurumsal hedef kartları
│   ├── ReviewTemplatesSection   # Hazır review şablonları
│   ├── AntiSpamGuideSection     # Anti-spam rehberi
│   ├── NewsSourcesSection       # Haber kaynakları
│   ├── ShareBar.tsx             # Sosyal paylaşım çubuğu
│   └── AudioStampToggle.tsx     # Ses on/off toggle
├── data/
│   ├── boycottData.ts     # Oyunlar, platformlar, talepler
│   └── newsSources.ts     # Haber kaynakları veri seti
├── lib/
│   └── audio.ts           # Web Audio API ses sentezi
└── assets/                # Oyun görselleri
```

## 📋 Sayfa Akışı

1. **Hero** — Kampanya başlığı, istatistikler, CTA butonları
2. **Oyunları Mühürle** — Oyun kartları, platform linkleri, filtreleme
3. **3D Atatürk Anıtı** — İnteraktif dijital heykel
4. **Olay Nasıl Gelişti** — 3 aşamalı olay özeti + 4 talep
5. **Kurumsal Hedefler** — Trustpilot, Google, Metacritic
6. **Review Şablonları** — Kopyala-yapıştır metinler
7. **Anti-Spam Rehberi** — Etkili review yazma kuralları
8. **Paylaşım Çubuğu** — Sosyal medya paylaşım butonları
9. **Haber Kaynakları** — Medya haberleri ve referanslar
10. **Footer** — Telif, misyon açıklaması

## 🤝 Katkı

Bu proje Türk oyuncu topluluğunun bağımsız bir kamuoyu tepkisidir. Ticari amacı yoktur.

---

*Mustafa Kemal Atatürk'ün aziz hatırasına saygıyla.*
