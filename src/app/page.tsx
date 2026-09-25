import { CampaignClient, CAMPAIGN_REF_MS } from "@/components/CampaignClient";
import { fetchAllSteamReviews, DEFAULT_STEAM_REVIEWS } from "@/lib/steam";

const jsonLd = {
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
      "headline":
        "Paradox Interactive Resmi Discord Sunucusundaki Atatürk Skandalına Karşı Kitlesel 1 Yıldız Boykotu",
      "alternativeHeadline":
        "Turkish Gamers Launch 1-Star Boycott Against Paradox Interactive Over Discord Moderation Hate Speech",
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
};

export default async function Home() {
  let initialReviews = DEFAULT_STEAM_REVIEWS;
  try {
    initialReviews = await fetchAllSteamReviews();
  } catch (e) {
    console.warn("SSR Steam fetch fallback:", e);
  }

  const elapsedSec = Math.max(0, Math.floor((Date.now() - CAMPAIGN_REF_MS) / 1000));
  const initialLiveGrowth = Math.floor(elapsedSec / 16);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampaignClient
        initialSteamReviews={initialReviews}
        initialLiveGrowth={initialLiveGrowth}
      />
    </>
  );
}
