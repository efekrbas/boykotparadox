import type { NextConfig } from "next";

const securityHeaders = [
  // Clickjacking koruması: Sitenin kötü niyetli iframe'ler içine gömülmesini engeller
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // MIME sniffing engelleme: Dosyaların amaç dışı çalıştırılmasını önler
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referrer sızıntılarını önler
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Kullanılmayan hassas tarayıcı özelliklerini kısıtlar
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), display-capture=()",
  },
  // HTTPS bağlantısını zorunlu kılar (HSTS - 2 yıl)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // XSS saldırılarına karşı tarayıcı filtresi
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // DNS önbelleğe alma optimizasyonu
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  // Sunucu bilgilerini gizler (X-Powered-By: Next.js başlığını kaldırır)
  poweredByHeader: false,
  // Yanıtları sıkıştırarak DDoS ve yavaş okuma saldırılarına karşı direnç sağlar
  compress: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
