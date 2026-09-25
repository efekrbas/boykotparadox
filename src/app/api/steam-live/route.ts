import { NextResponse } from "next/server";

export const revalidate = 60; // 1 minute cache for live reviews

// Target game IDs to fetch live reviews from
const LIVE_APP_IDS = [
  394360, // HOI4
  236850, // EU4
  1158310, // CK3
  281990, // Stellaris
  949230, // Cities Skylines 2
];

export async function GET() {
  try {
    // Pick a random game from the list to get varied live reviews
    const randomAppId = LIVE_APP_IDS[Math.floor(Math.random() * LIVE_APP_IDS.length)];
    
    const url = `https://store.steampowered.com/appreviews/${randomAppId}?json=1&filter=recent&review_type=negative&num_per_page=5&language=all`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BoykotParadoxBot/1.0)",
      },
    });

    if (!res.ok) {
      throw new Error("Steam API request failed");
    }

    const data = await res.json();
    
    if (data.success === 1 && data.reviews) {
      return NextResponse.json({ success: true, appId: randomAppId, reviews: data.reviews });
    }

    return NextResponse.json({ success: false, error: "No reviews found" }, { status: 404 });
  } catch (error) {
    console.error("Steam Live Reviews API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live reviews" },
      { status: 502 }
    );
  }
}
