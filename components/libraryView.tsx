"use client";

import Link from "next/link";
import type { DailyReadSummary, Theme } from "../sanity/fetch";
import SiteNav from "./siteNav";

export default function LibraryView({
  reads,
  themes,
  activeThemeSlug,
}: {
  reads: DailyReadSummary[];
  themes: Theme[];
  activeThemeSlug: string | null;
}) {
  // Group by week
  const byWeek = new Map<number, DailyReadSummary[]>();
  for (const r of reads) {
    const arr = byWeek.get(r.week) ?? [];
    arr.push(r);
    byWeek.set(r.week, arr);
  }
  const weekNumbers = [...byWeek.keys()].sort((a, b) => a - b);

  const activeTheme = activeThemeSlug ? themes.find((t) => t.slug === activeThemeSlug) : null;
  const headline = activeTheme
    ? `${activeTheme.day} reads · ${activeTheme.name}`
    : "Four weeks of reads, cycling through the five weekday themes";

  return (
    <div className="lib-page">
      <SiteNav />

      <section className="lib-page__hero">
        <div className="lib-page__hero-inner">
          <div className="lib-page__eyebrow">The library</div>
          <h1 className="lib-page__title">
            {activeTheme
              ? `${activeTheme.name} reads`
              : "Every read, organised by the rhythm of your week"}
          </h1>
          <p className="lib-page__sub">
            {activeTheme
              ? activeTheme.tagline
              : "Each read is self-contained and shareable. The first line is written to be the answer an AI assistant or a featured snippet would lift directly."}
          </p>
        </div>
      </section>

      <div className="lib-page__filters">
        <Link
          href="/library"
          className={`lib-page__chip ${!activeThemeSlug ? "lib-page__chip--active" : ""}`}
        >
          All reads
        </Link>
        {themes.map((t) => (
          <Link
            key={t.slug}
            href={`/library?theme=${t.slug}`}
            className={`lib-page__chip ${activeThemeSlug === t.slug ? "lib-page__chip--active" : ""}`}
          >
            {t.name}
          </Link>
        ))}
      </div>

      <div className="lib-page__results">
        <div className="lib-page__results-head">
          <div className="lib-page__results-title">{headline}</div>
          <div className="lib-page__results-count">
            {reads.length} {reads.length === 1 ? "read" : "reads"}
          </div>
        </div>

        {reads.length === 0 ? (
          <div className="lib-page__empty">No reads yet.</div>
        ) : (
          <div className="lib-page__weeks">
            {weekNumbers.map((wk) => (
              <div key={wk}>
                <div className="lib-page__week-label">
                  <span>Week {wk}</span>
                  <span className="lib-page__week-line" />
                </div>
                <div className="lib-page__grid">
                  {byWeek.get(wk)!.map((r) => (
                    <Link key={r.slug} href={`/reads/${r.slug}`} className="lib-page__card">
                      <div className="lib-page__card-meta">
                        <span className="lib-page__card-theme">{r.themeName}</span>
                        <span className="lib-page__card-dot" />
                        <span className="lib-page__card-day">{r.themeShortDay}</span>
                      </div>
                      <h3 className="lib-page__card-q">{r.title}</h3>
                      <p className="lib-page__card-excerpt">{r.shortAnswer}</p>
                      <div className="lib-page__card-footer">
                        <span className="lib-page__card-time">{r.readTimeMinutes} min read</span>
                        <div className="lib-page__card-genes">
                          {r.genesInPlay.slice(0, 2).map((g) => (
                            <span key={g}>{g}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
