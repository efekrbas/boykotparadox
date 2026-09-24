import { Shield } from "lucide-react";

export function Ataturk3DScene() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper py-16 sm:py-20">
      <div className="relative mx-auto max-w-[1240px] px-5">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Text / Manifesto Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Shield className="size-4" />
              Ebedi Değerimiz · Saygı ve Minnetle
            </div>

            <h2 className="mt-3 font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[0.92]">
              Atatürk
              <br />
              <span className="text-seal">Tartışılamaz.</span>
            </h2>

            <div className="mt-5 border-l-2 border-seal pl-4 font-mono text-xs uppercase tracking-wider text-paper/70">
              "Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır."
            </div>

            <p className="mt-5 text-sm sm:text-base text-paper/80 leading-relaxed max-w-[50ch]">
              Paradox Interactive moderatörlerinin Türkiye Cumhuriyeti'nin kurucusunu "tartışmalı bir figür" olarak nitelendirmesi,
              yalnızca Türk oyunculara değil, bağımsızlık mücadelesine ve bir ulusun ortak onuruna yapılmış kabul edilemez bir saygısızlıktır.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="border border-paper/20 bg-paper/5 px-3 py-1.5 sm:py-2 font-mono text-xs">
                <span className="text-seal font-bold">1881 — ∞</span>
                <span className="ml-2 text-paper/70">Gazi Mustafa Kemal Atatürk</span>
              </div>
              <div className="border border-paper/20 bg-paper/5 px-3 py-1.5 sm:py-2 font-mono text-xs text-paper/70">
                <span>Kurucu & Ebedi Başkomutan</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-paper/10 pt-4 font-mono text-xs text-paper/50">
              <span className="text-seal">🇹🇷</span>
              <span>Cumhuriyetimizin ve bağımsızlığımızın mimarına sonsuz saygı ve bağlılıkla.</span>
            </div>
          </div>

          {/* Right Monument Display (Clean, Dignified, No Distracting Effects) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[460px] flex flex-col items-center">
              {/* Leader Visual - Standing Proud & Pure Cutout */}
              <div className="relative z-10 w-full flex justify-center">
                <img
                  src="/ataturk-transparent.png"
                  alt="Gazi Mustafa Kemal Atatürk"
                  className="w-full max-h-[440px] sm:max-h-[580px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
                  loading="eager"
                />
              </div>

              {/* Dignified Memorial Monument Pedestal (Kaide) */}
              <div className="relative z-20 -mt-3 w-full max-w-[340px] sm:max-w-[400px] border-t-2 border-seal/60 bg-ink px-4 sm:px-6 py-3 sm:py-4 text-center shadow-2xl">
                <div className="font-display text-lg uppercase tracking-widest text-paper sm:text-2xl">
                  Gazi Mustafa Kemal Atatürk
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-seal">
                  <span>1881</span>
                  <span>—</span>
                  <span className="text-sm font-bold leading-none">∞</span>
                  <span className="text-paper/30">|</span>
                  <span>Türkiye Cumhuriyeti Kurucusu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
