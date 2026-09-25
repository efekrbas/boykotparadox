"use client";

import { useState, useEffect } from "react";
import { Sparkles, KeyRound, Eye, EyeOff, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";
import { GAMES } from "@/data/boycottData";

export function AiReviewGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [focusTopic, setFocusTopic] = useState("");
  const [selectedGame, setSelectedGame] = useState(GAMES[0]?.title || "");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem("gemini_api_key", val);
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      toast.error("Lütfen önce Gemini API anahtarınızı girin.");
      return;
    }

    if (!focusTopic.trim()) {
      toast.error("Lütfen oyun hakkında vurgulamak istediğiniz kusuru girin.");
      return;
    }

    setIsLoading(true);
    setGeneratedText("");

    try {
      const prompt = `Sen bir oyuncusun. Steam'de bir Paradox Interactive oyununa kötü bir inceleme (1 yıldız) yazıyorsun. 
Oyunun adı: ${selectedGame}. Bu oyun hakkında inceleme yapacaksın.
Oyunun teknik sorunları, DLC politikası, optimizasyon sıkıntıları, sıkıcı mekanikleri veya oyunun pahalılığı gibi tamamen "oyunla ilgili" konulardan şikayet etmelisin. Siyasi hiçbir şeyden, Discord'dan veya Atatürk'ten BAHSETME. Amacımız Steam'in "konu dışı" filtresine takılmamak. Tamamen normal ama çok kızgın bir oyuncunun oyun hakkındaki kötü yorumu gibi görünmeli.
Özellikle şu konuya odaklan: ${focusTopic}.
Lütfen çok kısa (en fazla 3-4 cümle), sitemkar, küfürsüz bir Türkçe inceleme metni yaz. Çıktıda sadece inceleme metni olsun, başka açıklama yapma.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200,
            }
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API hatası. Lütfen anahtarınızı kontrol edin.");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        setGeneratedText(text.trim());
        toast.success("Özgün inceleme üretildi!");
        playStampSound();
      } else {
        throw new Error("Yanıt alınamadı.");
      }
    } catch (error: any) {
      toast.error(error.message || "Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    playStampSound();
    navigator.clipboard.writeText(generatedText).then(() => {
      setCopied(true);
      toast.success("Yapay zeka metni kopyalandı!");
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="mt-8 border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_0_oklch(0.556_0.216_27.5)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
        <Sparkles className="size-48" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 border-b-2 border-ink/20 pb-3 mb-5">
          <Sparkles className="size-5 text-seal" />
          <h3 className="font-display text-2xl uppercase tracking-tight">
            AI ile Özgün İnceleme Üret
          </h3>
          <span className="ml-auto font-mono text-[10px] uppercase bg-ink text-paper px-2 py-1 font-bold">
            Gemini Destekli
          </span>
        </div>

        <p className="text-sm text-ink/80 mb-6 max-w-[70ch]">
          Steam'in otomatik spam filtresine ("Konu Dışı" uyarısı) takılmamak için kendi API anahtarınızı kullanarak her seferinde tamamen benzersiz ve özgün 1 yıldız inceleme metinleri üretebilirsiniz. <br/>
          <strong className="text-seal font-mono text-xs">Not: API anahtarınız sadece tarayıcınızda (Local Storage) tutulur, hiçbir sunucuya gönderilmez.</strong>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink mb-1.5">
                <KeyRound className="size-3.5" />
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full border-2 border-ink/30 bg-paper/50 p-2.5 pr-10 font-mono text-sm outline-none focus:border-seal transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition-colors"
                >
                  {showApiKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <div className="mt-1 font-mono text-[9px] text-ink/50">
                Google AI Studio'dan ücretsiz alabilirsiniz.
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-ink mb-1.5">
                Hedef Oyun
              </label>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full border-2 border-ink/30 bg-paper/50 p-2.5 font-mono text-sm outline-none focus:border-seal transition-colors"
              >
                {GAMES.map((game) => (
                  <option key={game.id} value={game.title}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-ink mb-1.5">
                Oyun Hakkında Vurgulamak İstediğiniz Kusur (Zorunlu)
              </label>
              <input
                type="text"
                value={focusTopic}
                onChange={(e) => setFocusTopic(e.target.value)}
                placeholder="Örn: Sürekli çöküyor, DLC'ler çok pahalı..."
                className="w-full border-2 border-ink/30 bg-paper/50 p-2.5 font-mono text-sm outline-none focus:border-seal transition-colors"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || !apiKey.trim() || !focusTopic.trim()}
              className="w-full inline-flex justify-center items-center gap-2 bg-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-transform active:translate-y-px hover:bg-seal disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Üretiliyor...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Metin Üret
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col h-full">
            <label className="block font-mono text-xs font-bold uppercase text-ink mb-1.5">
              Üretilen Özgün Metin
            </label>
            <textarea
              readOnly
              value={generatedText}
              placeholder="Yapay zeka çıktısı burada belirecek..."
              className="w-full flex-1 min-h-[120px] resize-none border-2 border-ink/30 bg-paper p-3 font-body text-sm leading-relaxed text-ink outline-none selection:bg-seal selection:text-paper"
            />
            {generatedText && (
              <button
                type="button"
                onClick={handleCopy}
                className="mt-3 inline-flex justify-center items-center gap-2 border-2 border-seal bg-seal/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-seal transition-colors hover:bg-seal hover:text-paper"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Kopyalandı!" : "Metni Kopyala"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
