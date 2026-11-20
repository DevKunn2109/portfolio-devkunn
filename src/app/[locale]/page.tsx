import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { getHomeContent } from "@/content/home";
import { isLocale } from "@/lib/i18n";

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} content={getHomeContent(locale)} />;
}
