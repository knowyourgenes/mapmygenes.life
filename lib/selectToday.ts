import type { DailyReadSummary, Theme } from "../sanity/fetch";

const WEEKDAY_LABELS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Pick the read that should appear as "today's read":
 *  1. Any read with `featured: true`.
 *  2. The read whose theme.day matches today's weekday, preferring the most
 *     recent week (highest `week` number).
 *  3. The newest read by publishedAt.
 *  4. The first read in the list (any).
 */
export function selectTodayRead(
  reads: DailyReadSummary[],
  themes: Theme[],
  now: Date = new Date(),
): { read: DailyReadSummary | null; weekdayLabel: string; longDate: string } {
  const weekdayIdx = now.getDay();
  const weekdayLabel = WEEKDAY_LABELS[weekdayIdx] ?? "Today";
  const longDate = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  if (!reads.length) {
    return { read: null, weekdayLabel, longDate };
  }

  const featured = reads.find((r) => r.featured);
  if (featured) return { read: featured, weekdayLabel, longDate };

  // Find the theme that matches today's weekday.
  const themeForToday =
    themes.find((t) => t.day === weekdayLabel) ??
    themes.find((t) => t.day?.toLowerCase() === weekdayLabel.toLowerCase());

  if (themeForToday) {
    const matches = reads
      .filter((r) => r.themeSlug === themeForToday.slug)
      .sort((a, b) => b.week - a.week);
    if (matches.length) return { read: matches[0], weekdayLabel, longDate };
  }

  // Weekend or no theme match - pick the most recently published read.
  const sortedByDate = [...reads].sort((a, b) => {
    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bt - at;
  });
  return { read: sortedByDate[0], weekdayLabel, longDate };
}

/**
 * Pick the six reads to show under "This week's reads" - newest first,
 * deduplicated by theme so the grid surfaces variety.
 */
export function selectWeekReads(
  reads: DailyReadSummary[],
  excludeSlug?: string,
): DailyReadSummary[] {
  const sorted = [...reads].sort((a, b) => {
    const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    if (bt !== at) return bt - at;
    if (b.week !== a.week) return b.week - a.week;
    return (a.themeOrder ?? 0) - (b.themeOrder ?? 0);
  });
  return sorted.filter((r) => r.slug !== excludeSlug).slice(0, 6);
}
