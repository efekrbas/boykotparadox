"use client";

import { useState, useEffect, useRef } from "react";
import { Newspaper, ExternalLink, Quote, Sparkles, Filter, RefreshCw, Rss, ChevronLeft, ChevronRight } from "lucide-react";
import { NEWS_SOURCES, type NewsSource } from "@/data/newsSources";
import { GAMES } from "@/data/boycottData";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

interface LiveReviewItem {
  review: string;
  author: string;
  playtime: number;
  date: string;
}

// Relative time formatter (e.g., "5 dakika önce")
function getRelativeTime(timestamp: number): string {
  const rtf = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
  const diffInSeconds = Math.floor((timestamp * 1000 - Date.now()) / 1000);
  
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (Math.abs(days) > 0) return rtf.format(days, "day");
  if (Math.abs(hours) > 0) return rtf.format(hours, "hour");
  if (Math.abs(minutes) > 0) return rtf.format(minutes, "minute");
  return rtf.format(diffInSeconds, "second");
}

export function NewsSourcesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [liveReviews, setLiveReviews] = useState<LiveReviewItem[]>([]);
  const [liveAppId, setLiveAppId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = Math.max(300, sliderRef.current.clientWidth * 0.75);
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Horizontal mouse wheel scrolling
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const isScrollingUp = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        const atFarLeft = slider.scrollLeft <= 5;
        const atFarRight = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 5;

        // En sola gelindiğinde yukarı kaydırmaya devam edilirse sayfayı yukarı kaydır
        if (isScrollingUp && atFarLeft) {
          e.preventDefault();
          window.scrollBy({
            top: e.deltaY,
            behavior: "auto",
          });
          return;
        }

        // En sağa gelindiğinde aşağı kaydırmaya devam edilirse sayfayı aşağı kaydır
        if (isScrollingDown && atFarRight) {
          e.preventDefault();
          window.scrollBy({
            top: e.deltaY,
            behavior: "auto",
          });
          return;
        }

        e.preventDefault();
        slider.scrollBy({
          left: e.deltaY * 1.5,
          behavior: "auto",
        });
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, []);

  const fetchLiveReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/steam-live");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const items: LiveReviewItem[] = data.reviews.slice(0, 4).map((it: any) => ({
            review: it.review || "Boş inceleme",
            author: `Oyuncu_${it.author?.steamid?.slice(-4) || "Gizli"}`,
            playtime: Math.round((it.author?.playtime_forever || 0) / 60),
            date: getRelativeTime(it.timestamp_updated || it.timestamp_created),
          }));
          setLiveReviews(items);
          setLiveAppId(data.appId);
          setLastUpdated(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        }
      }
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveReviews();
    const interval = setInterval(fetchLiveReviews, 30000); // Fetch new reviews every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    playStampSound();
    fetchLiveReviews();
    toast.info("Steam İncelemeleri Yenileniyor...", {
      description: "En güncel 1 Yıldız incelemeler çekiliyor.",
    });
  };

  const categories = [
    { id: "all", label: `Tümü (${NEWS_SOURCES.length})` },
    { id: "Ulusal Basın", label: "Ulusal Basın" },
    { id: "Oyun & Teknoloji", label: "Oyun & Teknoloji Portalları" },
    { id: "Topluluk & Forum", label: "Resmi Açıklama & Forum" },
  ];

  const filteredSources =
    activeCategory === "all"
      ? NEWS_SOURCES
      : NEWS_SOURCES.filter((s) => s.category === activeCategory);

  return (
    <section id="kaynaklar" className="mx-auto max-w-[1240px] px-5 pt-6 sm:pt-7 pb-12 scroll-mt-16 sm:scroll-mt-20">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
            <Newspaper className="size-3.5" />
            Medyada ve Kamuoyunda Yankılar
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl tracking-tight uppercase">
            Haber Kaynakları & Basın Açıklamaları
          </h2>
        </div>
        <p className="max-w-[46ch] text-xs text-mute sm:text-sm">
          Olay yalnızca bir Discord tartışması olarak kalmadı; ulusal basında, oyun medyasında ve tarihçilerin açıklamalarında geniş yankı buldu.
        </p>
      </div>

      {/* Featured Quote Card: Emrah Safa Gürkan */}
      <div className="mt-8 border-2 border-seal bg-paper p-6 shadow-[4px_4px_0_0_oklch(0.556_0.216_27.5)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
          <div className="flex items-center gap-2">
            <Quote className="size-5 text-seal" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              Öne Çıkan Tepki · Tarihçi Prof. Dr. Emrah Safa Gürkan
            </span>
          </div>
          <span className="font-mono text-xs text-mute">6.000+ Saatlik Oyuncu</span>
        </div>

        <blockquote className="mt-4 font-display text-xl sm:text-2xl uppercase tracking-tight text-ink leading-snug">
          "6 bin saatten fazla oynadığım oyunu kütüphanemden siliyorum. Atatürk'e yönelik bu tavır açık bir düşmanlık ve tarihi çarpıtmadır."
        </blockquote>

        <p className="mt-3 text-xs sm:text-sm text-mute leading-relaxed">
          Tarihçi ve yazar Prof. Dr. Emrah Safa Gürkan, Paradox Interactive'in moderasyon ekibinin Atatürk'ü 1915 olaylarıyla haksızca bağdaştıran ve "tartışmalı figür" ilan eden mesnetsiz tutumuna en sert tepkilerden birini göstererek boykota katılmıştır.
        </p>

        <div className="mt-4 flex items-center justify-between pt-3 border-t border-ink/10 font-mono text-xs">
          <span className="text-mute">Kaynak: Sözcü Gazetesi & Sosyal Medya Açıklaması</span>
          <a
            href="https://www.sozcu.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-seal font-bold hover:underline"
          >
            <span>Haber Detayı</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Live Auto-fetching Steam Reviews Box */}
      <div className="mt-8 border-2 border-ink bg-ink text-paper p-5 sm:p-7 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/15 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-red-500"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
              Canlı Steam Boykot Akışı
            </span>
          </div>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="hidden font-mono text-[11px] text-paper/60 sm:inline">
                Son Güncelleme: {lastUpdated}
              </span>
            )}
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 border border-paper/20 bg-paper/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-paper hover:bg-paper/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`size-3 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isLoading ? "Taranıyor..." : "Yenile"}</span>
            </button>
          </div>
        </div>

        {liveReviews.length > 0 ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {liveReviews.map((item, idx) => {
              const gameName = GAMES.find(g => g.appId === liveAppId)?.title || "Paradox Oyunu";
              return (
                <div
                  key={idx}
                  className="group flex flex-col justify-between border border-paper/15 bg-paper/5 p-3.5 hover:border-seal hover:bg-paper/10 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] text-paper/60">
                      <span className="text-red-400 font-bold uppercase">{gameName} Oyuncusu</span>
                      <span>{item.date}</span>
                    </div>
                  <h4 className="mt-1.5 font-mono text-xs leading-relaxed text-paper group-hover:text-seal transition-colors line-clamp-3">
                    "{item.review}"
                  </h4>
                </div>
                <div className="mt-2.5 pt-2.5 border-t border-paper/10 flex items-center justify-between font-mono text-[10px] uppercase text-paper/50">
                  <span>{item.author}</span>
                  <span className="text-red-400 font-bold">★ {item.playtime} Saat Oynama</span>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between font-mono text-xs text-paper/70 bg-paper/5 p-3 border border-paper/10">
            <div className="flex items-center gap-2">
              <RefreshCw className="size-4 animate-spin text-red-400" />
              <span>Steam'den güncel olumsuz incelemeler çekiliyor...</span>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Pills & Carousel Controls */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeCategory === cat.id
                  ? "bg-ink text-paper"
                  : "border border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="font-mono text-xs text-mute hidden md:inline">
            ({filteredSources.length} Kaynak)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollSlider("left")}
              className="flex size-8 items-center justify-center border-2 border-ink/20 bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors"
              title="Önceki haberler"
              aria-label="Önceki haberler"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollSlider("right")}
              className="flex size-8 items-center justify-center border-2 border-ink/20 bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper transition-colors"
              title="Sonraki haberler"
              aria-label="Sonraki haberler"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrolling News Cards */}
      <div
        ref={sliderRef}
        tabIndex={0}
        className="mt-6 flex gap-4 overflow-x-auto pb-6 pt-1 px-0.5 scroll-smooth snap-x snap-mandatory focus:outline-none red-scrollbar"
      >
        {filteredSources.map((item) => (
          <article
            key={item.id}
            className="w-[290px] sm:w-[350px] shrink-0 snap-start flex flex-col justify-between border-2 border-ink/20 bg-paper p-5 transition-all hover:border-ink hover:-translate-y-1 shadow-sm"
          >
            <div>
              {/* Badge & Date */}
              <div className="flex items-center justify-between text-xs font-mono text-mute">
                <span className="border border-ink/15 bg-ink/5 px-2 py-0.5 uppercase tracking-wider text-seal font-bold">
                  {item.category}
                </span>
                <span>{item.date}</span>
              </div>

              {/* Source Name */}
              <div className="mt-3 font-mono text-xs font-bold uppercase tracking-wider text-ink/70">
                {item.outlet}
              </div>

              {/* Title */}
              <h3 className="mt-1 font-display text-lg uppercase tracking-tight leading-snug">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="mt-2 text-xs text-mute leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Link Button */}
            <div className="mt-5 pt-3 border-t border-ink/10">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-seal hover:underline font-bold"
              >
                <span>Haber Kaynağına Git</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
