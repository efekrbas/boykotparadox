import { Shield } from "lucide-react";

export function Ataturk3DScene() {
  return (
    <section
      id="anit"
      className="relative overflow-hidden bg-ink text-paper min-h-screen min-h-[100dvh] flex flex-col justify-center py-10 sm:py-16 scroll-mt-14 sm:scroll-mt-16"
    >
      <div className="relative mx-auto max-w-[1240px] px-5 w-full my-auto">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left Text / Manifesto Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Shield className="size-4" />
              Ebedi Değerimiz · Saygı ve Minnetle
            </div>

            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.02]">
              <span className="block">Atatürk</span>
              <span className="block mt-1 text-seal">Tartışılamaz.</span>
            </h2>

            <div className="mt-3.5 border-l-2 border-seal pl-4 font-mono text-xs uppercase tracking-wider text-paper/70">
              "Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır."
            </div>

            <p className="mt-3.5 text-sm sm:text-base text-paper/80 leading-relaxed max-w-[50ch]">
              Paradox Interactive moderatörlerinin Türkiye Cumhuriyeti'nin kurucusunu "tartışmalı bir figür" olarak nitelendirmesi,
              yalnızca Türk oyunculara değil, bağımsızlık mücadelesine ve bir ulusun ortak onuruna yapılmış kabul edilemez bir saygısızlıktır.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="border border-paper/20 bg-paper/5 px-3 py-1.5 font-mono text-xs">
                <span className="text-paper/70">Türklerin Babası</span>
              </div>
              <div className="border border-paper/20 bg-paper/5 px-3 py-1.5 font-mono text-xs text-paper/70">
                <span>Kurucu & Ebedi Başkomutan</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-paper/10 pt-3 font-mono text-xs text-paper/50">
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
                  className="w-full max-h-[380px] sm:max-h-[460px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
                  loading="eager"
                />
              </div>

              {/* Dignified Memorial Monument Pedestal (Kaide) */}
              <div className="relative z-20 -mt-2 w-full max-w-[340px] sm:max-w-[380px] border-t-2 border-seal/60 bg-ink px-4 py-2.5 text-center shadow-2xl">
                <div className="font-display text-base uppercase tracking-widest text-paper sm:text-xl">
                  Gazi Mustafa Kemal Atatürk
                </div>
                <div className="mt-1 flex flex-col items-center justify-center gap-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-seal">
                  <span className="text-center leading-relaxed">Türkiye Cumhuriyeti Kurucusu</span>
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
