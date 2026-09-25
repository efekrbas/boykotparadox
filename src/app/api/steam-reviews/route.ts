import { NextRequest, NextResponse } from "next/server";
import {
  fetchAllSteamReviews,
  fetchSingleSteamReview,
  DEFAULT_STEAM_REVIEWS,
} from "@/lib/steam";

export const revalidate = 300; // 5 minutes cache

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const appIdParam = searchParams.get("appid");

  try {
    if (appIdParam) {
      const appId = parseInt(appIdParam, 10);
      if (isNaN(appId)) {
        return NextResponse.json(
          { error: "Geçersiz App ID formatı" },
          { status: 400 }
        );
      }

      try {
        const review = await fetchSingleSteamReview(appId);
        return NextResponse.json(
          { success: true, review },
          {
            headers: {
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
          }
        );
      } catch (e) {
        // Fallback to default if available
        const fallback = DEFAULT_STEAM_REVIEWS[appId];
        if (fallback) {
          return NextResponse.json({ success: true, review: fallback, isFallback: true });
        }
        return NextResponse.json(
          { error: "Steam API'den veri alınamadı" },
          { status: 502 }
        );
      }
    }

    // Fetch all games
    const reviews = await fetchAllSteamReviews();
    return NextResponse.json(
      {
        success: true,
        reviews,
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error: any) {
    console.error("Steam Reviews API error:", error);
    return NextResponse.json(
      {
        success: true,
        reviews: DEFAULT_STEAM_REVIEWS,
        isFallback: true,
        message: "Steam sunucularına erişilemedi, önbellekteki veriler sunuluyor.",
      },
      { status: 200 }
    );
  }
}
