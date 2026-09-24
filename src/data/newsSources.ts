export type NewsSource = {
  id: string;
  outlet: string;
  title: string;
  summary: string;
  url: string;
  category: "Ulusal Basın" | "Oyun & Teknoloji" | "Topluluk & Forum";
  date: string;
  badge?: string;
  quote?: string;
};

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "sozcu-esg",
    outlet: "Sözcü Gazetesi",
    title: "Tarihçi Prof. Dr. Emrah Safa Gürkan'dan Paradox ve HOI4 Boykotu",
    summary:
      "Ünlü tarihçi Emrah Safa Gürkan, 6 bin saatten fazla oynadığı Hearts of Iron IV oyununu Atatürk'e yapılan saygısızlık nedeniyle kütüphanesinden silip boykota katıldığını duyurdu.",
    quote: "6 bin saat oynadığım oyunu siliyorum. Atatürk'e yönelik bu tavır açık bir düşmanlık ve tarihi çarpıtmadır.",
    url: "https://www.sozcu.com.tr",
    category: "Ulusal Basın",
    date: "Eylül 2024",
    badge: "Prof. Dr. Emrah Safa Gürkan",
  },
  {
    id: "odatv-haber",
    outlet: "OdaTV",
    title: "Paradox'tan Atatürk Skandalı: Discord Sunucusunda Boykot",
    summary:
      "Hearts of Iron resmi Discord sunucusunda Türk oyuncunun profilinde Atatürk fotoğrafı olması gerekçesiyle yasaklanması ve skandal açıklamalar kamuoyuna taşındı.",
    url: "https://www.odatv.com/guncel/paradoxtan-ataturk-skandali-hearts-of-ironin-discord-sunucusunda-boykot-120163837",
    category: "Ulusal Basın",
    date: "Eylül 2024",
    badge: "İlk Haber",
  },
  {
    id: "cumhuriyet-haber",
    outlet: "Cumhuriyet Gazetesi",
    title: "HOI4 Resmi Discord Sunucusunda Atatürk Krizine Türk Oyunculardan Sert Tepki",
    summary:
      "Atatürk'ün 'tartışmalı figür' denilerek yasaklanması üzerine Türk oyuncular toplu halde Steam incelemelerinde 1 yıldız kampanyası başlattı.",
    url: "https://www.cumhuriyet.com.tr",
    category: "Ulusal Basın",
    date: "Eylül 2024",
  },
  {
    id: "milliyet-haber",
    outlet: "Milliyet",
    title: "Hearts of Iron Discord Sunucusunda Atatürk Fotoğrafı Krizi ve Boykot",
    summary:
      "Paradox Interactive'in resmi topluluk kanalında Türk kullanıcıların haksız yere uzaklaştırılması ulusal basında geniş yankı buldu.",
    url: "https://www.milliyet.com.tr",
    category: "Ulusal Basın",
    date: "Eylül 2024",
  },
  {
    id: "halktv-haber",
    outlet: "Halk TV",
    title: "Paradox Interactive Sunucusunda Atatürk Sansürüne Karşı Boykot Dalgası",
    summary:
      "Oyun dünyasının en büyük boykotlarından birine dönüşen olayda on binlerce Türk oyuncu şirket yönetimine tepki gösterdi.",
    url: "https://www.halktv.com.tr",
    category: "Ulusal Basın",
    date: "Eylül 2024",
  },
  {
    id: "donanimhaber-haber",
    outlet: "DonanımHaber",
    title: "Hearts of Iron 4 Discord Sunucusunda Atatürk Krizi: Türk Oyuncular Ayaklandı",
    summary:
      "Oyun dünyasının en köklü teknoloji platformlarından DonanımHaber, moderatörlerin taraflı tavrını ve Steam'deki inceleme bombardımanını detaylandırdı.",
    url: "https://www.donanimhaber.com",
    category: "Oyun & Teknoloji",
    date: "Eylül 2024",
    badge: "Detaylı İnceleme",
  },
  {
    id: "webtekno-haber",
    outlet: "Webtekno",
    title: "HOI4 Discord Sunucusunda Atatürk Fotoğrafı Skandalı ve Boykot",
    summary:
      "Discord moderatörlerinin skandal gerekçeleri, Türk oyuncuların itirazları ve Steam'deki olumsuz inceleme akını kapsamlı şekilde aktarıldı.",
    url: "https://www.webtekno.com",
    category: "Oyun & Teknoloji",
    date: "Eylül 2024",
  },
  {
    id: "oyungezer-haber",
    outlet: "Oyungezer",
    title: "Hearts of Iron 4 Resmi Discord'unda Atatürk Tartışması ve Boykot Çağrısı",
    summary:
      "Türkiye'nin önde gelen oyun dergisi Oyungezer, topluluk tepkilerini ve Paradox'un olası yaptırımlarını değerlendirdi.",
    url: "https://oyungezer.com.tr",
    category: "Oyun & Teknoloji",
    date: "Eylül 2024",
  },
  {
    id: "onedio-haber",
    outlet: "Onedio",
    title: "HOI4 Discordunda Yaşanan Atatürk Krizine Tepkiler Çığ Gibi Büyüyor",
    summary:
      "Sosyal medyada #BoycottParadox etiketiyle başlatılan hareketin kronolojisi ve oyuncuların paylaştığı ekran görüntüleri derlendi.",
    url: "https://onedio.com",
    category: "Oyun & Teknoloji",
    date: "Eylül 2024",
  },
  {
    id: "reddit-director",
    outlet: "Reddit (r/hoi4)",
    title: "Paradox Game Director Batya's Official Statement on Discord Moderation",
    summary:
      "Tepkilerin ardından HOI4 Oyun Direktörü Batya resmi açıklama yaparak Atatürk'ün Türk milleti için önemini anladıklarını ve kuralların gözden geçirileceğini duyurdu.",
    url: "https://www.reddit.com/r/hoi4/",
    category: "Topluluk & Forum",
    date: "Eylül 2024",
    badge: "Resmi Açıklama",
  },
];
