import Image from "next/image";
import Link from "next/link";
import { WholesaleForm } from "@/components/wholesale-form";
import { bakery, site } from "@/lib/bakery";

const call = `tel:+84${bakery.phone.slice(1)}`;
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: bakery.name,
  url: site,
  telephone: call.slice(4),
  sameAs: [bakery.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: "398 Nguyễn Văn Cừ nối dài, Tân An, Ninh Kiều",
    addressLocality: "Cần Thơ",
    addressCountry: "VN",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="skip" href="#noi-dung">Đến nội dung chính</a>
      <div className="topline"><div className="shell"><span>Cần Thơ · Pleiku</span><a href={call}>Hotline {bakery.displayPhone}</a></div></div>
      <header className="header shell">
        <Link href="/" className="brand"><span className="mark" aria-hidden="true">MC</span><span>Minh Châu<small>Lò bánh sầu riêng</small></span></Link>
        <nav aria-label="Điều hướng chính">
          <a href="#banh">Bánh crepe</a>
          <a href="#chi-nhanh">Chi nhánh</a>
        </nav>
        <a className="button primary" href="#dat-si">Đặt bánh sỉ</a>
      </header>
      <main id="noi-dung">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Lò bánh Minh Châu</p>
            <h1 id="hero-title">Bánh crepe<br /><em>sầu riêng</em></h1>
            <p>Vỏ crepe mềm, nhân sầu riêng thơm béo. Ghé tiệm tại Cần Thơ, Pleiku hoặc liên hệ Minh Châu để đặt bánh.</p>
            <div className="actions"><a className="button primary" href="#banh">Khám phá bánh</a><a className="button outline" href="#dat-si">Hỏi giá sỉ</a></div>
          </div>
          <figure className="hero-photo">
            <Image src="/crepe-sau-rieng.webp" alt="Bánh crepe vàng gấp gọn, cắt đôi để lộ nhân sầu riêng" fill preload sizes="(max-width: 760px) 92vw, 56vw" />
            <figcaption>Ảnh minh họa</figcaption>
          </figure>
        </section>
        <section id="banh" className="product">
          <div className="shell product-grid">
            <div><p className="eyebrow">Bánh của Minh Châu</p><h2>Crepe sầu riêng</h2></div>
            <div><p>Lớp vỏ crepe mỏng ôm phần nhân sầu riêng. Bạn có thể nhắn tiệm để hỏi bánh đang có, quy cách hộp, giá và cách nhận bánh trong ngày.</p>
              <div className="actions"><a className="button primary" href={bakery.zalo}>Hỏi mua qua Zalo</a><a className="button outline" href="#chi-nhanh">Tìm chi nhánh</a></div>
            </div>
          </div>
        </section>
        <section id="dat-si" className="wholesale">
          <div className="shell wholesale-grid">
            <div><p className="eyebrow">Dành cho cửa hàng và đơn số lượng lớn</p><h2>Đặt sỉ cùng<br />Minh Châu</h2>
              <p>Cho tiệm biết bạn cần bao nhiêu bánh, nhận ở đâu và khi nào để trao đổi mức giá, số lượng và lịch giao phù hợp.</p>
              <ol><li>Soạn nhu cầu đặt sỉ.</li><li>Sao chép tin và gửi qua Zalo hoặc Facebook.</li><li>Trao đổi với tiệm để chốt đơn.</li></ol>
              <a className="button phone" href={call}>Gọi {bakery.displayPhone}</a>
            </div>
            <WholesaleForm />
          </div>
        </section>
        <section id="chi-nhanh" className="branches shell">
          <h2>Ghé lò bánh</h2>
          <div className="branch-grid">{bakery.branches.map(({ city, address }) => (
            <article key={city}><h3>{city}</h3><p>{address}</p><a className="button outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>Tìm trên bản đồ</a></article>
          ))}</div>
        </section>
      </main>
      <footer><div className="shell footer"><p>{bakery.name}</p><div><a href={bakery.zalo}>Zalo</a><a href={bakery.facebook}>Facebook</a><a href={call}>{bakery.displayPhone}</a></div></div></footer>
    </>
  );
}
