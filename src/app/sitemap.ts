import type { MetadataRoute } from "next";
import { site } from "@/lib/bakery";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site }];
}
