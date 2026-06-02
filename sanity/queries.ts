import { groq } from "next-sanity";

// Singleton "homepage" doc; we fetch the most recently published one.
export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  heroEyebrow,
  heroHeadline,
  heroHeadlineAccent,
  heroSubhead,
  heroPrimaryCta,
  heroSecondaryCta,
  weeklyRhythmEyebrow,
  weeklyRhythmTitle,
  weeklyRhythmIntro,
  categoryChipsLabel,
  thisWeeksReadsTitle,
  thisWeeksReadsCta,
  shareEyebrow,
  shareTitle,
  shareBody,
  newsletterTitle,
  newsletterBody,
  newsletterSmallprint,
  footerMission
}`;

export const themesQuery = groq`*[_type == "theme"] | order(order asc) {
  "slug": slug.current,
  name,
  day,
  shortDay,
  tagline,
  accentColor,
  icon,
  order
}`;

export const readsQuery = groq`*[_type == "dailyRead"] | order(week asc, themeOrder asc) {
  "slug": slug.current,
  title,
  week,
  "themeName": theme->name,
  "themeSlug": theme->slug.current,
  "themeAccent": theme->accentColor,
  "themeDay": theme->day,
  "themeShortDay": theme->shortDay,
  shortAnswer,
  body,
  genesInPlay,
  doThisToday,
  readTimeMinutes,
  "themeOrder": theme->order,
  publishedAt,
  featured
}`;

export const readSlugsQuery = groq`*[_type == "dailyRead" && defined(slug.current)][].slug.current`;

export const readBySlugQuery = groq`*[_type == "dailyRead" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  week,
  "themeName": theme->name,
  "themeSlug": theme->slug.current,
  "themeAccent": theme->accentColor,
  "themeDay": theme->day,
  "themeShortDay": theme->shortDay,
  "themeTagline": theme->tagline,
  shortAnswer,
  body,
  genesInPlay,
  doThisToday,
  readTimeMinutes,
  publishedAt,
  "related": *[_type == "dailyRead" && slug.current != ^.slug.current && theme._ref == ^.theme._ref] | order(week asc)[0...3] {
    "slug": slug.current,
    title,
    week,
    "themeName": theme->name,
    "themeShortDay": theme->shortDay,
    "themeAccent": theme->accentColor,
    readTimeMinutes
  }
}`;

export const readsByThemeQuery = groq`*[_type == "dailyRead" && theme->slug.current == $themeSlug] | order(week asc) {
  "slug": slug.current,
  title,
  week,
  "themeName": theme->name,
  "themeSlug": theme->slug.current,
  "themeAccent": theme->accentColor,
  "themeShortDay": theme->shortDay,
  shortAnswer,
  genesInPlay,
  readTimeMinutes,
  publishedAt
}`;

export const categoryChipsQuery = groq`*[_type == "categoryChip"] | order(order asc) {
  "slug": slug.current,
  label,
  themeSlug,
  order
}`;
