import Image from "next/image";
import Link from "next/link";
import { WholesaleForm } from "@/components/wholesale-form";
import { bakery, site } from "@/lib/bakery";
import { StoreHero, WholesalePopup } from "@/components/storefront-interactions";
import { inquiriesEnabled, publicEntries } from "@/lib/store-data";
import { groups, initialEntries } from "@/lib/storefront";

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

export default async function HomePage() {
  const entries = await publicEntries();
  const products = entries.filter((entry) => entry.kind === "product");
  const articles = entries.filter((entry) => entry.kind === "article");
  const slides = entries.filter((entry) => entry.kind === "slide");
  const shelves = [{ id: "", title: "Bánh của Minh Châu" }, ...groups];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="skip" href="#noi-dung">Đến nội dung chính</a>
      <div className="topline"><div className="shell"><span>Cần Thơ · Pleiku</span><a href={call}>Hotline {bakery.displayPhone}</a></div></div>
      <header className="header shell">
        <Link href="/" className="brand"><span className="mark" aria-hidden="true">MC</span><span>Minh Châu<small>Lò bánh sầu riêng</small></span></Link>
        <nav aria-label="Điều hướng chính">
          <a href="#banh">Bánh crepe</a>
          <a href="#can-bep">Căn bếp</a>
          <a href="#so-tay">Sổ tay</a>
          <a href="#chi-nhanh">Chi nhánh</a>
        </nav>
        <WholesalePopup ready={inquiriesEnabled} />
      </header>
      <main id="noi-dung">
        <StoreHero slides={slides.length ? slides : initialEntries.filter((entry) => entry.kind === "slide")} searchable={[...products, ...articles]} />
        <section id="banh" className="catalog shell">
          <p className="eyebrow">Thực đơn</p><h2>Chọn bánh bạn thích</h2>
          <div className="shelves">{shelves.map((group) => {
            const items = products.filter((entry) => entry.group === group.id);
            if (!items.length && group.id === "") return null;
            return <section key={group.id} className={group.id ? "shelf" : "shelf shelf-featured"}>
              <h3>{group.title}</h3>
              {items.length ? <div className="shelf-grid">{items.map((item) => <article className="product-card" id={`banh-${item.slug}`} key={item.slug}>
                <div className="card-photo"><Image src={item.image || "/crepe-sau-rieng.webp"} alt={item.title} fill sizes="(max-width: 650px) 92vw, 340px" unoptimized={item.image.startsWith("https://")} /></div>
                <div className="card-copy"><h4>{item.title}</h4><p>{item.summary}</p><p className="price">{item.price === null ? "Liên hệ để hỏi giá" : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}</p><a href={bakery.zalo}>Hỏi mua qua Zalo</a></div>
              </article>)}</div> : <p className="empty-note">Tiệm sẽ cập nhật khi có thông tin.</p>}
            </section>;
          })}</div>
        </section>
        <section id="can-bep" className="kitchen">
          <div className="shell kitchen-grid">
            <figure className="kitchen-photo"><Image src="/can-bep.webp" alt="Ảnh minh họa thao tác gấp bánh crepe" fill sizes="(max-width: 760px) 92vw, 50vw" /><figcaption>Ảnh minh họa</figcaption></figure>
            <div><p className="eyebrow">Từ căn bếp</p><h2>Từ vỏ bánh đến nhân sầu riêng</h2>
              <dl><dt>Tráng vỏ crepe</dt><dd>Lớp vỏ mỏng giúp bánh mềm và dễ gấp.</dd><dt>Chuẩn bị nhân</dt><dd>Sầu riêng tạo vị thơm béo đặc trưng. Hỏi tiệm về thành phần nếu bạn có dị ứng thực phẩm.</dd><dt>Gấp và đóng hộp</dt><dd>Nhân được gói trong vỏ crepe. Tiệm sẽ tư vấn cách nhận và bảo quản khi đặt bánh.</dd></dl>
            </div>
          </div>
        </section>
        <section id="so-tay" className="journal shell"><p className="eyebrow">Sổ tay Minh Châu</p><h2>Chuyện bánh và cách đặt</h2>
          {articles.map((entry) => <article key={entry.slug}><h3><Link href={`/so-tay/${entry.slug}`}>{entry.title}</Link></h3><p>{entry.summary}</p></article>)}
        </section>
        <section id="dat-si" className="wholesale">
          <div className="shell wholesale-grid">
            <div><p className="eyebrow">Dành cho cửa hàng và đơn số lượng lớn</p><h2>Đặt sỉ cùng<br />Minh Châu</h2>
              <p>Cho tiệm biết bạn cần bao nhiêu bánh, nhận ở đâu và khi nào để trao đổi mức giá, số lượng và lịch giao phù hợp.</p>
              <ol><li>Soạn nhu cầu đặt sỉ.</li><li>Sao chép tin và gửi qua Zalo hoặc Facebook.</li><li>Trao đổi với tiệm để chốt đơn.</li></ol>
              <a className="button phone" href={call}>Gọi {bakery.displayPhone}</a>
            </div>
            <WholesaleForm ready={inquiriesEnabled} />
          </div>
        </section>
        <section id="chi-nhanh" className="branches shell">
          <h2>Ghé lò bánh</h2>
          <div className="branch-grid">{bakery.branches.map(({ city, address }) => (
            <article key={city}><h3>{city}</h3><p>{address}</p><a className="button outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>Tìm trên bản đồ</a></article>
          ))}</div>
        </section>
      </main>
      <footer className="store-footer"><div className="shell footer-grid">
        <div><p className="footer-brand">{bakery.name}</p><p>Cần Thơ · Pleiku</p></div>
        <div><h2>Khám phá</h2><a href="#banh">Thực đơn</a><a href="#so-tay">Sổ tay</a><a href="#chi-nhanh">Chi nhánh</a></div>
        <div><h2>Liên hệ đặt bánh</h2><a href={call}>{bakery.displayPhone}</a><a href={bakery.zalo}>Zalo</a><a href={bakery.facebook}>Facebook</a></div>
      </div></footer>
    </>
  );
}
