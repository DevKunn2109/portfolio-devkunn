import type { Metadata } from "next";
import type { ReactNode } from "react";
import { bakery, site } from "@/lib/bakery";
import "./globals.css";

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
  return <html lang="vi"><body>{children}</body></html>;
}
