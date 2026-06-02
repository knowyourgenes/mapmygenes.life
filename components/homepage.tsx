"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { CategoryChip, DailyReadSummary, HomepageContent, Theme } from "../sanity/fetch";
import TodaySection, { type Resolved } from "./todaySection";
import SiteNav from "./siteNav";

export type HomepageProps = {
  homepage: HomepageContent;
  themes: Theme[];
  reads: DailyReadSummary[];
  chips: CategoryChip[];
  today: {
    weekdayLabel: string;
    longDate: string;
    read: DailyReadSummary | null;
  };
  weekReads: DailyReadSummary[];
};

export default function Homepage({
  homepage,
  themes,
  reads,
  chips,
  today,
  weekReads,
}: HomepageProps) {
  const [todayPickInfo, setTodayPickInfo] = useState<Resolved | null>(null);
  const handleTodayPick = useCallback((info: Resolved) => {
    setTodayPickInfo(info);
  }, []);

  const heroWeekdayLabel = todayPickInfo?.weekdayLabel || today.weekdayLabel;
  const heroLongDate = todayPickInfo?.longDateLabel || today.longDate;
  const heroThemeBadge = todayPickInfo ? ` · ${todayPickInfo.pick.theme}` : "";

  const todayCtaHref = todayPickInfo?.pick.linkSlug
    ? `/reads/${todayPickInfo.pick.linkSlug}`
    : "#today";

  return (
    <>
      <SiteNav ctaLabel={homepage.heroPrimaryCta} />

      <section className="hero">
        <div className="hero__inner">
          <div className="hero__date">
            <span className="hero__date-dot" />
            <span>
              Today · {heroWeekdayLabel}, {heroLongDate}
              {heroThemeBadge}
            </span>
          </div>
          <div className="hero__eyebrow">{homepage.heroEyebrow}</div>
          <h1 className="hero__h1">
            {homepage.heroHeadline}
            {homepage.heroHeadlineAccent ? (
              <>
                {" "}
                <em>{homepage.heroHeadlineAccent}</em>
              </>
            ) : null}
          </h1>
          <p className="hero__sub">{homepage.heroSubhead}</p>
          <div className="hero__actions">
            {todayCtaHref.startsWith("/") ? (
              <Link className="btn btn--coral" href={todayCtaHref}>
                {homepage.heroPrimaryCta}
                <span aria-hidden>→</span>
              </Link>
            ) : (
              <a className="btn btn--coral" href={todayCtaHref}>
                {homepage.heroPrimaryCta}
                <span aria-hidden>→</span>
              </a>
            )}
            <a className="btn btn--ghost" href="#newsletter">
              {homepage.heroSecondaryCta}
            </a>
          </div>
          <div className="hero__trust">
            <div className="hero__trust-item">
              <span className="hero__trust-num">5 min</span> with your tea
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-num">1 gene</span> per read
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-num">1 action</span> for today
            </div>
            <div className="hero__trust-item">
              <span className="hero__trust-num">Free,</span> always
            </div>
          </div>
        </div>
      </section>

      <TodaySection onPick={handleTodayPick} />

      <section id="rhythm" className="rhythm">
        <div className="wrap">
          <div className="rhythm__head">
            <div className="rhythm__eyebrow">{homepage.weeklyRhythmEyebrow}</div>
            <h2 className="rhythm__h2">
              {homepage.weeklyRhythmTitle ||
                "Every weekday has a theme. You always know what's coming."}
            </h2>
            <p className="rhythm__sub">{homepage.weeklyRhythmIntro}</p>
          </div>
          <div className="rhythm__grid">
            {themes.map((t) => (
              <Link
                key={t.slug}
                href={`/library?theme=${t.slug}`}
                className="rhythm__day"
                style={
                  t.accentColor
                    ? ({
                        ["--day-accent" as never]: t.accentColor,
                      } as React.CSSProperties)
                    : undefined
                }
              >
                <div className="rhythm__day-icon">{t.icon || t.name.charAt(0)}</div>
                <div className="rhythm__day-name">{t.shortDay}</div>
                <div className="rhythm__day-theme">{t.name}</div>
                <div className="rhythm__day-desc">{t.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="chips">
        <div className="chips__head">
          <span className="chips__label">{homepage.categoryChipsLabel}</span>
        </div>
        <div className="chips__row">
          {chips.map((c, i) => {
            const isAll = c.slug === "all-reads" || c.themeSlug === null;
            const href = c.themeSlug ? `/library?theme=${c.themeSlug}` : "/library";
            return (
              <Link key={c.slug} href={href} className={`chip ${i === 0 ? "chip--active" : ""}`}>
                {c.label}
                {isAll && i !== 0 ? null : null}
              </Link>
            );
          })}
        </div>
      </section>

      <section id="reads" className="reads">
        <div className="wrap">
          <div className="reads__head">
            <h2 className="reads__title">{homepage.thisWeeksReadsTitle}</h2>
            <Link className="reads__more" href="/library">
              {homepage.thisWeeksReadsCta}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="reads__grid">
            {weekReads.map((r) => (
              <Link key={r.slug} href={`/reads/${r.slug}`} className="read">
                <div className="read__meta">
                  <span className="read__theme">{r.themeName}</span>
                  <span className="read__dot" />
                  <span className="read__day">{r.themeShortDay}</span>
                </div>
                <h3 className="read__q">{r.title}</h3>
                <p className="read__excerpt">{r.shortAnswer}</p>
                <div className="read__footer">
                  <span className="read__time">{r.readTimeMinutes} min read</span>
                  <span className="read__arrow" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="share">
        <div className="wrap share__inner">
          <div>
            <div className="share__eyebrow">{homepage.shareEyebrow}</div>
            <h2 className="share__h2">{homepage.shareTitle}</h2>
            <p className="share__p">{homepage.shareBody}</p>
          </div>
          <div className="share__bubble">
            <div className="share__bubble-head">Forwarded · mapmygenes.life</div>
            <div className="share__bubble-text">
              {todayPickInfo ? (
                <>
                  {todayPickInfo.pick.shortAnswer.slice(0, 200)}
                  {todayPickInfo.pick.shortAnswer.length > 200 ? "…" : null}{" "}
                  <em>{todayPickInfo.pick.doThisToday}</em>
                </>
              ) : (
                <>
                  Five minutes with your tea, before the day starts asking things of you.{" "}
                  <em>Subscribe and try one this week.</em>
                </>
              )}
            </div>
            <div className="share__bubble-meta">
              <span>🌞</span>
              <span>9:14 AM</span>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="news">
        <div className="news__inner">
          <div className="news__icon" aria-hidden>
            ✉
          </div>
          <h2 className="news__h2">{homepage.newsletterTitle}</h2>
          <p className="news__p">{homepage.newsletterBody}</p>
          <form
            className="news__form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe to the daily read"
          >
            <input
              className="news__input"
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
            />
            <button className="news__btn" type="submit">
              Subscribe
            </button>
          </form>
          <div className="news__small">{homepage.newsletterSmallprint}</div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <div className="foot__inner">
            <div>
              <div className="foot__brand-row">
                <span className="nav__mark">
                  <span className="nav__sun" />
                </span>
                <span className="foot__site">mapmygenes.life</span>
              </div>
              <p className="foot__tag">{homepage.footerMission}</p>
            </div>
            <div>
              <div className="foot__col-h">The week</div>
              <ul className="foot__col-list">
                {themes.map((t) => (
                  <li key={t.slug}>
                    <Link className="foot__col-link" href={`/library?theme=${t.slug}`}>
                      {t.day} · {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="foot__col-h">Library</div>
              <ul className="foot__col-list">
                <li>
                  <Link className="foot__col-link" href="/library">
                    All reads
                  </Link>
                </li>
                {reads.slice(0, 4).map((r) => (
                  <li key={r.slug}>
                    <Link className="foot__col-link" href={`/reads/${r.slug}`}>
                      {r.title.length > 40 ? r.title.slice(0, 40) + "…" : r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="foot__col-h">About</div>
              <ul className="foot__col-list">
                <li>
                  <a className="foot__col-link" href="#newsletter">
                    Newsletter
                  </a>
                </li>
                <li>
                  <Link className="foot__col-link" href="/studio">
                    Studio
                  </Link>
                </li>
                <li>
                  <a className="foot__col-link" href="#rhythm">
                    The weekly rhythm
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="foot__bottom">
            <div className="foot__copy">
              © {new Date().getFullYear()} mapmygenes.life · Free, ad-free, curated for accuracy.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
