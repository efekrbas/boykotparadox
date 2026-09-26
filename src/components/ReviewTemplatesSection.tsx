"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check, MessageSquareText, Sparkles, ExternalLink, Globe, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { REVIEW_TEMPLATES } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";
import { AiReviewGenerator } from "./AiReviewGenerator";

const LANG_DISPLAY_NAMES: Record<string, string> = {
  tr: "Türkçe",
  en: "English",
  de: "Deutsch",
  ru: "Русский",
  fr: "Français",
  es: "Español",
};

const LANG_FLAGS: Record<string, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  de: "🇩🇪",
  ru: "🇷🇺",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export function ReviewTemplatesSection() {
  const [selectedId, setSelectedId] = useState(REVIEW_TEMPLATES[0]?.id ?? "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTemplate =
    REVIEW_TEMPLATES.find((t) => t.id === selectedId) || REVIEW_TEMPLATES[0]!;

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

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
    <section id="sablonlar" className="mx-auto max-w-[1240px] px-5 pt-6 sm:pt-7 pb-12 scroll-mt-16 sm:scroll-mt-20">
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
      </div>

      {/* Steam 'Konu Dışı' Uyarısı & Global Dil Stratejisi Banner'ları */}
      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-start gap-3 border-2 border-seal bg-seal/10 p-4 shadow-sm">
          <span className="text-lg leading-none shrink-0 mt-0.5">⚠️</span>
          <div className="text-xs sm:text-sm font-mono leading-relaxed text-ink">
            <strong className="text-seal font-bold uppercase tracking-wider block sm:inline mr-2">
              Steam 'Konu Dışı' Uyarısı:
            </strong>
            <span>
              Steam, sadece "Atatürk" yazıp geçilen birebir kopyala-yapıştır yorumları otomatik algılayıp "Off-Topic" (Konu Dışı) sayarak puanlamadan düşebilir. İncelemenizin <strong>kalıcı olması ve silinmemesi için</strong> metne oyun deneyiminiz, Paradox'un topluluk yönetimi veya moderatör çifte standardı hakkında <strong>kendi cümlenizden de 1-2 kelime ekleyin!</strong>
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 border border-ink/20 bg-paper p-3.5 shadow-sm text-xs font-mono text-ink/80 leading-relaxed">
          <Globe className="size-4 text-seal shrink-0 mt-0.5" />
          <div>
            <strong className="text-ink font-bold uppercase tracking-wider block sm:inline mr-1.5">
              Topluluk Stratejisi (Global Puan Etkisi):
            </strong>
            Steam varsayılan olarak Türkçe yorumları sadece Türkiye'deki oyunculara gösterir. <strong>İngilizce, Almanca veya Rusça</strong> inceleme bırakmak, oyunun dünya çapındaki genel skorunu (All Languages) doğrudan aşağı çeker ve boykotun küresel basında yankı bulmasını sağlar.
          </div>
        </div>
      </div>

      {/* Main Template Selection & Action Box */}
      <div className="mt-8 border-2 border-ink bg-paper p-5 sm:p-7 shadow-[4px_4px_0_0_#181816]">
        {/* Custom Dropdown Menu Component */}
        <div className="custom-dropdown-container" ref={dropdownRef}>
          <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-mute">
            <span className="font-bold text-ink flex items-center gap-1.5">
              <MessageSquareText className="size-3.5 text-seal" />
              İnceleme Şablonu Seç
            </span>
            <span className="text-[11px] font-semibold text-ink/60">
              {REVIEW_TEMPLATES.length} Hazır Şablon
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            className={`custom-dropdown-trigger ${isDropdownOpen ? "open" : ""}`}
          >
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="custom-dropdown-badge">{activeTemplate.badge}</span>
                <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 border border-ink/20 bg-ink/5 text-ink/70">
                  {LANG_FLAGS[activeTemplate.language] || ""} {activeTemplate.language.toUpperCase()}
                </span>
              </div>
              <span className="custom-dropdown-title truncate mt-0.5">
                {activeTemplate.title}
              </span>
            </div>
            <div className="custom-dropdown-arrow">
              <ChevronDown className="size-4" />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="custom-dropdown-menu red-scrollbar" role="listbox">
              {REVIEW_TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.id === selectedId;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      playStampSound();
                      setSelectedId(tmpl.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`custom-dropdown-item ${isSelected ? "active" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="custom-dropdown-badge">{tmpl.badge}</span>
                      <span className={`font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 border ${
                        isSelected ? "border-paper/30 text-paper/85 bg-paper/10" : "border-ink/20 text-mute bg-ink/5"
                      }`}>
                        {LANG_FLAGS[tmpl.language] || ""} {tmpl.language.toUpperCase()}
                      </span>
                    </div>
                    <div className="custom-dropdown-title">
                      {tmpl.title}
                    </div>
                    <div className="custom-dropdown-preview">
                      {tmpl.text}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Recommended Locations & Template Details */}
        <div className="mt-5 pt-4 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-mute">
            <span className="font-bold text-ink">Önerilen Platformlar:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {activeTemplate.recommendedFor.map((rec) => (
                <span
                  key={rec}
                  className="border border-ink/15 bg-ink/5 px-2 py-0.5 font-semibold text-ink text-[11px]"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
          <div className="font-mono text-[11px] text-mute">
            Dil: <strong className="text-ink">{LANG_DISPLAY_NAMES[activeTemplate.language] || activeTemplate.language.toUpperCase()}</strong>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative mt-4">
          <textarea
            readOnly
            value={activeTemplate.text}
            rows={5}
            className="w-full resize-none border-2 border-ink/20 bg-paper/70 p-4 font-body text-sm leading-relaxed text-ink outline-none focus:border-seal selection:bg-seal selection:text-paper"
          />
          <div className="mt-1.5 flex justify-between font-mono text-[10px] text-mute">
            <span>Karakter sayısı: {activeTemplate.text.length}</span>
            <span className="text-seal font-bold">1★ Olumsuz İnceleme Metni</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-ink/15 pt-5">
          <button
            type="button"
            onClick={() => handleCopy(activeTemplate.id, activeTemplate.text)}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 bg-seal px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-transform active:translate-y-px hover:brightness-110 text-center shadow-sm"
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
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border-2 border-ink bg-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper text-center font-bold"
          >
            <span>Platform Seç & Yapıştır</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <AiReviewGenerator />
    </section>
  );
}
