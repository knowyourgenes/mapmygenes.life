"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  WEEKDAY_KEYS,
  WEEKDAY_LABELS,
  dailyQuestions,
  type DailyEntry,
} from "../data/dailyQuestions";

const STORAGE_PREFIX = "mmgl:today-pick";
const REFRESH_EVENT = "mmgl-todaypick";

function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function longDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function pruneOldKeys(currentKey: string): void {
  try {
    const toDrop: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(`${STORAGE_PREFIX}:`) && k !== currentKey) {
        toDrop.push(k);
      }
    }
    for (const k of toDrop) window.localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

// useSyncExternalStore wiring - reads the stored pick id from localStorage and
// re-renders on cross-tab `storage` events or our same-tab REFRESH_EVENT.
function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(REFRESH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(REFRESH_EVENT, callback);
  };
}

function makeGetSnapshot(key: string): () => string | null {
  return () => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };
}

const getServerSnapshot = (): string | null => null;

export type Resolved = {
  pick: DailyEntry;
  weekdayLabel: string;
  longDateLabel: string;
  source: "stored" | "fresh";
};

/**
 * Resolves today's pick from data.ts + localStorage. Returns null until the
 * client has hydrated and either restored a stored pick or written a fresh one.
 */
export function useTodayPick(): Resolved | null {
  // Capture the mount-time date once so the displayed weekday/date are stable.
  const [now] = useState<Date>(() => new Date());

  const dayContext = useMemo(() => {
    const dayIdx = now.getDay();
    const wkKey = WEEKDAY_KEYS[dayIdx];
    const pool = dailyQuestions[wkKey] ?? [];
    const storageKey = `${STORAGE_PREFIX}:${localDateKey(now)}`;
    return {
      pool,
      storageKey,
      weekdayLabel: WEEKDAY_LABELS[wkKey],
      longDateLabel: longDate(now),
    };
  }, [now]);

  const getSnapshot = useMemo(
    () => makeGetSnapshot(dayContext.storageKey),
    [dayContext.storageKey],
  );

  const storedId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // If localStorage has nothing valid for today, pick a fresh entry and persist
  // it. This is a write to an external system, not a React setState - the
  // subscription above will re-render with the new value.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pool, storageKey } = dayContext;
    if (pool.length === 0) return;
    const isStoredValid = storedId && pool.some((p) => p.id === storedId);
    if (isStoredValid) {
      pruneOldKeys(storageKey);
      return;
    }
    const fresh = pool[Math.floor(Math.random() * pool.length)];
    try {
      window.localStorage.setItem(storageKey, fresh.id);
      pruneOldKeys(storageKey);
      window.dispatchEvent(new Event(REFRESH_EVENT));
    } catch {
      // localStorage disabled - fall through; nothing renders.
    }
  }, [dayContext, storedId]);

  return useMemo<Resolved | null>(() => {
    const { pool, weekdayLabel, longDateLabel } = dayContext;
    if (!storedId) return null;
    const pick = pool.find((p) => p.id === storedId);
    if (!pick) return null;
    return { pick, weekdayLabel, longDateLabel, source: "stored" };
  }, [storedId, dayContext]);
}

export type TodaySectionProps = {
  onPick?: (info: Resolved) => void;
};

export default function TodaySection({ onPick }: TodaySectionProps) {
  const resolved = useTodayPick();

  const notify = useCallback(() => {
    if (resolved && onPick) onPick(resolved);
  }, [resolved, onPick]);
  useEffect(notify, [notify]);

  if (!resolved) {
    return <TodaySkeleton />;
  }

  const { pick, weekdayLabel, longDateLabel } = resolved;
  const shareText = `${pick.shortAnswer} - via mapmygenes.life`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const openHref = pick.linkSlug ? `/reads/${pick.linkSlug}` : "/library";

  return (
    <section id="today" className="today">
      <div className="wrap">
        <div className="today__label">
          <span>Today&apos;s read</span>
          <span className="today__label-line" />
          <span>
            {weekdayLabel}, {longDateLabel} · {pick.theme}
          </span>
        </div>
        <article className="today__card">
          <div className="today__theme">
            <span>
              {weekdayLabel} · {pick.theme}
            </span>
          </div>
          <h2 className="today__h2">{pick.question}</h2>
          <p className="today__answer">
            <strong>{pick.shortAnswer}</strong>
          </p>
          {pick.body.map((p, i) => (
            <p key={i} className="today__body">
              {p}
            </p>
          ))}
          <div className="today__do">
            <span className="today__do-label">Do this today</span>
            <span className="today__do-text">{pick.doThisToday}</span>
          </div>
          <div className="today__footer">
            <div className="today__genes">
              Genes in play:{" "}
              {pick.genesInPlay.map((g, i) => (
                <span key={g}>
                  {g}
                  {i < pick.genesInPlay.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
            <div className="today__cta-row">
              <Link className="today__open" href={openHref}>
                {pick.linkSlug ? "Open full read" : "Browse the library"}
                <span aria-hidden>→</span>
              </Link>
              <a
                className="today__share"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <span aria-hidden>✓</span>
                Send on WhatsApp
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function TodaySkeleton() {
  return (
    <section id="today" className="today" aria-busy="true">
      <div className="wrap">
        <div className="today__label">
          <span>Today&apos;s read</span>
          <span className="today__label-line" />
          <span className="today__skeleton-pill" />
        </div>
        <article className="today__card today__card--loading">
          <div className="today__skeleton-chip" />
          <div className="today__skeleton-bar today__skeleton-bar--title" />
          <div className="today__skeleton-bar today__skeleton-bar--title-short" />
          <div className="today__skeleton-bar today__skeleton-bar--answer" />
          <div className="today__skeleton-bar today__skeleton-bar--text" />
          <div className="today__skeleton-bar today__skeleton-bar--text" />
          <div className="today__skeleton-bar today__skeleton-bar--text-short" />
          <div className="today__skeleton-do" />
        </article>
      </div>
    </section>
  );
}
