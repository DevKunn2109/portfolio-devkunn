"use server";

import { inquiriesEnabled, storeRequest } from "@/lib/store-data";

type Draft = { message: string; status: string };

export async function prepareWholesaleDraft(_previous: Draft, data: FormData): Promise<Draft> {
  const quantity = Number(data.get("quantity"));
  const area = String(data.get("area") ?? "").trim();
  const date = String(data.get("date") ?? "");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100000 || !area || area.length > 120) {
    return { message: "", status: "Vui lòng kiểm tra số lượng và khu vực nhận bánh." };
  }
  const delivery = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? ` Dự kiến nhận ngày ${date.split("-").reverse().join("/")}.`
    : "";
  const phone = String(data.get("phone") ?? "").trim();
  let saved = false;
  let saveFailed = false;
  if (phone && inquiriesEnabled && !data.get("website")) {
    const id = String(data.get("reference") ?? "");
    if (!/^0\d{9}$/.test(phone) || !/^[0-9a-f-]{36}$/i.test(id)) {
      return { message: "", status: "Vui lòng kiểm tra số điện thoại hoặc tải lại trang." };
    }
    try {
      const response = await storeRequest("bakery_inquiries?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify({ id, phone, quantity, area, delivery_date: delivery ? date : null }),
      });
      saved = response.ok;
      saveFailed = !saved;
    } catch {
      saveFailed = true;
    }
  }
  return {
    message: `Chào Lò bánh Minh Châu, mình muốn hỏi giá sỉ bánh crepe sầu riêng. Số lượng dự kiến: ${quantity} bánh. Khu vực nhận: ${area}.${delivery} Cho mình xin báo giá và cách giao nhận nhé!`,
    status: saved ? "Tiệm đã nhận yêu cầu liên hệ. Bạn cũng có thể sao chép tin để nhắn trực tiếp."
      : saveFailed ? "Chưa lưu được yêu cầu. Bạn vẫn có thể sao chép tin để gửi qua Zalo hoặc Facebook."
      : "Đã soạn tin. Bạn có thể sao chép, rồi dán vào Zalo hoặc Facebook.",
  };
}
