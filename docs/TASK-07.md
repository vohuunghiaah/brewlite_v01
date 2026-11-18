# TÀI LIỆU THIẾT KẾ & TRIỂN KHAI TASK 7: ĐĂNG KÝ / ĐĂNG NHẬP (`POST /auth/register`, `POST /auth/login`) & BẢO VỆ ROUTE ĐẶT ĐƠN

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Hệ thống đặt cà phê và thanh toán không tiền mặt) |
| **Môn học** | Công nghệ Phần mềm — HK I (2026–2027) |
| **Hạng mục** | Task 7: Đăng ký / Đăng nhập (JWT) & Guard bảo vệ route đặt đơn |
| **Quy trình áp dụng** | Agile Scrum (Sprint 2) |
| **Branch Git** | `feature/task-07-auth-jwt` |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |

---

## 1. Phân tích & Thiết kế Nghiệp vụ Task 7

Căn cứ vào đặc tả đề bài môn học (Mục 4.1, 4.2, 8, 12.1, 12.2 trong `BrewLite-CongNghePhanMem.pdf`):

- **Đăng ký tài khoản (`POST /auth/register`):**
  - Nhận `RegisterDto`: `email` (hợp lệ qua `@IsEmail()`), `password` (tối thiểu 6 ký tự qua `@MinLength(6)`).
  - Kiểm tra email trùng lặp: nếu đã tồn tại, ném lỗi `409 ConflictException` ("Email đã được sử dụng. Vui lòng chọn email khác.").
  - Băm mật khẩu bằng thuật toán an toàn `bcryptjs` với salt round = 10 (`passwordHash`), không bao giờ lưu trữ mật khẩu gốc dạng plain text.
  - Tạo thực thể `User(id, email, passwordHash, loyaltyPoints, createdAt)`.
  - Phát hành mã truy cập `accessToken` (JWT ký bằng `JWT_SECRET`) và phản hồi `201 Created` kèm `SafeUser` (tuyệt đối không trả `passwordHash` ra ngoài).

- **Đăng nhập (`POST /auth/login`):**
  - Nhận `LoginDto`: `email`, `password`.
  - Kiểm tra tài khoản và so sánh mật khẩu qua `bcrypt.compare`.
  - Nếu sai email hoặc mật khẩu, ném lỗi bảo mật chuẩn `401 UnauthorizedException` ("Email hoặc mật khẩu không chính xác.").
  - Nếu đúng, phát hành JWT `accessToken` và trả về thông tin `user` (HTTP 200 OK).

- **Thông tin tài khoản hiện tại (`GET /auth/me`):**
  - Được bảo vệ bởi `JwtAuthGuard`. Trả về thông tin hồ sơ `SafeUser` của người dùng sở hữu token.

- **Bảo vệ Route đặt đơn (`POST /orders`):**
  - Gắn `@UseGuards(JwtAuthGuard)` vào `POST /orders`.
  - Nếu client không gửi header `Authorization: Bearer <token>` hoặc token không hợp lệ/hết hạn $\rightarrow$ trả về `401 Unauthorized`.
  - Khi token hợp lệ, trích xuất `userId` từ token thông qua decorator `@CurrentUser('id')` và truyền vào `OrdersService.create(createOrderDto, userId)` để đơn hàng được gắn đúng chủ sở hữu.

- **Tích hợp giao diện Frontend (Next.js):**
  - `AuthContext`: Quản lý trạng thái đăng nhập, lưu trữ phiên trong `localStorage`, cung cấp các hàm `login`, `register`, `logout`.
  - `AuthModal`: Popup giao diện tab Đăng nhập / Đăng ký hiện đại, hỗ trợ validate, loading spinner và hiển thị thông báo lỗi trực quan.
  - `Navbar`: Tích hợp hiển thị badge tên người dùng đã đăng nhập kèm nút Đăng xuất; khi chưa đăng nhập hiển thị nút "Đăng nhập".
  - `CartPanel`: Tuân thủ nghiêm ngặt quy trình nghiệp vụ (Mục 5 PDF): `Xem giỏ & tổng tiền` $\rightarrow$ `Đăng nhập (nếu chưa)` $\rightarrow$ `Thanh toán không tiền mặt`. Nếu chưa đăng nhập, tự động kích hoạt `AuthModal`. Khi đã đăng nhập, tự động đính kèm `Bearer token` vào request `createOrder`.

---

## 2. Cấu trúc thư mục mới & cập nhật

```text
backend/
├── src/
│   ├── auth/                             # Module Xác thực mới (Task 7)
│   │   ├── auth.types.ts                 # Định nghĩa User, SafeUser, JwtPayload, AuthResponse
│   │   ├── dto/
│   │   │   ├── register.dto.ts           # DTO validate đăng ký (class-validator)
│   │   │   └── login.dto.ts              # DTO validate đăng nhập (class-validator)
│   │   ├── auth.service.ts               # Hash bcrypt, xác thực mật khẩu, phát JWT
│   │   ├── auth.controller.ts            # POST /auth/register, POST /auth/login, GET /auth/me
│   │   ├── auth.module.ts                # Khai báo PassportModule & JwtModule
│   │   ├── jwt.strategy.ts               # Passport JWT Strategy trích xuất Bearer token
│   │   ├── jwt-auth.guard.ts             # Guard bảo vệ route
│   │   ├── current-user.decorator.ts     # Decorator @CurrentUser()
│   │   ├── auth.service.spec.ts          # Unit test cho AuthService
│   │   └── auth.controller.spec.ts       # Unit test cho AuthController
│   ├── orders/
│   │   └── orders.controller.ts          # Gắn @UseGuards(JwtAuthGuard) và @CurrentUser('id')
│   └── app.module.ts                     # Import AuthModule
└── test/
    └── app.e2e-spec.ts                   # E2E test cho Auth & Route Protection

frontend/
├── context/
│   └── AuthContext.tsx                   # Auth state management & persistence
├── components/
│   ├── AuthModal.tsx                     # Modal Đăng nhập / Đăng ký
│   ├── Navbar.tsx                        # Tích hợp trạng thái đăng nhập
│   └── CartPanel.tsx                     # Đính kèm Bearer token khi tạo đơn
├── lib/
│   └── api.ts                            # Các hàm gọi API registerUser, loginUser, fetchUserProfile
└── components/__tests__/
    └── AuthModal.spec.tsx                # Unit test giao diện AuthModal
```

---

## 3. Kết quả Kiểm thử & Nghiệm thu (Definition of Done)

### A. Backend Unit Tests
- `AuthService`: Kiểm tra đăng ký thành công, mã hóa bcrypt, phát sinh JWT payload, chặn email trùng (409 Conflict), chặn đăng nhập sai mật khẩu (401 Unauthorized).
- `AuthController`: Kiểm tra ủy quyền chính xác cho các phương thức service.
- **Kết quả:** `7/7` test files pass, `23/23` tests pass.

### B. Backend E2E Tests
- `POST /auth/register` $\rightarrow$ 201 Created kèm accessToken & safe user.
- `POST /auth/register` với email trùng $\rightarrow$ 409 Conflict.
- `POST /auth/login` đúng $\rightarrow$ 200 OK; sai $\rightarrow$ 401 Unauthorized.
- `GET /auth/me` $\rightarrow$ 200 OK khi có token; 401 khi không có token.
- `POST /orders` không có token $\rightarrow$ 401 Unauthorized (Chứng minh route đã được bảo vệ thành công).
- `POST /orders` có token hợp lệ $\rightarrow$ 201 Created và lưu đúng `userId`.
- **Kết quả:** `1/1` test file pass, `14/14` tests pass.

### C. Frontend Component Tests
- `AuthModal.spec.tsx`, `CartPanel.spec.tsx`, `MenuPage.spec.tsx`, `api.spec.ts`.
- **Kết quả:** `4/4` test files pass, `29/29` tests pass.

### D. Linter & Build
- `oxlint --type-aware src/ test/`: 0 warnings, 0 errors.
- `nest build`: Thành công không lỗi.
- `next build --webpack`: Thành công không lỗi, xuất bản production tĩnh tối ưu.
