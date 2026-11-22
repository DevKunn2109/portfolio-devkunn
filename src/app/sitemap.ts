import type { MetadataRoute } from "next";
import { site } from "@/lib/bakery";
import { publicEntries } from "@/lib/store-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await publicEntries();
  return [{ url: site }, ...entries.filter((entry) => entry.kind === "article").map((entry) => ({ url: `${site}/so-tay/${entry.slug}` }))];
}
