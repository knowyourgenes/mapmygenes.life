import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  categoryChipsQuery,
  homepageQuery,
  readBySlugQuery,
  readSlugsQuery,
  readsByThemeQuery,
  readsQuery,
  themesQuery,
} from "./queries";

export type HomepageContent = {
  heroEyebrow: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubhead: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  weeklyRhythmEyebrow: string;
  weeklyRhythmTitle: string;
  weeklyRhythmIntro: string;
  categoryChipsLabel: string;
  thisWeeksReadsTitle: string;
  thisWeeksReadsCta: string;
  shareEyebrow: string;
  shareTitle: string;
  shareBody: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterSmallprint: string;
  footerMission: string;
};

export type Theme = {
  slug: string;
  name: string;
  day: string;
  shortDay: string;
  tagline: string;
  accentColor: string | null;
  icon: string | null;
  order: number;
};

export type CategoryChip = {
  slug: string;
  label: string;
  themeSlug: string | null;
  order: number;
};

export type DailyReadSummary = {
  slug: string;
  title: string;
  week: number;
  themeName: string;
  themeSlug: string;
  themeAccent: string | null;
  themeDay: string;
  themeShortDay: string;
  themeOrder?: number;
  shortAnswer: string;
  body: string[];
  genesInPlay: string[];
  doThisToday: string;
  readTimeMinutes: number;
  publishedAt: string | null;
  featured?: boolean;
};

export type DailyReadRelated = Pick<
  DailyReadSummary,
  "slug" | "title" | "week" | "themeName" | "themeShortDay" | "themeAccent" | "readTimeMinutes"
>;

export type DailyRead = DailyReadSummary & {
  themeTagline: string;
  related: DailyReadRelated[];
};

type SanityBlock = { _type?: string; children?: { text?: string }[] };
function flattenBlocks(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return blocks
    .filter(
      (b): b is SanityBlock => !!b && typeof b === "object" && (b as SanityBlock)._type === "block",
    )
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((t) => t.trim().length > 0);
}

function requireClient(label: string) {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      `Sanity is not configured (${label}). Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN in .env.local.`,
    );
  }
  return client;
}

export async function getHomepageData(): Promise<{
  homepage: HomepageContent;
  themes: Theme[];
  reads: DailyReadSummary[];
  chips: CategoryChip[];
}> {
  const client = requireClient("homepage");

  const [rawHomepage, rawThemes, rawReads, rawChips] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Theme[]>(themesQuery),
    client.fetch<Array<Omit<DailyReadSummary, "body"> & { body?: unknown }>>(readsQuery),
    client.fetch<CategoryChip[]>(categoryChipsQuery),
  ]);

  if (!rawHomepage) {
    throw new Error(
      "No homepage document found in Sanity. Run `pnpm seed` to populate or create one in the Studio at /studio.",
    );
  }

  const reads: DailyReadSummary[] = (rawReads ?? []).map((r) => ({
    ...r,
    body: flattenBlocks(r.body),
  }));

  return {
    homepage: rawHomepage,
    themes: rawThemes ?? [],
    reads,
    chips: rawChips ?? [],
  };
}

export async function getReadSlugs(): Promise<string[]> {
  const client = requireClient("getReadSlugs");
  return (await client.fetch<string[]>(readSlugsQuery)) ?? [];
}

export async function getReadBySlug(slug: string): Promise<DailyRead | null> {
  const client = requireClient("getReadBySlug");
  const raw = await client.fetch<
    | (Omit<DailyRead, "body" | "related"> & {
        body?: unknown;
        related?: DailyRead["related"];
      })
    | null
  >(readBySlugQuery, { slug });
  if (!raw) return null;
  return {
    ...raw,
    body: flattenBlocks(raw.body),
    related: raw.related ?? [],
  };
}

export async function getReadsByTheme(themeSlug: string): Promise<DailyReadSummary[]> {
  const client = requireClient("getReadsByTheme");
  return (await client.fetch<DailyReadSummary[]>(readsByThemeQuery, { themeSlug })) ?? [];
}

export async function getThemes(): Promise<Theme[]> {
  const client = requireClient("getThemes");
  return (await client.fetch<Theme[]>(themesQuery)) ?? [];
}
