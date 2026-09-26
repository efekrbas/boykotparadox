import { Shield } from "lucide-react";

export function Ataturk3DScene() {
  return (
    <section
      id="anit"
      className="relative w-full overflow-hidden bg-ink text-paper border-b-2 border-ink py-10 sm:py-16 scroll-mt-12 sm:scroll-mt-14"
    >
      <div className="relative mx-auto max-w-[1240px] px-5 w-full">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Left Text / Manifesto Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-seal font-bold">
              <Shield className="size-4" />
              Ebedi Değerimiz · Saygı ve Minnetle
            </div>

            <h2 className="mt-1.5 font-display text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.02]">
              <span className="block">Atatürk</span>
              <span className="block mt-0.5 text-seal">Tartışılamaz.</span>
            </h2>

            <div className="mt-2.5 border-l-2 border-seal pl-3.5 font-mono text-xs uppercase tracking-wider text-paper/70">
              "Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır."
            </div>

            <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-paper/80 leading-relaxed max-w-[50ch]">
              Paradox Interactive moderatörlerinin Türkiye Cumhuriyeti'nin kurucusunu "tartışmalı bir figür" olarak nitelendirmesi,
              yalnızca Türk oyunculara değil, bağımsızlık mücadelesine ve bir ulusun ortak onuruna yapılmış kabul edilemez bir saygısızlıktır.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="border border-paper/20 bg-paper/5 px-2.5 py-1 font-mono text-xs">
                <span className="text-paper/70">Türklerin Babası</span>
              </div>
              <div className="border border-paper/20 bg-paper/5 px-2.5 py-1 font-mono text-xs text-paper/70">
                <span>Kurucu & Ebedi Başkomutan</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-paper/10 pt-2.5 font-mono text-xs text-paper/50">
              <span className="text-seal">🇹🇷</span>
              <span>Cumhuriyetimizin ve bağımsızlığımızın mimarına sonsuz saygı ve bağlılıkla.</span>
            </div>
          </div>

          {/* Right Monument Display (Clean, Dignified, No Distracting Effects) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[420px] flex flex-col items-center">
              {/* Leader Visual - Standing Proud & Pure Cutout */}
              <div className="relative z-10 w-full flex justify-center">
                <img
                  src="/ataturk-transparent.png"
                  alt="Gazi Mustafa Kemal Atatürk"
                  className="w-full max-h-[260px] sm:max-h-[340px] lg:max-h-[400px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                  loading="eager"
                />
              </div>

              {/* Dignified Memorial Monument Pedestal (Kaide) */}
              <div className="relative z-20 -mt-2 w-full max-w-[320px] sm:max-w-[360px] border-t-2 border-seal/60 bg-ink px-4 py-2 text-center shadow-2xl">
                <div className="font-display text-sm sm:text-base uppercase tracking-widest text-paper">
                  Gazi Mustafa Kemal Atatürk
                </div>
                <div className="mt-0.5 flex flex-col items-center justify-center gap-0.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-seal">
                  <span className="text-center leading-normal">Türkiye Cumhuriyeti Kurucusu</span>
                  <div className="flex items-center justify-center gap-2">
                    <span>1881</span>
                    <span>—</span>
                    <span className="text-sm font-bold leading-none">∞</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
