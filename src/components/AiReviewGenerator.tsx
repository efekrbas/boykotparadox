"use client";

import { useState, useEffect } from "react";
import { Sparkles, KeyRound, Eye, EyeOff, Loader2, Copy, Check, ExternalLink, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";
import { GAMES } from "@/data/boycottData";

export function AiReviewGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [focusTopic, setFocusTopic] = useState("");
  const [selectedGame, setSelectedGame] = useState(GAMES[0]?.title || "");
  const [language, setLanguage] = useState<"tr" | "en" | "de" | "ru">("tr");
  const [reviewLength, setReviewLength] = useState<"micro" | "short" | "medium" | "long">("medium");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem("openrouter_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveKey = (val: string) => {
    setApiKey(val);
    localStorage.setItem("openrouter_api_key", val);
  };

  const buildPrompt = () => {
    let lengthDesc = "1-2 paragraflık, doyurucu ve akıcı bir Steam oyuncu incelemesi olsun.";
    if (reviewLength === "micro") {
      lengthDesc = "SADECE TEK BİR KELİME VEYA EN FAZLA KISA TEK BİR CÜMLE OLSUN. Asla uzun yazma, anında lafı yapıştır.";
    } else if (reviewLength === "short") {
      lengthDesc = "2-3 cümlelik, kısa, net ve vurucu bir sitem metni olsun.";
    } else if (reviewLength === "long") {
      lengthDesc = "2-3 paragraflık, oyunun mekaniklerini, sorunlarını ve hissettirdiği hayal kırıklığını derinlemesine anlatan uzun ve detaylı bir Steam incelemesi olsun.";
    }

    const langConfigs = {
      tr: {
        role: "Sen çok sinirli, hızlı ve klavyede rastgele yazan bir Türk oyuncusun.",
        langInstruction: "Türkçe olarak yaz.",
        slang: 'Argolu oyuncu jargonu kullan (çöp, leş, bomboş, para tuzağı, kazık vb.). BİLEREK yazım yanlışları yap ("de/da" ekini bitişik yaz, "herşey", "yapıyo", "geliyo" gibi kelimeler kullan).',
      },
      en: {
        role: "You are a very frustrated, blunt, and disappointed gamer writing a negative Steam review in English.",
        langInstruction: "Write in English like a native gamer.",
        slang: 'Use authentic gamer slang (trash, unplayable, scam, cashgrab, bloated, money pit, dead game). Do NOT sound like an AI or an essay. Write casually with minor grammar imperfections.',
      },
      de: {
        role: "Du bist ein extrem frustrierter und verärgerter Gamer, der eine negative Steam-Rezension auf Deutsch schreibt.",
        langInstruction: "Schreibe auf Deutsch.",
        slang: 'Verwende echte Gamer-Sprache (Müll, Abzocke, unspielbar, Geldmacherei). Schreibe umgangssprachlich und direkt.',
      },
      ru: {
        role: "Ты крайне недовольный и разочарованный геймер, который пишет отрицательный отзыв в Steam на русском языке.",
        langInstruction: "Пиши на русском языке.",
        slang: 'Используй геймерский сленг (мусор, доильня, неиграбельно, лагает, скам, баги). Пиши эмоционально и неформально.',
      },
    };

    const config = langConfigs[language] || langConfigs.tr;

    return `${config.role} Steam'de bir Paradox oyununa kötü inceleme (1 yıldız) yazıyorsun.
Oyunun adı: ${selectedGame}.
Dil: ${config.langInstruction}
Siyasi şeylerden, Discord'dan veya Atatürk'ten ASLA BAHSETME. Sadece "oyunla ilgili" konulardan (optimizasyon, DLC para tuzağı, hatalar vb.) şikayet et.
Özellikle şu konuya odaklan: ${focusTopic}.
Metin boyutu: ${lengthDesc}
ÇOK ÖNEMLİ (Steam AI Filtresi Atlatma): Bu metnin yapay zeka tarafından yazıldığı kesinlikle anlaşılamamalı! Steam moderatörlerini kandırmalıyız.
- Yapay zeka kelimelerini ASLA kullanma: "Öncelikle", "Sonuç olarak", "Açıkçası", "Genel olarak", "Özetle", "Clearly", "Overall", "In conclusion" gibi kelimeleri ASLA YAZMA.
- Cümlelerin düzensiz, devrik ve aceleyle yazılmış gibi olsun. Bazen büyük harf kuralına bile uyma (cümleye küçük harfle başla vs).
- Noktalama işaretlerini tamamen salla, virgül ve nokta kullanımını en aza indir.
- ${config.slang}
- Metni tırnak işareti içine alma, sadece kopyalanacak saf yazıyı ver.`;
  };

  const handleGenerate = async () => {
    if (!focusTopic.trim()) {
      toast.error("Lütfen oyun hakkında vurgulamak istediğiniz kusuru girin.");
      return;
    }

    const prompt = buildPrompt();

    // Fallback if no API key entered
    if (!apiKey.trim()) {
      setIsFallback(true);
      setErrorMessage("API anahtarı girilmediği için prompt hazırlandı.");
      setGeneratedText(prompt);
      toast.info("Prompt hazırlandı. Aşağıdaki butonlarla harici yapay zekaya sorabilirsiniz.");
      playStampSound();
      return;
    }

    setIsLoading(true);
    setGeneratedText("");
    setIsFallback(false);
    setErrorMessage(null);

    try {
      const cleanKey = apiKey.trim();
      
      const defaultModels = [
        "google/gemini-2.0-flash-exp:free",
        "google/gemini-2.0-flash-lite-preview-02-05:free",
        "google/gemini-1.5-flash",
        "google/gemma-2-27b-it"
      ];

      const queue: string[] = [...defaultModels];
      const triedModels = new Set<string>();
      let success = false;
      let lastErrorMsg = "";

      while (queue.length > 0) {
        const model = queue.shift()!;
        if (triedModels.has(model)) continue;
        triedModels.add(model);

        try {
          const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cleanKey}`,
                "HTTP-Referer": "https://boykotparadox.vercel.app/",
                "X-Title": "Boykot Paradox"
              },
              body: JSON.stringify({
                model: model,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.75,
                max_tokens: 1200,
              }),
            }
          );

          if (!response.ok) {
            const errData = await response.json().catch(() => null);
            lastErrorMsg = errData?.error?.message || `HTTP ${response.status} hatası.`;
            continue; // Try next OpenRouter model
          }

          const data = await response.json();
          const text = data.choices?.[0]?.message?.content;

          if (text) {
            setGeneratedText(text.trim());
            setIsFallback(false);
            setErrorMessage(null);
            toast.success(`Özgün inceleme üretildi! (${model})`);
            playStampSound();
            success = true;
            break;
          }
        } catch (err: any) {
          lastErrorMsg = err.message;
        }
      }

      if (!success) {
        let userFriendlyMsg = lastErrorMsg;
        if (lastErrorMsg.includes("not found") || lastErrorMsg.includes("API key") || lastErrorMsg.includes("permission") || lastErrorMsg.includes("no longer available")) {
          userFriendlyMsg = `Modeller yanıt vermedi (${lastErrorMsg.substring(0, 100)}...). Lütfen aşağıdaki butonlarla harici yapay zekaya sorun.`;
        }
        throw new Error(userFriendlyMsg);
      }
    } catch (error: any) {
      // Fallback: put plain prompt directly into text area
      setIsFallback(true);
      setErrorMessage(error.message || "API hatası oluştu.");
      setGeneratedText(prompt);
      toast.warning("API çağrısı başarısız oldu. Prompt hazırlandı, harici bir modele sorabilirsiniz.");
      playStampSound();
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
            OpenRouter Destekli
          </span>
        </div>

        <p className="text-sm text-ink/80 mb-6 max-w-[70ch]">
          Steam'in otomatik spam filtresine ("Konu Dışı" uyarısı) takılmamak için kendi OpenRouter API anahtarınızı kullanarak her seferinde tamamen benzersiz ve özgün 1 yıldız inceleme metinleri üretebilirsiniz. <br />
          <strong className="text-seal font-mono text-xs">Not: API anahtarınız sadece tarayıcınızda (Local Storage) tutulur, hiçbir sunucuya gönderilmez.</strong>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-ink mb-1.5">
                <KeyRound className="size-3.5" />
                OpenRouter API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => handleSaveKey(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && apiKey.trim() && focusTopic.trim() && !isLoading && handleGenerate()}
                  placeholder="sk-or-v1-..."
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
                <a href="https://openrouter.ai/settings/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  openrouter.ai adresinden alabilirsiniz.
                </a>
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
                onKeyDown={(e) => e.key === "Enter" && apiKey.trim() && focusTopic.trim() && !isLoading && handleGenerate()}
                placeholder="Örn: Sürekli çöküyor, DLC'ler çok pahalı..."
                className="w-full border-2 border-ink/30 bg-paper/50 p-2.5 font-mono text-sm outline-none focus:border-seal transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-ink mb-1.5">
                İnceleme Uzunluğu
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: "micro", label: "Tek Cümle" },
                  { id: "short", label: "Kısa" },
                  { id: "medium", label: "Orta" },
                  { id: "long", label: "Uzun" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReviewLength(item.id as "micro" | "short" | "medium" | "long")}
                    className={`border-2 py-1.5 px-2 font-mono text-xs font-bold transition-all text-center ${
                      reviewLength === item.id
                        ? "border-seal bg-seal text-paper shadow-sm"
                        : "border-ink/20 bg-paper/60 text-ink/70 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-mono text-xs font-bold uppercase text-ink">
                  İnceleme Dili (Global Etki)
                </label>
                <span className="font-mono text-[10px] text-mute">
                  Steam algoritmasını delmek için
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: "tr", label: "🇹🇷 Türkçe" },
                  { id: "en", label: "🇬🇧 English" },
                  { id: "de", label: "🇩🇪 Deutsch" },
                  { id: "ru", label: "🇷🇺 Русский" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLanguage(item.id as "tr" | "en" | "de" | "ru")}
                    className={`border-2 py-1.5 px-2 font-mono text-xs font-bold transition-all text-center ${
                      language === item.id
                        ? "border-seal bg-seal text-paper shadow-sm"
                        : "border-ink/20 bg-paper/60 text-ink/70 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading || !focusTopic.trim()}
              className="w-full inline-flex justify-center items-center gap-2 bg-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-paper transition-transform active:translate-y-px hover:bg-seal disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Üretiliyor...
                </>
              ) : apiKey.trim() ? (
                <>
                  <Sparkles className="size-4" /> AI ile Metin Üret
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Prompt Oluştur (API'sız)
                </>
              )}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-mono text-xs font-bold uppercase text-ink">
                {isFallback ? "Hazırlanan AI Promptu (Düz Metin)" : "Üretilen Özgün Metin"}
              </label>
              {isFallback && (
                <span className="font-mono text-[10px] uppercase bg-seal/15 text-seal px-2 py-0.5 font-bold border border-seal/40">
                  Fallback Modu
                </span>
              )}
            </div>

            {isFallback && (
              <div className="p-3 mb-3 bg-seal/10 border-2 border-seal/30 text-xs space-y-2">
                <div className="flex items-start gap-2 text-seal font-bold">
                  <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <span>{errorMessage || "API çağrısı gerçekleştirilemedi."}</span>
                    <p className="text-[11px] font-normal text-ink/80 mt-0.5">
                      Hazırlanan prompt aşağıya aktarıldı. Doğrudan kopyalayabilir veya aşağıdaki hızlı linklerle tek tıkla modele sorabilirsiniz:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-4">
                  <a
                    href={`https://chatgpt.com/?q=${encodeURIComponent(generatedText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedText);
                      toast.success("Prompt panoya kopyalandı, ChatGPT açılıyor!");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-ink text-paper text-[11px] font-mono font-bold hover:bg-seal transition-colors"
                  >
                    <span>ChatGPT</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <a
                    href="https://gemini.google.com/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedText);
                      toast.success("Prompt panoya kopyalandı! Gemini'ye yapıştırabilirsiniz.");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-paper text-ink text-[11px] font-mono font-bold hover:bg-ink hover:text-paper transition-colors"
                  >
                    <span>Gemini</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <a
                    href="https://claude.ai/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedText);
                      toast.success("Prompt panoya kopyalandı! Claude'a yapıştırabilirsiniz.");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-paper text-ink text-[11px] font-mono font-bold hover:bg-ink hover:text-paper transition-colors"
                  >
                    <span>Claude</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <a
                    href="https://chat.deepseek.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedText);
                      toast.success("Prompt panoya kopyalandı! DeepSeek'e yapıştırabilirsiniz.");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 border-2 border-ink bg-paper text-ink text-[11px] font-mono font-bold hover:bg-ink hover:text-paper transition-colors"
                  >
                    <span>DeepSeek</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            )}

            <textarea
              readOnly
              value={generatedText}
              placeholder="Yapay zeka çıktısı veya hazırlanan prompt burada belirecek..."
              className="w-full flex-1 min-h-[140px] resize-none border-2 border-ink/30 bg-paper p-3 font-body text-sm leading-relaxed text-ink outline-none selection:bg-seal selection:text-paper"
            />
            {generatedText && (
              <button
                type="button"
                onClick={handleCopy}
                className="mt-3 inline-flex justify-center items-center gap-2 border-2 border-seal bg-seal/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-seal transition-colors hover:bg-seal hover:text-paper"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Kopyalandı!" : (isFallback ? "Promptu Kopyala" : "Metni Kopyala")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
