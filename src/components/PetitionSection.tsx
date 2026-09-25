"use client";

import { useState } from "react";
import { PenLine, Copy, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export const PETITION_URL =
  "https://www.imzakampanyam.com/paradox-interactivein-ataturke-yonelik-saygisiz-icerikleri-kaldirmasini-ve-sorumlular-hakkinda-islem-yapilmasini-talep-ediyoruz-imza-kampanyasi";

export function PetitionSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PETITION_URL);
      setCopied(true);
      toast.success("İmza kampanyası linki kopyalandı!", {
        description: "Sosyal medyada, forumlarda ve gruplarda paylaşarak desteği büyütebilirsiniz.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Link kopyalanamadı.");
    }
  };

  return (
    <section id="imza" className="mx-auto max-w-[1240px] px-5 py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="relative overflow-hidden border-2 border-seal bg-ink text-paper shadow-2xl">
        {/* Subtle red ambient glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.556 0.216 27.5)" }}
        />

        <div className="relative p-6 sm:p-10 lg:p-12">
          {/* Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/15 pb-5">
            <div className="inline-flex items-center gap-2 border border-seal/60 bg-seal/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-seal">
              <span className="size-2 animate-pulse rounded-full bg-seal" />
              Resmi Dijital Dilekçe · İmza Kampanyası
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-paper/70">
              <span className="font-semibold text-paper">Platform:</span> İmzaKampanyam.com
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-paper leading-[1.05]">
                Paradox'a Karşı <span className="text-seal">Resmi İmza</span> Kampanyası
              </h2>

              <p className="mt-4 text-base sm:text-lg text-paper/85 leading-relaxed font-sans">
                Resmi Paradox Discord sunucusunda Türkiye Cumhuriyeti'nin kurucusu Gazi Mustafa Kemal Atatürk'e
                yönelik yapılan saygısızlık, atılan 1915 iftirası ve Türk oyuncuların haksızca banlanması karşısında
                topluluk inisiyatifiyle resmi imza kampanyası başlatıldı.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="border border-paper/15 bg-paper/5 p-3.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-seal font-bold">1. Talep</div>
                  <div className="mt-1 text-xs text-paper/80 font-sans leading-snug">
                    Tüm iftira ve saygısız içeriklerin derhal kaldırılması
                  </div>
                </div>
                <div className="border border-paper/15 bg-paper/5 p-3.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-seal font-bold">2. Talep</div>
                  <div className="mt-1 text-xs text-paper/80 font-sans leading-snug">
                    Türk milletinden ve oyunculardan kurumsal resmi özür
                  </div>
                </div>
                <div className="border border-paper/15 bg-paper/5 p-3.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-seal font-bold">3. Talep</div>
                  <div className="mt-1 text-xs text-paper/80 font-sans leading-snug">
                    Moderatör 'chakerathe' ve sorumlular hakkında işlem
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href={PETITION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 bg-seal px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper shadow-lg shadow-seal/20 transition-all active:translate-y-px hover:brightness-110 min-w-[260px]"
                >
                  <PenLine className="size-4 transition-transform group-hover:rotate-12" />
                  <span>Kampanyaya Git & İmzala</span>
                  <ArrowUpRight className="size-4 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2.5 border-2 border-paper/30 bg-paper/10 px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper transition-all hover:border-paper hover:bg-paper/20 min-w-[260px]"
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>Dilekçe Linkini Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Card / Callout */}
            <div className="lg:col-span-5">
              <div className="border-2 border-paper/20 bg-paper/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-seal">
                  <Sparkles className="size-4" />
                  <span>Dijital Aktivizm & Güç</span>
                </div>

                <div className="mt-4 border-l-2 border-seal pl-4">
                  <p className="font-display text-lg uppercase text-paper tracking-wide">
                    "Atatürk'ün hatırasına sahip çıkmak hepimizin ortak sorumluluğudur."
                  </p>
                  <span className="mt-2 block font-mono text-xs text-paper/60">
                    — İmza Kampanyası Bildirisi
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-paper/75 leading-relaxed">
                  Sadece oyun mağazalarında inceleme bırakmakla kalmıyoruz; resmi dilekçe ile Paradox
                  Interactive tepe yönetimine ve uluslararası oyun basınına organize bir topluluk olduğumuzu
                  gösteriyoruz.
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-paper/15 pt-4 font-mono text-xs">
                  <span className="text-paper/60 uppercase">Hedef:</span>
                  <span className="font-bold text-seal">1.000+ İmzacı & Büyüyor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
