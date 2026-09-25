import hoi4 from "@/assets/hoi4.jpg";
import eu4 from "@/assets/eu4.jpg";
import ck3 from "@/assets/ck3.jpg";
import stellaris from "@/assets/stellaris.jpg";
import victoria3 from "@/assets/victoria3.jpg";
import cities from "@/assets/cities.jpg";
import cities2 from "@/assets/cities2.jpg";
import aow4 from "@/assets/aow4.jpg";
import imperator from "@/assets/imperator.jpg";
import prison from "@/assets/prison.jpg";
import millennia from "@/assets/millennia.jpg";

import type { StaticImageData } from "next/image";

export type PlatformLink = {
  id: string;
  name: string;
  url: string;
  type: "steam" | "metacritic" | "epic" | "gog" | "xbox" | "playstation" | "trustpilot" | "google" | "other";
  shortName: string;
  actionHint: string;
};

export type Game = {
  id: string;
  title: string;
  image: string | StaticImageData;
  base: number;
  appId: number;
  genre: string;
  platforms: PlatformLink[];
};

export type CorporateTarget = {
  id: string;
  name: string;
  platform: string;
  url: string;
  description: string;
  importance: "Kritik" | "Yüksek" | "Önemli";
  actionText: string;
};

export type ReviewTemplate = {
  id: string;
  title: string;
  language: "tr" | "en";
  badge: string;
  text: string;
  recommendedFor: string[];
};

export const GAMES: Game[] = [
  {
    id: "hoi4",
    title: "Hearts of Iron IV",
    image: hoi4,
    base: 1984,
    appId: 394360,
    genre: "Büyük Strateji / II. Dünya Savaşı",
    platforms: [
      {
        id: "hoi4-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/394360/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "hoi4-steam-store",
        name: "Steam Mağaza Sayfası",
        shortName: "Steam Mağaza",
        url: "https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/",
        type: "steam",
        actionHint: "Mağazadan Puanla",
      },
      {
        id: "hoi4-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/hearts-of-iron-iv/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "hoi4-xbox",
        name: "Microsoft / Xbox Mağazası",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/hearts-of-iron-iv-cadet-edition/9nn3z41f9hhn",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
      {
        id: "hoi4-plaza",
        name: "Paradox Plaza",
        shortName: "Paradox Plaza",
        url: "https://play.paradoxinteractive.com/games/hearts-of-iron-iv",
        type: "other",
        actionHint: "Geri Bildirim / İnceleme",
      },
    ],
  },
  {
    id: "eu4",
    title: "Europa Universalis IV",
    image: eu4,
    base: 3120,
    appId: 236850,
    genre: "Büyük Strateji / Tarih",
    platforms: [
      {
        id: "eu4-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/236850/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "eu4-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/europa-universalis-iv/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "eu4-epic",
        name: "Epic Games Store",
        shortName: "Epic Games",
        url: "https://store.epicgames.com/tr/p/europa-universalis-4",
        type: "epic",
        actionHint: "Puan / İnceleme",
      },
      {
        id: "eu4-xbox",
        name: "Microsoft Store",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/europa-universalis-iv/9mtk6m04zfcq",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "ck3",
    title: "Crusader Kings III",
    image: ck3,
    base: 2540,
    appId: 1158310,
    genre: "Orta Çağ RPG / Strateji",
    platforms: [
      {
        id: "ck3-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/1158310/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "ck3-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/crusader-kings-iii/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "ck3-xbox",
        name: "Xbox / PC Game Pass",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/crusader-kings-iii/9n7gg534w40f",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
      {
        id: "ck3-ps",
        name: "PlayStation Store",
        shortName: "PS Store",
        url: "https://store.playstation.com/tr-tr/concept/10001099",
        type: "playstation",
        actionHint: "Puanla",
      },
    ],
  },
  {
    id: "stellaris",
    title: "Stellaris",
    image: stellaris,
    base: 1208,
    appId: 281990,
    genre: "Uzay 4X / Bilim Kurgu",
    platforms: [
      {
        id: "stellaris-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/281990/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "stellaris-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/stellaris/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "stellaris-gog",
        name: "GOG.com İncelemeleri",
        shortName: "GOG.com",
        url: "https://www.gog.com/en/game/stellaris",
        type: "gog",
        actionHint: "1 Yıldız Ver",
      },
      {
        id: "stellaris-xbox",
        name: "Xbox Store",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/stellaris-console-edition/bwkzfg7g0w91",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "victoria3",
    title: "Victoria 3",
    image: victoria3,
    base: 980,
    appId: 529340,
    genre: "Toplum Simülasyonu / Ekonomi",
    platforms: [
      {
        id: "victoria3-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/529340/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "victoria3-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/victoria-3/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "victoria3-plaza",
        name: "Paradox Plaza",
        shortName: "Paradox Plaza",
        url: "https://play.paradoxinteractive.com/games/victoria-3",
        type: "other",
        actionHint: "Değerlendir",
      },
    ],
  },
  {
    id: "cities",
    title: "Cities: Skylines",
    image: cities,
    base: 1440,
    appId: 255710,
    genre: "Şehir Kurma / Simülasyon",
    platforms: [
      {
        id: "cities-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/255710/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "cities-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/cities-skylines/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "cities-epic",
        name: "Epic Games Store",
        shortName: "Epic Games",
        url: "https://store.epicgames.com/tr/p/cities-skylines",
        type: "epic",
        actionHint: "1 Yıldız Ver",
      },
      {
        id: "cities-xbox",
        name: "Xbox Store",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/cities-skylines-remastered/9pg8h03fkm99",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "cities2",
    title: "Cities: Skylines II",
    image: cities2,
    base: 2190,
    appId: 949230,
    genre: "Şehir Kurma / Yeni Nesil Simülasyon",
    platforms: [
      {
        id: "cities2-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/949230/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "cities2-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/cities-skylines-ii/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "cities2-xbox",
        name: "Xbox / PC Game Pass",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/cities-skylines-ii-pc-edition/9nhg4898z7j8",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "aow4",
    title: "Age of Wonders 4",
    image: aow4,
    base: 1420,
    appId: 1669000,
    genre: "Fantezi 4X / Sıra Tabanlı Strateji",
    platforms: [
      {
        id: "aow4-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/1669000/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "aow4-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/age-of-wonders-4/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "aow4-epic",
        name: "Epic Games Store",
        shortName: "Epic Games",
        url: "https://store.epicgames.com/tr/p/age-of-wonders-4",
        type: "epic",
        actionHint: "Puan / İnceleme",
      },
      {
        id: "aow4-xbox",
        name: "Xbox Mağazası",
        shortName: "Xbox Store",
        url: "https://www.xbox.com/tr-tr/games/store/age-of-wonders-4/9n216g0v4k2n",
        type: "xbox",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "imperator",
    title: "Imperator: Rome",
    image: imperator,
    base: 980,
    appId: 859580,
    genre: "Büyük Strateji / Antik Tarih",
    platforms: [
      {
        id: "imperator-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/859580/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "imperator-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/imperator-rome/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "imperator-gog",
        name: "GOG.com Mağazası",
        shortName: "GOG",
        url: "https://www.gog.com/en/game/imperator_rome",
        type: "gog",
        actionHint: "1 Yıldız / İnceleme",
      },
    ],
  },
  {
    id: "prison",
    title: "Prison Architect",
    image: prison,
    base: 1850,
    appId: 233450,
    genre: "Yönetim & Cezaevi Simülasyonu",
    platforms: [
      {
        id: "prison-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/233450/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "prison-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/prison-architect/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
      {
        id: "prison-epic",
        name: "Epic Games Store",
        shortName: "Epic Games",
        url: "https://store.epicgames.com/tr/p/prison-architect",
        type: "epic",
        actionHint: "Puan / İnceleme",
      },
      {
        id: "prison-gog",
        name: "GOG.com Mağazası",
        shortName: "GOG",
        url: "https://www.gog.com/en/game/prison_architect",
        type: "gog",
        actionHint: "1 Yıldız Ver",
      },
    ],
  },
  {
    id: "millennia",
    title: "Millennia",
    image: millennia,
    base: 720,
    appId: 1268590,
    genre: "Tarihsel Sıra Tabanlı 4X",
    platforms: [
      {
        id: "millennia-steam",
        name: "Steam İncelemeleri",
        shortName: "Steam",
        url: "https://steamcommunity.com/app/1268590/reviews/",
        type: "steam",
        actionHint: "Olumsuz İnceleme (1★)",
      },
      {
        id: "millennia-metacritic",
        name: "Metacritic Kullanıcı Puanı",
        shortName: "Metacritic",
        url: "https://www.metacritic.com/game/millennia/",
        type: "metacritic",
        actionHint: "0/10 veya 1/10 Ver",
      },
    ],
  },
];

export const CORPORATE_TARGETS: CorporateTarget[] = [
  {
    id: "corp-steam-publisher",
    name: "Steam — Paradox Interactive Yayıncı Merkezi (100+ Oyun & DLC)",
    platform: "Steam Publisher Hub",
    url: "https://store.steampowered.com/publisher/paradoxinteractive",
    description: "Paradox'un Steam üzerindeki TÜM oyunlarını (Age of Wonders, Prison Architect, Magicka vb.) ve yüzlerce DLC'sini tek sayfada görün. Yayıncıyı takipten çıkın ve tüm oyunlara erişin.",
    importance: "Kritik",
    actionText: "Tüm Kataloğu Aç (Steam)",
  },
  {
    id: "corp-trustpilot",
    name: "Trustpilot — Paradox Interactive",
    platform: "Trustpilot",
    url: "https://www.trustpilot.com/review/paradoxinteractive.com",
    description: "Şirketin küresel güvenilirlik ve tüketici memnuniyet puanını doğrudan etkiler. Google arama sonuçlarında doğrudan görünür.",
    importance: "Kritik",
    actionText: "Trustpilot'ta 1★ Ver",
  },
  {
    id: "corp-google",
    name: "Google Şirket İncelemeleri (Stockholm HQ)",
    platform: "Google Reviews",
    url: "https://www.google.com/search?q=Paradox+Interactive+AB+Stockholm+reviews",
    description: "Google Haritalar ve Arama sonuçlarında Paradox'un ana merkezine doğrudan 1 yıldız ve kamuoyu yorumu bırakın.",
    importance: "Kritik",
    actionText: "Google'da Değerlendir",
  },
  {
    id: "corp-metacritic-publisher",
    name: "Metacritic — Paradox Interactive Yayıncı Sayfası",
    platform: "Metacritic",
    url: "https://www.metacritic.com/company/paradox-interactive/",
    description: "Paradox'un yayınladığı tüm oyunların listesi ve genel yayıncı karnesi.",
    importance: "Yüksek",
    actionText: "Yayıncı Profilini İncele",
  },
  {
    id: "corp-glassdoor",
    name: "Glassdoor — Şirket & Yönetim Puanı",
    platform: "Glassdoor",
    url: "https://www.glassdoor.sg/Reviews/Paradox-Interactive-Reviews-E1008028.htm",
    description: "Yönetimin topluluk krizlerini yönetme biçimi ve kurumsal etik sicilini kamuoyuna gösterir.",
    importance: "Önemli",
    actionText: "Glassdoor Puanını Gör",
  },
];

export const REVIEW_TEMPLATES: ReviewTemplate[] = [
  {
    id: "template-tr-detailed",
    title: "Türkçe (Detaylı)",
    language: "tr",
    badge: "Önerilen",
    recommendedFor: ["Steam", "Metacritic"],
    text: "Gerçekten inanamıyorum, böyle zor bir oyun olamaz abi. 10 saat devirdim hala düzgün bir hat kuramadım. Oyunun kendisi zor, öğrenmesi çok zaman alıyor, yok neymiş kış olduğu için tanklar gidemiyor hay senin gibi takdın ve oyununda... Bunun yerine gidin Withcer oynayın kardeşim.",
  },
  {
    id: "template-tr-short",
    title: "Türkçe (Kısa & Vurucu)",
    language: "tr",
    badge: "Hızlı Puanlama",
    recommendedFor: ["Steam", "Google", "Xbox"],
    text: "Senin gibi oyunun gelmişini geçmişini, hem optimizasyon yok, hem oyun çok zor, rehber bakıyorum adamlar bile anlamıyor.",
  },
  {
    id: "template-en-global",
    title: "English (Global / Uluslararası)",
    language: "en",
    badge: "Global Etki",
    recommendedFor: ["Steam (Global)", "Metacritic"],
    text: "What kind of game is this? I can't even understand how to play it. Texts are seem small even I have huge screen.",
  },
  {
    id: "template-corp-trustpilot",
    title: "Kurumsal & Tüketici Odaklı (Trustpilot İçin)",
    language: "tr",
    badge: "Trustpilot Özel",
    recommendedFor: ["Trustpilot", "Google Reviews"],
    text: "Paradox Interactive müşterilerine ve sadık oyuncu kitlesine saygı göstermemektedir. Resmi topluluk kanallarında nefret söylemine göz yumulmuş, itiraz eden oyuncular haksızca susturulmuştur. Tüketici haklarına, topluluk ahlakına ve ulusal değerlere saygı gösterilmeyen bu firmaya güvenimiz sıfırdır.",
  },
];

export const DEMANDS = [
  {
    number: "01",
    title: "Resmi ve Samimi Özür",
    description: "Paradox Interactive üst yönetiminin ve HOI4 ekibinin kamuoyuna açık, net ve samimi bir özür metni yayınlaması.",
  },
  {
    number: "02",
    title: "Sorumlu Moderatör 'chakerathe' ve Ekibin İhracı",
    description: "Atatürk profil fotoğrafı nedeniyle Türk oyuncuyu banlayan, Atatürk'e 1915 olayları üzerinden mesnetsiz soykırım iftirası atan moderatör 'chakerathe' ve taraflı moderasyon ekibinin tüm yetkilerinin derhal feshedilmesi.",
  },
  {
    number: "03",
    title: "Haksız Yasakların Kaldırılması",
    description: "Olay sırasında hakkını aradığı ve tepki gösterdiği için Discord ve resmi forumlardan yasaklanan Türk oyuncuların tüm cezalarının iptali.",
  },
  {
    number: "04",
    title: "Topluluk ve Moderasyon Standartlarının Güncellenmesi",
    description: "Tüm resmi kanallarda nefret söylemine, ırkçılığa ve kurucu liderlere hakarete karşı sıfır tolerans politikasının tavizsiz uygulanması.",
  },
];

export const ANTI_SPAM_TIPS = [
  {
    platform: "Steam",
    tip: "İncelemenizin 'Konu Dışı İnceleme' (Off-topic) etiketiyle gizlenmemesi için metninizde 'topluluk yönetimi', 'şirket politikası', 'oyun moderasyonu' gibi kavramlara yer verin ve şablonu birkaç kelimeyle kişiselleştirin. Hesabınızda oyunun en az 5-10 dakika oynanmış görünmesi incelemenin kalıcılığını artırır.",
  },
  {
    platform: "Metacritic",
    tip: "Metacritic'te 'User Score' bölümünden oyun sayfasına gidip 'Score: 0' veya 'Score: 1' seçin. Bir iki cümle açıklama yazıp 'Post Review' deyin. Metacritic e-posta onayı olan hesapların incelemelerini öne çıkarır.",
  },
  {
    platform: "Trustpilot",
    tip: "Trustpilot oyunları değil şirketi puanlar. Başlık olarak 'Saygısız Topluluk Yönetimi ve Boykot' yazıp 1 yıldız verin. 'Tüketici deneyimi' olarak resmi Discord ve müşteri ilişkilerini belirtin. Google arama skorunu anında vurur.",
  },
  {
    platform: "Google Reviews",
    tip: "Stockholm ana binası konumuna doğrudan Google Maps üzerinden 1 yıldız bırakabilirsiniz. Çok kısa yerine gerekçeli yorum bırakmak Google'ın spam filtresine takılmasını engeller.",
  },
];
