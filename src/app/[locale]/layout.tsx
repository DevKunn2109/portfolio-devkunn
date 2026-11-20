import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Manrope, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin", "vietnamese"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-jetbrains" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const isVi = locale === "vi";
  return {
    title: isVi ? "Tên của bạn — Web Developer" : "Your name — Web Developer",
    description: isVi ? "Portfolio Web Developer thiên về backend, sử dụng TypeScript, Next.js và Node.js." : "Portfolio of a backend-focused Web Developer working with TypeScript, Next.js and Node.js.",
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}`, languages: { vi: "/vi", en: "/en" } },
  };
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale}><body className={`${manrope.variable} ${playfair.variable} ${jetbrains.variable}`}>{children}</body></html>;
}
