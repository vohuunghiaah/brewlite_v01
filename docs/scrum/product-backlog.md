# BREWLITE — PRODUCT BACKLOG (ASSIGNMENT 1)

| Thông tin quản trị | Chi tiết |
|---|---|
| **Dự án** | BrewLite — Hệ thống đặt cà phê và thanh toán không dùng tiền mặt (Cashless Coffee POS) |
| **Học phần** | Công nghệ Phần mềm — Khoa Công nghệ Thông tin, Trường Đại học Sài Gòn (HK I, 2026–2027) |
| **Repository duy nhất** | [`vohuunghiaah/brewlite_v01`](https://github.com/vohuunghiaah/brewlite_v01) |
| **GitHub Project Board** | [**`BrewLite ASM1 — Scrum Management` (Project #3)**](https://github.com/users/vohuunghiaah/projects/3) |
| **Khung quản lý** | Agile Scrum (Kế hoạch 3 Sprints quản lý bằng GitHub Projects Iterations) |
| **Tài liệu tham chiếu** | [README.md](../../README.md), [TASK-01.md](../TASK-01.md), [TASK-02.md](../TASK-02.md), [TASK-03.md](../TASK-03.md), [github-project-tracking.md](github-project-tracking.md) |
| **Trạng thái tài liệu** | Thiết lập tại thời điểm giữa Sprint 1 (sau hoàn thành Task 1, 2, 3 và trước khi bắt đầu Task 4) |

---

## 1. Tầm nhìn sản phẩm (Product Vision) & Lộ trình tổng thể

> **Tầm nhìn (Product Vision):**  
> *"BrewLite giúp khách hàng đặt và thanh toán đồ uống không dùng tiền mặt chỉ trong vài chạm, giảm thời gian xếp hàng tại quầy và nâng cao trải nghiệm thưởng thức cà phê hiện đại."*

### Kế hoạch 3 Sprints gợi ý từ Đề bài Assignment 1:
- **Sprint 1: Nền tảng & Hiển thị Menu** (Task 1, 2, 3, 4) — Thiết lập cấu trúc monorepo, API thực đơn, giao diện danh mục chuẩn Figma Make và màn hình tùy biến sản phẩm.
- **Sprint 2: Giỏ hàng, Đặt đơn & Xác thực** (Task 5, 6, 7) — Quản lý trạng thái giỏ hàng, API khởi tạo đơn hàng `POST /orders` và hệ thống xác thực người dùng JWT.
- **Sprint 3: Thanh toán, Bàn giao & Nghiệp vụ nâng cao** (Task 8, 9, 10) — Tích hợp cổng thanh toán mô phỏng, lịch sử đơn `GET /orders/me`, đóng gói Docker Compose và hoàn thiện máy trạng thái đơn hàng (Order State Machine), thanh toán Idempotent.

---

## 2. Bảng tổng hợp Product Backlog (Task 1 – Task 10)

> [!NOTE]
> **Nguyên tắc ghi nhận trung thực (Truthfulness Rule):**
> - Các trường **Ước lượng (Story Points / Giờ công)** và **Người phụ trách** được ghi rõ là **"Chưa xác định"** do nhóm chưa thực hiện phiên Estimation chính thức trong quá khứ. Tuyệt đối không tự suy diễn hoặc bịa đặt số liệu.
> - Trạng thái chỉ đánh dấu **DONE** khi đã đáp ứng đầy đủ Definition of Done và có Pull Request đã merge vào nhánh chính trên GitHub.

| ID | Tên hạng mục (Task / Story) | GitHub Issue | Sprint dự kiến | Ưu tiên | Trạng thái | Ước lượng | Người phụ trách | Bằng chứng nghiệm thu / PR |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **TASK-01** | **Khởi tạo dự án và cấu trúc Monorepo** | [#8](https://github.com/vohuunghiaah/brewlite_v01/issues/8) | Sprint 1 | Must Have (P1) | **DONE** | Chưa xác định | Chưa xác định | [PR #1](https://github.com/vohuunghiaah/brewlite_v01/pull/1) — [TASK-01.md](../TASK-01.md) |
| **TASK-02** | **API danh sách sản phẩm (NestJS GET /products)** | [#9](https://github.com/vohuunghiaah/brewlite_v01/issues/9) | Sprint 1 | Must Have (P1) | **DONE** | Chưa xác định | Chưa xác định | [PR #2](https://github.com/vohuunghiaah/brewlite_v01/pull/2) — [TASK-02.md](../TASK-02.md) |
| **TASK-03** | **Trang Menu Frontend (Next.js gọi /products)** | [#10](https://github.com/vohuunghiaah/brewlite_v01/issues/10) | Sprint 1 | Must Have (P1) | **DONE** | Chưa xác định | Chưa xác định | [PR #6](https://github.com/vohuunghiaah/brewlite_v01/pull/6) (khôi phục từ PR #4) — [TASK-03.md](../TASK-03.md) |
| **TASK-04** | **Chi tiết & tùy chọn sản phẩm (Size & Topping)** | [#11](https://github.com/vohuunghiaah/brewlite_v01/issues/11) | Sprint 1 | Must Have (P1) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-05** | **Giỏ hàng (Cart State Management)** | [#12](https://github.com/vohuunghiaah/brewlite_v01/issues/12) | Sprint 2 | Must Have (P1) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-06** | **API tạo đơn hàng (NestJS POST /orders)** | [#13](https://github.com/vohuunghiaah/brewlite_v01/issues/13) | Sprint 2 | Must Have (P1) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-07** | **Đăng ký / Đăng nhập (Auth JWT & bcrypt)** | [#14](https://github.com/vohuunghiaah/brewlite_v01/issues/14) | Sprint 2 | Should Have (P2) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-08** | **Thanh toán không tiền mặt (Mock Payment Gateway)** | [#15](https://github.com/vohuunghiaah/brewlite_v01/issues/15) | Sprint 3 | Must Have (P1) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-09** | **Xác nhận đơn & Docker hóa hệ thống** | [#16](https://github.com/vohuunghiaah/brewlite_v01/issues/16) | Sprint 3 | Should Have (P2) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |
| **TASK-10** | **Nghiệp vụ nâng cao (State Machine, Idempotent, Inventory)** | [#17](https://github.com/vohuunghiaah/brewlite_v01/issues/17) | Sprint 3 | Could Have (P3) | **TO DO** | Chưa xác định | Chưa xác định | Chưa bắt đầu |

---

## 3. Chi tiết từng hạng mục trong Product Backlog

### TASK-01: Khởi tạo dự án và cấu trúc Monorepo
- **Mô tả:** Thiết lập kiến trúc monorepo phân tách rõ ràng phân hệ Frontend (Next.js 16 App Router, React 19, Tailwind CSS 4) và Backend (NestJS 12, Express 5, TypeScript). Cung cấp điểm kiểm tra sức khỏe tối thiểu: trang chủ hiển thị "Hello BrewLite" và API `GET /` phản hồi `"Hello BrewLite API"` trên cổng 3001.
- **Sprint dự kiến:** Sprint 1.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **DONE** (Đã nghiệm thu qua PR #1, merge commit `a60b9d6`).
- **Tiêu chí chấp nhận (Acceptance Criteria):**
  1. Monorepo cấu hình `package.json` root quản lý workspaces `frontend` và `backend`.
  2. Frontend build thành công, render tiêu đề "Hello BrewLite", responsive.
  3. Backend phản hồi `GET /` chuỗi `"Hello BrewLite API"`, lắng nghe mặc định cổng 3001 và cho phép đổi qua `PORT`.
  4. Unit test và E2E test cho endpoint root đều pass 100%.
  5. Cung cấp `.env.example`, `.gitignore` chuẩn mực; `README.md` hướng dẫn chi tiết.

---

### TASK-02: API danh sách sản phẩm (NestJS GET /products)
- **Mô tả:** Xây dựng module quản lý sản phẩm phía NestJS (`ProductsModule`, `ProductsController`, `ProductsService`) cung cấp endpoint `GET /products` trả về danh sách đồ uống và món ăn kèm từ dữ liệu mẫu bất biến, đồng bộ chính xác với thiết kế Figma Make App.
- **Sprint dự kiến:** Sprint 1.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **DONE** (Đã nghiệm thu qua PR #2, merge commit `c72c1c1`).
- **Tiêu chí chấp nhận (Acceptance Criteria):**
  1. Endpoint `GET /products` trả về HTTP 200 OK với mảng JSON gồm 6 sản phẩm.
  2. Mỗi sản phẩm có đủ 4 trường bắt buộc: `id` (string), `name` (string), `price` (số nguyên không âm), `imageUrl` (string).
  3. Hỗ trợ trường tùy chọn `badge?: string` phục vụ nhãn tiếp thị (*Bán chạy*, *Mới*, *Yêu thích*, *Hot Trend*).
  4. Đường dẫn ảnh trỏ tới vector SVG nội bộ tại `frontend/public/products/*.svg` (gồm sửa đổi chuẩn hóa ảnh Cold Brew Muối).
  5. 100% Unit tests (9 tests) và E2E tests (6 tests) vượt qua thành công; linter và build đạt.

---

### TASK-03: Trang Menu Frontend (Next.js gọi /products)
- **Mô tả:** Hiện thực giao diện Menu khách hàng trên Next.js 16 tái tạo chuẩn nhận diện thương hiệu từ Figma Make. Gọi trực tiếp API `GET /products`, render lưới sản phẩm đáp ứng đầy đủ 4 trạng thái giao diện: Thành công, Đang tải (Loading Skeleton), Trống rỗng (Empty State), Lỗi kết nối (Error State kèm nút Retry).
- **Sprint dự kiến:** Sprint 1.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **DONE** (Đã nghiệm thu qua PR #6, merge commit `6737476`, sau khi khôi phục từ sự cố revert PR #4).
- **Tiêu chí chấp nhận (Acceptance Criteria):**
  1. Gọi API `GET /products` thật từ NestJS (`http://localhost:3001`), không dùng mock ngầm.
  2. Render lưới sản phẩm responsive (1 cột mobile, 2 cột tablet, 3 cột desktop).
  3. Hiển thị đủ giá định dạng VND (`35.000đ`), badge nổi bật, hình ảnh vector SVG.
  4. Bộ lọc danh mục (5 danh mục) và ô tìm kiếm hoạt động mượt mà.
  5. Đầy đủ Loading Skeleton (`animate-pulse`), Empty State khi không tìm thấy món, Error State có nút Thử lại kết nối.
  6. Runtime validation dữ liệu đầu vào tại `lib/api.ts` chặn đứng payload sai lệch.
  7. Navbar callbacks có toast thông báo chuẩn phạm vi; 100% kiểm thử (36 tests monorepo) pass.

---

### TASK-04: Chi tiết & tùy chọn sản phẩm (Size & Topping)
- **Mô tả:** Xây dựng màn hình/hộp thoại chi tiết sản phẩm cho phép người dùng xem thông tin mô tả chi tiết, tùy chọn kích cỡ (Size S/M/L) và các loại topping thêm (thạch, trân châu, kem muối...), tự động tính toán tổng giá tiền thời gian thực theo cấu hình lựa chọn.
- **Sprint dự kiến:** Sprint 1.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **TO DO** (Sẽ bắt đầu sau khi hoàn tất thiết lập hồ sơ quản lý Scrum).
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Người dùng có thể bấm vào sản phẩm hoặc nút "Tùy chỉnh" để mở modal/chi tiết món.
  2. Hiển thị thông tin món: ảnh, tên, mô tả chi tiết, giá gốc.
  3. Cho phép chọn 1 kích cỡ: Nhỏ (Size S - 0đ), Vừa (Size M - cộng giá tương ứng), Lớn (Size L - cộng giá tương ứng).
  4. Cho phép chọn nhiều topping tùy chọn kèm giá phụ thu rõ ràng.
  5. Giá tổng cộng cập nhật tức thì (`dynamic price calculation`) dựa trên base price + size + topping.
  6. Có nút "Thêm vào đơn" (tại Sprint 1 có thể phản hồi chuẩn bị cho Giỏ hàng Task 5).
  7. Viết đầy đủ component unit tests và đảm bảo lint/build đạt.

---

### TASK-05: Giỏ hàng (Cart State Management)
- **Mô tả:** Triển khai quản lý trạng thái giỏ hàng phía Client sử dụng React Context hoặc Zustand. Cho phép thêm sản phẩm kèm tùy chọn (size, topping), cập nhật số lượng, xóa món và tính tổng giá trị giỏ hàng.
- **Sprint dự kiến:** Sprint 2.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Thêm món kèm đầy đủ cấu hình tùy chọn vào giỏ hàng.
  2. Tăng/giảm số lượng từng món; tự động xóa món khi số lượng về 0 hoặc qua nút bấm xóa.
  3. Huy hiệu số lượng trên icon giỏ hàng Navbar cập nhật tự động.
  4. Tính toán chính xác tổng tạm tính, chiết khấu (nếu có) và tổng thanh toán.
  5. Lưu trữ tạm thời trạng thái (LocalStorage) để không mất giỏ hàng khi F5.

---

### TASK-06: API tạo đơn hàng (NestJS POST /orders)
- **Mô tả:** Xây dựng module đơn hàng (`OrdersModule`) trên NestJS, cung cấp endpoint `POST /orders` tiếp nhận danh sách món, địa điểm nhận/bàn, tính toán lại tổng tiền từ máy chủ và ghi nhận trạng thái ban đầu là `PENDING`.
- **Sprint dự kiến:** Sprint 2.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Endpoint `POST /orders` nhận payload có cấu trúc hợp lệ (sử dụng `class-validator` và `class-transformer`).
  2. Kiểm tra tính hợp lệ của từng sản phẩm và tính toán lại giá từ database/dữ liệu chuẩn phía server (không tin cậy giá client gửi lên).
  3. Lưu trữ đơn hàng với mã đơn duy nhất, trạng thái mặc định `PENDING`.
  4. Trả về mã HTTP 201 Created kèm chi tiết đơn hàng vừa tạo.

---

### TASK-07: Đăng ký / Đăng nhập (Auth JWT & bcrypt)
- **Mô tả:** Xây dựng module xác thực (`AuthModule`, `UsersModule`) cho phép người dùng đăng ký tài khoản mới và đăng nhập. Mật khẩu được băm bảo mật bằng `bcrypt`, phiên làm việc quản lý qua JSON Web Token (JWT).
- **Sprint dự kiến:** Sprint 2.
- **Mức độ ưu tiên:** Should Have (P2).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Endpoint `POST /auth/register` kiểm tra trùng lặp email/số điện thoại, băm mật khẩu bằng `bcrypt`.
  2. Endpoint `POST /auth/login` xác thực thông tin đăng nhập và trả về access token (JWT).
  3. Bảo vệ các endpoint nhạy cảm bằng `AuthGuard` / `JwtStrategy`.
  4. Xử lý lỗi trả về mã HTTP 400/401 khi thông tin không chính xác.

---

### TASK-08: Thanh toán không tiền mặt (Mock Payment Gateway)
- **Mô tả:** Tích hợp quy trình thanh toán không tiền mặt mô phỏng (ví điện tử Momo/ZaloPay/VNPAY hoặc chuyển khoản ngân hàng giả lập). Cập nhật trạng thái đơn hàng sang `PAID` khi giao dịch thành công hoặc `PAYMENT_FAILED` nếu thất bại.
- **Sprint dự kiến:** Sprint 3.
- **Mức độ ưu tiên:** Must Have (P1).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Tạo yêu cầu thanh toán gắn với mã đơn hàng cụ thể.
  2. Mô phỏng xử lý phản hồi thành công/thất bại từ cổng thanh toán.
  3. Cập nhật trạng thái đơn hàng trong hệ thống tương ứng.
  4. Có trang hiển thị kết quả giao dịch và thông tin nhận nước tại quầy.

---

### TASK-09: Xác nhận đơn & Docker hóa hệ thống
- **Mô tả:** Cung cấp endpoint `GET /orders/me` hoặc tra cứu đơn hàng theo mã; đóng gói toàn bộ hệ thống (Frontend, Backend, Database) bằng Docker và `docker-compose.yml` để dễ dàng triển khai chỉ với một lệnh duy nhất.
- **Sprint dự kiến:** Sprint 3.
- **Mức độ ưu tiên:** Should Have (P2).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Khách hàng có thể tra cứu danh sách đơn đã đặt và trạng thái hiện tại.
  2. Viết `Dockerfile` tối ưu nhiều giai đoạn (multi-stage build) cho frontend và backend.
  3. Viết `docker-compose.yml` liên kết các dịch vụ với biến môi trường chuẩn.
  4. Khởi chạy thành công toàn bộ hệ thống qua lệnh `docker compose up --build`.

---

### TASK-10: Nghiệp vụ nâng cao (State Machine, Idempotent, Inventory)
- **Mô tả:** Hiện thực các nghiệp vụ nâng cao đảm bảo tính toàn vẹn hệ thống thương mại: Máy trạng thái vòng đời đơn hàng (`PENDING -> PAID -> PREPARING -> READY -> COMPLETED / CANCELLED`), xử lý thanh toán Idempotent chống trừ tiền hai lần, kiểm soát tồn kho đồng thời và tích lũy điểm thưởng khách hàng thân thiết (Loyalty Points).
- **Sprint dự kiến:** Sprint 3.
- **Mức độ ưu tiên:** Could Have (P3).
- **Trạng thái:** **TO DO**.
- **Tiêu chí chấp nhận (Acceptance Criteria dự kiến):**
  1. Chỉ cho phép chuyển đổi trạng thái đơn hàng theo đúng đồ thị hợp lệ (State Machine Guard).
  2. Sử dụng Idempotency Key cho API thanh toán, chặn trùng lặp giao dịch khi retry.
  3. Kiểm soát tồn kho an toàn khi có nhiều khách hàng đặt cùng một món đồ uống giới hạn.
  4. Tích điểm thưởng tự động sau khi đơn hàng hoàn tất.
