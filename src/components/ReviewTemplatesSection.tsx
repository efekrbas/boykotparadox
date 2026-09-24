import { useState } from "react";
import { Copy, Check, MessageSquareText, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { REVIEW_TEMPLATES } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";

export function ReviewTemplatesSection() {
  const [selectedId, setSelectedId] = useState(REVIEW_TEMPLATES[0]?.id ?? "");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTemplate =
    REVIEW_TEMPLATES.find((t) => t.id === selectedId) || REVIEW_TEMPLATES[0]!;

  const handleCopy = (id: string, text: string) => {
    playStampSound();
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedId(id);
        toast.success("1 Yıldız Metni Panoya Kopyalandı!", {
          description: "Şimdi açılan inceleme sayfasına yapıştırın ve 1 yıldızı verin.",
        });
        setTimeout(() => setCopiedId(null), 2500);
      },
      () => {
        toast.error("Metin kopyalanamadı, lütfen metni seçip manuel kopyalayın.");
      },
    );
  };

  return (
    <section id="sablonlar" className="mx-auto max-w-[1240px] px-5 py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
            <Sparkles className="size-3.5" />
            Tek Tıkla Kopyala & Yapıştır
          </div>
          <h2 className="mt-1 font-display text-3xl tracking-tight uppercase sm:text-4xl">
            Hazır 1 Yıldız İnceleme Metinleri
          </h2>
        </div>
        <p className="max-w-[44ch] text-xs text-mute sm:text-sm">
          Platformlar (Steam, Metacritic, Trustpilot) doğrudan harici metin aktarımına izin vermez.
          Aşağıdaki hazır protesto metinlerinden birini tek tıkla kopyalayıp sayfaya yapıştırarak 1 yıldızı verin!
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Template Selector List */}
        <div className="flex flex-col gap-2.5 lg:col-span-5">
          {REVIEW_TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedId;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedId(tmpl.id)}
                className={`group relative flex flex-col items-start border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-ink bg-ink text-paper shadow-[4px_4px_0_0_oklch(0.556_0.216_27.5)]"
                    : "border-ink/20 bg-paper hover:border-ink hover:bg-paper/70"
                }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider ${
                      isSelected ? "text-seal" : "text-seal font-bold"
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase px-1.5 py-0.5 border ${
                      isSelected
                        ? "border-paper/30 text-paper/70"
                        : "border-ink/20 text-mute"
                    }`}
                  >
                    {tmpl.language === "tr" ? "TR" : "EN"}
                  </span>
                </div>
                <div className="mt-1 font-display text-xl uppercase tracking-tight">
                  {tmpl.title}
                </div>
                <div
                  className={`mt-2 line-clamp-2 text-xs ${
                    isSelected ? "text-paper/75" : "text-mute"
                  }`}
                >
                  {tmpl.text}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Template Preview & Action Box */}
        <div className="flex flex-col justify-between border-2 border-ink bg-paper p-6 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquareText className="size-4 text-seal" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  {activeTemplate.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-mute">
                <span>Önerilen yerler:</span>
                {activeTemplate.recommendedFor.map((rec) => (
                  <span
                    key={rec}
                    className="border border-ink/15 bg-ink/5 px-1.5 py-0.5 font-semibold text-ink"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mt-4">
              <textarea
                readOnly
                value={activeTemplate.text}
                rows={7}
                className="w-full resize-none border border-ink/15 bg-paper p-3.5 font-body text-sm leading-relaxed text-ink outline-none selection:bg-seal selection:text-paper"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-mute">
                <span>Karakter sayısı: {activeTemplate.text.length}</span>
                <span>{activeTemplate.language === "tr" ? "Türkçe" : "English"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4">
            <button
              type="button"
              onClick={() => handleCopy(activeTemplate.id, activeTemplate.text)}
              className="inline-flex items-center gap-2.5 bg-seal px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-transform active:translate-y-px hover:brightness-110"
            >
              {copiedId === activeTemplate.id ? (
                <>
                  <Check className="size-4" />
                  Metin Kopyalandı!
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Metni Kopyala (1 Tıkla)
                </>
              )}
            </button>

            <a
              href="#oyunlar"
              className="inline-flex items-center gap-2 border border-ink bg-paper px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <span>Platform Seç & Yapıştır</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
