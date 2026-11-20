import Link from "next/link";
import type { HomeContent } from "@/content/home";
import { otherLocale, type Locale } from "@/lib/i18n";

export function SiteHeader({ locale, content }: { locale: Locale; content: HomeContent }) {
  const alternate = otherLocale(locale);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={`/${locale}`} aria-label={`${content.brand} — home`}>
          <span className="brand-mark" aria-hidden="true">DK</span>
          <span>{content.brand}</span>
        </Link>
        <nav aria-label={locale === "vi" ? "Điều hướng chính" : "Primary navigation"}>
          <a href="#projects">{content.nav.work}</a>
          <a href="#services">{content.nav.services}</a>
          <a href="#about">{content.nav.about}</a>
          <a href="#contact">{content.nav.contact}</a>
        </nav>
        <Link className="locale-link" href={`/${alternate}`} hrefLang={alternate} lang={alternate}>
          {content.localeLabel}
        </Link>
      </div>
    </header>
  );
}
