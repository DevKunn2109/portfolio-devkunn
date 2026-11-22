"use client";

import { useActionState, useState } from "react";
import { prepareWholesaleDraft } from "@/app/wholesale-action";
import { bakery } from "@/lib/bakery";

export function WholesaleForm() {
  const [draft, formAction, pending] = useActionState(prepareWholesaleDraft, { message: "", status: "" });
  const [copyStatus, setCopyStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft.message);
      setCopyStatus("Đã sao chép tin nhắn.");
    } catch {
      setCopyStatus("Bạn có thể chọn và sao chép nội dung trong ô tin nhắn.");
    }
  }

  return (
    <div className="order-card">
      <h3>Soạn tin hỏi giá sỉ</h3>
      <form action={formAction} onChange={() => setCopyStatus("")}>
        <label>Số lượng dự kiến (bánh)<input name="quantity" type="number" min="1" max="100000" required placeholder="Ví dụ: 50" /></label>
        <label>Khu vực nhận bánh<input name="area" required pattern=".*\S.*" maxLength={120} placeholder="Ví dụ: Ninh Kiều, Cần Thơ" /></label>
        <label>Ngày cần bánh <span>(không bắt buộc)</span><input name="date" type="date" /></label>
        <button className="button primary" type="submit" disabled={pending}>{pending ? "Đang soạn tin…" : "Soạn tin nhắn"}</button>
      </form>
      {draft.message && <div className="draft"><label>Tin nhắn của bạn<textarea readOnly value={draft.message} rows={5} /></label><button className="button outline" type="button" onClick={copy}>Sao chép tin</button></div>}
      <p className="status" role="status">{copyStatus || draft.status}</p>
      <div className="channels">
        <a className="button outline" href={bakery.zalo}>Mở Zalo</a>
        <a className="button outline" href={bakery.facebook}>Mở Facebook</a>
      </div>
    </div>
  );
}
