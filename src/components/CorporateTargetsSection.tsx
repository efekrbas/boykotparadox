import { useState } from "react";
import { Building2, ExternalLink, ShieldAlert, Check } from "lucide-react";
import { CORPORATE_TARGETS } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";
import { toast } from "sonner";

interface CorporateTargetsSectionProps {
  stampedIds: string[];
  onToggleStamp: (id: string) => void;
}

export function CorporateTargetsSection({
  stampedIds,
  onToggleStamp,
}: CorporateTargetsSectionProps) {
  const [openingAll, setOpeningAll] = useState(false);

  const handleOpenTarget = (id: string, url: string) => {
    playStampSound();
    onToggleStamp(id);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Değerlendirme sayfası açıldı!", {
      description: "Şirkete 1 yıldız vererek tepkinizi gösterin.",
    });
  };

  const handleOpenAllCorporate = () => {
    playStampSound();
    setOpeningAll(true);
    CORPORATE_TARGETS.forEach((target, index) => {
      setTimeout(() => {
        window.open(target.url, "_blank", "noopener,noreferrer");
        onToggleStamp(target.id);
      }, index * 250);
    });

    toast.success("Tüm Kurumsal Değerlendirme Sayfaları Açılıyor!", {
      description:
        "Tarayıcınız açılır pencereleri (pop-up) engellediyse lütfen izin verin.",
    });
    setTimeout(() => setOpeningAll(false), 1500);
  };

  return (
    <section id="kurumsal" className="border-y-2 border-ink bg-ink text-paper py-14">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-paper/20 pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Building2 className="size-3.5" />
              Sadece Oyunlar Değil: Şirketi Doğrudan Vur
            </div>
            <h2 className="mt-1 font-display text-3xl tracking-tight uppercase sm:text-4xl text-paper">
              Paradox Interactive Genel Değerlendirmeleri
            </h2>
          </div>
          <button
            type="button"
            onClick={handleOpenAllCorporate}
            disabled={openingAll}
            className="inline-flex items-center gap-2 bg-seal px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-transform active:translate-y-px hover:brightness-110"
          >
            <ShieldAlert className="size-4" />
            <span>Tüm Kurumsal Sayfaları Aç (Tek Tık)</span>
          </button>
        </div>

        <p className="mt-4 max-w-[75ch] text-sm text-paper/70">
          Steam incelemeleri dönemsel olarak "off-topic" filtresine takılabilir. Ancak <strong>Trustpilot</strong> ve <strong>Google Haritalar</strong> doğrudan Paradox Interactive şirketinin kurumsal itibarını ve Google arama sonuçlarındaki puanını etkiler!
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CORPORATE_TARGETS.map((target) => {
            const isStamped = stampedIds.includes(target.id);
            return (
              <div
                key={target.id}
                className={`relative flex flex-col justify-between border-2 p-5 transition-all ${
                  isStamped
                    ? "border-seal bg-paper/5 shadow-[0_0_15px_rgba(230,57,70,0.15)]"
                    : "border-paper/20 bg-paper/5 hover:border-paper/60"
                }`}
              >
                {isStamped && (
                  <div className="seal-stamp absolute top-3 right-3 border border-seal bg-seal/20 px-2 py-0.5 font-mono text-[10px] font-bold text-seal">
                    1★ VERİLDİ
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-seal font-bold">
                      [{target.importance}]
                    </span>
                    <span className="font-mono text-[11px] text-paper/50">
                      {target.platform}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-tight text-paper">
                    {target.name}
                  </h3>
                  <p className="mt-2 text-xs text-paper/60 leading-relaxed">
                    {target.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-2 pt-3 border-t border-paper/10">
                  <button
                    type="button"
                    onClick={() => handleOpenTarget(target.id, target.url)}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 bg-paper px-3 font-mono text-xs uppercase tracking-wider text-ink font-semibold transition-colors hover:bg-seal hover:text-paper text-center"
                  >
                    <span className="leading-tight">{target.actionText}</span>
                    <ExternalLink className="size-3.5 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playStampSound();
                      onToggleStamp(target.id);
                    }}
                    className={`inline-flex h-8 w-full items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      isStamped
                        ? "text-seal font-bold hover:text-paper"
                        : "text-paper/40 hover:text-paper"
                    }`}
                  >
                    <Check className={`size-3 shrink-0 ${isStamped ? "text-seal" : "text-paper/40"}`} />
                    <span>{isStamped ? "Mührü Kaldır" : "1★ Verdim Olarak İşaretle"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
