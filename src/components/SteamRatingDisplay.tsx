"use client";

import { Star } from "lucide-react";
import type { SteamReviewSummary } from "@/lib/steam";

const tr = (n: number) => n.toLocaleString("tr-TR");

interface SteamRatingDisplayProps {
  steam?: SteamReviewSummary;
  className?: string;
}

export function SteamRatingDisplay({ steam, className = "" }: SteamRatingDisplayProps) {
  if (!steam) {
    return (
      <div className={`space-y-2 animate-pulse ${className}`}>
        <div className="h-6 w-20 bg-ink/10 rounded"></div>
        <div className="h-4 w-32 bg-ink/10 rounded"></div>
      </div>
    );
  }

  // Determine badge styling based on review_score / percent
  let badgeStyle = "border-ink/20 bg-ink/5 text-ink";
  let scoreColor = "text-ink";

  if (steam.review_score <= 4 || steam.positive_percent < 40) {
    // Mostly negative / Overwhelmingly negative
    badgeStyle = "border-seal/40 bg-seal/15 text-seal";
    scoreColor = "text-seal";
  } else if (steam.review_score === 5 || steam.positive_percent < 70) {
    // Mixed
    badgeStyle = "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400";
    scoreColor = "text-amber-600 dark:text-amber-400";
  } else {
    // Positive / Very Positive
    badgeStyle = "border-sky-500/40 bg-sky-500/15 text-sky-600 dark:text-sky-400";
    scoreColor = "text-ink";
  }

  const rating = steam.star_rating;

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Top row: Star rating + Score description pill */}
      <div className="flex items-center justify-between gap-2">
        {/* Partial stars */}
        <div className="flex items-center gap-0.5" title={`Steam Puanı: ${rating} / 5.0`}>
          {[1, 2, 3, 4, 5].map((starIdx) => {
            const fillRatio = Math.max(0, Math.min(1, rating - (starIdx - 1)));
            const fillPercent = Math.round(fillRatio * 100);

            return (
              <div key={starIdx} className="relative size-4 flex-shrink-0">
                {/* Empty base star */}
                <Star className="size-4 text-ink/20" />
                {/* Filled overlay star */}
                {fillPercent > 0 && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${fillPercent}%` }}
                  >
                    <Star
                      className={`size-4 ${
                        steam.review_score <= 4
                          ? "fill-seal text-seal"
                          : steam.review_score === 5
                          ? "fill-amber-500 text-amber-500"
                          : "fill-ink text-ink"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <span className="ml-1.5 font-mono text-xs font-bold text-ink tabular-nums">
            {rating.toFixed(1)}
          </span>
          <span className="font-mono text-[10px] text-mute">/ 5.0</span>
        </div>

        {/* Review description badge */}
        <span
          className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${badgeStyle}`}
          title={`Steam Skoru: ${steam.review_score} (${steam.review_score_desc})`}
        >
          {steam.review_score_desc_tr}
        </span>
      </div>

      {/* Negative vs Positive Breakdown Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-seal font-semibold">
            {tr(steam.total_negative)} olumsuz (%{steam.negative_percent})
          </span>
          <span className="text-mute tabular-nums">
            %{steam.positive_percent} olumlu ({tr(steam.total_reviews)})
          </span>
        </div>

        {/* Dual visual bar */}
        <div
          className="h-1.5 w-full overflow-hidden bg-ink/10 flex"
          title={`Olumlu: %${steam.positive_percent} | Olumsuz: %${steam.negative_percent}`}
        >
          <div
            className="h-full bg-ink/35 transition-all duration-500"
            style={{ width: `${steam.positive_percent}%` }}
          />
          <div
            className="h-full bg-seal transition-all duration-500"
            style={{ width: `${steam.negative_percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
