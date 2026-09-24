import { ShieldCheck, AlertCircle, HelpCircle } from "lucide-react";
import { ANTI_SPAM_TIPS } from "@/data/boycottData";

export function AntiSpamGuideSection() {
  return (
    <section id="rehber" className="mx-auto max-w-[1240px] px-5 py-14">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
            <ShieldCheck className="size-3.5" />
            Etkili Boykot Taktikleri
          </div>
          <h2 className="mt-1 font-display text-3xl tracking-tight uppercase sm:text-4xl">
            1 Yıldızınızın Silinmemesi İçin İpuçları
          </h2>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-mute">
          Anti-Review Bomb Filtrelerini Aşma
        </span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ANTI_SPAM_TIPS.map((item, index) => (
          <div
            key={item.platform}
            className="flex flex-col justify-between border-2 border-ink/20 bg-paper p-5 transition-colors hover:border-ink"
          >
            <div>
              <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  Platform 0{index + 1}
                </span>
                <span className="font-mono text-[11px] text-mute">{item.platform}</span>
              </div>
              <h3 className="mt-3 font-display text-xl uppercase tracking-tight">
                {item.platform}'de Puanlama
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-mute">
                {item.tip}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/70">
              <AlertCircle className="size-3 text-seal shrink-0" />
              <span>Etkili olması için hazır metinleri biraz özelleştirin.</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 border border-seal/30 bg-seal/5 p-4">
        <HelpCircle className="size-5 text-seal shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-ink/80">
          <strong className="font-semibold text-seal uppercase">Önemli Hatırlatma:</strong> Steam, tek bir günde binlerce olumsuz inceleme geldiğinde bunları otomatik olarak "Konu Dışı İnceleme Dönemi" olarak işaretleyip toplam puandan düşebilir. Bu nedenle incelemenizde şirketin resmi Discord'undaki denetimsizliğe, oyunculara uygulanan haksız sansüre ve müşteri memnuniyetsizliğine değinmek incelemenizin geçerli kalmasını sağlar.
        </div>
      </div>
    </section>
  );
}
