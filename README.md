# Lò bánh sầu riêng Minh Châu

Website giới thiệu bánh crepe sầu riêng và kết nối khách hỏi giá sỉ. Dùng Next.js App Router, React và TypeScript.

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
