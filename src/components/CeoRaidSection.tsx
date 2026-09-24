import { useState } from "react";
import { Send, Copy, Check, Twitter, AlertTriangle, Sparkles, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

interface TweetPreset {
  id: string;
  label: string;
  lang: "TR" | "EN";
  text: string;
}

const TWEET_PRESETS: TweetPreset[] = [
  {
    id: "tr-main",
    label: "Türkçe Doğrudan Tepki (Önerilen)",
    lang: "TR",
    text: "Atatürk bu milletin kırmızı çizgisidir, tartışılamaz! Resmi Discord sunucunuzda atılan 1915 iftirasını ve Türk oyunculara uygulanan haksız sansürü kınıyoruz. Paradox yönetiminden derhal resmi ve samimi bir kamuoyu özrü bekliyoruz! @PdxInteractive @TheRikard @HOI_Game #BoycottParadox #AtaturkTartisilamaz",
  },
  {
    id: "en-global",
    label: "English / International Pressure",
    lang: "EN",
    text: "We demand accountability and a formal public apology from @PdxInteractive and CEO @TheRikard for allowing hate speech, historic slander, and unjust censorship against Turkish players on the official HOI4 Discord. Respect your community! #BoycottParadox",
  },
  {
    id: "consumer-rights",
    label: "Tüketici & İade Vurgusu",
    lang: "TR",
    text: "Topluluğuna, tarihine ve kurucu liderine saygı göstermeyen bir oyun firmasına tek kuruş yok. Resmi özür gelene kadar tüm Paradox oyunları ve DLC'leri boykotta! @PdxInteractive @TheRikard #BoycottParadox #ParadoxBoykot",
  },
];

export function CeoRaidSection() {
  const [selectedId, setSelectedId] = useState<string>("tr-main");
  const [copied, setCopied] = useState(false);

  const currentPreset = TWEET_PRESETS.find((p) => p.id === selectedId) || TWEET_PRESETS[0]!;

  const handleCopy = async () => {
    playStampSound();
    try {
      await navigator.clipboard.writeText(currentPreset.text);
      setCopied(true);
      toast.success("Tweet metni kopyalandı!", {
        description: "X (Twitter), LinkedIn veya forumlarda doğrudan paylaşabilirsiniz.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Metin kopyalanamadı.");
    }
  };

  const handleTweet = () => {
    playStampSound();
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPreset.text)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
    toast.success("X (Twitter) Açılıyor...", {
      description: "Hazır tweet penceresi açıldı. Tek tıkla sesimizi CEO'ya duyurun!",
    });
  };

  return (
    <section id="tweet-baskini" className="mx-auto max-w-[1240px] px-5 py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="border-2 border-ink bg-ink text-paper p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.556 0.216 27.5)" }}
        />

        <div className="relative">
          {/* Badge & Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/15 pb-4">
            <div className="inline-flex items-center gap-2 border border-seal/50 bg-seal/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-seal">
              <span className="size-2 animate-ping rounded-full bg-seal" />
              Doğrudan Baskı Merkezi · X (Twitter)
            </div>
            <div className="font-mono text-xs text-paper/60">
              Hedefler: <strong className="text-paper">@TheRikard</strong> (CEO) · <strong className="text-paper">@PdxInteractive</strong>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Context */}
            <div className="lg:col-span-6">
              <h2 className="font-display text-2xl sm:text-4xl uppercase tracking-tight leading-tight">
                Paradox CEO'suna <span className="text-seal">Tek Tıkla</span> Tweet At
              </h2>
              <p className="mt-3 text-sm sm:text-base text-paper/85 leading-relaxed">
                Şirket yönetimi Discord'daki olayı sessizce geçiştirmeye çalışıyor. Paradox CEO'su{" "}
                <strong>Rikard Lindgren</strong> ve kurumsal Twitter hesaplarını doğrudan etiketleyerek
                uluslararası boyutta organize bir tepki gösterelim.
              </p>

              {/* Template Selector Tabs */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TWEET_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      playStampSound();
                      setSelectedId(p.id);
                    }}
                    className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors border ${
                      selectedId === p.id
                        ? "border-seal bg-seal text-paper font-bold"
                        : "border-paper/20 bg-paper/5 text-paper/70 hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    <span className="opacity-60 mr-1.5">[{p.lang}]</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Tweet Box */}
            <div className="lg:col-span-6">
              <div className="border border-paper/25 bg-paper/5 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs font-mono text-paper/60 pb-2 border-b border-paper/10">
                  <span>Hazır Paylaşım Taslağı</span>
                  <span className="text-seal font-bold">{currentPreset.text.length} Karakter</span>
                </div>

                <div className="mt-3 font-mono text-xs sm:text-sm text-paper leading-relaxed bg-black/30 p-4 border border-paper/10">
                  {currentPreset.text}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTweet}
                    className="inline-flex items-center gap-2 bg-[#1d9bf0] hover:bg-[#1a8cd8] px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] font-bold text-white transition-all shadow-md active:translate-y-px"
                  >
                    <Twitter className="size-4 fill-white" />
                    <span>X'te Hemen Tweetle</span>
                    <ExternalLink className="size-3.5 opacity-80" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 border border-paper/30 bg-paper/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper hover:bg-paper/20 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="size-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>Metni Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
