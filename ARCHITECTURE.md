# Kiến trúc website Minh Châu

| Khu vực | Luồng sử dụng | Nguồn dữ liệu |
| --- | --- | --- |
| Trang chủ | Slide ảnh/video → tìm bánh → xem nhóm nổi bật → mở form sỉ | Slide và danh mục đã xuất bản |
| Sổ tay bánh | Vào từ trang chủ hoặc tìm kiếm → đọc bài theo URL riêng | Bài viết đã xuất bản, metadata theo bài |
| Đặt sỉ | Nhập số lượng, nơi nhận, ngày nhận → nhận bản nháp → gửi qua kênh đã chọn | Ứng dụng soạn tin. Khách có thể yêu cầu lưu phiếu để tiệm theo dõi |
| Quản trị | Đăng nhập → chọn nhóm nội dung → cập nhật hoặc ẩn → xem kết quả ngoài trang chủ | Supabase Postgres và Auth, phân quyền phía máy chủ |

## Kiến trúc triển khai

- Next.js App Router trên Vercel. HTML máy chủ chứa phần nội dung và liên kết bài viết. Client components chỉ phụ trách carousel, tìm kiếm và hộp thoại.
- Dữ liệu gồm slide, sản phẩm, bài viết và phiếu hỏi sỉ. Nội dung mẫu trong mã hỗ trợ bản preview trước khi cấp kết nối Supabase.
- Hình ảnh là WebP. Slide video dùng MP4 có poster, để khách chủ động phát. Chỉ dùng video do tiệm cung cấp hoặc có quyền công bố.
- Theme mặc định nền ngà, tiêu đề serif, CTA xanh rêu, điểm nhấn vàng mật ong. Animation ngắn, hỗ trợ giảm chuyển động, carousel chuyển bằng nút và hộp thoại hỗ trợ phím Escape.
- Luồng phát hành: thay đổi trên nhánh feat → lint, typecheck, build → xem preview → chạy migration và cấu hình môi trường → kiểm tra quyền admin, dữ liệu và form → phát hành.
