import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReadView from "../../../components/readView";
import { getReadBySlug, getReadSlugs } from "../../../sanity/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getReadSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/reads/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const read = await getReadBySlug(slug);
  if (!read) return { title: "Read not found · mapmygenes.life" };
  return {
    title: `${read.title} · mapmygenes.life`,
    description: read.shortAnswer,
    openGraph: {
      title: read.title,
      description: read.shortAnswer,
      type: "article",
    },
  };
}

export default async function ReadPage(props: PageProps<"/reads/[slug]">) {
  const { slug } = await props.params;
  const read = await getReadBySlug(slug);
  if (!read) notFound();
  return <ReadView read={read} />;
}
