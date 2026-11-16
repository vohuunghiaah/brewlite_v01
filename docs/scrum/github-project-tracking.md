# BREWLITE — HỆ THỐNG QUẢN LÝ GITHUB PROJECTS & ISSUES (ASSIGNMENT 1)

| Thông tin cấu hình | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Assignment 1) |
| **Repository duy nhất** | [`vohuunghiaah/brewlite_v01`](https://github.com/vohuunghiaah/brewlite_v01) |
| **GitHub Project chính thức** | [**`BrewLite ASM1 — Scrum Management`** (Project #3)](https://github.com/users/vohuunghiaah/projects/3) |
| **Project ID** | `PVT_kwHOCpNt3c4Bryhf` |
| **Owner** | `vohuunghiaah` |
| **Mục đích** | Quản trị Agile Scrum thực tế trên GitHub Projects cho 10 Tasks qua 3 Sprints, đồng bộ hóa trạng thái giữa Issues, Project Board và Pull Requests thực tế. |

---

## 1. Cấu hình GitHub Project đã thiết lập thực tế

GitHub Project V2 đã được tạo trực tiếp trên GitHub tài khoản `vohuunghiaah` và liên kết với repository `vohuunghiaah/brewlite_v01`:
- **URL truy cập:** https://github.com/users/vohuunghiaah/projects/3
- **Mô tả dự án:** *"Quản lý Agile Scrum cho BrewLite Assignment 1. Theo dõi Product Backlog, Sprint Backlog, tiến độ phát triển, kiểm thử và nghiệm thu Task 1–10 qua ba Sprint."*
- **Quyền hạn:** Quản trị viên (`admin: true`), liên kết chính xác `brewlite_v01`, hoàn toàn độc lập với repository Assignment 2 (`brewlite`).

---

## 2. Cấu trúc các trường dữ liệu (Custom Fields)

### A. Status (Single Select)
- `Backlog` (Màu Xám): Hạng mục trong Product Backlog chưa đưa vào Sprint hiện tại.
- `Todo` (Màu Xanh dương): Hạng mục trong Sprint Backlog sẵn sàng phát triển (**Task 4**).
- `In Progress` (Màu Vàng): Đang được phát triển trên nhánh tính năng riêng.
- `In Review` (Màu Tím): Đã mở PR, đang review mã nguồn và chạy kiểm thử tự động.
- `Done` (Màu Xanh lá): Đã hoàn thành 100% Definition of Done và đã merge vào `main` (**Task 1, Task 2, Task 3**).

### B. Sprint (Iteration Field)
Được cấu hình bằng trường Iteration 14 ngày (2 tuần/Sprint) với lịch đề xuất ban đầu (cần nhóm xác nhận chính thức):
1. **`Sprint 1 — Nền tảng & hiển thị menu`**: 16/11/2026 – 29/11/2026 (Tasks 1, 2, 3, 4)
2. **`Sprint 2 — Giỏ hàng, đặt đơn & đăng nhập`**: 30/11/2026 – 13/12/2026 (Tasks 5, 6, 7)
3. **`Sprint 3 — Thanh toán, bàn giao & nghiệp vụ nâng cao`**: 14/12/2026 – 27/12/2026 (Tasks 8, 9, 10)

> [!NOTE]
> Các Task 1–3 đã hoàn thành kỹ thuật trước thời điểm cấu hình lịch Sprint này. Lịch trên là khung thời gian kế hoạch tạm thời cho dự án, không giả mạo lịch sử thực thi.

### C. Priority (Single Select)
- `P1 — Must Have`: Bắt buộc phải có (Tasks 1, 2, 3, 4, 5, 6, 8).
- `P2 — Should Have`: Nên có (Tasks 7, 9).
- `P3 — Could Have`: Có thể có (Task 10).

### D. Story Points (Number) & Assignees
- Được để trống ("Chưa xác định") tuân thủ nguyên tắc trung thực lịch sử, sẽ được cập nhật khi nhóm tiến hành phiên Estimation và phân công chính thức.

---

## 3. Các chế độ xem (Project Views) đã kích hoạt

Hệ thống cung cấp 4 Views đáp ứng toàn diện góc nhìn quản trị:

1. **`Product Backlog` (Table Layout):**  
   Hiển thị toàn bộ 10 Tasks kèm các cột: Title, Status, Sprint, Priority, Assignees, Story Points. Phù hợp cho Product Owner quản lý bức tranh tổng thể và sắp xếp thứ tự ưu tiên.
2. **`Sprint Board` (Board Layout):**  
   Bảng Kanban nhóm theo cột trạng thái (`Backlog`, `Todo`, `In Progress`, `In Review`, `Done`). Hỗ trợ lọc theo từng Sprint.
3. **`Current Sprint` (Board Layout with Filter):**  
   Bảng Kanban lọc riêng cho `Sprint 1 — Nền tảng & hiển thị menu`. Hiển thị trực quan: Task 1, 2, 3 ở cột `Done`; Task 4 ở cột `Todo`.
4. **`Roadmap` (Roadmap Layout):**  
   Biểu đồ tiến độ trực quan hiển thị các Task phân bổ theo timeline 3 Iteration của 3 Sprint.

---

## 4. Danh sách 10 GitHub Issues và liên kết Pull Request thực tế

Toàn bộ 10 Tasks đã được tạo thành 10 GitHub Issues thực tế trên repository `vohuunghiaah/brewlite_v01` và đưa vào Project Board:

| Mã Task | Issue trên GitHub | Sprint | Priority | Trạng thái Project | Trạng thái Issue | Pull Request thực tế đã liên kết |
|:---:|---|:---:|:---:|:---:|:---:|---|
| **TASK-01** | [#8 — [TASK-01] Khởi tạo dự án Next.js và NestJS](https://github.com/vohuunghiaah/brewlite_v01/issues/8) | Sprint 1 | P1 | **Done** | **CLOSED** | [PR #1](https://github.com/vohuunghiaah/brewlite_v01/pull/1) |
| **TASK-02** | [#9 — [TASK-02] Xây dựng API GET /products](https://github.com/vohuunghiaah/brewlite_v01/issues/9) | Sprint 1 | P1 | **Done** | **CLOSED** | [PR #2](https://github.com/vohuunghiaah/brewlite_v01/pull/2) |
| **TASK-03** | [#10 — [TASK-03] Trang Menu Frontend](https://github.com/vohuunghiaah/brewlite_v01/issues/10) | Sprint 1 | P1 | **Done** | **CLOSED** | [PR #3](https://github.com/vohuunghiaah/brewlite_v01/pull/3), [PR #6](https://github.com/vohuunghiaah/brewlite_v01/pull/6) |
| **TASK-04** | [#11 — [TASK-04] Product Detail & Customization](https://github.com/vohuunghiaah/brewlite_v01/issues/11) | Sprint 1 | P1 | **Todo** | **OPEN** | *Sẽ liên kết khi hoàn thành code* |
| **TASK-05** | [#12 — [TASK-05] Giỏ hàng (Cart State Management)](https://github.com/vohuunghiaah/brewlite_v01/issues/12) | Sprint 2 | P1 | **Backlog** | **OPEN** | *Sprint 2* |
| **TASK-06** | [#13 — [TASK-06] Order API (POST /orders)](https://github.com/vohuunghiaah/brewlite_v01/issues/13) | Sprint 2 | P1 | **Backlog** | **OPEN** | *Sprint 2* |
| **TASK-07** | [#14 — [TASK-07] Authentication (Register/Login)](https://github.com/vohuunghiaah/brewlite_v01/issues/14) | Sprint 2 | P2 | **Backlog** | **OPEN** | *Sprint 2* |
| **TASK-08** | [#15 — [TASK-08] Mock Cashless Payment](https://github.com/vohuunghiaah/brewlite_v01/issues/15) | Sprint 3 | P1 | **Backlog** | **OPEN** | *Sprint 3* |
| **TASK-09** | [#16 — [TASK-09] Xác nhận đơn & Docker hóa hệ thống](https://github.com/vohuunghiaah/brewlite_v01/issues/16) | Sprint 3 | P2 | **Backlog** | **OPEN** | *Sprint 3* |
| **TASK-10** | [#17 — [TASK-10] Order State Machine & Nghiệp vụ nâng cao](https://github.com/vohuunghiaah/brewlite_v01/issues/17) | Sprint 3 | P3 | **Backlog** | **OPEN** | *Sprint 3* |

---

## 5. Nguyên tắc vận hành và bảo trì

1. **GitHub Project là nguồn trạng thái chính (Single Source of Truth for Status):** Tiến độ hàng ngày được cập nhật trực tiếp trên Board.
2. **Tài liệu Markdown lưu trữ quy chuẩn và kế hoạch:** Các tệp trong `docs/scrum/` đóng vai trò là tài liệu kiến trúc quy trình, tiêu chuẩn kỹ thuật (DoD), tiêu chí chấp nhận (AC) và báo cáo nghiệm thu.
3. **Không thay thế khái niệm Sprint bằng Git branch:** Các branch Git chỉ dùng để phát triển tính năng kỹ thuật (`feature/task-04-product-detail`, `fix/*`, `docs/*`). Khái niệm Sprint được quản lý bởi Iteration trên Project Board.
4. **Bảo toàn lịch sử:** Không chỉnh sửa lịch sử các PR #1 đến #6 đã merge. Khi Task 4 hoàn tất, mở PR mới trỏ vào `main` và liên kết với Issue #11 (`Closes #11`).
