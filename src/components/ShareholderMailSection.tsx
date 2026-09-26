"use client";

import { useState } from "react";
import { Mail, Copy, Check, ExternalLink, TrendingDown, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

const SHAREHOLDER_EMAILS = "contact@statestreet.com, ir@paradoxinteractive.com, IR@tencent.com";
const EMAIL_SUBJECT = "Shareholder engagement request for Paradox Interactive (PDX) - Risk of Revenue Loss";

const getEmailBody = (senderName: string) => `Shareholder engagement request for Paradox Interactive (PDX)

I am writing to bring your attention to an ongoing and escalating crisis regarding Paradox Interactive's community management, which poses a direct and measurable risk to 2025 revenue, algorithmic visibility on storefronts, and overall brand reputation.

The official Hearts of Iron IV community moderators recently engaged in historically insensitive hate speech against Turkish players (slandering the founding father of Turkey) and unlawfully mass-banned users who peacefully protested. The CEO and management have refused to issue a formal apology, leading to a massive, coordinated 1-star boycott across all Paradox titles on Steam.

Illustrative direct revenue exposure:
Turkey makes up a significant share of the global strategy game market (estimated 6.5% of HOI4 active players). By permanently alienating this entire demographic, Paradox Interactive is looking at millions of SEK in lost revenue for upcoming DLCs and future titles.

- 25% regional loss: 2.5m SEK
- 50% regional loss: 5.0m SEK
- 100% regional loss: 10.0m SEK

These figures cover only lost Turkish sales. They do not account for the catastrophic spillover to other franchises, the plunging Steam algorithm visibility due to "Overwhelmingly Negative" recent reviews (which halts organic global sales), or the long-term reputational damage among international players observing this unethical community treatment.

As a shareholder, we request that you intervene and hold the Paradox Interactive executive board accountable. They must issue a formal public apology and immediately restructure their community moderation guidelines to ensure respect for national identities.

Regards,
${senderName.trim() || "[Buraya İsminizi Yazın]"}
A Concerned Paradox Gamer`;

export function ShareholderMailSection() {
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
    const mailtoUrl = `mailto:${SHAREHOLDER_EMAILS}?subject=${encodeURIComponent(
      EMAIL_SUBJECT
    )}&body=${encodeURIComponent(getEmailBody(senderName))}`;
    window.location.href = mailtoUrl;
    toast.success("E-posta uygulaması açılıyor...", {
      description: "Mail taslağınız hazırlandı.",
    });
  };

  const handleOpenGmail = () => {
    playStampSound();
    // Gmail web compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SHAREHOLDER_EMAILS)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(getEmailBody(senderName))}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast.success("Gmail açılıyor...", {
      description: "Tarayıcınızda Gmail sayfası açıldı. Mail taslağınız hazırlandı.",
    });
  };

  return (
    <section id="hissedar-baskisi" className="mx-auto max-w-[1240px] px-5 py-12 scroll-mt-16 sm:scroll-mt-20">
      <div className="border-2 border-seal bg-paper p-6 sm:p-10 shadow-[8px_8px_0_0_oklch(0.556_0.216_27.5)] relative overflow-hidden">
        
        <div className="relative">
          {/* Badge & Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
            <div className="inline-flex items-center gap-2 border border-seal/50 bg-seal/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-seal">
              <TrendingDown className="size-3.5" />
              Finansal Baskı Merkezi
            </div>
            <div className="font-mono text-xs text-mute hidden sm:block">
              Hedef: <strong>State Street, Tencent, PDX IR</strong>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Context */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight leading-tight text-ink">
                Paradox Hissedarlarına <span className="text-seal">Toplu E-Posta</span> Gönder
              </h2>
              <p className="mt-3 text-sm text-mute leading-relaxed">
                Şirketler sadece oyuncuların değil, <strong>yatırımcıların ve hissedarların</strong> baskısından korkar. Sosyal medyadaki yapay zeka analizli finansal risk metnini entegre ettik.
              </p>
              
              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-2 text-xs font-mono text-ink">
                  <Briefcase className="size-4 text-seal shrink-0 mt-0.5" />
                  <p>Bu metin, boykotun 2025 yılı Paradox hisselerine (PDX) ve potansiyel gelir kaybına yapacağı vurucu etkiyi resmi bir dille hissedarlara aktarır.</p>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono text-ink">
                  <TrendingDown className="size-4 text-seal shrink-0 mt-0.5" />
                  <p>State Street ve Tencent gibi en büyük Paradox yatırımcıları doğrudan hedeflenir.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Email Box */}
            <div className="lg:col-span-7">
              <div className="border border-ink/20 bg-ink/5 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono text-mute pb-3 border-b border-ink/10 gap-2">
                  <div className="flex flex-col gap-1">
                    <span><strong>Kime:</strong> {SHAREHOLDER_EMAILS}</span>
                    <span className="text-ink"><strong>Konu:</strong> {EMAIL_SUBJECT}</span>
                  </div>
                </div>

                <div className="mt-3 font-mono text-[11px] sm:text-xs text-ink/80 leading-relaxed bg-paper p-4 border border-ink/10 h-64 overflow-y-auto red-scrollbar whitespace-pre-wrap">
                  {getEmailBody(senderName)}
                </div>

                <div className="mt-4 pt-4 border-t border-ink/10 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-paper p-3 border border-ink/20">
                    <div className="flex-1">
                      <label htmlFor="sender-name" className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                        Adınız veya Steam Nickiniz:
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        placeholder="Örn: Efe veya Oyuncu_1453"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-ink/5 border border-ink/20 px-3 py-2 font-mono text-xs text-ink placeholder:text-ink/30 focus:outline-none focus:border-seal focus:ring-1 focus:ring-seal transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                    type="button"
                    onClick={handleOpenGmail}
                    className="inline-flex items-center gap-2.5 bg-seal hover:brightness-110 border-2 border-seal px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] font-bold text-paper transition-all active:translate-y-px justify-center"
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
                        <Check className="size-4 text-seal" />
                        <span className="text-seal font-bold">Kopyalandı!</span>
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
