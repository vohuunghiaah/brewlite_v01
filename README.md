# BrewLite — Hệ Thống Đặt Cà Phê Không Tiền Mặt

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS%2012-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Agile Scrum](https://img.shields.io/badge/Process-Agile%20Scrum-green)](#)

---

## 1. Giới thiệu BrewLite

**BrewLite** là ứng dụng hỗ trợ khách hàng đặt và thanh toán đồ uống trực tuyến không dùng tiền mặt (Cashless Coffee POS). Hệ thống giúp giảm thiểu thời gian xếp hàng tại quầy, tăng tốc độ phục vụ và mang lại trải nghiệm tiện lợi, hiện đại cho người dùng.

> **Tầm nhìn sản phẩm (Product Vision):**  
> *"BrewLite giúp khách hàng đặt và thanh toán đồ uống không dùng tiền mặt chỉ trong vài chạm, giảm thời gian xếp hàng và nhận đơn nhanh tại quầy."*

---

## 2. Mục đích Assignment 1

Dự án thuộc bài tập lớn môn **Công nghệ Phần mềm** (Khoa Công nghệ Thông tin — Trường Đại học Sài Gòn, Học kỳ I — Năm học 2026–2027).  
Mục đích của Assignment 1:
- Áp dụng quy trình chuẩn **Agile Scrum** vào xây dựng phần mềm từng bước (từ Product Backlog, Sprint Planning đến Definition of Done).
- Triển khai **Task 1 — Khởi tạo dự án và cấu trúc**: thiết lập kiến trúc Monorepo gồm 2 phân hệ độc lập: Frontend (Next.js) và Backend (NestJS).
- Đảm bảo cả hai phân hệ đều biên dịch thành công, vượt qua toàn bộ quy trình kiểm thử chất lượng mã nguồn (lint, unit test, build) và phản hồi thông điệp "Hello".

---

## 3. Công nghệ sử dụng

| Phân hệ | Công nghệ | Phiên bản | Vai trò & Mục đích |
|---|---|---|---|
| **Frontend** | Next.js (App Router) | 16.x | Render giao diện web hiện đại, tối ưu SEO & hiệu năng |
| | React | 19.x | Thư viện xây dựng thành phần giao diện người dùng |
| | TypeScript | 5.x | Kiểm soát kiểu dữ liệu tĩnh cho toàn bộ mã nguồn frontend |
| | Tailwind CSS | 4.x | Thiết kế giao diện utility-first, responsive đa thiết bị |
| | ESLint | 9.x | Đảm bảo chuẩn cú pháp và quy tắc mã nguồn frontend |
| **Backend** | NestJS | 12.x | Khung phát triển REST API hướng module chuẩn doanh nghiệp |
| | Express Platform | 5.x | HTTP Server engine nền tảng cho NestJS |
| | TypeScript | 5.x / 6.x | Kiểm soát kiểu tĩnh cho backend controller/service |
| | Vitest | 4.x | Thực thi Unit Test và E2E Test tốc độ cao |
| | Oxlint | 1.x | Linter phân tích tĩnh mã nguồn TypeScript cực nhanh |
| **Monorepo** | npm Workspaces | >= 10.x | Quản lý đồng bộ đa gói và chạy scripts từ thư mục gốc |

---

## 4. Cấu trúc dự án

Dự án được tổ chức theo mô hình monorepo tinh gọn:

```text
brewlite_v01/
├── frontend/                     # Phân hệ giao diện Next.js
│   ├── app/                      # Next.js App Router (pages, layouts)
│   │   ├── globals.css           # Cấu hình Tailwind CSS
│   │   ├── layout.tsx            # Root layout HTML & metadata
│   │   └── page.tsx              # Trang chủ hiển thị "Hello BrewLite"
│   ├── public/                   # Tài nguyên tĩnh
│   │   └── products/             # Vector SVG icons cho danh mục sản phẩm đồ uống
│   ├── .env.example              # Mẫu cấu hình môi trường Frontend
│   ├── eslint.config.mjs         # Cấu hình ESLint 9
│   ├── next.config.ts            # Cấu hình Next.js
│   ├── package.json              # Khai báo dependencies & scripts Frontend
│   └── tsconfig.json             # Cấu hình TypeScript Frontend
├── backend/                      # Phân hệ dịch vụ API NestJS
│   ├── src/                      # Mã nguồn logic nghiệp vụ NestJS
│   │   ├── products/             # Module quản lý danh mục sản phẩm (Task 2)
│   │   │   ├── products.types.ts # Định nghĩa interface Product
│   │   │   ├── products.data.ts  # Dữ liệu mẫu bất biến
│   │   │   ├── products.service.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.module.ts
│   │   │   ├── products.service.spec.ts
│   │   │   └── products.controller.spec.ts
│   │   ├── app.controller.spec.ts# Unit test cho AppController
│   │   ├── app.controller.ts     # Root HTTP Controller (GET /)
│   │   ├── app.module.ts         # Module gốc ứng dụng
│   │   ├── app.service.ts        # AppService cung cấp thông điệp Hello
│   │   └── main.ts               # Điểm khởi chạy NestJS (cổng 3001)
│   ├── test/                     # Kiểm thử tích hợp E2E
│   │   └── app.e2e-spec.ts       # Test kiểm tra GET / và GET /products
│   ├── .env.example              # Mẫu cấu hình môi trường Backend
│   ├── nest-cli.json             # Cấu hình Nest CLI
│   ├── package.json              # Khai báo dependencies & scripts Backend
│   ├── tsconfig.json             # Cấu hình TypeScript Backend
│   └── vitest.config.ts          # Cấu hình Vitest runner
├── docs/                         # Tài liệu nghiệm thu & quy trình Agile
│   ├── TASK-01.md                # Báo cáo nghiệm thu chi tiết Task 1
│   └── TASK-02.md                # Báo cáo nghiệm thu chi tiết Task 2
├── .env.example                  # Mẫu biến môi trường chung tại thư mục gốc
├── .gitignore                    # Cấu hình loại trừ Git (node_modules, dist, .next)
├── package.json                  # Cấu hình monorepo & npm workspaces
└── README.md                     # Tài liệu hướng dẫn sử dụng dự án
```

---

## 5. Yêu cầu môi trường

Trước khi cài đặt, hãy đảm bảo máy tính đã cài đặt các công cụ sau:
- **Node.js**: Phiên bản `>= 20.x` (đã kiểm tra tương thích trên Node.js v24.19.0).
- **npm**: Phiên bản `>= 10.x` (đã kiểm tra tương thích trên npm 11.17.0).
- **Git**: Đã cài đặt và cấu hình SSH hoặc Personal Access Token.
- **Hệ điều hành**: Windows 10/11, macOS hoặc Linux.

---

## 6. Hướng dẫn clone và cài đặt

### Bước 1: Clone repository
```bash
git clone https://github.com/vohuunghiaah/brewlite_v01.git
cd brewlite_v01
```

> **Lưu ý quan trọng:** Đảm bảo làm việc trên repository `brewlite_v01` (Assignment 1). Không thao tác trên repository `brewlite` (Assignment 2).

### Bước 2: Thiết lập biến môi trường
Tạo tệp `.env` từ `.env.example`:
```bash
# Trên Windows PowerShell:
Copy-Item .env.example .env

# Hoặc trên Linux/macOS:
cp .env.example .env
```

Nội dung `.env` mẫu:
```env
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Bước 3: Cài đặt dependencies
Cài đặt toàn bộ thư viện cho cả hai phân hệ:
```bash
# Cài đặt qua npm workspace từ thư mục gốc:
npm install

# Hoặc cài đặt độc lập từng thư mục:
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 7. Hướng dẫn chạy Backend (NestJS)

Mở một cửa sổ dòng lệnh (Terminal) tại thư mục dự án:

```bash
# Cách 1: Chạy từ thư mục gốc qua npm script
npm run dev:backend

# Cách 2: Chạy trực tiếp từ thư mục backend
cd backend
npm run start:dev
```

- Backend sẽ khởi chạy tại: **`http://localhost:3001`** (hoặc cổng được định nghĩa trong biến `PORT`).
- Console hiển thị log: `Backend is running on: http://localhost:3001`.

---

## 8. Hướng dẫn chạy Frontend (Next.js)

Mở một cửa sổ dòng lệnh (Terminal) thứ hai:

```bash
# Cách 1: Chạy từ thư mục gốc qua npm script
npm run dev:frontend

# Cách 2: Chạy trực tiếp từ thư mục frontend
cd frontend
npm run dev
```

- Frontend sẽ khởi chạy tại: **`http://localhost:3000`**.
- Truy cập trình duyệt để xem giao diện "Hello BrewLite".

---

## 9. URL truy cập và kiểm tra API

| Ứng dụng | Địa chỉ URL | Phương thức | Kết quả mong đợi |
|---|---|---|---|
| **Frontend** | `http://localhost:3000` | Browser GET | Giao diện Next.js hiển thị tiêu đề lớn **"Hello BrewLite"**, thông tin kiến trúc và trạng thái hệ thống |
| **Backend API (Root)** | `http://localhost:3001/` | HTTP GET | Chuỗi ký tự plain text: `Hello BrewLite API` (HTTP 200 OK) |
| **Backend API (Products)** | `http://localhost:3001/products` | HTTP GET | Danh sách JSON gồm 6 sản phẩm đồ uống (id, name, price, imageUrl) (HTTP 200 OK) |

### Lệnh kiểm tra nhanh API qua dòng lệnh:
```bash
# Kiểm tra Root API (Windows PowerShell / Bash):
curl http://localhost:3001
# Kết quả: Hello BrewLite API

# Kiểm tra Products API (Windows PowerShell):
Invoke-RestMethod http://localhost:3001/products | ConvertTo-Json -Depth 3

# Hoặc dùng curl:
curl http://localhost:3001/products
```

---

## 10. Cách chạy lint, test và build

Dự án cung cấp đầy đủ script chạy kiểm tra chất lượng từ thư mục gốc hoặc từng phân hệ:

### A. Kiểm tra mã nguồn (Lint)
```bash
# Chạy lint cho cả frontend và backend:
npm run lint

# Hoặc chạy riêng:
npm run lint:frontend
npm run lint:backend
```

### B. Kiểm thử tự động (Unit Test & E2E Test)
```bash
# Chạy unit test backend (AppController, ProductsService, ProductsController):
npm run test:backend

# Chạy e2e test backend (GET / và GET /products):
cd backend && npm run test:e2e
```

### C. Biên dịch bản sản xuất (Production Build)
```bash
# Build cả 2 phân hệ:
npm run build

# Hoặc build riêng từng phân hệ:
npm run build:frontend
npm run build:backend
```

---

## 11. Tiến độ hoàn thành các Task

### Task 1 — Khởi tạo dự án và cấu trúc (Đã hoàn thành)
- [x] Khởi tạo Monorepo cấu trúc rõ ràng (`frontend/`, `backend/`, `docs/`).
- [x] Thiết lập Frontend Next.js 16 (App Router, Tailwind CSS, TypeScript).
- [x] Hiển thị trang chủ với thông điệp "Hello BrewLite" responsive, hiện đại.
- [x] Thiết lập Backend NestJS 12 (TypeScript, REST API).
- [x] Endpoint `GET /` phản hồi thông báo `"Hello BrewLite API"` trên cổng 3001 (hỗ trợ cấu hình qua `PORT`).
- [x] Viết Unit Test và E2E Test kiểm tra endpoint `GET /`.
- [x] Cấu hình `.env.example` và `.gitignore` loại trừ triệt để tệp nhạy cảm và build artifact.
- [x] Soạn thảo tài liệu `README.md` và `docs/TASK-01.md`.

### Task 2 — API danh sách sản phẩm (Đã hoàn thành)
- [x] Xây dựng Module NestJS chuẩn: `ProductsModule`, `ProductsController`, `ProductsService`.
- [x] Endpoint `GET /products` trả về HTTP 200 OK và danh sách JSON menu.
- [x] Mỗi sản phẩm có đầy đủ 4 trường bắt buộc: `id`, `name`, `price`, `imageUrl`.
- [x] Các hình ảnh tham chiếu là vector SVG thật lưu tại `frontend/public/products/*.svg`.
- [x] Dữ liệu mẫu khớp 100% với thiết kế Figma Make App (Cà phê sữa đá, Americano, Cappuccino nóng, Trà đào cam sả, Cold Brew Muối, Bánh sừng bò sô-cô-la) cùng các nhãn hiển thị (Bán chạy, Mới, Yêu thích, Hot Trend).
- [x] 100% Unit test (9 tests) và E2E test (6 tests) vượt qua thành công.
- [x] Soạn thảo tài liệu nghiệm thu chi tiết `docs/TASK-02.md`.

---

## 12. Kế hoạch các Task tiếp theo (Product Backlog)

Các chức năng tiếp theo sẽ được hiện thực tuần tự theo quy trình Scrum:
- **Task 3 (Sprint 1)**: Trang Menu (Frontend) — Next.js gọi `/products`, render lưới sản phẩm, có loading/empty state.
- **Task 4 (Sprint 1)**: Chi tiết & tùy chọn sản phẩm — Màn hình chi tiết: chọn size (S/M/L) và topping, tự động tính giá.
- **Task 5 (Sprint 2)**: Giỏ hàng (Cart) — Thêm/sửa/xóa sản phẩm, lưu state bằng Zustand/Context, tính tổng tiền.
- **Task 6 (Sprint 2)**: API tạo đơn hàng — `POST /orders`, xác thực dữ liệu qua class-validator, trạng thái PENDING.
- **Task 7 (Sprint 2)**: Đăng ký / Đăng nhập — `POST /auth/register`, `POST /auth/login`, băm mật khẩu bcrypt, phát hành JWT.
- **Task 8 (Sprint 3)**: Thanh toán không tiền mặt — Tích hợp mock payment gateway, chuyển trạng thái PAID / PAYMENT_FAILED.
- **Task 9 (Sprint 3)**: Xác nhận đơn & Docker hóa — `GET /orders/me`, cấu hình Docker Compose chạy toàn bộ hệ thống.
- **Task 10 (Sprint 3)**: Nghiệp vụ nâng cao — Order State Machine, thanh toán Idempotent, kiểm soát tồn kho đồng thời và Loyalty Points.
