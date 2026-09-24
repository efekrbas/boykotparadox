import { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

export function ShareBar() {
  const [copied, setCopied] = useState(false);

  const shareText =
    "Paradox Interactive'in resmi sunucusundaki Atatürk ve Türk topluluğu saygısızlığına karşı boykot büyüyor! Sen de oyunlara ve Trustpilot'a 1 yıldız vererek sesini duyur: ";
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://boykotparadox.com";

  const handleCopyLink = () => {
    playStampSound();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast.success("Boykot Bağlantısı Kopyalandı!", {
        description: "Arkadaşlarınızla ve oyun gruplarınızla paylaşın.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleTwitterShare = () => {
    const tweet = encodeURIComponent(
      "Paradox Interactive resmi sunucusundaki Atatürk ve Türk oyunculara yönelik saygısızlığa karşı tek yürek! Bütün platformlarda 1 yıldız veriyoruz! #BoycottParadox #ParadoxBoykot @PdxInteractive\n" +
        shareUrl
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(shareText + shareUrl);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleTelegramShare = () => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-2 border-ink bg-paper p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center bg-seal text-paper">
          <Share2 className="size-5" />
        </div>
        <div>
          <div className="font-display text-lg uppercase tracking-tight text-ink">
            Sesini Duyur & Kampanyayı Yay
          </div>
          <div className="font-mono text-xs text-mute">
            Daha fazla Türk oyuncuya ulaşmak için boykotu paylaş
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
        >
          <span>X / Twitter</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-emerald-700 hover:text-paper hover:border-emerald-700"
        >
          <MessageCircle className="size-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleTelegramShare}
          className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-sky-600 hover:text-paper hover:border-sky-600"
        >
          <Send className="size-3.5" />
          <span>Telegram</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 bg-ink px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-transform active:translate-y-px"
        >
          {copied ? <Check className="size-3.5 text-seal" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Kopyalandı!" : "Linki Kopyala"}</span>
        </button>
      </div>
    </div>
  );
}
