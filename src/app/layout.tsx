import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { bakery, site } from "@/lib/bakery";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin", "vietnamese"], weight: ["600", "700"], variable: "--bakery-display" });
const body = Be_Vietnam_Pro({ subsets: ["latin", "vietnamese"], weight: ["400", "600", "700"], variable: "--bakery-body" });

const title = "Bánh crepe sầu riêng Minh Châu | Cần Thơ & Pleiku";
const description = "Khám phá bánh crepe sầu riêng Minh Châu, tìm chi nhánh tại Cần Thơ và Pleiku, liên hệ đặt bánh và hỏi giá sỉ qua Zalo, Facebook hoặc 0385 365 123.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName: bakery.name,
    url: "/",
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/crepe-sau-rieng.webp", alt: "Ảnh minh họa bánh crepe sầu riêng" }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="vi" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
