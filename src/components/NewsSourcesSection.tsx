import { useState } from "react";
import { Newspaper, ExternalLink, Quote, Sparkles, Filter } from "lucide-react";
import { NEWS_SOURCES, type NewsSource } from "@/data/newsSources";

export function NewsSourcesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

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
    <section id="kaynaklar" className="mx-auto max-w-[1240px] px-5 py-14">
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

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2">
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

      {/* News Cards Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSources.map((source) => (
          <article
            key={source.id}
            className="flex flex-col justify-between border-2 border-ink/20 bg-paper p-5 transition-all hover:border-ink hover:shadow-[3px_3px_0_0_oklch(0.183_0.014_70)]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  {source.outlet}
                </span>
                <span className="font-mono text-[10px] text-mute">{source.date}</span>
              </div>

              {source.badge && (
                <div className="mt-2 inline-block border border-ink/20 bg-ink/5 px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-ink">
                  {source.badge}
                </div>
              )}

              <h3 className="mt-2 font-display text-lg uppercase tracking-tight text-ink leading-tight">
                {source.title}
              </h3>

              <p className="mt-2 text-xs text-mute leading-relaxed">
                {source.summary}
              </p>
            </div>

            <div className="mt-5 border-t border-ink/10 pt-3">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-seal"
              >
                <span>Kaynağa Git</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
