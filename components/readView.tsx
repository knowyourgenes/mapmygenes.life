"use client";

import Link from "next/link";
import type { DailyRead } from "../sanity/fetch";
import SiteNav from "./siteNav";

export default function ReadView({ read }: { read: DailyRead }) {
  const shareText = `${read.shortAnswer} - via mapmygenes.life`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
    } catch {
      // best-effort
    }
  };

  return (
    <div className="read-page">
      <SiteNav />

      <article className="read-page__article">
        <div className="read-page__crumbs">
          <Link href="/library">Library</Link>
          <span className="read-page__crumbs-sep">·</span>
          <Link href={`/library?theme=${read.themeSlug}`}>
            <span>{read.themeName}</span>
          </Link>
          <span className="read-page__crumbs-sep">·</span>
          <span>Week {read.week}</span>
        </div>

        <h1 className="read-page__title">{read.title}</h1>

        <div className="read-page__meta">
          <span className="read-page__meta-tag">
            {read.themeShortDay} · {read.themeName}
          </span>
          <span>{read.readTimeMinutes} min read</span>
          {read.themeTagline ? <span>{read.themeTagline}</span> : null}
        </div>

        <div className="read-page__answer">
          <div className="read-page__answer-label">The short answer</div>
          {read.shortAnswer}
        </div>

        <div className="read-page__body">
          {read.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="read-page__do">
          <div className="read-page__do-label">Do this today</div>
          <div className="read-page__do-text">{read.doThisToday}</div>
        </div>

        {read.genesInPlay.length > 0 ? (
          <div className="read-page__genes">
            <span className="read-page__genes-label">Genes in play</span>
            {read.genesInPlay.map((g) => (
              <span key={g} className="read-page__gene">
                {g}
              </span>
            ))}
          </div>
        ) : null}

        <div className="read-page__share">
          <a
            className="read-page__share-btn read-page__share-wa"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden>✓</span> Send on WhatsApp
          </a>
          <button
            type="button"
            onClick={copy}
            className="read-page__share-btn read-page__share-copy"
          >
            <span aria-hidden>⧉</span> Copy link
          </button>
        </div>
      </article>

      {read.related.length > 0 ? (
        <section className="read-page__related">
          <div className="read-page__related-head">
            <span>More on {read.themeName.toLowerCase()}</span>
            <span className="read-page__related-line" />
          </div>
          <div className="read-page__related-grid">
            {read.related.map((r) => (
              <Link key={r.slug} href={`/reads/${r.slug}`} className="read-page__related-card">
                <div className="read-page__related-tag">
                  {r.themeName} · Week {r.week}
                </div>
                <div className="read-page__related-q">{r.title}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
