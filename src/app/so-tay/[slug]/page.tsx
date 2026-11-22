import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { publicEntries } from "@/lib/store-data";

const article = cache(async (slug: string) => (await publicEntries()).find((entry) => entry.kind === "article" && entry.slug === slug));
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await article(slug);
  if (!entry) return {};
  const url = `/so-tay/${entry.slug}`;
  return { title: entry.title, description: entry.summary, alternates: { canonical: url }, openGraph: { title: entry.title, description: entry.summary, url, type: "article", images: entry.image ? [entry.image] : [] } };
}

export default async function ArticlePage({ params }: Props) {
  const entry = await article((await params).slug);
  if (!entry) notFound();
  return <main className="article-page shell">
    <Link href="/#so-tay">Sổ tay Minh Châu</Link>
    <h1>{entry.title}</h1><p className="article-summary">{entry.summary}</p>
    {entry.body.split(/\r?\n\s*\r?\n/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    <Link className="button primary" href="/#dat-si">Hỏi giá sỉ</Link>
  </main>;
}
