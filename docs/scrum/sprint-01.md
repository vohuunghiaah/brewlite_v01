# Sprint 01 — Nền tảng và menu sản phẩm

## 1. Thông tin Sprint
- **Sprint:** 01
- **Sprint Goal:** Khởi tạo BrewLite và cung cấp danh sách, chi tiết sản phẩm để khách chọn đồ uống.
- **Nguồn yêu cầu:** `BrewLite-CongNghePhanMem.pdf`, Mục 2.3 và Mục 8.
- **Trạng thái:** In Progress

## 2. Sprint Backlog (đánh số đúng theo đề bài)

| ID | Task theo đề bài | Tiêu chí chấp nhận chính | Trạng thái | Người phụ trách |
|---|---|---|:---:|---|
| TASK-01 | Khởi tạo dự án và cấu trúc | Next.js, NestJS, Git, README, `.env.example`, chạy được | **Done** | Dev Team |
| TASK-02 | API danh sách sản phẩm | NestJS `GET /products` trả JSON: id, tên, giá, ảnh từ dữ liệu mẫu/CSDL | **Done** | Dev Team |
| TASK-03 | Trang Menu (Frontend) | Next.js gọi `/products`, lưới sản phẩm, loading và empty state | To Do | Dev Team |
| TASK-04 | Chi tiết và tùy chọn sản phẩm | Chọn size S/M/L, topping và tính giá | To Do | Dev Team |

> Cấu hình cơ sở dữ liệu với Prisma/TypeORM là công việc kỹ thuật tùy chọn cho Task 2 vì đề bài chấp nhận dữ liệu mẫu. JWT thuộc Task 7, không thuộc Task 3.

## 3. Definition of Done (áp dụng cho từng task)
- Code build và chạy được; đáp ứng tiêu chí chấp nhận.
- Có commit Git rõ ràng và review qua Pull Request.
- API validate dữ liệu đầu vào khi có input; UI xử lý loading và lỗi cơ bản.
- README có hướng dẫn chạy/kiểm thử.

## 4. Task 1 — Kết quả nghiệm thu
- [x] Khởi tạo frontend Next.js và backend NestJS.
- [x] Tạo cấu hình Git, `.env.example`, README và docs/TASK-01.md.
- [x] Cả hai phân hệ build và runtime đều thành công (HTTP 200).
- [x] Unit test và E2E test đạt 100%.
- [x] Đã hợp nhất vào `main` qua PR #1 (commit `a60b9d6`).

## 5. Task 2 — Kết quả nghiệm thu
- [x] Triển khai `ProductsModule`, `ProductsController`, `ProductsService`, `products.data.ts`, `products.types.ts`.
- [x] `GET http://localhost:3001/products` trả HTTP 200 và mảng JSON các món đồ uống.
- [x] Mỗi sản phẩm có đầy đủ 4 trường: `id`, `name`, `price` (số nguyên VND), `imageUrl`.
- [x] Chuẩn bị sẵn bộ ảnh vector SVG thực tế tại `frontend/public/images/products/` sẵn sàng cho Task 3.
- [x] Unit test: 8/8 tests passed.
- [x] E2E test: 4/4 tests passed (gồm kiểm tra không JWT và kiểm tra không hồi quy `GET /`).
- [x] Lint & Build: 0 warnings, 0 errors, build thành công cả frontend & backend.
- [x] Soạn thảo tài liệu nghiệm thu [docs/TASK-02.md](../TASK-02.md).
