"use server";

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
  return {
    message: `Chào Lò bánh Minh Châu, mình muốn hỏi giá sỉ bánh crepe sầu riêng. Số lượng dự kiến: ${quantity} bánh. Khu vực nhận: ${area}.${delivery} Cho mình xin báo giá và cách giao nhận nhé!`,
    status: "Đã soạn tin. Bạn có thể sao chép, rồi dán vào Zalo hoặc Facebook.",
  };
}
