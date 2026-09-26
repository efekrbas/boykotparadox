export interface SteamReviewSummary {
  appId: number;
  review_score: number;
  review_score_desc: string;
  review_score_desc_tr: string;
  total_positive: number;
  total_negative: number;
  total_reviews: number;
  positive_percent: number;
  negative_percent: number;
  star_rating: number; // 0.0 - 5.0
}

export const STEAM_DESC_TR: Record<string, string> = {
  "Overwhelmingly Positive": "Son Derece Olumlu",
  "Very Positive": "Çok Olumlu",
  "Positive": "Olumlu",
  "Mostly Positive": "Çoğunlukla Olumlu",
  "Mixed": "Karışık",
  "Mostly Negative": "Çoğunlukla Olumsuz",
  "Negative": "Olumsuz",
  "Very Negative": "Çok Olumsuz",
  "Overwhelmingly Negative": "Son Derece Olumsuz",
};

export function getSteamDescTurkish(desc: string): string {
  return STEAM_DESC_TR[desc] || desc || "Belirsiz";
}

export function parseSteamReviewData(appId: number, data: any): SteamReviewSummary {
  const qs = data?.query_summary || {};
  const pos = Number(qs.total_positive) || 0;
  const neg = Number(qs.total_negative) || 0;
  const total = Number(qs.total_reviews) || pos + neg || 0;
  const positive_percent = total > 0 ? Math.round((pos / total) * 100) : 0;
  const negative_percent = total > 0 ? Math.round((neg / total) * 100) : 0;
  const star_rating = total > 0 ? Number(((pos / total) * 5).toFixed(1)) : 0;
  const desc = qs.review_score_desc || "Mixed";

  return {
    appId,
    review_score: Number(qs.review_score) || 5,
    review_score_desc: desc,
    review_score_desc_tr: getSteamDescTurkish(desc),
    total_positive: pos,
    total_negative: neg,
    total_reviews: total,
    positive_percent,
    negative_percent,
    star_rating,
  };
}

export const DEFAULT_STEAM_REVIEWS: Record<number, SteamReviewSummary> = {
  394360: {
    appId: 394360,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 112792,
    total_negative: 11283,
    total_reviews: 124075,
    positive_percent: 91,
    negative_percent: 9,
    star_rating: 4.5,
  },
  236850: {
    appId: 236850,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 41549,
    total_negative: 5981,
    total_reviews: 47530,
    positive_percent: 87,
    negative_percent: 13,
    star_rating: 4.4,
  },
  1158310: {
    appId: 1158310,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 45446,
    total_negative: 4789,
    total_reviews: 50235,
    positive_percent: 90,
    negative_percent: 10,
    star_rating: 4.5,
  },
  281990: {
    appId: 281990,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 66098,
    total_negative: 10573,
    total_reviews: 76671,
    positive_percent: 86,
    negative_percent: 14,
    star_rating: 4.3,
  },
  529340: {
    appId: 529340,
    review_score: 6,
    review_score_desc: "Mostly Positive",
    review_score_desc_tr: "Çoğunlukla Olumlu",
    total_positive: 14510,
    total_negative: 6161,
    total_reviews: 20671,
    positive_percent: 70,
    negative_percent: 30,
    star_rating: 3.5,
  },
  255710: {
    appId: 255710,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 93472,
    total_negative: 9089,
    total_reviews: 102561,
    positive_percent: 91,
    negative_percent: 9,
    star_rating: 4.6,
  },
  949230: {
    appId: 949230,
    review_score: 5,
    review_score_desc: "Mixed",
    review_score_desc_tr: "Karışık",
    total_positive: 20078,
    total_negative: 14906,
    total_reviews: 34984,
    positive_percent: 57,
    negative_percent: 43,
    star_rating: 2.9,
  },
  1669000: {
    appId: 1669000,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 9157,
    total_negative: 1945,
    total_reviews: 11102,
    positive_percent: 82,
    negative_percent: 18,
    star_rating: 4.1,
  },
  859580: {
    appId: 859580,
    review_score: 5,
    review_score_desc: "Mixed",
    review_score_desc_tr: "Karışık",
    total_positive: 8418,
    total_negative: 4073,
    total_reviews: 12491,
    positive_percent: 67,
    negative_percent: 33,
    star_rating: 3.4,
  },
  233450: {
    appId: 233450,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 30251,
    total_negative: 4547,
    total_reviews: 34798,
    positive_percent: 87,
    negative_percent: 13,
    star_rating: 4.3,
  },
  1268590: {
    appId: 1268590,
    review_score: 5,
    review_score_desc: "Mixed",
    review_score_desc_tr: "Karışık",
    total_positive: 1292,
    total_negative: 610,
    total_reviews: 1902,
    positive_percent: 68,
    negative_percent: 32,
    star_rating: 3.4,
  },
  464920: {
    appId: 464920,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 12450,
    total_negative: 2340,
    total_reviews: 14790,
    positive_percent: 84,
    negative_percent: 16,
    star_rating: 4.2,
  },
  238370: {
    appId: 238370,
    review_score: 8,
    review_score_desc: "Mostly Positive",
    review_score_desc_tr: "Çoğunlukla Olumlu",
    total_positive: 11200,
    total_negative: 3200,
    total_reviews: 14400,
    positive_percent: 78,
    negative_percent: 22,
    star_rating: 3.9,
  },
  362960: {
    appId: 362960,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 14100,
    total_negative: 1800,
    total_reviews: 15900,
    positive_percent: 89,
    negative_percent: 11,
    star_rating: 4.4,
  },
  637090: {
    appId: 637090,
    review_score: 8,
    review_score_desc: "Mostly Positive",
    review_score_desc_tr: "Çoğunlukla Olumlu",
    total_positive: 15600,
    total_negative: 3400,
    total_reviews: 19000,
    positive_percent: 82,
    negative_percent: 18,
    star_rating: 4.1,
  },
  604540: {
    appId: 604540,
    review_score: 5,
    review_score_desc: "Mixed",
    review_score_desc_tr: "Karışık",
    total_positive: 1890,
    total_negative: 2450,
    total_reviews: 4340,
    positive_percent: 44,
    negative_percent: 56,
    star_rating: 2.2,
  },
  1385380: {
    appId: 1385380,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 16800,
    total_negative: 3200,
    total_reviews: 20000,
    positive_percent: 84,
    negative_percent: 16,
    star_rating: 4.2,
  },
  291650: {
    appId: 291650,
    review_score: 8,
    review_score_desc: "Very Positive",
    review_score_desc_tr: "Çok Olumlu",
    total_positive: 13900,
    total_negative: 2100,
    total_reviews: 16000,
    positive_percent: 87,
    negative_percent: 13,
    star_rating: 4.3,
  },
  809230: {
    appId: 809230,
    review_score: 8,
    review_score_desc: "Mostly Positive",
    review_score_desc_tr: "Çoğunlukla Olumlu",
    total_positive: 4300,
    total_negative: 1200,
    total_reviews: 5500,
    positive_percent: 78,
    negative_percent: 22,
    star_rating: 3.9,
  },
  684450: {
    appId: 684450,
    review_score: 8,
    review_score_desc: "Mostly Positive",
    review_score_desc_tr: "Çoğunlukla Olumlu",
    total_positive: 3100,
    total_negative: 1300,
    total_reviews: 4400,
    positive_percent: 70,
    negative_percent: 30,
    star_rating: 3.5,
  },
  1167750: {
    appId: 1167750,
    review_score: 8,
    review_score_desc: "Mixed",
    review_score_desc_tr: "Karışık",
    total_positive: 890,
    total_negative: 460,
    total_reviews: 1350,
    positive_percent: 66,
    negative_percent: 34,
    star_rating: 3.3,
  },
};

export const TARGET_APP_IDS = [
  394360, 236850, 1158310, 281990, 529340, 255710, 949230, 1669000, 859580, 233450, 1268590,
  464920, 238370, 362960, 637090, 604540, 1385380, 291650, 809230, 684450, 1167750,
];

export async function fetchSingleSteamReview(appId: number): Promise<SteamReviewSummary> {
  const url = `https://store.steampowered.com/appreviews/${appId}?json=1&num_per_page=0`;
  const res = await fetch(url, {
    next: { revalidate: 300 }, // 5 minutes cache
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; BoykotParadoxBot/1.0)",
    },
  });

  if (!res.ok) {
    throw new Error(`Steam API responded with ${res.status}`);
  }

  const json = await res.json();
  if (json.success !== 1) {
    throw new Error(`Steam API returned unsuccessful code for app ${appId}`);
  }

  return parseSteamReviewData(appId, json);
}

export async function fetchAllSteamReviews(): Promise<Record<number, SteamReviewSummary>> {
  const entries = await Promise.all(
    TARGET_APP_IDS.map(async (appId) => {
      try {
        const data = await fetchSingleSteamReview(appId);
        return [appId, data] as const;
      } catch (err) {
        console.warn(`Failed to fetch Steam reviews for ${appId}, using fallback:`, err);
        return [appId, DEFAULT_STEAM_REVIEWS[appId]] as const;
      }
    })
  );

  return Object.fromEntries(entries);
}
