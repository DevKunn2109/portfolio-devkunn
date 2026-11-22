"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Entry } from "@/lib/storefront";
import { WholesaleForm } from "./wholesale-form";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/g, "d");
}

export function StoreHero({ slides, searchable }: { slides: Entry[]; searchable: Entry[] }) {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const slide = slides[index] ?? slides[0];
  const term = normalize(query.trim());
  const matches = term ? searchable.filter((entry) => normalize(entry.title + " " + entry.summary).includes(term)).slice(0, 8) : [];
  if (!slide) return null;

  return (
    <section className="store-hero shell" aria-label="Giới thiệu và tìm bánh">
      <div className="editorial-hero" aria-roledescription="trình chiếu">
        <div className="hero-media" key={slide.slug}>
          {slide.video ? <video controls playsInline preload="none" poster={slide.image} src={slide.video} aria-label={slide.title} /> :
            <Image src={slide.image || "/crepe-sau-rieng.webp"} alt={slide.image.startsWith("https://") ? slide.title : "Ảnh minh họa bánh sầu riêng Minh Châu"} fill sizes="(max-width: 760px) 95vw, 1200px" preload={index === 0} unoptimized={slide.image.startsWith("https://")} />}
        </div>
        {!slide.video && ["/crepe-sau-rieng.webp", "/can-bep.webp"].includes(slide.image) && <small className="media-caption">Ảnh minh họa</small>}
        <div className="editorial-copy" aria-live="polite">
          <p className="eyebrow">Lò bánh Minh Châu</p>
          <h1>{slide.title}</h1>
          <p>{slide.summary}</p>
          <a className="button honey" href="#banh">Xem thực đơn</a>
        </div>
        {slides.length > 1 && <div className="slide-controls">
          <button type="button" aria-label="Slide trước" onClick={() => setIndex((index + slides.length - 1) % slides.length)}>‹</button>
          <span>{index + 1} / {slides.length}</span>
          <button type="button" aria-label="Slide sau" onClick={() => setIndex((index + 1) % slides.length)}>›</button>
        </div>}
      </div>
      <div className="store-search" role="search">
        <label htmlFor="search-bakery">Tìm bánh và bài viết</label>
        <input id="search-bakery" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Thử tìm “crepe sầu riêng”" />
        {term && <div className="search-results" aria-live="polite">
          {matches.length ? <ul>{matches.map((entry) => <li key={entry.kind + entry.slug}>
            <Link href={entry.kind === "article" ? `/so-tay/${entry.slug}` : `/#banh-${entry.slug}`} onClick={() => setQuery("")}>{entry.title}</Link>
          </li>)}</ul> : <p>Chưa tìm thấy kết quả. Bạn thử một từ khóa khác nhé.</p>}
        </div>}
      </div>
    </section>
  );
}

export function WholesalePopup({ ready }: { ready: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className="button primary" type="button" onClick={() => dialog.current?.showModal()}>Đặt bánh sỉ</button>
    <dialog ref={dialog} className="wholesale-dialog" aria-labelledby="popup-title">
      <div className="dialog-heading"><h2 id="popup-title">Đặt bánh sỉ</h2><button type="button" className="button outline" onClick={() => dialog.current?.close()}>Đóng</button></div>
      <WholesaleForm ready={ready} />
    </dialog>
  </>;
}
