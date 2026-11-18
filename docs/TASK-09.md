# TÀI LIỆU THIẾT KẾ & TRIỂN KHAI TASK 9: XÁC NHẬN ĐƠN & DOCKER HÓA

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite — Hệ thống đặt cà phê không tiền mặt |
| **Task** | TASK-09 — Xác nhận đơn & Docker hóa hệ thống |
| **Sprint** | Sprint 3 — Thanh toán, bàn giao & nghiệp vụ nâng cao |
| **Branch Git** | `feature/task-09-order-confirmation-docker` |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |

---

## 1. Mục tiêu

TASK-09 hoàn thiện khả năng theo dõi đơn hàng cá nhân và đóng gói toàn bộ ứng dụng để chạy thống nhất bằng Docker Compose:

- Backend cung cấp lịch sử đơn theo tài khoản JWT.
- Endpoint tra cứu chỉ trả đơn thuộc tài khoản hiện tại.
- Prisma lưu dữ liệu người dùng và đơn hàng trong PostgreSQL.
- Frontend, backend và database được khởi chạy bằng một lệnh Compose.

---

## 2. Đối chiếu Acceptance Criteria

| AC | Yêu cầu | Kết quả |
|---|---|---|
| AC-01 | Khách hàng tra cứu đơn cá nhân kèm món và trạng thái | Đạt — `GET /orders/me` được bảo vệ bằng `JwtAuthGuard`, truy vấn theo `userId` |
| AC-02 | Dockerfile chuẩn cho Frontend và Backend | Đạt — cả hai đều dùng multi-stage build |
| AC-03 | docker-compose liên kết container và biến môi trường | Đạt — PostgreSQL, NestJS, Next.js cùng network và volume |
| AC-04 | `docker compose up --build` chạy thành công | Đạt — frontend, backend và database đều khởi chạy; backend/database healthy |
| AC-05 | Hướng dẫn Docker trong README | Đạt — README có lệnh build/chạy, cổng truy cập và quản lý dữ liệu |

---

## 3. Thay đổi Backend

### 3.1. Prisma và PostgreSQL

Thêm cấu trúc Prisma tại `backend/prisma/schema.prisma`:

- `User`: tài khoản, email, mật khẩu đã băm, loyalty points.
- `Order`: mã đơn, chủ đơn, trạng thái, tổng tiền, ghi chú, thời gian tạo.
- `OrderItem`: món trong đơn, size, topping, số lượng và giá từng dòng.
- Quan hệ `User 1-N Order` và `Order 1-N OrderItem`.

Dữ liệu không còn phụ thuộc vào bộ nhớ khi backend khởi động lại.

### 3.2. Endpoint lịch sử đơn

Route được triển khai trong `OrdersController`:

```text
GET /orders/me
Authorization: Bearer <accessToken>
```

Luồng xử lý:

1. `JwtAuthGuard` xác thực JWT.
2. `@CurrentUser('id')` lấy `userId` từ token.
3. `OrdersService.findByUserId()` truy vấn các đơn có `userId` trùng tài khoản.
4. API trả danh sách đơn mới nhất trước, kèm các `OrderItem`.

Các trạng thái được hỗ trợ:

- `PENDING`
- `PAID`
- `PAYMENT_FAILED`
- `PREPARING`
- `READY`
- `COMPLETED`
- `CANCELLED`

### 3.3. Validate dữ liệu

`POST /orders` tiếp tục sử dụng `CreateOrderDto` và `ValidationPipe` toàn cục:

- `items` phải là mảng có ít nhất một phần tử.
- `productId` bắt buộc, phải tồn tại trong thực đơn.
- `size` chỉ nhận `S`, `M`, `L`.
- `toppings` chỉ nhận các topping được hỗ trợ.
- `qty` là số nguyên tối thiểu bằng 1.
- `note` là chuỗi tùy chọn, tối đa 200 ký tự.

## 4. Docker hóa

### 4.1. Backend Dockerfile

`backend/Dockerfile` dùng hai giai đoạn:

- Build: cài dependency, generate Prisma Client, build NestJS.
- Runtime: cài dependency production, generate Prisma Client, chạy migration bằng `prisma db push`, khởi động NestJS.

### 4.2. Frontend Dockerfile

`frontend/Dockerfile` dùng ba giai đoạn:

- Dependencies: cài dependencies reproducible bằng `npm ci`.
- Build: build Next.js ở chế độ standalone.
- Runtime: chạy `server.js` với Node.js Alpine.

Tailwind sử dụng PostCSS plugin để đảm bảo CSS utility được tạo đầy đủ trong bản Docker:

- `frontend/postcss.config.mjs`
- `@tailwindcss/postcss`

### 4.3. Docker Compose

`docker-compose.yml` khai báo ba service:

| Service | Công nghệ | Cổng |
|---|---|---|
| `database` | PostgreSQL 17 Alpine | Internal `5432` |
| `backend` | NestJS | Host `3001` |
| `frontend` | Next.js | Host `3000` |

Database sử dụng volume `postgres-data`; backend và frontend cùng network `brewlite`.

Lệnh khởi chạy toàn bộ:

```bash
docker compose up --build
```

---

## 5. Hướng dẫn trong README

`README.md` đã có:

- Copy `.env.example` sang `.env`.
- Biến `JWT_SECRET`, `POSTGRES_PASSWORD`, `BACKEND_PORT`, `FRONTEND_PORT`.
- Lệnh Docker Compose.
- URL truy cập frontend/backend/lịch sử đơn.
- Cách giữ hoặc xóa dữ liệu PostgreSQL bằng volume.
- Cách chạy backend trong môi trường local có PostgreSQL.

---

## 6. Kết quả kiểm thử

### 6.1. Backend

- Build NestJS: thành công.
- Backend unit test: `25/25` tests pass.
- Backend lint: không có lỗi.

### 6.2. Docker

Đã kiểm tra cấu hình và khởi chạy:

```text
database  healthy
backend   healthy
frontend  running
```

Các endpoint:

```text
GET http://localhost:3001        HTTP 200
GET http://localhost:3001/products HTTP 200
```

Đã kiểm tra bằng dữ liệu thật:

- Tài khoản A tạo đơn và thấy đơn qua `GET /orders/me`.
- Tài khoản B không thấy đơn của tài khoản A.
- Đơn và tài khoản vẫn tồn tại sau khi restart backend container.

---

## 7. Kiểm tra Definition of Done

| Tiêu chí DoD | Kết quả |
|---|---|
| Code build không lỗi | Đạt |
| Đủ acceptance criteria | Đạt |
| API validate đầu vào | Đạt |
| UI có loading/lỗi cơ bản | Đạt |
| README có hướng dẫn chạy | Đạt |
| Có Dockerfile và Compose | Đạt |
| Test tự động | Đạt |
| Có commit Git mô tả rõ ràng | Chưa đạt — thay đổi hiện đang nằm trong worktree chưa commit |
| Có review trong nhóm | Chưa xác nhận — cần tạo PR và được reviewer duyệt |

Do đó, phần triển khai TASK-09 đã hoàn thành kỹ thuật, nhưng cần tạo commit/PR theo Git Flow để đáp ứng trọn vẹn DoD.

---

## 8. Hướng dẫn nghiệm thu

```bash
cd brewlite_v01
docker compose up --build
```

Truy cập:

- Frontend: `http://localhost:3000`
- Lịch sử đơn hàng: `http://localhost:3000/orders`
- Backend: `http://localhost:3001`

Dừng stack:

```bash
docker compose down
```

Xóa dữ liệu PostgreSQL:

```bash
docker compose down -v
```
