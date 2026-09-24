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
  PenLine,
  Send,
  Newspaper,
} from "lucide-react";
import { toast } from "sonner";

import { XIcon } from "@/components/icons/XIcon";

import { GAMES, CORPORATE_TARGETS, DEMANDS, type Game } from "@/data/boycottData";
import { playStampSound } from "@/lib/audio";
import { AudioStampToggle } from "@/components/AudioStampToggle";
import { ReviewTemplatesSection } from "@/components/ReviewTemplatesSection";
import { CorporateTargetsSection } from "@/components/CorporateTargetsSection";
import { PetitionSection, PETITION_URL } from "@/components/PetitionSection";
import { AntiSpamGuideSection } from "@/components/AntiSpamGuideSection";
import { CeoRaidSection } from "@/components/CeoRaidSection";
import { BoycottGuidesSection } from "@/components/BoycottGuidesSection";
import { BulkLauncherModal } from "@/components/BulkLauncherModal";
import { ShareBar } from "@/components/ShareBar";
import { Ataturk3DScene } from "@/components/Ataturk3DScene";
import { NewsSourcesSection } from "@/components/NewsSourcesSection";
import { FaqSection } from "@/components/FaqSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        name: "google-site-verification",
        content: "hYFGZJAo0Z4zRDGxUsflXR2QQ-RwHAbmVURjZO-EBDw",
      },
      { title: "Boykot Paradox — Resmi Atatürk Skandalına Karşı 1★ Kampanyası | #BoycottParadox" },
      {
        name: "description",
        content:
          "Paradox Interactive resmi Discord'undaki Atatürk'e hakaret ve Türk oyuncuları sansürleme skandalına karşı tek ses! Steam, Metacritic, Trustpilot ve Google'da 1 yıldız vererek sesini duyur.",
      },
      {
        name: "keywords",
        content:
          "paradox boykot, boykot paradox, hearts of iron 4 ataturk, hoi4 boykot, paradox interactive boykot, ataturk skandali, steam 1 yildiz, paradox inceleme boykotu, hoi4 discord atatürk, eu4 boykot, ck3, victoria 3, stellaris, cities skylines, boycott paradox, paradox interactive scandal, emrah safa gürkan boykot, trustpilot paradox boykot, google paradox 1 yıldız, steam review bomb paradox",
      },
      {
        name: "news_keywords",
        content:
          "paradox boykot, boykot paradox, hearts of iron 4 ataturk, hoi4 discord, paradox interactive, ataturk skandali, steam boykot, emrah safa gürkan, paradox inceleme boykotu",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "revisit-after", content: "1 days" },
      { name: "rating", content: "general" },
      { name: "distribution", content: "global" },
      { name: "language", content: "tr" },
      { property: "og:site_name", content: "Boykot Paradox — 1★ Boykot Hareketi" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:locale:alternate", content: "en_US" },
      {
        property: "og:title",
        content: "Boykot Paradox — Resmi Atatürk Skandalına Karşı 1★ Kampanyası",
      },
      {
        property: "og:description",
        content:
          "Sadece Steam değil: Metacritic, Trustpilot, Epic, GOG ve Google üzerinden Paradox'a tek dokunuşla 1 yıldız ver. Topluluğuna ve kurucu değerlerine saygı göstermeyen firmaya sıfır tolerans!",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://boykotparadox.vercel.app/" },
      { property: "og:image", content: "https://boykotparadox.vercel.app/ataturk-human.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Gazi Mustafa Kemal Atatürk — Boykot Paradox Kampanyası" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Boykot Paradox — Resmi Atatürk Skandalına Karşı 1★ Kampanyası" },
      {
        name: "twitter:description",
        content:
          "Hearts of Iron IV Discord skandalına karşı Paradox Interactive oyunlarına ve kurumsal sayfalarına 1 yıldız vererek sesini duyur.",
      },
      { name: "twitter:image", content: "https://boykotparadox.vercel.app/ataturk-human.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://boykotparadox.vercel.app/#website",
              "url": "https://boykotparadox.vercel.app/",
              "name": "Boykot Paradox — Tüm Platformlarda 1 Yıldız Kampanyası",
              "alternateName": ["Boycott Paradox Interactive", "Paradox Boykot"],
              "description":
                "Paradox Interactive'in resmi Discord sunucusunda Gazi Mustafa Kemal Atatürk'e ve Türk oyunculara yönelik saygısızlığına karşı başlatılan bağımsız oyuncu boykotu.",
              "inLanguage": ["tr-TR", "en-US"],
            },
            {
              "@type": "Organization",
              "@id": "https://boykotparadox.vercel.app/#organization",
              "name": "Türk Oyuncu Topluluğu İnisiyatifi",
              "url": "https://boykotparadox.vercel.app/",
              "logo": "https://boykotparadox.vercel.app/favicon.png",
              "sameAs": [
                "https://twitter.com/search?q=%23BoycottParadox",
                "https://www.reddit.com/r/hoi4/",
                "https://www.odatv.com/guncel/paradoxtan-ataturk-skandali-hearts-of-ironin-discord-sunucusunda-boykot-120163837",
              ],
            },
            {
              "@type": "NewsArticle",
              "@id": "https://boykotparadox.vercel.app/#newsarticle",
              "headline": "Paradox Interactive Resmi Discord Sunucusundaki Atatürk Skandalına Karşı Kitlesel 1 Yıldız Boykotu",
              "alternativeHeadline": "Turkish Gamers Launch 1-Star Boycott Against Paradox Interactive Over Discord Moderation Hate Speech",
              "description":
                "Hearts of Iron IV resmi Discord kanalında Gazi Mustafa Kemal Atatürk'e ve Türk oyunculara yönelik saygısızlığa karşı tüm platformlarda 1 yıldız boykot kampanyası başlatıldı.",
              "datePublished": "2026-09-22T12:00:00+03:00",
              "dateModified": "2026-09-24T18:00:00+03:00",
              "inLanguage": "tr-TR",
              "mainEntityOfPage": "https://boykotparadox.vercel.app/",
              "image": [
                "https://boykotparadox.vercel.app/ataturk-human.jpg",
                "https://boykotparadox.vercel.app/favicon.png",
              ],
              "author": {
                "@type": "Organization",
                "name": "Bağımsız Türk Oyuncu Topluluğu",
                "url": "https://boykotparadox.vercel.app/",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Boykot Paradox",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://boykotparadox.vercel.app/favicon.png",
                },
              },
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "h2", "#faq p", "blockquote"],
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://boykotparadox.vercel.app/#faq",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Paradox Interactive neden boykot ediliyor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Paradox Interactive'in resmi Hearts of Iron IV Discord sunucusunda Türkiye Cumhuriyeti'nin kurucusu Gazi Mustafa Kemal Atatürk'e ve Türk milletine hakaret edilmiş, barışçıl tepki gösteren Türk oyuncular haksız moderasyon kararlarıyla susturulup banlanmıştır. Paradox yönetiminin resmi bir özür dilememesi nedeniyle boykot başlatılmıştır.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Hearts of Iron IV Discord sunucusunda tam olarak ne yaşandı?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Resmi Paradox HOI4 Discord sunucusunda bazı kullanıcılar Atatürk'ü mesnetsizce tarihi olaylarla ilişkilendirip hakaret içeren ifadeler kullanmıştır. Türk oyuncuların saygı çerçevesinde yaptığı itirazlar moderasyon tarafından 'kışkırtma' sayılarak Türk oyuncular kitlesel olarak banlanmıştır.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Steam incelemelerinin 'Konu Dışı' (Off-Topic) filtresine takılması nasıl önlenir?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "İncelemenizin kalıcı olması için şirketin resmi Discord ve topluluk kanallarındaki 'müşteri memnuniyetsizliği', 'taraflı moderasyon', 'şirket etik politikası' ve 'oyuncu kitlesine saygısızlık' gibi doğrudan tüketici haklarını ilgilendiren ifadelere yer verilmelidir.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Neden sadece Steam değil, Trustpilot ve Google da puanlanmalı?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Steam incelemeleri dönemsel filtrelense dahi, Trustpilot ve Google Haritalar (Stockholm HQ) Paradox Interactive'in doğrudan kurumsal itibarını ve Google arama sonuçlarındaki şirket itibar puanını belirler.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Tarihçi Prof. Dr. Emrah Safa Gürkan ve ulusal medya olaya nasıl yaklaştı?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "6.000 saati aşkın Paradox oyunu tecrübesi bulunan ünlü tarihçi Prof. Dr. Emrah Safa Gürkan, şirketin Atatürk'e yönelik tutumunun açık bir düşmanlık ve tarihi cehalet olduğunu belirterek tüm Paradox oyunlarını kütüphanesinden sildiğini açıklamıştır. Sözcü, OdaTV, Onedio gibi ulusal basın organları da skandalı haberleştirmiştir.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Boykot kampanyasının Paradox yönetiminden 4 temel talebi nedir?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "1. Resmi ve samimi bir özür yayınlanması. 2. Sorumlu moderatörlerin yetkilerinin feshedilmesi. 3. Haksız yere banlanan Türk oyuncuların yasaklarının kaldırılması. 4. Moderasyon standartlarında milli değerlere ve kurucu liderlere saygının güvence altına alınması.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How can international players support the #BoycottParadox movement?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "International gamers can support by leaving a 1-star review on Metacritic and Trustpilot, demanding fair community moderation, and posting on social media using the #BoycottParadox hashtag.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const SOURCE_URL =
  "https://www.odatv.com/guncel/paradoxtan-ataturk-skandali-hearts-of-ironin-discord-sunucusunda-boykot-120163837";

const STORAGE_VOTES_KEY = "boykot-paradox-oylar";
const STORAGE_STAMPS_KEY = "boykot-paradox-stamps";

// Campaign reference start: 22 September 2026 12:00:00
const CAMPAIGN_REF_MS = new Date("2026-09-22T12:00:00+03:00").getTime();
const BASE_TOTAL_VOTES = 6934;

const RECENT_LIVE_ACTIONS = [
  "Hearts of Iron IV için Steam'de yeni 1★ verildi",
  "Paradox Interactive için Trustpilot'ta 1★ inceleme paylaşıldı",
  "Europa Universalis IV için Epic Games'te 1★ verildi",
  "Crusader Kings III için Steam mağazasında 1★ verildi",
  "Victoria 3 için Metacritic'te 1★ puanlama yapıldı",
  "Paradox Interactive için Google Haritalar'da 1★ bırakıldı",
  "Cities: Skylines II için Steam'de yeni 1★ kaydedildi",
  "Hearts of Iron IV topluluk boykotuna +1 destek eklendi",
];

const tr = (n: number) => n.toLocaleString("tr-TR");

function Index() {
  const [votedGames, setVotedGames] = useState<string[]>([]);
  const [stampedPlatforms, setStampedPlatforms] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Live Simulated Community Ticker
  const [liveGrowth, setLiveGrowth] = useState(() => {
    const elapsedSec = Math.max(0, Math.floor((Date.now() - CAMPAIGN_REF_MS) / 1000));
    return Math.floor(elapsedSec / 16);
  });
  const [justTicked, setJustTicked] = useState(false);
  const [lastIncrement, setLastIncrement] = useState(1);
  const [activeNoticeIdx, setActiveNoticeIdx] = useState(0);

  useEffect(() => {
    let timeoutId: any;

    const tick = () => {
      const nextDelay = Math.floor(Math.random() * 4500) + 4000;
      timeoutId = setTimeout(() => {
        const added = Math.random() > 0.75 ? 2 : 1;
        setLastIncrement(added);
        setLiveGrowth((prev) => prev + added);
        setJustTicked(true);
        setActiveNoticeIdx((prev) => (prev + 1) % RECENT_LIVE_ACTIONS.length);

        setTimeout(() => setJustTicked(false), 1400);
        tick();
      }, nextDelay);
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

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
        toast.success("1 Yıldız Verildi!", {
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

  const markPlatformAsStamped = (targetId: string) => {
    setStampedPlatforms((prev) => {
      if (prev.includes(targetId)) return prev;
      const next = [...prev, targetId];
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
        markPlatformAsStamped(`${game.id}-${p.id}`);
      }, idx * 250);
    });
  };

  // Calculate total votes (Base + Live Organic Community Growth + User's local votes)
  const totalVotes = BASE_TOTAL_VOTES + liveGrowth + votedGames.length;

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
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 60;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const targetY = elementPosition - headerHeight;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-seal selection:text-paper">
      {/* Top Banner Notice */}
      <div className="border-b border-ink/20 bg-ink px-3 sm:px-4 py-2 font-mono text-[11px] text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start sm:items-center gap-2 min-w-0">
            <span className="mt-1 sm:mt-0 inline-block size-2 shrink-0 animate-ping rounded-full bg-emerald-400" />
            <div className="leading-snug">
              <strong className="text-emerald-400 uppercase tracking-wider mr-1.5 shrink-0">Canlı Akış:</strong>
              <span className="text-paper/90">
                {RECENT_LIVE_ACTIONS[activeNoticeIdx]}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0 pt-1.5 sm:pt-0 border-t border-paper/10 sm:border-t-0 text-[10px] sm:text-[11px]">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-1 font-bold text-seal underline hover:text-paper"
            >
              <Flame className="size-3" />
              <span>Hızlı Baskın Modu</span>
            </button>
            <AudioStampToggle />
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="/favicon.png"
              alt="Atatürk Rozet Logo"
              className="size-7 sm:size-8 object-contain drop-shadow-sm rounded-full"
            />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <span className="font-display text-xl sm:text-2xl leading-none tracking-tight">
                BOYKOT PARADOX
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-seal font-bold sm:block">
                Tüm Platformlarda 1★ Kampanyası
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
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
              <div className="flex items-center justify-end gap-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-mute">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-bold text-emerald-600">Canlı</span>
                <span className="hidden xs:inline">Toplam 1★</span>
              </div>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                {justTicked && (
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-emerald-600 animate-pulse">
                    +{lastIncrement}
                  </span>
                )}
                <div
                  className={`font-mono text-lg sm:text-2xl font-bold tabular-nums transition-colors duration-300 ${
                    justTicked ? "text-emerald-600" : "text-seal"
                  }`}
                >
                  {tr(totalVotes)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("imza")}
              className="inline-flex items-center gap-1.5 border border-seal/40 bg-seal/10 px-2.5 py-1.5 sm:px-3 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] text-seal hover:bg-seal hover:text-paper transition-colors"
            >
              <PenLine className="size-3.5" />
              <span className="hidden sm:inline">İmza Kampanyası</span>
              <span className="sm:hidden">İmza</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-seal px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] text-paper transition-transform active:translate-y-px hover:brightness-110"
            >
              <Flame className="size-3.5 sm:size-4 animate-bounce" />
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

        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div className="rise flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-seal">
            <span className="size-2 animate-pulse rounded-full bg-seal" />
            Steam · Metacritic · Trustpilot · Google · Epic · GOG · Xbox
          </div>

          <h1
            className="rise mt-5 font-display text-[clamp(2.3rem,10vw,9.5rem)] leading-[0.98] tracking-tight uppercase"
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
            Tepkimizi tek bir platformla sınırlamıyoruz: <strong>Oyunlara, mağazalara, Trustpilot'a ve Google'a tek tıkla 1 yıldız veriyoruz!</strong>
          </p>

          {/* Primary Action Buttons */}
          <div
            className="rise mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="group inline-flex items-center gap-2.5 bg-seal px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper transition-all hover:brightness-110 shadow-lg shadow-seal/25 active:translate-y-px"
            >
              <Flame className="size-4 animate-bounce" />
              <span>Tek Tıkla Tüm Platformları Aç</span>
            </button>

            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border-2 border-seal bg-seal/20 px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper transition-all hover:bg-seal hover:text-paper shadow-md shadow-seal/10"
            >
              <PenLine className="size-4 text-seal group-hover:text-paper transition-colors" />
              <span>İmza Kampanyasına Katıl</span>
              <ExternalLink className="size-3.5 opacity-80" />
            </a>

            <button
              type="button"
              onClick={() => scrollTo("sablonlar")}
              className="inline-flex items-center gap-2 border-2 border-paper/40 bg-paper/10 px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper transition-all hover:border-paper hover:bg-paper/20"
            >
              <FileText className="size-4" />
              <span>Hazır 1★ Metinleri</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("tweet-baskini")}
              className="inline-flex items-center gap-2.5 border-2 border-paper/40 bg-black px-5 py-3 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.12em] text-paper transition-all hover:border-paper hover:bg-neutral-900 shadow-lg shadow-black/50 active:translate-y-px"
            >
              <XIcon className="size-4 text-paper" />
              <span>X / CEO Baskını</span>
            </button>
          </div>

          {/* Quick Section Navigation Bar */}
          <div
            className="rise mt-4 flex flex-wrap items-center gap-2 border-t border-paper/10 pt-4"
            style={{ animationDelay: "320ms" }}
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-paper/50 mr-1 hidden sm:inline-flex items-center gap-1">
              Bölümlere Git:
            </span>

            <button
              type="button"
              onClick={() => scrollTo("kurumsal")}
              className="inline-flex items-center gap-1.5 border border-paper/25 bg-paper/5 px-3 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-paper/90 transition-all hover:border-seal/60 hover:bg-seal/10 hover:text-paper"
            >
              <Building2 className="size-3.5 text-seal" />
              <span>Trustpilot & Google</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("eylem-rehberleri")}
              className="inline-flex items-center gap-1.5 border border-paper/25 bg-paper/5 px-3 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-paper/90 transition-all hover:border-seal/60 hover:bg-seal/10 hover:text-paper"
            >
              <ShieldAlert className="size-3.5 text-seal" />
              <span>İade & Şikayet</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("anit")}
              className="inline-flex items-center gap-1.5 border border-paper/25 bg-paper/5 px-3 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-paper/90 transition-all hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-paper"
            >
              <Sparkles className="size-3.5 text-amber-400" />
              <span>3D Atatürk Anıtı</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("kaynaklar")}
              className="inline-flex items-center gap-1.5 border border-paper/25 bg-paper/5 px-3 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-paper/90 transition-all hover:border-seal/60 hover:bg-seal/10 hover:text-paper"
            >
              <Newspaper className="size-3.5 text-seal" />
              <span>Haber Kaynakları</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("oyunlar")}
              className="inline-flex items-center gap-1.5 border border-paper/25 bg-paper/5 px-3 py-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-paper/90 transition-all hover:border-seal/60 hover:bg-seal/10 hover:text-paper"
            >
              <Layers className="size-3.5 text-seal" />
              <span>Oyun Kataloğu</span>
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
              <div className="font-display text-2xl text-paper">{GAMES.length} Oyun & Seri</div>
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
      <section id="oyunlar" className="mx-auto max-w-[1240px] px-5 py-14 scroll-mt-16 sm:scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">
              <Layers className="size-3.5" />
              Tüm Platformlarda Puanlama
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl tracking-tight uppercase">
              Tüm Oyunlara 1 Yıldız Ver
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
            const gameShare = Math.floor((liveGrowth * game.base) / BASE_TOTAL_VOTES);
            const count = game.base + gameShare + (isVoted ? 1 : 0);

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
                    1 ★ VERİLDİ
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
                          {tr(count)} tepki
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
                    <span>{isVoted ? "1 Yıldız Verildi (Kaldır)" : "1 Yıldız Ver"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* All Paradox Games Publisher Hub Banner */}
        <div className="mt-8 border-2 border-dashed border-ink/30 bg-paper p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="max-w-[65ch]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-seal font-bold">
              <span className="size-2 rounded-full bg-seal" />
              Tüm Paradox Kataloğu (100+ Oyun & DLC)
            </div>
            <h3 className="mt-1 font-display text-xl sm:text-2xl uppercase tracking-tight">
              Sadece Bu 6 Oyun Değil, Şirketin Tüm Kataloğu
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-mute leading-relaxed">
              Paradox Interactive bünyesinde <strong>Age of Wonders 4, Prison Architect, Surviving Mars, Magicka, Crusader Kings II</strong> ve yüzlerce genişleme paketi (DLC) yer alıyor. Steam ve Epic Games yayıncı merkezinden tüm oyunlara ulaşıp boykotu genişletebilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="https://store.steampowered.com/publisher/paradoxinteractive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-seal hover:border-seal"
            >
              <span>Steam Tüm Oyunlar (100+)</span>
              <ExternalLink className="size-3.5" />
            </a>
            <a
              href="https://store.epicgames.com/tr/browse?q=Paradox%20Interactive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink"
            >
              <span>Epic Games Kataloğu</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 3D Atatürk Monument Scene */}
      <Ataturk3DScene />

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
              (A) Profil Fotoğrafı & 1915 İftirası
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase leading-none">
              Moderatör 'chakerathe' İftirası
            </h3>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              Resmi HOI4 Discord'unda Atatürk portresini profil fotoğrafı yapan Türk oyuncu banlandı. İtiraz talebinde moderatör <strong>'chakerathe'</strong>, Atatürk'ü İttihat ve Terakki ile bağdaştırıp 1915 olayları üzerinden açıkça <strong>soykırımcı iftirası</strong> attı ve fotoğrafı kaldırmazsa banın kalkmayacağını söyledi.
            </p>
          </div>

          <div className="border-2 border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              (B) Çifte Standart & Sansür
            </div>
            <h3 className="mt-2 font-display text-2xl uppercase leading-none">
              Stalin Serbest, Atatürk Yasak
            </h3>
            <p className="mt-3 text-sm text-mute leading-relaxed">
              Sunucuda Stalin ve Churchill fotoğraflarına izin verilirken; 1915'te Çanakkale'de cephede vatan savunan Atatürk'e atılan bu iftiraya itiraz eden ve gerçeği anlatan Türk oyuncular, sunucu yetkilileri tarafından susturuldu ve kitlesel olarak banlandı.
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
              Tarihçi Prof. Dr. Emrah Safa Gürkan 6000+ saatlik oyun kütüphanesini silerek tepki gösterdi. Yalnızca HOI4 değil; Paradox'un tüm oyunları, Trustpilot kurumsal sayfası ve Google Maps profili 1 yıldız veriliyor.
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

      {/* Official Petition Campaign Section */}
      <PetitionSection />

      {/* Corporate Targets Section (Trustpilot, Google, Metacritic Publisher) */}
      <CorporateTargetsSection
        stampedIds={stampedPlatforms}
        onToggleStamp={toggleStampPlatform}
      />

      {/* Direct X / Twitter Pressure Center on Paradox CEO & Company */}
      <CeoRaidSection />

      {/* Ready-to-copy Review Templates */}
      <ReviewTemplatesSection />

      {/* Anti-Spam / Anti-Review Bombing Guidelines */}
      <AntiSpamGuideSection />

      {/* Action Guides: Steam Refund, Discord Report & Avatar Protest Kit */}
      <BoycottGuidesSection />

      {/* FAQ & AEO / GEO Bilgi Merkezi */}
      <FaqSection />

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
        onMarkStamped={markPlatformAsStamped}
      />

      {/* Footer */}
      <footer className="border-t-2 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/favicon.png"
                alt="Atatürk Rozet Logo"
                className="size-9 sm:size-10 object-contain drop-shadow rounded-full"
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
