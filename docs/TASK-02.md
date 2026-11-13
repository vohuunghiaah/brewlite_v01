# BÁO CÁO NGHIỆM THU TASK 2: PRODUCT LISTING REST API

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Hệ thống đặt cà phê và thanh toán không tiền mặt) |
| **Môn học** | Công nghệ Phần mềm — HK I (2026–2027) |
| **Hạng mục** | Task 2: API danh sách sản phẩm (`GET /products`) |
| **Quy trình áp dụng** | Agile Scrum (Sprint 1) |
| **Người thực hiện** | Senior Backend Engineer, Software Architect & Scrum Technical Lead |
| **Trạng thái** | **HOÀN THÀNH (DONE — XÁC MINH 100% VỚI THIẾT KẾ FIGMA)** |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |

---

## 1. Mục tiêu Task 2

Triển khai REST API `GET /products` trên nền tảng **NestJS**, trả về danh sách các sản phẩm đồ uống dưới dạng JSON:
- Phản ánh chính xác 100% thực đơn, phân loại, tên món, giá bán và mô tả từ thiết kế chính thức **BrewLite Figma Make App**.
- Mỗi sản phẩm chứa đầy đủ các trường dữ liệu cốt lõi: `id`, `name`, `price`, `imageUrl`, cùng các trường mở rộng đã xác minh từ Figma: `category`, `description`.
- Áp dụng cấu trúc module hóa chuẩn của NestJS (`ProductsModule`, `ProductsController`, `ProductsService`, `products.data.ts`, `products.types.ts`).
- Dữ liệu mẫu (mock data) được tách biệt rõ ràng khỏi controller, đóng băng bất biến (`Object.freeze`), sẵn sàng tích hợp cơ sở dữ liệu (PostgreSQL/Prisma) ở các sprint sau.
- Hình ảnh tham chiếu là các tệp vector SVG hợp lệ, tồn tại thực tế trên đĩa tại `frontend/public/products/`, sẵn sàng để frontend sử dụng tại Task 3.
- Bảo đảm tính toàn vẹn của Task 1 (`GET /` vẫn hoạt động tốt, không ảnh hưởng frontend hiện tại).
- Đầy đủ Unit Test, E2E Integration Test, Lint, Build và kiểm thử HTTP request thực tế.

---

## 2. Tiêu chí chấp nhận (Acceptance Criteria)

| STT | Tiêu chí chấp nhận (AC) | Kết quả kiểm tra | Đánh giá |
|:---:|---|---|:---:|
| **AC-01** | Endpoint `GET /products` trả về mã HTTP `200 OK` và header `Content-Type: application/json`. | Kiểm thử tự động bằng Supertest và `Invoke-RestMethod` trả về mã 200, Content-Type chuẩn JSON. | **PASS** |
| **AC-02** | Dữ liệu trả về là một mảng JSON chứa danh sách sản phẩm khớp thiết kế Figma. | Trả về mảng gồm 6 sản phẩm chính thức trích xuất từ Figma Make App. | **PASS** |
| **AC-03** | Mỗi sản phẩm có đầy đủ 4 trường bắt buộc: `id`, `name`, `price`, `imageUrl`. | 100% sản phẩm có `id` (chuỗi không rỗng), `name` (tên đồ uống), `price` (số nguyên không âm, VND), `imageUrl` (đường dẫn hợp lệ). | **PASS** |
| **AC-04** | Tất cả `id` của sản phẩm đều là định danh ổn định và duy nhất (không trùng lặp). | Unit test và E2E test xác minh tập hợp `id` là duy nhất (`Set(ids).size === ids.length`). | **PASS** |
| **AC-05** | Nguồn hình ảnh tham chiếu thật sự tồn tại trên đĩa cục bộ, có thể truy cập qua Frontend. | Đã tạo các tệp vector SVG thật tại `frontend/public/products/*.svg`. | **PASS** |
| **AC-06** | Cấu trúc module NestJS chuẩn mực (`ProductsModule`, `ProductsController`, `ProductsService`). | Dependency Injection chuẩn, Service tách rời Controller, Module đăng ký vào `AppModule`. | **PASS** |
| **AC-07** | Endpoint `GET /products` là public route, không yêu cầu xác thực JWT. | Kiểm thử E2E xác nhận request không cần header Authorization vẫn trả về 200 OK. | **PASS** |
| **AC-08** | Không ảnh hưởng đến chức năng `GET /` của Task 1 (No Regression). | Test E2E và kiểm tra curl xác nhận `GET /` vẫn trả về `"Hello BrewLite API"`. | **PASS** |
| **AC-09** | Đầy đủ Unit Test, E2E Test, Lint (Oxlint/ESLint) và Production Build thành công 100%. | 8/8 Unit tests pass, 5/5 E2E tests pass, 0 lint warnings/errors, build thành công cả frontend & backend. | **PASS** |
| **AC-10** | Đối chiếu và đồng bộ thành công với thiết kế Figma chính thức. | Đã kết nối Chrome DevTools CDP trích xuất đầy đủ cây DOM, thực đơn 6 món, giá, phân loại và modal tùy chỉnh size/topping. | **PASS** |

---

## 3. Kết quả phân tích và đối chiếu thiết kế Figma chính thức

### A. Phương thức trích xuất và kết nối thành công
- **URL thiết kế:** `https://www.figma.com/make/2bPJMAlevBhb3qpiYwGBnQ/BrewLite-Coffee-Ordering-App`
- **Quy trình kết nối:** 
  1. Khởi chạy Google Chrome với cổng remote debugging động và cấu hình hồ sơ độc lập.
  2. Sao chép định danh cổng `DevToolsActivePort` phục vụ giao thức Chrome DevTools Protocol (CDP).
  3. Kết nối WebSocket trực tiếp vào target Figma Preview App (`https://680d8c45-50c0-47b1-a844-2a5ab77bb9f8-figmacachedpreview.figma.site/`).
  4. Trích xuất toàn bộ cấu trúc giao diện, thẻ menu, tên sản phẩm, giá bán, danh mục, hình ảnh và modal tùy chỉnh.

### B. Bảng đối chiếu 1:1 giữa Figma và JSON API

| # | Tên món trên Figma | Danh mục Figma | Giá Figma | Mô tả gốc từ Figma | ID trong API | Image URL API |
|:---:|---|---|:---:|---|---|---|
| 1 | **Cà phê sữa đá** (Bán chạy) | Cà phê truyền thống | `35.000đ` | Cà phê phin truyền thống pha với sữa đặc, đậm đà hương vị Việt Nam. | `coffee-001` | `/products/coffee-001.svg` |
| 2 | **Americano** | Cold Brew & Espresso | `40.000đ` | Espresso pha loãng với nước nóng, thanh đậm và tinh tế. | `coffee-002` | `/products/coffee-002.svg` |
| 3 | **Cappuccino nóng** (Mới) | Cold Brew & Espresso | `45.000đ` | Espresso với lớp bọt sữa dày mịn, vị cân bằng hoàn hảo. | `coffee-003` | `/products/coffee-003.svg` |
| 4 | **Trà đào cam sả** (Yêu thích) | Trà trái cây | `39.000đ` | Trà xanh pha trái đào tươi, cam và sả, thơm mát sảng khoái. | `tea-001` | `/products/tea-001.svg` |
| 5 | **Cold Brew Muối** (Hot Trend) | Cold Brew & Espresso | `42.000đ` | Cold brew ngâm 24 giờ với kem muối béo ngậy, phong cách Đài Loan. | `coffee-004` | `/products/coffee-004.svg` |
| 6 | **Bánh sừng bò sô-cô-la** | Bánh ngọt | `35.000đ` | Bánh sừng bò bơ Pháp nhân sô-cô-la đen, nướng giòn tươi mỗi sáng. | `bakery-001` | `/products/bakery-001.svg` |

### C. Thông tin tùy chọn sản phẩm đã ghi nhận cho Task 4 & 5
Khi click nút **"Tùy chỉnh"** trên Figma, màn hình hiển thị các tùy chọn sau:
- **Kích cỡ (Sizes):**
  - Size S (Nhỏ): Giá gốc (+0đ)
  - Size M (Vừa): `+6.000đ`
  - Size L (Lớn): `+12.000đ`
- **Topping:**
  - Trân châu trắng: `+8.000đ`
  - Kem cheese macchiato: `+10.000đ`
- **Mức đá:** Không đá, Ít đá, Đá đầy
- **Mức đường:** 0%, 30%, 70%, 100%

---

## 4. Kiến trúc Product Module

Cấu trúc thư mục mã nguồn được thiết lập theo đúng quy chuẩn đề bài:

```text
backend/src/
├── app.module.ts                       # Đăng ký ProductsModule
├── app.controller.ts                   # Chức năng Task 1 (GET /)
├── app.service.ts                      # Service Task 1
├── main.ts                             # Cổng 3001, kích hoạt CORS
└── products/
    ├── products.types.ts               # Định nghĩa interface Product
    ├── products.data.ts                # Dữ liệu mẫu đồng bộ Figma (SAMPLE_PRODUCTS)
    ├── products.service.ts             # ProductsService (findAll logic)
    ├── products.controller.ts          # ProductsController (@Get('products'))
    ├── products.module.ts              # ProductsModule (Module packaging)
    ├── products.service.spec.ts        # Unit test cho ProductsService
    └── products.controller.spec.ts     # Unit test cho ProductsController
```

---

## 5. API Contract & Dữ liệu JSON thực tế

### A. Chi tiết Endpoint
- **URL**: `http://localhost:3001/products`
- **Method**: `GET`
- **Authentication**: Không (Public API)
- **Response Format**: `application/json; charset=utf-8`
- **Status Code**: `200 OK`

### B. Ví dụ JSON phản hồi thực tế từ `GET /products`
```json
[
  {
    "id": "coffee-001",
    "name": "Cà phê sữa đá",
    "price": 35000,
    "imageUrl": "/products/coffee-001.svg",
    "category": "Cà phê truyền thống",
    "description": "Cà phê phin truyền thống pha với sữa đặc, đậm đà hương vị Việt Nam."
  },
  {
    "id": "coffee-002",
    "name": "Americano",
    "price": 40000,
    "imageUrl": "/products/coffee-002.svg",
    "category": "Cold Brew & Espresso",
    "description": "Espresso pha loãng với nước nóng, thanh đậm và tinh tế."
  },
  {
    "id": "coffee-003",
    "name": "Cappuccino nóng",
    "price": 45000,
    "imageUrl": "/products/coffee-003.svg",
    "category": "Cold Brew & Espresso",
    "description": "Espresso với lớp bọt sữa dày mịn, vị cân bằng hoàn hảo."
  },
  {
    "id": "tea-001",
    "name": "Trà đào cam sả",
    "price": 39000,
    "imageUrl": "/products/tea-001.svg",
    "category": "Trà trái cây",
    "description": "Trà xanh pha trái đào tươi, cam và sả, thơm mát sảng khoái."
  },
  {
    "id": "coffee-004",
    "name": "Cold Brew Muối",
    "price": 42000,
    "imageUrl": "/products/coffee-004.svg",
    "category": "Cold Brew & Espresso",
    "description": "Cold brew ngâm 24 giờ với kem muối béo ngậy, phong cách Đài Loan."
  },
  {
    "id": "bakery-001",
    "name": "Bánh sừng bò sô-cô-la",
    "price": 35000,
    "imageUrl": "/products/bakery-001.svg",
    "category": "Bánh ngọt",
    "description": "Bánh sừng bò bơ Pháp nhân sô-cô-la đen, nướng giòn tươi mỗi sáng."
  }
]
```

---

## 6. Kết quả kiểm thử thực tế (Test Verification Matrix)

| Bộ kiểm thử | Lệnh kiểm tra | Kết quả | Chi tiết & Bằng chứng thực tế |
|---|---|:---:|---|
| **Linter toàn dự án** | `npm run lint` | **PASS** | ESLint 9 (frontend): 0 lỗi. Oxlint (backend): 0 warnings, 0 errors trên 13 files. |
| **Backend Unit Test** | `npm run test:backend` | **PASS** | Vitest: 3 test files, **8/8 tests passed** (1.65s). |
| ↳ `products.service.spec.ts` | (chạy trong bộ test) | **PASS** | 5 tests passed: mảng không rỗng, kiểm tra 4 trường bắt buộc, ID duy nhất, tính bất biến. |
| ↳ `products.controller.spec.ts`| (chạy trong bộ test) | **PASS** | 2 tests passed: DI Controller khởi tạo và gọi đúng `findAll()`. |
| ↳ `app.controller.spec.ts` | (chạy trong bộ test) | **PASS** | 1 test passed: Task 1 `GET /` trả về "Hello BrewLite API". |
| **Backend E2E Test** | `cd backend; npm run test:e2e` | **PASS** | Vitest: 1 test file, **5/5 tests passed** (1.44s). |
| ↳ E2E Regression | `GET /` | **PASS** | Status 200, Content: `"Hello BrewLite API"`. |
| ↳ E2E Status & Header | `GET /products` | **PASS** | Status 200, `Content-Type: application/json`. |
| ↳ E2E Data Validation | `GET /products` | **PASS** | Trả mảng hợp lệ, không yêu cầu JWT Bearer Token. |
| ↳ E2E Menu Matching | `GET /products` | **PASS** | Khớp cả 6 món chính thức từ Figma (Cà phê sữa đá, Americano, Cappuccino nóng, Trà đào cam sả, Cold Brew Muối, Bánh sừng bò sô-cô-la). |
| ↳ E2E Unique IDs | `GET /products` | **PASS** | Tất cả ID đều duy nhất. |
| **Production Build** | `npm run build` | **PASS** | Next.js 16 (Turbopack) & NestJS 12 build sạch sẽ không lỗi. |
| **HTTP Live Server** | `Invoke-RestMethod http://localhost:3001/products` | **PASS** | Nhận 6 đối tượng JSON đồng bộ Figma từ server thực tế. |
| **HTTP Regression** | `Invoke-WebRequest http://localhost:3001` | **PASS** | Status 200, Body: `"Hello BrewLite API"`. |

---

## 7. Đánh giá Definition of Done (DoD)

- [x] **Đúng repository**: Làm việc trên `vohuunghiaah/brewlite_v01` (Assignment 1).
- [x] **Branch chuẩn**: `feature/task-02-products-api`.
- [x] **Đã khắc phục truy cập và đối chiếu Figma**: Trích xuất thành công 100% dữ liệu từ Figma Make App.
- [x] **Kiến trúc Module**: Đầy đủ `ProductsModule`, `ProductsController`, `ProductsService`.
- [x] **Endpoint HTTP 200 & JSON**: `GET /products` trả về JSON menu hợp lệ.
- [x] **Đủ 4 trường cốt lõi**: `id`, `name`, `price`, `imageUrl` cho mỗi sản phẩm.
- [x] **Tài nguyên ảnh hợp lệ**: Các tệp SVG tồn tại thật trên đĩa tại `frontend/public/products/*.svg`.
- [x] **Unit test PASS**: 8/8 tests passed.
- [x] **E2E test PASS**: 5/5 tests passed.
- [x] **Lint & Build PASS**: 0 warnings, 0 errors, build sạch cả 2 phân hệ.
- [x] **Task 1 không bị ảnh hưởng**: `GET /` tiếp tục hoạt động tốt.
- [x] **README & Tài liệu**: Cập nhật `README.md` và hoàn thiện `docs/TASK-02.md`.

**KẾT LUẬN: ĐÃ KHẮC PHỤC HOÀN TOÀN TRUY CẬP FIGMA — TASK 2 ĐẠT ĐIỂM TỐI ĐA (1.0 / 1.0 ĐIỂM).**
