"use client";

import { useState } from "react";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Download,
  Copy,
  Check,
  ExternalLink,
  Mail,
  Send,
  Building,
  Scale,
  Users,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  FolderOpen,
  ArrowRight,
  ListOrdered,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";
import { playStampSound } from "@/lib/audio";

export const GDRIVE_FOLDER_URL =
  "https://drive.google.com/drive/folders/1b7DT8w1CKdcJ8FQCErtLjMFJbZtAAOUE";
export const GUIDE_V2_PDF_URL = "/documents/paradox-boykot-rehberi-v2.pdf";
export const GUIDE_SIKAYET_PDF_URL = "/documents/Paradox_Sikayet_Basvuru_Rehberi.pdf";

interface ChannelConfig {
  id: string;
  name: string;
  step: number;
  badge: string;
  recipient: string;
  recipientLabel: string;
  subject: string;
  summary: string;
  whoShouldSend: string;
  actionUrl?: string;
  actionUrlLabel?: string;
  isMail: boolean;
  getBody: (user: UserInfo) => string;
}

interface UserInfo {
  fullName: string;
  country: string;
  email: string;
  steamId: string;
  gamePurchase: string;
  reportedUrl: string;
}

const INITIAL_USER_INFO: UserInfo = {
  fullName: "",
  country: "Turkey",
  email: "",
  steamId: "",
  gamePurchase: "Hearts of Iron IV / DLCs",
  reportedUrl: "",
};

const CHANNELS: ChannelConfig[] = [
  {
    id: "management",
    name: "1. Paradox Yönetimi",
    step: 1,
    badge: "Kurumsal Şikâyet",
    recipient: "ir@paradoxinteractive.com",
    recipientLabel: "Paradox Interactive Yönetimi",
    subject:
      "Formal Complaint Regarding the September 2026 Hearts of Iron IV Community Moderation Incident",
    summary:
      "Kurumsal özür, Atatürk hakkındaki asılsız tarihsel ifadelerin düzeltilmesi ve sorumlu moderasyon/personel süreci hakkında şirket içi inceleme talebi.",
    whoShouldSend:
      "Tüm Paradox oyuncuları ve topluluk üyeleri bireysel olarak gönderebilir.",
    isMail: true,
    getBody: (u) => `Dear Paradox Interactive Management,

I am writing to formally raise a complaint regarding the events that occurred within the official Hearts of Iron IV community channels beginning on 21 September 2026.

The incident initially concerned the moderation of a Turkish user's account following an account compromise. During the subsequent moderation discussion, statements were reportedly made concerning Mustafa Kemal Atatürk and his historical role, including an association with the events of 1915 and a characterization of him as a controversial historical figure.

We are concerned about the accuracy and evidentiary basis of these statements, the consistent application of community rules, the accountability of community personnel, and whether the company's subsequent response adequately addressed the concerns raised by the Turkish player community.

We respectfully request that Paradox Interactive:
1. Issue a clear and formal acknowledgement and apology to the Turkish player community;
2. Clarify and, where appropriate, correct the historical statements at issue;
3. Conduct an internal review of the moderator/personnel and moderation process involved;
4. Clarify the moderation standards applicable to historical figures and how they are applied consistently;
5. Explain how the incident was reviewed internally.

This complaint concerns company decisions, policies and accountability mechanisms. It is not intended to encourage harassment, threats, doxxing or personal attacks against any individual employee or moderator.

Relevant screenshots, messages, statements and a chronology of the incident can be provided as supporting documentation.

Sincerely,
${u.fullName.trim() || "[Full Name / Channel Name]"}
${u.country.trim() || "[Country]"}
${u.email.trim() ? `Email: ${u.email.trim()}` : "[Email]"}
${u.steamId.trim() ? `Steam ID: ${u.steamId.trim()}` : ""}`,
  },
  {
    id: "investor",
    name: "2. Investor Relations (Yatırımcı İlişkileri)",
    step: 2,
    badge: "Kurumsal Yönetim & İtibar",
    recipient: "ir@paradoxinteractive.com",
    recipientLabel: "Paradox Investor Relations",
    subject:
      "Investor Relations – Community Management and Corporate Governance Concern",
    summary:
      "Aynı e-posta adresine gitse de bu başvuru şirketin yönetim kuruluna ve yatırımcılarına; müşteri güveni, marka itibarı riski ve kurumsal hesap verebilirlik açısından iletilir.",
    whoShouldSend:
      "Şirketin finansal ve itibarî hesap verebilirliğini önemseyen tüm tüketiciler.",
    isMail: true,
    getBody: (u) => `Dear Investor Relations,

I am contacting Paradox Interactive's Investor Relations department regarding a significant community management and corporate governance concern involving Hearts of Iron IV.

Beginning on 21 September 2026, an incident within the official Hearts of Iron IV community channels developed from a moderation matter into a broader dispute involving statements made by a moderator concerning Mustafa Kemal Atatürk and his historical role.

The issue has generated concern regarding the accuracy and basis of historical statements made by community personnel, consistency of moderation standards, internal accountability, transparency of the company's response, and customer trust.

We are not asking Investor Relations to determine historical or legal questions. We ask that this matter be brought to the attention of appropriate company management as a corporate governance, customer trust and community management concern.

We respectfully request that management consider:
1. A formal acknowledgement and apology to the Turkish player community.
2. A clear correction or clarification of the historical statements at issue.
3. An internal review of the personnel and moderation process involved.
4. Clear and consistently applicable moderation standards.
5. An explanation of how the company intends to prevent similar incidents in the future.

Supporting documentation, including screenshots, original messages, company statements and a chronology of events, is available upon request.

Kind regards,
${u.fullName.trim() || "[Full Name]"}
${u.country.trim() || "[Country]"}
${u.email.trim() ? `Contact: ${u.email.trim()}` : "[Email / Contact Info]"}`,
  },
  {
    id: "konsumentverket",
    name: "3. İsveç Tüketici Ajansı (Konsumentverket)",
    step: 3,
    badge: "Resmi Devlet Tüketici Kurumu",
    recipient: "konsumentverket@konsumentverket.se",
    recipientLabel: "İsveç Tüketici Ajansı",
    subject:
      "Request for Review – Paradox Interactive Community Management Practices",
    summary:
      "Paradox ürünlerini gerçekten satın almış veya kullanmış kişiler. Kesin kanun ihlali hükmü kurmadan, tüketici hakları ve hizmet sözleşmesi standartları çerçevesinde inceleme talebi.",
    whoShouldSend:
      "Yalnızca Paradox oyunlarına veya DLC'lerine sahip olan ve satın alma bilgisi sunabilen oyuncular.",
    isMail: true,
    getBody: (u) => `Dear Swedish Consumer Agency (Konsumentverket),

I would like to submit information concerning a consumer-related issue involving Paradox Interactive AB and its community management practices.

I am a consumer of Paradox Interactive products and have purchased/used the following product(s):
[Product / Purchase Info: ${u.gamePurchase.trim() || "Hearts of Iron IV & DLCs / Purchase Date / Steam"}]

On or after 21 September 2026, an incident occurred within the official Hearts of Iron IV community channels involving the moderation of a Turkish user's account. During the subsequent moderation discussion, statements were reportedly made concerning Mustafa Kemal Atatürk and his historical role, including an association with the events of 1915 and a characterization of him as a controversial historical figure.

Following the incident, the company issued public statements and introduced or discussed changes concerning the use of images of modern historical figures. Concerns remain regarding the handling of the original incident, the consistency of moderation standards and the company's response.

I am not asserting that Paradox Interactive has definitely violated Swedish consumer law. I respectfully request that the Swedish Consumer Agency consider whether the described company practices raise any issues within its area of responsibility.

I can provide screenshots, relevant rules, company statements, a chronology and evidence of my purchase/use of Paradox Interactive products.

Kind regards,
${u.fullName.trim() || "[Full Name]"}
${u.country.trim() || "[Country]"}
${u.email.trim() ? `Email: ${u.email.trim()}` : "[Email]"}
${u.steamId.trim() ? `Steam ID / Account: ${u.steamId.trim()}` : ""}`,
  },
  {
    id: "do",
    name: "4. İsveç Ayrımcılık Ombudsmanı (DO)",
    step: 4,
    badge: "İsveç Eşitlik & Ayrımcılık Kurumu",
    recipient: "do@do.se",
    recipientLabel: "Diskrimineringsombudsmannen (DO)",
    subject:
      "Subject: Complaint Concerning Potential Discrimination in Community Moderation",
    summary:
      "Olayın İsveç Ayrımcılık Kanunu (Diskrimineringslagen) kapsamına girip girmediğinin incelenmesi. 'Ayrımcılık yaptı' hükmü kurmadan yetkili makamın değerlendirmesini isteme.",
    whoShouldSend:
      "Toplulukta etnik/milli kimliğe dayalı çifte standart ve haksız uzaklaştırma şüphesi bildirmek isteyen oyuncular.",
    actionUrl: "https://www.do.se",
    actionUrlLabel: "DO Resmi Şikayet Web Sitesi (do.se)",
    isMail: true,
    getBody: (u) => `Subject: Complaint Concerning Potential Discrimination in Community Moderation

I would like to submit a complaint concerning an incident involving Paradox Interactive's official Hearts of Iron IV community moderation.

The incident began on or around 21 September 2026 following the moderation of a Turkish user's account within the official Hearts of Iron IV Discord community.

Following the account-related moderation issue, statements were reportedly made by a community moderator concerning Mustafa Kemal Atatürk and his historical role. The statements reportedly associated Atatürk with the events of 1915 and characterized him as a controversial historical figure.

I request that the Equality Ombudsman assess whether the circumstances described fall within the scope of Swedish discrimination legislation.

My concern is specifically whether the moderation process, statements made during the incident, and the application of community rules may have been connected to nationality or national/ethnic affiliation, and whether comparable situations involving other users were treated differently.

I am not making a definitive legal determination that discrimination occurred. I am asking the competent authority to assess whether the facts and evidence fall within its jurisdiction.

Relevant evidence includes screenshots, community rules, company statements, a chronology and, where available, comparative examples of similar situations involving other users.

Full name: ${u.fullName.trim() || "[Full Name]"}
Country: ${u.country.trim() || "[Country]"}
Contact information: ${u.email.trim() || "[Email / Contact Info]"}
Date: ${new Date().toISOString().split("T")[0]}`,
  },
  {
    id: "steam",
    name: "5. Steam Destek / Kural İhlali Raporu",
    step: 5,
    badge: "Spesifik İhlal Raporu",
    recipient: "help.steampowered.com",
    recipientLabel: "Steam Support Portal",
    subject:
      "Report Regarding Official Hearts of Iron IV Community Moderation Incident",
    summary:
      "Steam'e kesinlikle toplu spam yapılmamalıdır. Yalnızca tehdit, taciz, kişisel saldırı veya haksız inceleme manipülasyonu içeren spesifik bağlantılar raporlanmalıdır.",
    whoShouldSend:
      "Steam topluluğunda somut bir kural ihlali tespit eden her kullanıcı.",
    actionUrl: "https://help.steampowered.com",
    actionUrlLabel: "Steam Destek Sayfasına Git",
    isMail: false,
    getBody: (u) => `I would like to report specific content related to the current dispute surrounding Paradox Interactive and the Hearts of Iron IV community.

I am not requesting action against users simply because they disagree with the company or criticize Paradox Interactive.

I am reporting specific content that may violate Steam's Community Rules, including harassment, threats, personal attacks, or coordinated attempts to manipulate review scores.

Relevant content URL / profile / discussion link:
${u.reportedUrl.trim() || "[PASTE SPECIFIC URL / PROFILE / REVIEW / DISCUSSION LINK HERE]"}

Date: ${new Date().toISOString().split("T")[0]}

Brief description of the reported content:
[Factual description of the violation witnessed]

I have attached screenshots where available.

I respectfully request that Steam review the specific content against its Community Rules. I am not asking Steam to determine the historical dispute itself; I am asking for a review of the specific content identified above.

Sincerely,
${u.fullName.trim() || "[Full Name / Steam Profile Link]"}`,
  },
];

const CHECKLIST_ITEMS = [
  "Adımı, e-postamı ve ülke bilgilerimi doğru şekilde yazdım.",
  "Metni kendi gerçek durumuma ve tüketici deneyimime göre kişiselleştirdim.",
  "Yalnızca bizzat bildiğim, yaşadığım veya belgeleyebildiğim olayları aktardım.",
  "Ekran görüntüleri, mesaj bağlantıları ve varsa satın alma belgelerimi ekledim.",
  "İddia ile doğrulanmış olguyu birbirinden kesin olarak ayırdım.",
  "Hakaret, tehdit veya kişisel saldırı içeren tüm ifadeleri çıkardım.",
  "Kopyala-yapıştır spam veya sahte hesap kullanmıyorum.",
  "Başvurduğum kurumdan yalnızca kendi görev alanı içinde değerlendirme talep ediyorum.",
];

const EVIDENCE_STEPS = [
  { no: "01", title: "Olay Kronolojisi", desc: "21 Eylül'den itibaren yaşananların tarih ve saat sıralı özeti" },
  { no: "02", title: "İlk Hesap Güvenlik Kaydı", desc: "Hesabın çalınması, zararlı link yayılması ve temizlenmesi kanıtı" },
  { no: "03", title: "Moderatör Mesajları", desc: "'chak' isimli yetkilinin Atatürk'e yönelik 1915 ithamı ve mesajları" },
  { no: "04", title: "İtiraz Kayıtları", desc: "Kullanıcının ban kararına yaptığı saygılı ve meşru itiraz yazışmaları" },
  { no: "05", title: "Profil Fotoğrafı Talepleri", desc: "Atatürk fotoğrafının kaldırılması şart koşulan ekran görüntüleri" },
  { no: "06", title: "Ban / Uzaklaştırma Kaydı", desc: "Sunucudan atılma ve erişimin engellendiğini gösteren bildirimler" },
  { no: "07", title: "Diğer Kullanıcı Banları", desc: "İtiraz eden diğer Türk oyuncuların topluca susturulma kanıtları" },
  { no: "08", title: "Paradox Resmî Açıklamaları", desc: "Şirketin olayı basitleştiren ve gerçeği yansıtmayan resmî duyuruları" },
  { no: "09", title: "Topluluk Kuralları (Önce / Sonra)", desc: "Olay sonrası değiştirilen kurallar ve çifte standart örnekleri" },
  { no: "10", title: "Yapılan Başvurular & Yanıtlar", desc: "Daha önce açılan destek talepleri ve şirketin verdiği/vermediği cevaplar" },
];

export function CommunityGuideSection() {
  const [activeChannelId, setActiveChannelId] = useState<string>("management");
  const [userInfo, setUserInfo] = useState<UserInfo>(INITIAL_USER_INFO);
  const [copied, setCopied] = useState(false);
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const activeChannel =
    CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0];
  const activeBody = activeChannel.getBody(userInfo);

  const toggleCheck = (idx: number) => {
    playStampSound();
    setCheckedList((prev) => {
      const exists = prev.includes(idx);
      const next = exists ? prev.filter((i) => i !== idx) : [...prev, idx];
      if (next.length === CHECKLIST_ITEMS.length) {
        toast.success("Tebrikler! Kontrol listesini eksiksiz tamamladınız.", {
          description: "Başvurunuz kurumsal ve hukuki standartlara tamamen uygun.",
        });
      }
      return next;
    });
  };

  const handleSelectAllChecks = () => {
    playStampSound();
    if (checkedList.length === CHECKLIST_ITEMS.length) {
      setCheckedList([]);
    } else {
      setCheckedList(CHECKLIST_ITEMS.map((_, i) => i));
      toast.success("Tüm maddeler doğrulandı!");
    }
  };

  const handleCopyText = async () => {
    playStampSound();
    try {
      await navigator.clipboard.writeText(activeBody);
      setCopied(true);
      toast.success("Başvuru metni panoya kopyalandı!", {
        description: "İlgili e-postaya veya forma yapıştırabilirsiniz.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Metin kopyalanamadı.");
    }
  };

  const handleOpenMailto = () => {
    playStampSound();
    const mailtoUrl = `mailto:${activeChannel.recipient}?subject=${encodeURIComponent(
      activeChannel.subject
    )}&body=${encodeURIComponent(activeBody)}`;
    window.location.href = mailtoUrl;
    toast.success("E-posta istemciniz açılıyor...", {
      description: "Hazır şablon e-posta taslağına aktarıldı.",
    });
  };

  const handleOpenGmail = () => {
    playStampSound();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      activeChannel.recipient
    )}&su=${encodeURIComponent(activeChannel.subject)}&body=${encodeURIComponent(
      activeBody
    )}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast.success("Gmail yeni sekmede açıldı.");
  };

  return (
    <section
      id="icerik-ureticileri-rehberi"
      className="mx-auto max-w-[1240px] px-5 py-14 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Top Banner & Header */}
      <div className="border-2 border-ink bg-paper shadow-[8px_8px_0_0_oklch(0.25_0.05_260)] p-6 sm:p-10 relative overflow-hidden">
        {/* Background watermark */}
        <div className="pointer-events-none absolute -right-16 -top-16 select-none opacity-[0.03]">
          <Scale className="size-96 text-ink" />
        </div>

        {/* Section Header */}
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 border border-seal bg-seal/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-seal">
                <Users className="size-3.5" />
                Türk Strateji İçerik Üreticileri Ortak Metni
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-mute">
                Eylül 2026 · Sürüm 2.0
              </span>
            </div>

            {/* Quick PDF & Drive Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={GDRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-ink/40 bg-ink/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                title="Google Drive Klasörünü Görüntüle"
              >
                <FolderOpen className="size-3.5 text-seal" />
                <span>Google Drive Klasörü</span>
                <ExternalLink className="size-3 opacity-60" />
              </a>

              <a
                href={GUIDE_V2_PDF_URL}
                download="paradox-boykot-rehberi-v2.pdf"
                className="inline-flex items-center gap-1.5 border border-seal bg-seal px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-all hover:bg-seal/90 shadow-sm"
                title="Hak Arama Rehberi PDF'ini İndir"
              >
                <Download className="size-3.5" />
                <span>PDF İndir (Rehber v2)</span>
              </a>

              <a
                href={GUIDE_SIKAYET_PDF_URL}
                download="Paradox_Sikayet_Basvuru_Rehberi.pdf"
                className="inline-flex items-center gap-1.5 border border-ink bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-all hover:bg-seal hover:border-seal shadow-sm"
                title="Şikayet Başvuru Rehberi PDF'ini İndir"
              >
                <Download className="size-3.5 text-seal" />
                <span>PDF İndir (Şikayet Rehberi)</span>
              </a>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="mt-6">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink">
              Topluluk Bildirisi & Hak Arama Rehberi
            </h2>
            <p className="mt-3 max-w-[85ch] text-sm sm:text-base text-mute leading-relaxed">
              Türk strateji oyun topluluğu ve içerik üreticileri olarak, Hearts of Iron IV resmi Discord sunucusunda yaşanan Atatürk skandalına karşı; <strong>kişileri hedef almadan, hukuka uygun, belgeli ve kurumsal şikâyet yollarını</strong> işletiyoruz. Şirketin süreci örtbas etmesine izin vermeyeceğiz.
            </p>
          </div>

          {/* Motto Callout Block */}
          <div className="mt-6 border-l-4 border-seal bg-ink/5 p-4 sm:p-5">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
              İçerik Üreticileri Ortak Mottosu:
            </div>
            <blockquote className="mt-1.5 font-serif text-base sm:text-lg italic text-ink/90 leading-relaxed">
              "Amacımız kişileri hedef almak değil; şeffaflık, hesap verebilirlik ve topluluklara eşit muamele ilkeleri çerçevesinde taleplerimizi ortaya koymak ve meşru başvuru yollarını kullanmaktır."
            </blockquote>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-mute">
              <span className="text-ink font-semibold">Temel İlkeler:</span>
              <span className="bg-paper px-2 py-0.5 border border-ink/15">Şeffaflık</span>
              <span className="bg-paper px-2 py-0.5 border border-ink/15">Hesap Verebilirlik</span>
              <span className="bg-paper px-2 py-0.5 border border-ink/15">Eşit Muamele</span>
              <span className="bg-paper px-2 py-0.5 border border-ink/15">Doğrulanabilir Delil</span>
              <span className="bg-paper px-2 py-0.5 border border-ink/15">Meşru Tüketici Hakkı</span>
            </div>
          </div>

          {/* 2 Core Demands from Guide */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="border border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center bg-seal font-mono text-xs font-bold text-paper">
                  01
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight">
                  Kamuoyuna Resmî ve Kurumsal Özür
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-mute list-disc list-inside leading-relaxed">
                <li>Paradox Interactive'in resmî kanallarından açık kurumsal açıklama yayımlanması,</li>
                <li>Türk oyuncu topluluğunun yaşadığı mağduriyetin resmen kabul edilmesi,</li>
                <li>Atatürk hakkında dile getirilen tarihsel iftiraların şirketçe incelenmesi,</li>
                <li>Hatalı oldukları tespit edilen tarihsel iddiaların açıkça düzeltilmesi.</li>
              </ul>
            </div>

            <div className="border border-ink/20 bg-paper p-5 transition-colors hover:border-ink">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center bg-ink font-mono text-xs font-bold text-paper">
                  02
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight">
                  İç İnceleme ve Uygun İdari İşlem
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-mute list-disc list-inside leading-relaxed">
                <li>Olayda sorumluluğu bulunan yetkili ('chak') hakkında şirket içi resmi soruşturma açılması,</li>
                <li>Sorumluluk tespiti hâlinde moderasyon yetkilerinin geri alınması ve idari yaptırım,</li>
                <li>Topluluk kurallarının tarafsız, eşitlikçi ve denetlenebilir hale getirilmesi,</li>
                <li>Gelecekte benzer provokasyonların yaşanmaması için mekanizmaların kurulması.</li>
              </ul>
            </div>
          </div>

          {/* Strategic Workflow / Submission Order (Gönderim Sırası) */}
          <div className="mt-10 border border-ink/15 bg-ink/[0.02] p-5 sm:p-6">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-seal">
              <ListOrdered className="size-4" />
              Stratejik Gönderim Sırası (Rehber Tavsiyesi)
            </div>
            <p className="mt-1 text-xs text-mute">
              Şikayetlerinizi rastgele dağıtmak yerine aşağıdaki sıra ve görev tanımlarına göre iletmeniz en yüksek etkiyi sağlar:
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-5">
              {CHANNELS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    playStampSound();
                    setActiveChannelId(ch.id);
                  }}
                  className={`text-left p-3 border transition-all ${
                    activeChannelId === ch.id
                      ? "border-seal bg-seal/10 font-bold"
                      : "border-ink/15 bg-paper hover:border-ink"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-seal">
                      Adım 0{idx + 1}
                    </span>
                    {activeChannelId === ch.id && (
                      <span className="size-2 rounded-full bg-seal animate-pulse" />
                    )}
                  </div>
                  <div className="mt-1 font-display text-sm uppercase leading-tight line-clamp-2">
                    {ch.name.replace(/^\d+\.\s*/, "")}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-mute uppercase">
                    {ch.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Channel Workstation */}
          <div className="mt-8 border-2 border-ink bg-paper">
            {/* Channel Tabs */}
            <div className="flex flex-wrap border-b-2 border-ink bg-ink/5">
              {CHANNELS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    playStampSound();
                    setActiveChannelId(ch.id);
                  }}
                  className={`flex-1 min-w-[200px] px-4 py-3 text-left font-mono text-xs uppercase tracking-wider transition-colors border-r border-ink/15 last:border-r-0 ${
                    activeChannelId === ch.id
                      ? "bg-paper text-seal font-bold border-b-2 border-b-seal"
                      : "text-mute hover:bg-paper/60 hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-seal" />
                    <span>{ch.name}</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-ink/60 font-normal">
                    {ch.badge}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Channel Details & Personalizer */}
            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink/15 pb-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-seal font-bold uppercase tracking-wider">
                    <span>Hedef Merci:</span>
                    <span className="bg-seal/10 px-2 py-0.5 text-seal">
                      {activeChannel.recipientLabel}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-2xl uppercase tracking-tight">
                    {activeChannel.subject}
                  </h3>
                  <p className="mt-1 text-xs text-mute max-w-[70ch]">
                    {activeChannel.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 border-2 border-ink bg-paper px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper shadow-sm active:translate-y-px"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Metni Kopyala</span>
                      </>
                    )}
                  </button>

                  {activeChannel.isMail && (
                    <>
                      <button
                        type="button"
                        onClick={handleOpenMailto}
                        className="inline-flex items-center gap-1.5 border-2 border-seal bg-seal px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-all hover:bg-seal/90 shadow-sm active:translate-y-px"
                        title="Varsayılan e-posta uygulamasını aç"
                      >
                        <Mail className="size-3.5" />
                        <span>Mail Uygulamasında Aç</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenGmail}
                        className="inline-flex items-center gap-1.5 border-2 border-ink bg-ink px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-seal hover:border-seal shadow-sm active:translate-y-px"
                        title="Gmail ile gönder"
                      >
                        <Send className="size-3.5" />
                        <span>Gmail Aç</span>
                      </button>
                    </>
                  )}

                  {activeChannel.actionUrl && (
                    <a
                      href={activeChannel.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-ink px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-paper transition-colors hover:bg-seal hover:border-seal shadow-sm"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{activeChannel.actionUrlLabel || "Web Portalına Git"}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 bg-ink/[0.02] p-4 border border-ink/10">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                    Adınız / Kanalınız (Opsiyonel):
                  </label>
                  <input
                    type="text"
                    value={userInfo.fullName}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, fullName: e.target.value })
                    }
                    placeholder="Örn: Efe Yılmaz"
                    className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                    Ülke:
                  </label>
                  <input
                    type="text"
                    value={userInfo.country}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, country: e.target.value })
                    }
                    placeholder="Örn: Turkey"
                    className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                    E-Posta Adresiniz:
                  </label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    placeholder="ornek@domain.com"
                    className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                  />
                </div>

                {activeChannel.id === "steam" ? (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                      İhlal Linki / URL:
                    </label>
                    <input
                      type="text"
                      value={userInfo.reportedUrl}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, reportedUrl: e.target.value })
                      }
                      placeholder="https://steamcommunity.com/..."
                      className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                    />
                  </div>
                ) : activeChannel.id === "konsumentverket" ? (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                      Satın Alınan Oyun / Platform:
                    </label>
                    <input
                      type="text"
                      value={userInfo.gamePurchase}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, gamePurchase: e.target.value })
                      }
                      placeholder="Hearts of Iron IV / Steam"
                      className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-mute mb-1">
                      Steam Profil / ID:
                    </label>
                    <input
                      type="text"
                      value={userInfo.steamId}
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, steamId: e.target.value })
                      }
                      placeholder="Örn: 76561198..."
                      className="w-full border border-ink/20 bg-paper px-2.5 py-1.5 font-mono text-xs text-ink focus:border-seal focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Text Preview Box */}
              <div className="mt-4 relative">
                <div className="flex items-center justify-between bg-ink px-4 py-2 text-paper font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="size-3.5 text-seal" />
                    <span>Gönderilecek İngilizce Resmi Metin ({activeChannel.recipient})</span>
                  </div>
                  <span className="text-[11px] text-paper/60">
                    Kişisel bilgileriniz metne otomatik entegre edilir
                  </span>
                </div>
                <textarea
                  readOnly
                  value={activeBody}
                  rows={14}
                  className="w-full border-2 border-t-0 border-ink bg-paper p-4 font-mono text-xs text-ink leading-relaxed select-all focus:outline-none resize-y"
                />
              </div>

              {/* Note on etiquette */}
              <div className="mt-3 flex items-start gap-2 text-xs text-mute font-mono">
                <Info className="size-4 text-seal shrink-0 mt-0.5" />
                <span>
                  <strong>Önemli Kural:</strong> Bu metinler doğrudan toplu bot spamı olarak gönderilmemelidir. Kurumlar şikayetleri ciddiye almak için bireysel doğrulanabilirlik ve gerçek tüketici deneyimi ararlar. İlgili e-postayı göndermeden önce varsa oyun faturanızı veya ekran görüntülerini ekleyin.
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Pre-Submission Checklist (Başvuru Öncesi Kontrol Listesi) */}
          <div className="mt-10 border-2 border-ink bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  <FileCheck2 className="size-4" />
                  Başvuru Öncesi İnteraktif Kontrol Listesi
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-tight">
                  Göndermeden Önce Son Doğrulama
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-mute">
                  Tamamlanan:{" "}
                  <strong className="text-seal font-bold">
                    {checkedList.length} / {CHECKLIST_ITEMS.length}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={handleSelectAllChecks}
                  className="border border-ink/30 bg-paper px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink hover:border-ink"
                >
                  {checkedList.length === CHECKLIST_ITEMS.length
                    ? "Sıfırla"
                    : "Hepsini İşaretle"}
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {CHECKLIST_ITEMS.map((item, idx) => {
                const isChecked = checkedList.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`flex items-start gap-3 p-3 text-left border transition-all cursor-pointer ${
                      isChecked
                        ? "border-emerald-600/40 bg-emerald-500/5 text-ink"
                        : "border-ink/15 bg-paper hover:border-ink/40 text-ink/80"
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="size-4 text-emerald-600" />
                      ) : (
                        <Square className="size-4 text-ink/40" />
                      )}
                    </span>
                    <span
                      className={`text-xs leading-snug font-mono ${
                        isChecked ? "font-semibold text-emerald-950" : ""
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Checklist Status Banner */}
            <div className="mt-5 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`size-2.5 rounded-full ${
                    checkedList.length === CHECKLIST_ITEMS.length
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-amber-500"
                  }`}
                />
                <span className="text-ink/80">
                  {checkedList.length === CHECKLIST_ITEMS.length
                    ? "Tüm şartlar sağlandı! Başvurunuzu güvenle gönderebilirsiniz."
                    : `${CHECKLIST_ITEMS.length - checkedList.length} madde daha kontrol edilmeli.`}
                </span>
              </div>
              <span className="text-[11px] text-mute">
                Bu kontrol hukuki danışmanlık değil, kurumsal başvuru standardıdır.
              </span>
            </div>
          </div>

          {/* Evidence Standard & 10 Step Case File (Başvuru Dosyasının Delil Standardı) */}
          <div className="mt-10 border border-ink/20 bg-ink/[0.02] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink/15 pb-3">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  <ShieldCheck className="size-4" />
                  Delil Standardı & Dosya Düzeni
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-tight">
                  10 Maddelik Resmi Delil Sıralaması
                </h3>
              </div>
              <span className="font-mono text-xs text-mute">
                5 Bileşen Kuralı: Tarih/Saat · Kaynak · Olay · Sonuç · Ek Belge
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {EVIDENCE_STEPS.map((step) => (
                <div
                  key={step.no}
                  className="border border-ink/15 bg-paper p-3.5 transition-colors hover:border-ink"
                >
                  <div className="font-mono text-xs font-bold text-seal">
                    {step.no}
                  </div>
                  <h4 className="mt-1 font-display text-sm uppercase leading-tight text-ink">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-[11px] text-mute leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Red Lines / Code of Conduct (Topluluk İlkeleri — Kırmızı Çizgiler) */}
          <div className="mt-10 border-2 border-seal/30 bg-seal/[0.03] p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-seal">
              <AlertTriangle className="size-4" />
              Kırmızı Çizgiler — Kesinlikle Yapılmaması Gerekenler
            </div>
            <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-ink">
              Haklı Davamıza Gölge Düşürmeyin
            </h3>
            <p className="mt-2 text-xs text-mute max-w-[80ch]">
              Türk strateji camiasının itibarı ve boykotun meşruiyeti için aşağıdaki kurallara harfiyen uyulması zorunludur:
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border border-seal/20 bg-paper p-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  Doxxing Yasağı
                </span>
                <p className="mt-1.5 text-xs text-mute leading-relaxed">
                  Moderatörlerin veya çalışanların özel hayatına, adresine, telefonuna, ailesine veya kişisel bilgilerine yönelik hiçbir paylaşım yapılamaz.
                </p>
              </div>

              <div className="border border-seal/20 bg-paper p-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  Şiddet & Tehdit Yasağı
                </span>
                <p className="mt-1.5 text-xs text-mute leading-relaxed">
                  Hiçbir koşulda küfür, tehdit, taciz, linç çağrısı veya şiddet söylemi kullanılamaz. Haklılığımızı hukuki dille savunmalıyız.
                </p>
              </div>

              <div className="border border-seal/20 bg-paper p-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  Sahte İddia Yasağı
                </span>
                <p className="mt-1.5 text-xs text-mute leading-relaxed">
                  Doğrulanmamış bilgiler gerçekmiş gibi sunulmamalı; bot otomasyonuyla spam, sahte hesap veya kontrolsüz kopya kampanyası yürütülmemelidir.
                </p>
              </div>

              <div className="border border-seal/20 bg-paper p-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-seal">
                  Platform Uyumu
                </span>
                <p className="mt-1.5 text-xs text-mute leading-relaxed">
                  Her başvuru ilgili platformun (Steam, Metacritic, Konsumentverket, DO) kendi kullanım şartlarına ve kurallarına tam uyumlu olmalıdır.
                </p>
              </div>
            </div>
          </div>

          {/* Official Document Download Cards */}
          <div className="mt-10 border-t-2 border-ink pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-seal font-bold">
                  Resmi Belge Arşivi & Google Drive
                </span>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-tight">
                  Orijinal Rehber Dokümanlarını İndirin
                </h3>
              </div>
              <p className="text-xs text-mute max-w-[45ch]">
                Topluluk tarafından hazırlanan orijinal PDF'leri bilgisayarınıza indirebilir veya Google Drive klasöründen inceleyebilirsiniz.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {/* Document 1 */}
              <div className="border-2 border-ink/20 bg-paper p-5 transition-all hover:border-ink hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-mute uppercase">
                    <span>PDF Dokümanı</span>
                    <span className="bg-seal/10 text-seal px-2 py-0.5 font-bold">Sürüm 2.0</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg uppercase leading-snug">
                    Topluluk Bildirisi & Hak Arama Rehberi
                  </h4>
                  <p className="mt-2 text-xs text-mute">
                    Ortak metin, olay özeti, 2 ana talep, şikayet şablonları, delil listesi ve kırmızı çizgiler (4 Sayfa, 58 KB).
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-mute">paradox-boykot-rehberi-v2.pdf</span>
                  <a
                    href={GUIDE_V2_PDF_URL}
                    download="paradox-boykot-rehberi-v2.pdf"
                    className="inline-flex items-center gap-1 bg-seal px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:bg-seal/90"
                  >
                    <Download className="size-3" />
                    <span>İndir</span>
                  </a>
                </div>
              </div>

              {/* Document 2 */}
              <div className="border-2 border-ink/20 bg-paper p-5 transition-all hover:border-ink hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-mute uppercase">
                    <span>PDF Dokümanı</span>
                    <span className="bg-ink/10 text-ink px-2 py-0.5 font-bold">Resmi Başvuru</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg uppercase leading-snug">
                    Paradox Şikâyet & Başvuru Rehberi
                  </h4>
                  <p className="mt-2 text-xs text-mute">
                    Gönderim sırası, Konsumentverket, DO, Steam ve Paradox Yönetim şikayet formları rehberi (6 Sayfa, 83 KB).
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-mute">Paradox_Sikayet_Basvuru_Rehberi.pdf</span>
                  <a
                    href={GUIDE_SIKAYET_PDF_URL}
                    download="Paradox_Sikayet_Basvuru_Rehberi.pdf"
                    className="inline-flex items-center gap-1 bg-ink px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-paper hover:bg-seal hover:border-seal"
                  >
                    <Download className="size-3" />
                    <span>İndir</span>
                  </a>
                </div>
              </div>

              {/* Document 3 (Drive Folder) */}
              <div className="border-2 border-seal/30 bg-seal/[0.02] p-5 transition-all hover:border-seal hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-mute uppercase">
                    <span>Google Drive</span>
                    <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 font-bold">Açık Arşiv</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg uppercase leading-snug">
                    Tüm Rehber ve Kaynaklar Klasörü
                  </h4>
                  <p className="mt-2 text-xs text-mute">
                    Google Drive üzerindeki güncel klasör; ek kaynaklar, rehberler ve topluluk dokümantasyonunu barındırır.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-mute">Google Drive Klasörü</span>
                  <a
                    href={GDRIVE_FOLDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border border-seal bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-seal hover:bg-seal hover:text-paper transition-colors"
                  >
                    <span>Drive'da Aç</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
