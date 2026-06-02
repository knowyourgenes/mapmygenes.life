/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env vars (in .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN     (must have Editor permissions - used for both reads and writes)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { categoryChips, homepageContent, reads, themes } from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const candidates = [".env.local", ".env"];
    for (const file of candidates) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const raw of lines) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Wipe existing dailyRead docs so renamed slugs don't linger.
  const oldReadIds = await client.fetch<string[]>(`*[_type == "dailyRead"]._id`);
  if (oldReadIds.length > 0) {
    console.log(`Deleting ${oldReadIds.length} existing dailyRead docs.`);
  }

  const tx = client.transaction();
  for (const id of oldReadIds) tx.delete(id);

  // Homepage singleton - stable ID so re-runs replace cleanly.
  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  // Themes
  for (const t of themes) {
    tx.createOrReplace({
      _id: `theme.${t.slug}`,
      _type: "theme",
      name: t.name,
      slug: { _type: "slug", current: t.slug },
      day: t.day,
      shortDay: t.shortDay,
      tagline: t.tagline,
      accentColor: t.accentColor,
      icon: t.icon,
      order: t.order,
    });
  }

  // Category chips
  for (const c of categoryChips) {
    tx.createOrReplace({
      _id: `chip.${c.slug}`,
      _type: "categoryChip",
      label: c.label,
      slug: { _type: "slug", current: c.slug },
      themeSlug: c.themeSlug ?? undefined,
      order: c.order,
    });
  }

  // Daily reads
  reads.forEach((r) => {
    tx.createOrReplace({
      _id: `dailyRead.${r.slug}`,
      _type: "dailyRead",
      title: r.title,
      slug: { _type: "slug", current: r.slug },
      theme: { _type: "reference", _ref: `theme.${r.themeSlug}` },
      week: r.week,
      shortAnswer: r.shortAnswer,
      body: paragraphsToBlocks(r.body),
      genesInPlay: r.genesInPlay,
      doThisToday: r.doThisToday,
      readTimeMinutes: r.readTimeMinutes,
      publishedAt: r.publishedAt,
      featured: r.featured,
    });
  });

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
