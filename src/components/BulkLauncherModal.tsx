"use client";

import { useState } from "react";
import {
  Flame,
  ExternalLink,
  CheckCircle2,
  X,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";
import { GAMES, CORPORATE_TARGETS } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";
import { toast } from "sonner";

interface BulkLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  stampedIds: string[];
  onToggleStamp: (id: string) => void;
  onMarkStamped?: (id: string) => void;
}

export function BulkLauncherModal({
  isOpen,
  onClose,
  stampedIds,
  onToggleStamp,
  onMarkStamped,
}: BulkLauncherModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "games" | "corporate">("all");
  const [openingSequential, setOpeningSequential] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  // Flatten all review targets
  const allTargets = [
    ...CORPORATE_TARGETS.map((c) => ({
      id: c.id,
      title: c.name,
      platform: c.platform,
      url: c.url,
      category: "corporate" as const,
      hint: c.description,
    })),
    ...GAMES.flatMap((g) =>
      g.platforms.map((p) => ({
        id: `${g.id}-${p.id}`,
        title: `${g.title} (${p.shortName})`,
        platform: p.shortName,
        url: p.url,
        category: "games" as const,
        hint: p.actionHint,
      }))
    ),
  ];

  const filteredTargets = allTargets.filter((t) => {
    if (activeTab === "games") return t.category === "games";
    if (activeTab === "corporate") return t.category === "corporate";
    return true;
  });

  const handleLaunchAll = () => {
    playStampSound();
    toast.info("Platformlar yeni sekmelerde açılıyor...", {
      description: "Tarayıcınız pop-up engellerse lütfen üstteki çubuktan 'İzin ver' seçin.",
    });

    filteredTargets.forEach((target, i) => {
      setTimeout(() => {
        window.open(target.url, "_blank", "noopener,noreferrer");
        if (onMarkStamped) {
          onMarkStamped(target.id);
        } else {
          onToggleStamp(target.id);
        }
      }, i * 350);
    });
  };

  const handleLaunchNext = () => {
    if (currentIndex >= filteredTargets.length) {
      setCurrentIndex(0);
      toast.success("Tüm hedefleri tamamladınız! Harika iş!");
      return;
    }

    const target = filteredTargets[currentIndex];
    if (!target) return;

    playStampSound();
    window.open(target.url, "_blank", "noopener,noreferrer");
    if (onMarkStamped) {
      onMarkStamped(target.id);
    } else {
      onToggleStamp(target.id);
    }
    setCurrentIndex((prev) => prev + 1);

    const nextTarget = filteredTargets[currentIndex + 1];
    toast.success(`Açıldı: ${target.title}`, {
      description: `Sıradaki: ${nextTarget ? nextTarget.title : "Tamamlandı!"}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col border-2 border-ink bg-paper shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink bg-ink p-4 text-paper sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-none bg-seal text-paper">
              <Flame className="size-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
                Toplu İnceleme Baskın Merkezi
              </h2>
              <div className="font-mono text-xs text-seal">
                Tüm platformlara git ve 1 yıldızı yapıştır
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-paper/70 transition-colors hover:text-paper"
            aria-label="Kapat"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Browser Popup Notice */}
        <div className="flex items-start gap-2.5 border-b border-ink/15 bg-seal/10 px-4 py-3 text-xs text-ink">
          <AlertTriangle className="size-4 shrink-0 text-seal mt-0.5" />
          <div>
            <strong>Tarayıcı Pop-up Uyarısı:</strong> Tarayıcılar aynı anda 10+ sekme açmayı güvenlik nedeniyle engelleyebilir.
            Dilerseniz <strong>"Tümünü Aç"</strong> diyebilir veya kesintisiz ilerlemek için <strong>"Sırayla Aç & İlerle"</strong> butonunu kullanabilirsiniz.
          </div>
        </div>

        {/* Tab Filters & Main Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 p-4 bg-paper/60">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${
                activeTab === "all"
                  ? "bg-ink text-paper"
                  : "bg-paper border border-ink/20 text-ink hover:border-ink"
              }`}
            >
              Tümü ({allTargets.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("corporate")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${
                activeTab === "corporate"
                  ? "bg-ink text-paper"
                  : "bg-paper border border-ink/20 text-ink hover:border-ink"
              }`}
            >
              Kurumsal ({CORPORATE_TARGETS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("games")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${
                activeTab === "games"
                  ? "bg-ink text-paper"
                  : "bg-paper border border-ink/20 text-ink hover:border-ink"
              }`}
            >
              Oyunlar ({allTargets.length - CORPORATE_TARGETS.length})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleLaunchNext}
              className="inline-flex items-center gap-1.5 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-transform active:translate-y-px hover:bg-ink/90"
            >
              <Play className="size-3.5 text-seal" />
              <span>Sırayla Aç ({currentIndex + 1}/{filteredTargets.length})</span>
            </button>

            <button
              type="button"
              onClick={handleLaunchAll}
              className="inline-flex items-center gap-1.5 bg-seal px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-transform active:translate-y-px hover:brightness-110"
            >
              <Flame className="size-3.5" />
              <span>Tümünü Sekmelerde Aç</span>
            </button>
          </div>
        </div>

        {/* Scrollable Target List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-ink/10">
          {filteredTargets.map((target, idx) => {
            const isDone = stampedIds.includes(target.id);
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={target.id}
                className={`flex items-center justify-between py-2.5 px-3 transition-colors ${
                  isCurrent ? "bg-seal/10 border-l-4 border-seal" : ""
                } ${isDone ? "opacity-75" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playStampSound();
                      onToggleStamp(target.id);
                    }}
                    title="İşaretle"
                    className="p-1 hover:text-seal"
                  >
                    <CheckCircle2
                      className={`size-4 ${
                        isDone ? "text-seal fill-seal/20" : "text-ink/20"
                      }`}
                    />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm uppercase tracking-tight text-ink">
                        {target.title}
                      </span>
                      <span className="border border-ink/20 bg-ink/5 px-1 py-0.2 font-mono text-[9px] uppercase text-mute">
                        {target.platform}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-mute">{target.hint}</div>
                  </div>
                </div>

                <a
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    playStampSound();
                    onToggleStamp(target.id);
                  }}
                  className="inline-flex items-center gap-1 border border-ink/20 bg-paper px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <span>Aç (1★)</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t-2 border-ink bg-paper p-3 px-5 font-mono text-xs text-mute">
          <div>
            Tamamlanan: <strong className="text-seal">{stampedIds.length}</strong> / {allTargets.length}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-ink bg-paper px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:bg-ink hover:text-paper"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
