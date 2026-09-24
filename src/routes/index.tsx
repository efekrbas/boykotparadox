import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Star,
  ExternalLink,
  ShieldAlert,
  Search,
  CheckCircle2,
  Building2,
  FileText,
  HelpCircle,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

import { GAMES, CORPORATE_TARGETS, DEMANDS, type Game } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";
import { AudioStampToggle } from "@/components/AudioStampToggle";
import { ReviewTemplatesSection } from "@/components/ReviewTemplatesSection";
import { CorporateTargetsSection } from "@/components/CorporateTargetsSection";
import { AntiSpamGuideSection } from "@/components/AntiSpamGuideSection";
import { BulkLauncherModal } from "@/components/BulkLauncherModal";
import { ShareBar } from "@/components/ShareBar";
import { Ataturk3DScene } from "@/components/Ataturk3DScene";
import { NewsSourcesSection } from "@/components/NewsSourcesSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası" },
      {
        name: "description",
        content:
          "Hearts of Iron IV Discord skandalına karşı Paradox Interactive oyunlarına ve kurumsal sayfalarına (Steam, Metacritic, Trustpilot, Epic, GOG, Google) 1 yıldız vererek tepkini göster.",
      },
      {
        property: "og:title",
        content: "Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası",
      },
      {
        property: "og:description",
        content:
          "Sadece Steam değil: Metacritic, Trustpilot, Epic, GOG ve Google üzerinden Paradox'u tek dokunuşla 1 yıldızla mühürle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SOURCE_URL =
  "https://www.odatv.com/guncel/paradoxtan-ataturk-skandali-hearts-of-ironin-discord-sunucusunda-boykot-120163837";

const STORAGE_VOTES_KEY = "boykot-paradox-oylar";
const STORAGE_STAMPS_KEY = "boykot-paradox-stamps";

const tr = (n: number) => n.toLocaleString("tr-TR");

function Index() {
  const [votedGames, setVotedGames] = useState<string[]>([]);
  const [stampedPlatforms, setStampedPlatforms] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    try {
      const rawVotes = localStorage.getItem(STORAGE_VOTES_KEY);
      if (rawVotes) setVotedGames(JSON.parse(rawVotes) as string[]);
      const rawStamps = localStorage.getItem(STORAGE_STAMPS_KEY);
      if (rawStamps) setStampedPlatforms(JSON.parse(rawStamps) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleVoteGame = (id: string) => {
    playStampSound();
    setVotedGames((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_VOTES_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      if (!exists) {
        toast.success("Oyun 1 Yıldızla Mühürlendi!", {
          description: "Aşağıdaki platform linklerine tıklayarak incelemenizi yayınlayın.",
        });
      }
      return next;
    });
  };

  const toggleStampPlatform = (targetId: string) => {
    setStampedPlatforms((prev) => {
      const exists = prev.includes(targetId);
      const next = exists ? prev.filter((item) => item !== targetId) : [...prev, targetId];
      try {
        localStorage.setItem(STORAGE_STAMPS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleOpenGamePlatforms = (game: Game) => {
    playStampSound();
    toast.info(`${game.title} için tüm platform sayfaları açılıyor...`, {
      description: "Açılır pencerelere izin verin veya sırayla tıklayın.",
    });

    // Mark game as voted
    if (!votedGames.includes(game.id)) {
      toggleVoteGame(game.id);
    }

    game.platforms.forEach((p, idx) => {
      setTimeout(() => {
        window.open(p.url, "_blank", "noopener,noreferrer");
        toggleStampPlatform(`${game.id}-${p.id}`);
      }, idx * 250);
    });
  };

  // Calculate total votes
  const totalVotes = GAMES.reduce(
    (sum, g) => sum + g.base + (votedGames.includes(g.id) ? 1 : 0),
    0
  );

  // Total possible stamp count (games platforms + corporate targets)
  const totalTargetsCount =
    CORPORATE_TARGETS.length +
    GAMES.reduce((acc, g) => acc + g.platforms.length, 0);

  // Filter games
  const filteredGames = useMemo(() => {
    return GAMES.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (selectedCategory === "epic") {
        return game.platforms.some((p) => p.type === "epic");
      }
      if (selectedCategory === "gog") {
        return game.platforms.some((p) => p.type === "gog");
      }
      if (selectedCategory === "strategy") {
        return game.genre.includes("Strateji");
      }
      return true;
    });
  }, [searchTerm, selectedCategory]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-seal selection:text-paper">
      {/* Top Banner Notice */}
      <div className="border-b border-ink/20 bg-ink px-4 py-2 font-mono text-[11px] text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 animate-ping rounded-full bg-seal" />
            <strong className="text-seal uppercase tracking-wider">Topluluk Seferberliği:</strong>
            <span className="text-paper/80">
              Sadece Steam değil, Trustpilot, Metacritic ve Google üzerinden 1 yıldız veriyoruz!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-1 font-bold text-seal underline hover:text-paper"
            >
              <Flame className="size-3" />
              <span>Hızlı Baskın Modu</span>
            </button>
            <span className="text-paper/30">|</span>
            <AudioStampToggle />
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/ataturk-vector-logo.png"
              alt="Atatürk Silhouette Logo"
              className="size-8 object-contain"
            />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="font-display text-2xl leading-none tracking-tight">
                BOYKOT PARADOX
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-seal font-bold sm:block">
                Tüm Platformlarda 1★ Kampanyası
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* User progress counter */}
            <div className="hidden text-right leading-none md:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-mute">
                Senin Katkın
              </div>
              <div className="font-mono text-sm font-bold text-ink">
                <span className="text-seal">{stampedPlatforms.length}</span> / {totalTargetsCount} Platform
              </div>
            </div>

            <div className="h-7 w-px bg-ink/15 hidden md:block" />

            {/* Total 1 star counter */}
            <div className="text-right leading-none">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                Toplam 1 Yıldız
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold tabular-nums text-seal">
                {tr(totalVotes)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-2 bg-seal px-3.5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-transform active:translate-y-px hover:brightness-110 sm:px-4"
            >
              <Flame className="size-4 animate-bounce" />
              <span className="hidden sm:inline">Tüm Platformları Aç</span>
              <span className="sm:hidden">1★ Baskın</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(130% 90% at 50% 120%, oklch(0.556 0.216 27.5) 0%, transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            background:
              "repeating-linear-gradient(115deg, transparent 0 46px, oklch(0.948 0.015 85) 46px 48px)",
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div className="rise flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-seal">
            <span className="size-2 animate-pulse rounded-full bg-seal" />
            Steam · Metacritic · Trustpilot · Google · Epic · GOG · Xbox
          </div>

          <h1
            className="rise mt-5 font-display text-[clamp(2.8rem,11vw,9.5rem)] leading-[0.88] tracking-tight uppercase"
            style={{ animationDelay: "80ms" }}
          >
            PARADOX
            <br />
            HESAP VERECEK
          </h1>

          <p
            className="rise mt-6 max-w-[58ch] text-base sm:text-lg text-pretty text-paper/85 leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            Hearts of Iron IV'ün resmi Discord sunucusunda Atatürk'e ve Türk milletine hakaret
            içerikli paylaşımlar yapıldı, tepki gösteren Türk oyuncular haksızca susturulup banlandı.
            Tepkimizi tek bir platformla sınırlamıyoruz: <strong>Oyunlara, mağazalara, Trustpilot'a ve Google'a tek tıkla 1 yıldız mühürlüyoruz!</strong>
          </p>

          <div
            className="rise mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="group inline-flex items-center gap-3 bg-seal px-6 py-3.5 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-paper transition-transform active:translate-y-px hover:brightness-110"
            >
              <Flame className="size-4" />
              <span>Tek Tıkla Tüm Platformları Aç</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("sablonlar")}
              className="inline-flex items-center gap-2 border-2 border-paper/40 bg-paper/10 px-5 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper/20"
            >
              <FileText className="size-4" />
              <span>Hazır 1★ Metinleri</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("kurumsal")}
              className="inline-flex items-center gap-2 border border-paper/20 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-paper/80 transition-colors hover:text-seal"
            >
              <Building2 className="size-4" />
              <span>Trustpilot & Google</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("anit")}
              className="inline-flex items-center gap-2 border border-seal/50 bg-seal/10 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-seal transition-colors hover:bg-seal hover:text-paper"
            >
              <Sparkles className="size-4" />
              <span>3D Atatürk Anıtı</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("kaynaklar")}
              className="inline-flex items-center gap-2 border border-paper/20 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-paper/80 transition-colors hover:text-seal"
            >
              <span>Haber Kaynakları (10)</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="rise mt-12 grid grid-cols-2 gap-4 border-t border-paper/15 pt-8 sm:grid-cols-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">
                Hedef Platformlar
              </div>
              <div className="font-display text-2xl text-paper">7+ Platform</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">
                Kapsanan Oyunlar
              </div>
              <div className="font-display text-2xl text-paper">6 Ana Oyun</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">
                Toplu İnceleme Skoru
              </div>
              <div className="font-display text-2xl text-seal">1.0 ★ (Hedef)</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">
                Topluluk Tepkisi
              </div>
              <div className="font-display text-2xl text-paper">Canlı & Büyüyor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Catalog Section — primary action, right after hero */}
      <section id="oyunlar" className="mx-auto max-w-[1240px] px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Layers className="size-3.5" />
              Tüm Platformlarda Puanlama
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl tracking-tight uppercase">
              Oyunları Mühürle & 1 Yıldız Ver
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:bg-seal transition-colors"
            >
              <Flame className="size-3.5 text-seal" />
              <span>Hepsini Birden Aç (Baskın Modu)</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedCategory === "all"
                  ? "bg-ink text-paper"
                  : "border border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              Tüm Oyunlar ({GAMES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("strategy")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedCategory === "strategy"
                  ? "bg-ink text-paper"
                  : "border border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              Strateji
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("epic")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedCategory === "epic"
                  ? "bg-ink text-paper"
                  : "border border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              Epic Games Olanlar
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("gog")}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                selectedCategory === "gog"
                  ? "bg-ink text-paper"
                  : "border border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              GOG Olanlar
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-mute" />
            <input
              type="text"
              placeholder="Oyun ara (HOI4, EU4...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-ink/25 bg-paper py-1.5 pl-9 pr-3 font-mono text-xs text-ink outline-none focus:border-ink"
            />
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => {
            const isVoted = votedGames.includes(game.id);
            const count = game.base + (isVoted ? 1 : 0);

            return (
              <article
                key={game.id}
                className={`relative flex flex-col justify-between overflow-hidden border-2 bg-paper transition-all duration-200 hover:-translate-y-1 ${
                  isVoted
                    ? "border-seal shadow-[4px_4px_0_0_oklch(0.556_0.216_27.5)]"
                    : "border-ink/20 hover:border-ink"
                }`}
              >
                {isVoted && (
                  <div className="seal-stamp absolute top-3 right-3 z-20 border-2 border-seal bg-paper/85 px-3 py-1 font-mono text-xs font-bold text-seal backdrop-blur-md">
                    1 ★ MÜHÜRLENDİ
                  </div>
                )}

                {game.badge && (
                  <div className="absolute top-3 left-3 z-20 bg-ink px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-wider text-paper">
                    {game.badge}
                  </div>
                )}

                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/10">
                    <img
                      src={game.image}
                      alt={`${game.title} afiş görseli`}
                      loading="lazy"
                      width={1088}
                      height={608}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                          {game.genre}
                        </span>
                        <h3 className="font-display text-xl uppercase tracking-tight text-ink">
                          {game.title}
                        </h3>
                      </div>
                      <div className="text-right leading-none">
                        <div className="font-mono text-2xl font-bold tabular-nums text-seal">
                          1.0 ★
                        </div>
                        <div className="font-mono text-[10px] uppercase text-mute mt-0.5">
                          {tr(count)} mühür
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-1">
                      <Star className="size-4 fill-seal text-seal" />
                      <Star className="size-4 text-ink/15" />
                      <Star className="size-4 text-ink/15" />
                      <Star className="size-4 text-ink/15" />
                      <Star className="size-4 text-ink/15" />
                      <span className="ml-2 font-mono text-[11px] text-mute">
                        Tek yıldız hedefi
                      </span>
                    </div>

                    <div className="mt-4 border-t border-ink/15 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider font-semibold text-mute">
                          İnceleme Platformları:
                        </span>
                        <span className="font-mono text-[10px] text-mute">
                          {game.platforms.length} Platform
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {game.platforms.map((p) => {
                          const stampKey = `${game.id}-${p.id}`;
                          const isStamped = stampedPlatforms.includes(stampKey);

                          return (
                            <a
                              key={p.id}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => {
                                playStampSound();
                                toggleStampPlatform(stampKey);
                              }}
                              className={`group inline-flex items-center gap-1 border px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                                isStamped
                                  ? "border-seal bg-seal/10 text-seal font-bold"
                                  : "border-ink/20 bg-paper text-ink hover:border-ink hover:bg-ink hover:text-paper"
                              }`}
                              title={`${p.name} - ${p.actionHint}`}
                            >
                              <span>{p.shortName}</span>
                              <ExternalLink className="size-2.5 opacity-60 group-hover:opacity-100" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-ink/15 p-4 sm:p-5 pt-3 bg-paper/50 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenGamePlatforms(game)}
                    className="inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-paper transition-transform active:translate-y-px hover:bg-seal hover:border-seal"
                  >
                    <Flame className="size-3.5" />
                    <span>Tüm Platformlarını Aç ({game.platforms.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleVoteGame(game.id)}
                    className={`inline-flex w-full items-center justify-center gap-2 border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      isVoted
                        ? "border-seal bg-seal text-paper"
                        : "border-ink/30 bg-paper text-ink hover:border-ink"
                    }`}
                  >
                    <Star className={`size-3.5 ${isVoted ? "fill-paper" : ""}`} />
                    <span>{isVoted ? "1 Yıldız Mühürlendi (Kaldır)" : "1 Yıldız Ver"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3D Atatürk Monument Scene */}
      <div id="anit">
        <Ataturk3DScene />
      </div>

      {/* Incident Summary & Demands */}
      <section className="mx-auto max-w-[1240px] px-5 py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="font-display text-3xl tracking-tight uppercase sm:text-4xl">
            Olay Nasıl Gelişti?
          </h2>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-seal hover:underline"
          >
            <span>OdaTV Haberi & Kaynak</span>
            <ExternalLink className="size-3" />
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="border-2 border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              (A) Resmi Sunucuda Hakaret
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase leading-none">
              Atatürk Hedef Alındı
            </h3>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              Paradox Interactive'in en popüler oyunu Hearts of Iron IV'ün resmi Discord sunucusunda,
              Türkiye Cumhuriyeti'nin kurucusu Gazi Mustafa Kemal Atatürk'e ve Türk milletine yönelik ağır hakaretler içeren paylaşımlar yapıldı.
            </p>
          </div>

          <div className="border-2 border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              (B) Taraflı Moderasyon & Sansür
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase leading-none">
              Türk Oyuncular Banlandı
            </h3>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              Hakarete itiraz eden ve kuralların uygulanmasını isteyen Türk oyuncular, sunucu moderatörleri
              tarafından susturuldu, hakaret edenler korunurken itiraz edenler sunucudan haksızca atıldı.
            </p>
          </div>

          <div className="border-2 border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              (C) Topluluk Cevabı
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase leading-none">
              Tüm Cephelerde Boykot
            </h3>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              Yalnızca tek bir oyun değil; Paradox'un tüm oyunları, Trustpilot kurumsal sayfası, Metacritic
              ve Google Maps profili 1 yıldız yağmuruna tutuluyor.
            </p>
          </div>
        </div>

        {/* 4 Demands Banner */}
        <div className="mt-12 border-2 border-ink bg-paper p-6 sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-seal">
            <Award className="size-4" />
            Topluluğun Net 4 Talebi
          </div>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl uppercase tracking-tight">
            Paradox Interactive Ne Yapmalı?
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMANDS.map((demand) => (
              <div key={demand.number} className="border border-ink/15 p-4 bg-ink/5">
                <span className="font-mono text-2xl font-bold text-seal">{demand.number}</span>
                <h4 className="mt-1 font-display text-lg uppercase tracking-tight">{demand.title}</h4>
                <p className="mt-2 text-xs text-mute leading-relaxed">{demand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Corporate Targets Section (Trustpilot, Google, Metacritic Publisher) */}
      <CorporateTargetsSection
        stampedIds={stampedPlatforms}
        onToggleStamp={toggleStampPlatform}
      />

      {/* Ready-to-copy Review Templates */}
      <ReviewTemplatesSection />

      {/* Anti-Spam / Anti-Review Bombing Guidelines */}
      <AntiSpamGuideSection />

      {/* Social Share Bar */}
      <div className="mx-auto max-w-[1240px] px-5 py-8">
        <ShareBar />
      </div>

      {/* News & Media Sources — credibility section near footer */}
      <NewsSourcesSection />

      {/* Bulk Launcher Modal */}
      <BulkLauncherModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        stampedIds={stampedPlatforms}
        onToggleStamp={toggleStampPlatform}
      />

      {/* Footer */}
      <footer className="border-t-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/ataturk-vector-logo.png"
                alt="Atatürk Silhouette Logo"
                className="size-9 object-contain brightness-200"
              />
              <span className="font-display text-2xl tracking-tight uppercase">
                BOYKOT PARADOX
              </span>
              <span className="border border-paper/30 px-2 py-0.5 font-mono text-[10px] uppercase text-paper/70">
                1★ Kampanyası
              </span>
            </div>
            <p className="mt-2 max-w-[50ch] text-xs text-pretty text-paper/60">
              Bu sayfa Türk oyuncu topluluğunun kurucu değerlerine ve Gazi Mustafa Kemal Atatürk'e
              yapılan saygısızlığa karşı başlattığı bağımsız bir kamuoyu tepkisi ve değerlendirme
              kampanyasıdır. Ticari bir amacı yoktur.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">
              Haber Kaynağı · OdaTV
            </div>
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-seal transition-colors hover:text-paper"
            >
              <span>Skandalın Haberi →</span>
            </a>
            <div className="mt-2 font-mono text-[10px] text-paper/40">
              Mustafa Kemal Atatürk'ün aziz hatırasına saygıyla.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
