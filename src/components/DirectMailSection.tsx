"use client";

import { useState } from "react";
import { Mail, Copy, Check, ExternalLink, Megaphone, Target } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

const PARADOX_EMAILS = "pr@paradoxinteractive.com, licensing@paradoxinteractive.com";
const EMAIL_SUBJECT = "Community Crisis: Formal Complaint Regarding Hate Speech Against Turkish Players & Atatürk";

const getEmailBody = (senderName: string) => `To Paradox Interactive Management,

I am writing to formally express my deep concern and outrage regarding the actions of your official Hearts of Iron IV Discord moderators, who publicly labelled Mustafa Kemal Atatürk — the founder of the Republic of Turkey and one of the most respected leaders in world history — as a "controversial figure."

This is not a matter of opinion or historical debate. Atatürk is the founding father of a NATO ally and a nation of 85 million people. Your moderators' actions constitute cultural insensitivity at best, and targeted hate speech at worst.

Furthermore, instead of addressing the situation, your moderation team chose to mass-ban Turkish players who peacefully objected to this characterisation. This response has escalated a moderation incident into a full-scale community crisis, resulting in:

• A coordinated 1-star review boycott across ALL Paradox titles on Steam
• "Overwhelmingly Negative" recent review scores on multiple flagship titles
• Widespread international media coverage in Turkish and global gaming press
• Permanent loss of trust among Turkish gamers (a significant market segment)
• Growing solidarity boycotts from non-Turkish players who oppose bigotry

What we demand:
1. A formal, public apology from Paradox Interactive leadership (not just moderators)
2. Immediate removal and/or retraining of the moderators involved
3. A clear, published policy on cultural respect and national identity protections
4. Reversal of all unjust bans issued to Turkish community members

Until these demands are met, the boycott will continue and intensify. Every day of silence costs your company revenue, reputation, and the goodwill of a passionate gaming community.

This is your opportunity to do the right thing.

Regards,
${senderName.trim() || "[Your Name Here]"}
A Concerned Gamer Standing With Turkey`;

export function DirectMailSection() {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState("");

  const handleCopy = async () => {
    playStampSound();
    try {
      await navigator.clipboard.writeText(getEmailBody(senderName));
      setCopied(true);
      toast.success("Mail metni kopyalandı!", {
        description: "E-posta uygulamanıza yapıştırabilirsiniz.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Metin kopyalanamadı.");
    }
  };

  const handleOpenMailClient = () => {
    playStampSound();
    const mailtoUrl = `mailto:${PARADOX_EMAILS}?subject=${encodeURIComponent(
      EMAIL_SUBJECT
    )}&body=${encodeURIComponent(getEmailBody(senderName))}`;
    window.location.href = mailtoUrl;
    toast.success("E-posta uygulaması açılıyor...", {
      description: "Mail taslağınız hazırlandı.",
    });
  };

  const handleOpenGmail = () => {
    playStampSound();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PARADOX_EMAILS)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(getEmailBody(senderName))}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast.success("Gmail açılıyor...", {
      description: "Tarayıcınızda Gmail sayfası açıldı.",
    });
  };

  return (
    <section id="paradoxa-yaz" className="mx-auto max-w-[1240px] px-5 py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="border-2 border-ink bg-paper p-6 sm:p-10 shadow-[8px_8px_0_0_oklch(0.25_0.05_260)] relative overflow-hidden">
        
        <div className="relative">
          {/* Badge & Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
            <div className="inline-flex items-center gap-2 border border-ink/50 bg-ink/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
              <Megaphone className="size-3.5" />
              Doğrudan İletişim
            </div>
            <div className="font-mono text-xs text-mute hidden sm:block">
              Hedef: <strong>PR Departmanı, Lisanslama</strong>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Context */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-tight text-ink">
                Paradox'a <span className="text-ink/60">Doğrudan</span> Yaz
              </h2>
              <p className="mt-3 text-sm text-mute leading-relaxed">
                Paradox Interactive'in resmi <strong>PR ve Lisanslama departmanlarına</strong> doğrudan şikayet maili gönderin. Binlerce mail, yönetim kurulunu harekete geçirir.
              </p>
              
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2 text-xs font-mono text-ink">
                  <Target className="size-4 text-ink/60 shrink-0 mt-0.5" />
                  <p>Bu metin resmi bir şikayet ve talep mektubudur. Paradox yönetimine boykotun ciddiyetini ve taleplerimizi net şekilde iletir.</p>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono text-ink">
                  <Megaphone className="size-4 text-ink/60 shrink-0 mt-0.5" />
                  <p>PR departmanına gelen her mail, iç raporlara yansır ve yönetim kuruluna iletilir.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Email Box */}
            <div className="lg:col-span-7">
              <div className="border border-ink/20 bg-ink/5 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-mute pb-3 border-b border-ink/10 gap-2">
                  <div className="flex flex-col gap-1">
                    <span><strong>Kime:</strong> {PARADOX_EMAILS}</span>
                    <span className="text-ink"><strong>Konu:</strong> {EMAIL_SUBJECT}</span>
                  </div>
                </div>

                <div className="mt-3 font-mono text-[11px] sm:text-xs text-ink/80 leading-relaxed bg-paper p-4 border border-ink/10 h-64 overflow-y-auto red-scrollbar whitespace-pre-wrap">
                  {getEmailBody(senderName)}
                </div>

                <div className="mt-4 pt-4 border-t border-ink/10 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-paper p-3 border border-ink/20">
                    <div className="flex-1">
                      <label htmlFor="direct-sender-name" className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                        Adınız veya Steam Nickiniz:
                      </label>
                      <input
                        id="direct-sender-name"
                        type="text"
                        placeholder="Örn: Efe veya Oyuncu_1453"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-ink/5 border border-ink/20 px-3 py-2 font-mono text-xs text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={handleOpenGmail}
                      className="inline-flex items-center gap-2.5 bg-ink hover:brightness-125 border-2 border-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] font-bold text-paper transition-all active:translate-y-px justify-center"
                    >
                      <Mail className="size-4 text-paper" />
                      <span>Gmail İle Gönder</span>
                      <ExternalLink className="size-3.5 opacity-80" />
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenMailClient}
                      className="inline-flex items-center gap-2 border-2 border-ink/20 bg-paper/5 px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink hover:border-ink hover:bg-ink/5 transition-colors justify-center"
                    >
                      <span>Diğer (Outlook vb.)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 border-2 border-ink/20 bg-paper px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink hover:border-ink hover:bg-ink/5 transition-colors justify-center"
                    >
                      {copied ? (
                        <>
                          <Check className="size-4 text-green-700" />
                          <span className="text-green-700 font-bold">Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          <span>Sadece Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
