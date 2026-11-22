import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, adminSession } from "@/lib/admin-auth";
import { storeRequest } from "@/lib/store-data";
import { groups, initialEntries, type Entry, type Kind } from "@/lib/storefront";
import { handleInquiry, saveEntry, signIn, signOut } from "./actions";

export const metadata: Metadata = { title: "Quản trị Minh Châu", robots: { index: false, follow: false } };

const tabs = { product: "Sản phẩm", slide: "Slide ảnh / video", article: "Bài viết", inquiries: "Yêu cầu sỉ" };
const notices: Record<string, string> = { login: "Không đăng nhập được. Kiểm tra tài khoản và quyền quản trị.", saved: "Đã lưu cập nhật.", invalid: "Dữ liệu chưa hợp lệ.", error: "Không lưu được. Vui lòng thử lại." };
type Inquiry = { id: string; quantity: number; area: string; phone: string; delivery_date: string | null; status: string; created_at: string };

async function loadRows<T>(path: string): Promise<T[] | null> {
  try {
    const response = await storeRequest(path);
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

function Editor({ kind, entry, preview }: { kind: Kind; entry?: Entry; preview: boolean }) {
  return <form action={saveEntry}><fieldset className="admin-form" disabled={preview}>
    <input name="kind" type="hidden" value={kind} />
    <input name="editing" type="hidden" value={String(Boolean(entry))} />
    <label>Mã URL<input name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={entry?.slug} readOnly={Boolean(entry)} maxLength={100} required /></label>
    <label>Tiêu đề<input name="title" defaultValue={entry?.title.replaceAll("\n", " ")} required maxLength={160} /></label>
    <label>Mô tả<textarea name="summary" defaultValue={entry?.summary} maxLength={450} /></label>
    <label>Đường dẫn ảnh / poster<input name="image" defaultValue={entry?.image} placeholder="/crepe-sau-rieng.webp" /></label>
    {kind === "slide" && <label>Link video MP4 (tùy chọn)<input name="video" defaultValue={entry?.video} placeholder="https://…" /></label>}
    {kind === "product" && <>
      <label>Nhóm hiển thị<select name="group" defaultValue={entry?.group ?? ""}><option value="">Thực đơn</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}</select></label>
      <label>Giá (VNĐ)<input name="price" type="number" min={0} max={100000000} defaultValue={entry?.price ?? ""} /></label>
    </>}
    {kind === "article" && <label>Nội dung bài viết<textarea name="body" rows={8} defaultValue={entry?.body} maxLength={15000} required /></label>}
    <label>Thứ tự<input name="position" type="number" defaultValue={entry?.position ?? 0} min={-1000} max={1000} /></label>
    <label className="check"><input name="published" type="checkbox" defaultChecked={entry?.published ?? false} /> Xuất bản</label>
    <button className="button primary">Lưu nội dung</button>
  </fieldset></form>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string; notice?: string }> }) {
  const { tab: requested, notice } = await searchParams;
  const tab = requested && Object.hasOwn(tabs, requested) ? requested as keyof typeof tabs : "product";
  const allowed = await adminSession();
  const preview = !adminConfigured;
  const entries = preview ? initialEntries.filter((entry) => entry.kind === tab) :
    allowed && tab !== "inquiries" ? await loadRows<Entry>(`bakery_content?kind=eq.${tab}&order=position.asc,slug.asc&limit=200`) : [];
  const inquiries = allowed && tab === "inquiries" ? await loadRows<Inquiry>("bakery_inquiries?order=created_at.desc&limit=100") : [];
  return <main className="admin shell">
    <header><div><p className="eyebrow">Lò bánh Minh Châu</p><h1>Quản trị</h1></div><Link href="/">Xem cửa hàng</Link></header>
    {notice && Object.hasOwn(notices, notice) && <p className="admin-notice" role="status">{notices[notice]}</p>}
    {preview && <p className="admin-notice">Đang xem trước giao diện quản trị bằng dữ liệu mẫu. Cần kết nối cơ sở dữ liệu và tài khoản chủ tiệm để lưu thay đổi.</p>}
    {adminConfigured && !allowed ? <form action={signIn} className="admin-form login">
        <h2>Đăng nhập</h2>
        <label>Email<input name="email" type="email" autoComplete="username" required /></label>
        <label>Mật khẩu<input name="password" type="password" autoComplete="current-password" required /></label>
        <button className="button primary">Đăng nhập</button>
      </form> : <>
        <div className="admin-toolbar"><nav aria-label="Các mục quản trị">
          {Object.entries(tabs).map(([key, label]) => <Link key={key} aria-current={key === tab ? "page" : undefined} href={`/admin?tab=${key}`}>{label}</Link>)}
        </nav>{!preview && <form action={signOut}><button className="button outline">Đăng xuất</button></form>}</div>
        <h2>{tabs[tab]}</h2>
        {tab === "inquiries" ? !inquiries ? <p>Không tải được phiếu hỏi sỉ.</p> : inquiries.length ? <div className="inquiries">{inquiries.map((entry) => <article key={entry.id}>
          <h3>{entry.quantity} bánh · {entry.area}</h3>
          <p>{entry.delivery_date ? `Ngày nhận ${entry.delivery_date} · ` : ""}{entry.status === "new" ? "Chờ liên hệ" : "Đã xử lý"}</p>
          <a href={`tel:${entry.phone}`}>{entry.phone}</a>
          {entry.status === "new" && <form action={handleInquiry}><input type="hidden" name="id" value={entry.id} /><button className="button outline">Đánh dấu đã xử lý</button></form>}
        </article>)}</div> : <p>Chưa có yêu cầu.</p> : !entries ? <p>Không tải được nội dung.</p> : <div className="admin-editors">
          <details><summary>Thêm nội dung</summary><Editor kind={tab} preview={preview} /></details>
          {entries.map((entry) => <details key={entry.slug}><summary>{entry.title} · {entry.published ? "Đang hiển thị" : "Bản nháp"}</summary><Editor kind={tab} entry={entry} preview={preview} /></details>)}
        </div>}
      </>}
  </main>;
}
