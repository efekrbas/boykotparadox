# 🇹🇷 Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası

Paradox Interactive'in resmi Hearts of Iron IV Discord sunucusunda Türkiye Cumhuriyeti'nin kurucusu Gazi Mustafa Kemal Atatürk'e ve Türk oyunculara yönelik yapılan hakaretler, mesnetsiz iddialar ve taraflı sansür/ban kararlarına karşı başlatılan bağımsız oyuncu boykotunun resmi web platformu.

---

## 🔥 Temel Özellikler

- **Steam Resmi API Canlı Verileri** — Steam Web API (`/appreviews/<appid>`) entegrasyonu ile tüm Paradox oyunlarının güncel inceleme puanları, Steam durum değerlendirmeleri (Örn: *Çok Olumlu*, *Karışık*, *Çoğunlukla Olumsuz*), anlık toplam olumsuz inceleme sayıları ve olumlu/olumsuz oran çubukları canlı olarak listelenir.
- **Yatay Kaydırmalı Oyun Vitrini** — Oyun kartları pürüzsüz yatay kaydırma (snap carousel) desteğine sahiptir; fare tekerleği (`wheel`) ve kaydırma butonları ile kolayca gezilebilir. Kart görsellerinde odaklanmayı artıran grileşme (grayscale) hover efekti bulunur.
- **Gelişmiş Filtreleme ve Sıralama** — Oyunları kategorilere göre filtreleme (Tüm Oyunlar, Strateji, Epic Games, GOG) ve Steam API metriklerine göre anında sıralama (*Varsayılan*, *En Çok Olumsuz*, *En Düşük Puan*).
- **Çoklu Platform 1★ Desteği** — Steam, Metacritic, Trustpilot, Google Haritalar, Epic Games, GOG, Xbox ve PlayStation platformlarına tek tıkla doğrudan inceleme bağlantıları.
- **Baskın Modu (Tek Tıkla Tüm Sayfalar)** — Seçilen oyunun veya tüm kurumsal hedeflerin tüm platform sayfalarını tek bir dokunuşla yeni sekmelerde sırayla açma imkanı.
- **Simetrik Kurumsal Hedefler** — Paradox Interactive'in Trustpilot, Google Maps (Stockholm HQ), Metacritic, Steam Yayıncı Merkezi ve Glassdoor kurumsal sayfaları.
- **Otomatik Kayan Haber Akışı** — Olayın ulusal ve uluslararası basındaki yankılarını belgeleyen, duraklatılabilir otomatik yatay kaydırmalı medya ve Google News akışı.
- **Hazır Şablonlar & Taktik Rehberler** — Platform moderasyon filtrelerine takılmayan, kurallara uygun kopyala-yapıştır Türkçe ve İngilizce inceleme şablonları ile Anti-Spam kılavuzu.
- **3D İnteraktif Atatürk Anıtı** — Three.js ile modellenmiş dijital Atatürk anıtı ve saygı sahnesi.
- **Viral Paylaşım Araçları** — X (Twitter), Reddit, WhatsApp, Telegram ve doğrudan metin kopyalama ile sosyal medya paylaşım çubuğu.
- **Sesli Geri Bildirim** — Web Audio API üzerinden harici ses dosyası indirmeden prosedürel mühürleme ve tıklama ses efektleri.

---

## 🛠 Teknoloji Yığını

| Katman | Teknoloji | Açıklama |
|---|---|---|
| **Framework** | **Next.js 16 (App Router)** | Hibrit Server-Side Rendering (SSR) & Client Hydration |
| **Kütüphane** | **React 19** | Modern eşzamanlı UI bileşenleri |
| **Derleyici** | **Turbopack** | Ultra hızlı yerel geliştirme ve derleme |
| **Dil** | **TypeScript 5** | Tam tip güvenliği |
| **Stil & CSS** | **Tailwind CSS v4** | CSS-first modern yapılandırma ve PostCSS |
| **Harici API** | **Steam Store Reviews API** | Next.js API Route (`/api/steam-reviews`) üzerinden CORS korumalı & önbellekli canlı veri servisi |
| **3D Görselleştirme** | **Three.js** | İnteraktif 3D dijital heykel renderı |
| **Ses Motoru** | **Web Audio API** | Kod tabanlı saf osilatör ses sentezi |
| **Bildirimler** | **Sonner** | Modern toast bildirimleri |
| **İkon Seti** | **Lucide React** | Optimize SVG ikon kütüphanesi |

---

## 🚀 Yerel Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# 1. Depoyu klonlayın
git clone https://github.com/efekrbas/boykotparadox-next.git
cd boykotparadox-next

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

### Diğer Komutlar

```bash
# Üretim derlemesi oluşturma (Build & Typecheck)
npm run build

# Üretim derlemesini yerelde çalıştırma
npm run start

# Kod denetimi (ESLint)
npm run lint
```

---

## 📁 Proje Dizin Yapısı

```
boykotparadox-next/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── steam-reviews/
│   │   │       └── route.ts         # Steam API Route (Proxy & 5 dk Cache-Control)
│   │   ├── globals.css              # Tailwind v4 tema ve küresel stiller
│   │   ├── layout.tsx               # Kök düzen, OpenGraph, JSON-LD & meta etiketleri
│   │   └── page.tsx                 # SSR giriş noktası, sunucuda Steam verisi çekme
│   ├── components/
│   │   ├── CampaignClient.tsx       # Ana kampanya arayüzü, sayaçlar, yatay liste & baskın modu
│   │   ├── SteamRatingDisplay.tsx   # Canlı 5 yıldız puan, durum rozeti ve olumsuzluk çubuğu
│   │   ├── NewsSourcesSection.tsx   # Otomatik yatay kaydırmalı medya ve haber akışı
│   │   ├── CorporateTargetsSection.tsx # 5 sütunlu simetrik kurumsal hedef kartları
│   │   ├── ReviewTemplatesSection.tsx  # Kopyalanabilir hazır inceleme metinleri
│   │   ├── AntiSpamGuideSection.tsx    # Moderasyon ve anti-spam kılavuzu
│   │   ├── Ataturk3DScene.tsx       # Three.js 3D anıt sahnesi
│   │   ├── BulkLauncherModal.tsx    # Toplu platform açma sihirbazı
│   │   ├── ShareBar.tsx             # Sosyal medya paylaşım butonları
│   │   └── AudioStampToggle.tsx     # Mühür sesi aç/kapa anahtarı
│   ├── data/
│   │   ├── boycottData.ts           # Oyun listesi (AppID'ler, platform linkleri), hedefler, şablonlar
│   │   └── newsSources.ts           # Basın haberleri ve referans arşiv veri seti
│   ├── lib/
│   │   ├── steam.ts                 # Steam API veri tipi tanımları, çeviriler ve fallback veri seti
│   │   └── audio.ts                 # Web Audio API ses efektleri sentezleyici
│   └── assets/                      # Oyun posterleri ve görsel varlıklar
├── public/                          # Faviconlar, manifest, SEO görselleri ve llms.txt
├── next.config.ts                   # Next.js yapılandırması
├── tsconfig.json                    # TypeScript ayarları
└── package.json                     # Proje bağımlılıkları ve scriptleri
```

---

## 🤝 Katkıda Bulunma

Bu girişim, Türk oyuncu topluluğunun milli değerlerine ve kurucu liderine yapılan saygısızlığa karşı başlattığı **tamamen bağımsız ve sivil** bir dayanışma hareketidir. Herhangi bir ticari ya da siyasi amacı bulunmamaktadır.

Katkı sunmak için bir Issue açabilir veya doğrudan Pull Request gönderebilirsiniz.

---

*Mustafa Kemal Atatürk'ün aziz hatırasına ve Türk milletinin onurlu duruşuna saygıyla.*
