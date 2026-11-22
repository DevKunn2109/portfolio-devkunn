export type Kind = "product" | "slide" | "article";

export type Entry = {
  kind: Kind;
  slug: string;
  title: string;
  summary: string;
  image: string;
  video: string;
  group: string;
  price: number | null;
  body: string;
  published: boolean;
  position: number;
};

export const groups = [
  { id: "sale", title: "Ưu đãi" },
  { id: "bestseller", title: "Bán chạy hôm nay" },
  { id: "new", title: "Món mới" },
] as const;

const base = { image: "/crepe-sau-rieng.webp", video: "", group: "", price: null, body: "", published: true, position: 0 };

export const initialEntries: Entry[] = [
  { ...base, kind: "slide", slug: "crepe-sau-rieng", title: "Bánh crepe\nsầu riêng", summary: "Vỏ crepe mềm, nhân sầu riêng thơm béo. Tìm bánh Minh Châu tại Cần Thơ và Pleiku." },
  { ...base, kind: "slide", slug: "dat-banh-si", title: "Đặt bánh sỉ\ncùng Minh Châu", summary: "Trao đổi số lượng, ngày nhận và khu vực giao bánh với tiệm.", image: "/can-bep.webp", position: 1 },
  { ...base, kind: "product", slug: "crepe-sau-rieng", title: "Crepe sầu riêng", summary: "Lớp vỏ crepe mỏng, mềm, ôm phần nhân sầu riêng." },
  { ...base, kind: "article", slug: "dat-banh-crepe-sau-rieng-theo-so-luong", title: "Đặt bánh crepe sầu riêng theo số lượng cần chuẩn bị gì?", summary: "Ba thông tin giúp tiệm tư vấn quy cách hộp, giá và lịch nhận bánh.", body: "Hãy ước tính số bánh bạn cần và cho tiệm biết bánh được dùng cho cửa hàng, sự kiện hay buổi gặp mặt. Quy cách hộp và số lượng nên được thống nhất trước.\n\nCung cấp ngày dự kiến nhận và khu vực giao để tiệm kiểm tra lịch. Với đơn nhiều bánh, bạn có thể hỏi về thời điểm nên đặt trước và cách bảo quản phù hợp.\n\nSau khi gửi yêu cầu qua Zalo hoặc Facebook, chờ tiệm xác nhận tổng số lượng, giá và lịch nhận trước khi chốt đơn." },
];
