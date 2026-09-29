"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Gamepad2,
  Building2,
  Sparkles,
  Info,
  Layers,
  Flame,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";
import {
  PARADOX_ALL_GAMES,
  GSHEET_URL,
  GSHEET_CSV_URL,
  type ParadoxCatalogItem,
} from "@/data/paradoxAllGames";

type CategoryFilter =
  | "all"
  | "grand-strategy"
  | "paradox-arc"
  | "simulation"
  | "rpg"
  | "upcoming"
  | "classic";

export function ParadoxCheckerSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const filteredGames = useMemo(() => {
    return PARADOX_ALL_GAMES.filter((game) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "paradox-arc"
          ? game.publisher === "Paradox Arc" || game.category === "paradox-arc"
          : game.category === selectedCategory);

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        game.title.toLowerCase().includes(q) ||
        game.developers.toLowerCase().includes(q) ||
        game.publisher.toLowerCase().includes(q) ||
        game.releaseDate.toLowerCase().includes(q) ||
        (game.warningNote && game.warningNote.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const exactMatch = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 3) return null;
    const q = searchQuery.toLowerCase().trim();
    return PARADOX_ALL_GAMES.find((g) => g.title.toLowerCase().includes(q));
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <section
      id="paradox-oyun-sorgula"
      className="mx-auto max-w-[1240px] px-5 py-14 scroll-mt-16 sm:scroll-mt-20"
    >
      <div className="border-2 border-ink bg-paper shadow-[8px_8px_0_0_oklch(0.25_0.05_260)] p-6 sm:p-10 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-seal">
              <FileSpreadsheet className="size-3.5" />
              Google E-Tablo Arşivi · 49 Oyunluk Tam Boykot Kataloğu
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink">
              Oynadığın Oyun Paradox'un mu? Anında Kontrol Et
            </h2>
          </div>

          {/* Quick GSheet Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={GSHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-emerald-600 bg-emerald-600/10 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600 hover:text-paper transition-colors"
              title="Google E-Tablosunu Görüntüle"
            >
              <FileSpreadsheet className="size-3.5" />
              <span>Google Sheets Tablosunu Aç</span>
              <ExternalLink className="size-3 opacity-70" />
            </a>

            <a
              href={GSHEET_CSV_URL}
              download="paradox-boykot-oyunlari.csv"
              className="inline-flex items-center gap-1.5 border border-ink bg-paper px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-paper transition-colors shadow-sm"
              title="CSV Dosyasını İndir"
            >
              <Download className="size-3.5" />
              <span>CSV İndir</span>
            </a>
          </div>
        </div>

        {/* Spreadsheet Motto Banner */}
        <div className="mt-5 border-l-4 border-amber-500 bg-amber-500/10 p-4">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
            Topluluk E-Tablo Uyarısı:
          </div>
          <p className="mt-1 font-serif text-base italic text-ink/90">
            "Şu anda oynadığın oyun, Paradox'un olabilir. Oyun oynamadan veya satın almadan önce mutlaka bu listeyi kontrol et."
          </p>
          <p className="mt-2 text-xs text-mute font-mono">
            Paradox Arc etiketiyle bağımsız geliştirici gibi yayımlanan oyunlar ve satın alınan stüdyolar (Triumph, Harebrained, Colossal Order vb.) dahil <strong>49 oyunun tamamı</strong> aşağıda listelenmiştir.
          </p>
        </div>

        {/* Live Search Engine */}
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-mute" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Oyun adı, stüdyo veya tür yazın... (Örn: Stardeus, Shadowrun, Darfall, Colossal Order, Necropolis)"
              className="w-full border-2 border-ink bg-paper pl-12 pr-12 py-3.5 font-mono text-sm text-ink placeholder:text-mute/70 focus:border-seal focus:outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-mute hover:text-ink"
                title="Aramayı Temizle"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Search Result Instant Banner */}
          {exactMatch && (
            <div className="mt-3 flex items-start gap-2.5 border-2 border-seal bg-seal/10 p-3.5 text-xs text-ink font-mono animate-in fade-in slide-in-from-top-1">
              <AlertTriangle className="size-4 text-seal shrink-0 mt-0.5" />
              <div>
                <strong className="text-seal uppercase tracking-wider">
                  ⚠️ BOYKOT UYARISI: "{exactMatch.title}" PARADOX BÜNYESİNDEDİR!
                </strong>
                <p className="mt-1 text-ink/80 text-[11px]">
                  Geliştirici: <strong>{exactMatch.developers}</strong> · Yayıncı Kolu:{" "}
                  <strong>{exactMatch.publisher}</strong> · Çıkış: {exactMatch.releaseDate}
                </p>
                {exactMatch.warningNote && (
                  <p className="mt-1 text-seal font-semibold text-[11px]">
                    Not: {exactMatch.warningNote}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-ink/15 pb-3">
          {[
            { id: "all", label: "Tüm Liste (49 Oyun)" },
            { id: "grand-strategy", label: "Büyük Strateji (Amiral Gemileri)" },
            { id: "paradox-arc", label: "Paradox Arc (İndie Girişimler)" },
            { id: "simulation", label: "Şehir & Koloni Sim" },
            { id: "rpg", label: "RPG & Taktiksel" },
            { id: "upcoming", label: "Henüz Çıkmamışlar (Almayın)" },
            { id: "classic", label: "Klasik & Eski Oyunlar" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playStampSound();
                setSelectedCategory(cat.id as CategoryFilter);
              }}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border ${
                selectedCategory === cat.id
                  ? "border-ink bg-ink text-paper font-bold"
                  : "border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Games Table & Cards Count */}
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-mute">
          <span>
            Gösterilen: <strong className="text-ink">{filteredGames.length}</strong> / 49 Oyun
          </span>
          {searchQuery && (
            <span className="text-seal font-semibold">
              "{searchQuery}" için sonuçlar
            </span>
          )}
        </div>

        {/* Table / Grid */}
        <div className="mt-4 divide-y border-2 border-ink bg-paper overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-ink text-paper uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3">Oyun Adı</th>
                <th className="p-3">Çıkış Tarihi</th>
                <th className="p-3">Geliştirici Stüdyo</th>
                <th className="p-3">Yayıncı Kolu</th>
                <th className="p-3">Boykot & Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <tr
                    key={game.id}
                    className="hover:bg-ink/[0.02] transition-colors"
                  >
                    <td className="p-3 font-semibold text-ink">
                      <div className="flex items-center gap-2">
                        {game.publisher === "Paradox Arc" ? (
                          <span className="size-2 rounded-full bg-amber-500 shrink-0" title="Paradox Arc" />
                        ) : (
                          <span className="size-2 rounded-full bg-seal shrink-0" title="Paradox Interactive" />
                        )}
                        <span>{game.title}</span>
                      </div>
                      {game.warningNote && (
                        <div className="mt-1 text-[10px] text-seal font-normal">
                          {game.warningNote}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-mute">{game.releaseDate}</td>
                    <td className="p-3 text-ink/80">{game.developers}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                          game.publisher === "Paradox Arc"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                            : "border-seal/30 bg-seal/10 text-seal"
                        }`}
                      >
                        {game.publisher}
                      </span>
                    </td>
                    <td className="p-3">
                      {game.steamUrl ? (
                        <a
                          href={game.steamUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 border border-ink/30 bg-paper px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink hover:border-seal hover:text-seal transition-colors"
                        >
                          <span>Steam'de 1★ Ver</span>
                          <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        <span className="text-[10px] text-mute uppercase font-semibold">
                          {game.category === "upcoming" ? "Ön Sipariş Verme" : "Arşiv"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-mute">
                    Aramanızla eşleşen oyun bulunamadı. Lütfen farklı bir arama terimi deneyin veya Google E-Tablosunu kontrol edin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info about Paradox Arc and Studio acquisitions */}
        <div className="mt-6 pt-4 border-t border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-mute">
          <div className="flex items-center gap-2">
            <Info className="size-4 text-seal shrink-0" />
            <span>
              <strong>Önemli Bilgi:</strong> Paradox Arc, Paradox'un bağımsız geliştiricilerle ortaklık kurarak oyun bastığı yan yayıncı kuruluşudur. Bu oyunların gelirleri doğrudan Paradox bilançosuna işlenir.
            </span>
          </div>

          <a
            href={GSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-seal font-bold hover:underline shrink-0"
          >
            <span>Orijinal Google E-Tablosu →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
