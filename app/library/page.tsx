import type { Metadata } from "next";
import LibraryView from "../../components/libraryView";
import { getHomepageData, getReadsByTheme, getThemes } from "../../sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "The library · mapmygenes.life",
  description:
    "Every read, organised by the rhythm of your week. Each one is self-contained, shareable, and written for South Asian biology.",
};

export default async function LibraryPage(props: PageProps<"/library">) {
  const sp = await props.searchParams;
  const themeRaw = sp.theme;
  const activeThemeSlug = Array.isArray(themeRaw) ? themeRaw[0] : themeRaw || null;

  if (activeThemeSlug) {
    const [reads, themes] = await Promise.all([getReadsByTheme(activeThemeSlug), getThemes()]);
    return <LibraryView reads={reads} themes={themes} activeThemeSlug={activeThemeSlug} />;
  }

  const { reads, themes } = await getHomepageData();
  return <LibraryView reads={reads} themes={themes} activeThemeSlug={null} />;
}
