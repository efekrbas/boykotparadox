import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Bellek içi IP kayan pencere (sliding-window) hız sınırlayıcı (Rate Limiter)
const ipRateMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS_PER_WINDOW = 60; // Dakika başına en fazla 60 istek

// Otomatik açık tarayıcıların (botnet / vulnerability scanner) aradığı zararlı yollar
const BLOCKED_PATH_PATTERNS = [
  /\.env(\.|$)/i,
  /\.git(\/|$)/i,
  /\.aws(\/|$)/i,
  /\.docker/i,
  /\/wp-(admin|login|content|includes)/i,
  /\/xmlrpc\.php/i,
  /\/phpmyadmin/i,
  /\/actuator(\/|$)/i,
  /\/eval-stdin/i,
  /\/config\.(json|yaml|yml)/i,
  /\/(cgi-bin|autodiscover|server-status)/i,
];

// Bilinen zararlı zafiyet tarama araçları ve exploit User-Agent imzaları
const MALICIOUS_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "masscan",
  "acunetix",
  "nmap",
  "dirbuster",
  "gobuster",
  "wpscan",
  "hydra",
  "havij",
  "nessus",
  "zgrab",
  "censys",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // 1. Zararlı Zafiyet Tarayıcı Botları Engelle
  for (const bot of MALICIOUS_USER_AGENTS) {
    if (userAgent.includes(bot)) {
      return new NextResponse("Access Denied: Malicious scanner detected.", {
        status: 403,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  // 2. Hassas Dosya ve Yol Taramalarını (Probe Attacks) Engelle
  for (const pattern of BLOCKED_PATH_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse("Forbidden: Unauthorized probe detected.", {
        status: 403,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  // 3. API Rotaları için Rate Limiting (/api/*)
  if (pathname.startsWith("/api/")) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    const clientRecord = ipRateMap.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
      ipRateMap.set(ip, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    } else {
      clientRecord.count += 1;
      if (clientRecord.count > MAX_REQUESTS_PER_WINDOW) {
        const retryAfter = Math.ceil((clientRecord.resetTime - now) / 1000);
        return NextResponse.json(
          {
            error: "Too Many Requests",
            message: "Hız sınırı aşıldı. Lütfen bir süre sonra tekrar deneyin.",
            retryAfter,
          },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
              "X-RateLimit-Limit": MAX_REQUESTS_PER_WINDOW.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": clientRecord.resetTime.toString(),
            },
          }
        );
      }
    }

    // Belleğin dolmasını önlemek için eski kayıtları temizle
    if (ipRateMap.size > 2000) {
      for (const [key, record] of ipRateMap.entries()) {
        if (now > record.resetTime) {
          ipRateMap.delete(key);
        }
      }
    }
  }

  // 4. Güvenlik Başlıklarını İleterek İlerlet
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: [
    /*
     * Statik dosyaları ve arama/AI dosyalarını doğrudan CDN'den sun (SEO/AEO/GEO hız optimizasyonu):
     * - _next/static, _next/image
     * - favicon.ico, sitemap.xml, robots.txt, llms.txt
     * - Statik medya ve dosya uzantıları
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
