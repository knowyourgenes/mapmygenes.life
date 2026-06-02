"use client";

import Link from "next/link";
import { useTodayPick } from "./todaySection";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Today", href: "/#today" },
  { label: "The week", href: "/#rhythm" },
  { label: "Library", href: "/library" },
  { label: "Newsletter", href: "/#newsletter" },
];

export default function SiteNav({ ctaLabel = "Read today's" }: { ctaLabel?: string }) {
  // Resolves the current day's pick the same way TodaySection does — both
  // share localStorage, so the CTA always points at the user's actual pick
  // for the day. Falls back to the homepage anchor before hydration.
  const resolved = useTodayPick();
  const ctaHref = resolved?.pick.linkSlug ? `/reads/${resolved.pick.linkSlug}` : "/#today";

  return (
    <nav className="nav">
      <div className="nav__inner">
        <Link href="/" className="nav__brand" aria-label="mapmygenes.life">
          <span className="nav__mark">
            <span className="nav__sun" />
          </span>
          <span className="nav__wordmark">
            <span className="nav__site">mapmygenes</span>
            <span className="nav__tld">.life</span>
          </span>
        </Link>
        <div className="nav__links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link className="nav__cta" href={ctaHref}>
          {ctaLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </nav>
  );
}
