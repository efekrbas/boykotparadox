import { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send, MessageSquare, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";
import { XIcon } from "@/components/icons/XIcon";

export function ShareBar() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  // Dynamic clean production URL
  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
        return window.location.origin;
      }
    }
    return "https://boykotparadox.vercel.app";
  };

  const shareUrl = getShareUrl();
  const shareText =
    "Paradox Interactive'in resmi Discord sunucusundaki Atatürk ve Türk oyunculara yönelik saygısızlığa karşı tek ses! Bütün platformlarda 1 yıldız veriyoruz:";

  const handleCopyLink = () => {
    playStampSound();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      toast.success("Boykot Bağlantısı Kopyalandı!", {
        description: `${shareUrl} panoya kopyalandı.`,
      });
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleCopyDiscord = () => {
    playStampSound();
    const discordMessage =
      `🚨 **BOYKOT PARADOX — TÜM PLATFORMLARDA 1★ KAMPANYASI**\n\n` +
      `Paradox Interactive'in resmi Hearts of Iron IV sunucusunda Gazi Mustafa Kemal Atatürk'e ve Türk oyunculara yönelik yapılan hakaret ve haksız sansüre karşı sessiz kalmıyoruz.\n\n` +
      `🎮 Tek tıkla Steam, Metacritic, Trustpilot ve Google üzerinden 1 yıldız vererek sesini duyur:\n` +
      `👉 ${shareUrl}\n\n` +
      `#BoycottParadox #ParadoxBoykot @everyone`;

    navigator.clipboard.writeText(discordMessage).then(() => {
      setCopiedDiscord(true);
      toast.success("Discord Duyuru Metni Kopyalandı!", {
        description: "Discord sunucularınıza ve oyun kanallarınıza yapıştırabilirsiniz.",
      });
      setTimeout(() => setCopiedDiscord(false), 2500);
    });
  };

  const handleTwitterShare = () => {
    const tweet = encodeURIComponent(
      "Paradox Interactive'in resmi Discord sunucusunda Atatürk ve Türk oyunculara yapılan saygısızlığa karşı tek ses! Bütün platformlarda 1 yıldız veriyoruz! #BoycottParadox #ParadoxBoykot @PdxInteractive\n" +
        shareUrl
    );
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank", "noopener,noreferrer");
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(shareText + "\n" + shareUrl);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleTelegramShare = () => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(shareText);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
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
            {shareUrl}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-black hover:text-paper hover:border-black"
        >
          <XIcon className="size-3.5" />
          <span>X'te Paylaş</span>
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
          onClick={handleLinkedInShare}
          className="inline-flex items-center gap-2 border border-ink/30 bg-paper px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
        >
          <Linkedin className="size-3.5" />
          <span>LinkedIn</span>
        </button>

        <button
          type="button"
          onClick={handleCopyDiscord}
          className="inline-flex items-center gap-2 border border-[#5865F2] bg-[#5865F2]/10 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-[#5865F2] transition-colors hover:bg-[#5865F2] hover:text-white"
        >
          {copiedDiscord ? <Check className="size-3.5" /> : <MessageSquare className="size-3.5" />}
          <span>{copiedDiscord ? "Discord Metni Kopyalandı!" : "Discord İçin Kopyala"}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 bg-ink px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-paper transition-transform active:translate-y-px hover:bg-seal"
        >
          {copiedLink ? <Check className="size-3.5 text-paper" /> : <Copy className="size-3.5" />}
          <span>{copiedLink ? "Kopyalandı!" : "Linki Kopyala"}</span>
        </button>
      </div>
    </div>
  );
}
