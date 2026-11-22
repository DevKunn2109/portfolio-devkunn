# Lò bánh sầu riêng Minh Châu

Website giới thiệu bánh crepe sầu riêng và kết nối khách hỏi giá sỉ. Dùng Next.js App Router, React và TypeScript.

Xem [kiến trúc storefront, SEO và quản trị](ARCHITECTURE.md).

## Kích hoạt quản trị

1. Tạo Supabase project cho cửa hàng hoặc xác nhận project riêng có thể dùng. Chạy migration `202611220001_bakery_store.sql`.
2. Tạo tài khoản nhân viên trong Supabase Auth. Thêm UUID của người được quản trị vào `BAKERY_ADMIN_IDS`, phân tách bằng dấu phẩy. Cấu hình các giá trị ở `.env.example` trong môi trường Vercel. Khóa bí mật chỉ dùng trên máy chủ.
3. Kiểm tra người chưa đăng nhập không đọc được phiếu sỉ và tài khoản được cấp quyền có thể lưu nội dung. Cấu hình giới hạn tần suất POST và thời hạn lưu phiếu trước khi bật `BAKERY_ENABLE_INQUIRIES=true`. Sau đó gửi thử để thấy trạng thái chờ liên hệ.
4. Vào `/admin` để cập nhật sản phẩm, bài viết và slide. Dùng ảnh hoặc MP4 qua HTTPS do cửa hàng kiểm soát. Các nhãn ưu đãi, bán chạy và món mới do tiệm cập nhật.

## Quy trình thiết kế

1. Xác định hai nhu cầu chính: xem bánh và tìm chi nhánh, hoặc hỏi báo giá cho đơn số lượng lớn.
2. Thiết kế luồng trang: ảnh bánh và lời giới thiệu → thông tin sản phẩm → soạn tin hỏi sỉ → chỉ đường đến cửa hàng.
3. Áp dụng nền kem, vàng sầu riêng, xanh lá, tiêu đề serif và chữ nội dung hệ thống. Ưu tiên tương phản, thao tác bằng bàn phím và bố cục một cột trên điện thoại.
4. Kiểm tra liên kết liên hệ, mẫu tin đặt sỉ, bố cục di động và metadata SEO trước khi phát hành.

## Vận hành nội dung

- Thay thông tin liên hệ và chi nhánh tại `src/lib/bakery.ts`. Facebook dùng ID fanpage được đối chiếu qua các danh bạ công khai. Zalo dùng số hotline được cung cấp và cần chủ tiệm xác nhận tài khoản thực nhận.
- Thay `public/crepe-sau-rieng.webp` bằng ảnh thật của tiệm khi có. Bản minh họa tạo bằng ImageGen với yêu cầu ảnh cận bánh crepe sầu riêng vàng cắt đôi trên đĩa gốm kem và ánh sáng tự nhiên.
- Biểu mẫu gửi dữ liệu đến ứng dụng để tạo bản nháp, không ghi cơ sở dữ liệu. Khách tự gửi tin qua kênh đã chọn và nhận xác nhận trực tiếp từ tiệm.
- SEO gồm tiêu đề, mô tả, canonical, Open Graph, dữ liệu có cấu trúc Bakery, robots và sitemap. Sửa domain trong `src/lib/bakery.ts` nếu đổi tên miền.

## Kiểm tra

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run dev
```
