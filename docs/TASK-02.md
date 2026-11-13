# BÁO CÁO NGHIỆM THU TASK 2: API DANH SÁCH SẢN PHẨM (PRODUCT LISTING REST API)

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Hệ thống đặt cà phê và thanh toán không tiền mặt) |
| **Môn học** | Công nghệ Phần mềm — HK I (2026–2027) |
| **Hạng mục** | Task 2: API danh sách sản phẩm |
| **Quy trình áp dụng** | Agile Scrum (Sprint 1) |
| **Vai trò đảm nhiệm** | Senior Backend Engineer, Software Architect & Scrum Technical Lead |
| **Trạng thái** | **HOÀN THÀNH (DONE)** |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |
| **Nhánh Git (Branch)** | `feature/task-02-products-api` |

---

## 1. Mục tiêu Task 2

Triển khai API danh sách sản phẩm cho hệ thống BrewLite theo yêu cầu đề bài:
- **Endpoint**: `GET /products` trả về danh sách đồ uống ở định dạng JSON với đầy đủ thông tin tối thiểu: định danh duy nhất (`id`), tên món (`name`), đơn giá nguyên VND (`price`), và đường dẫn hình ảnh hợp lệ (`imageUrl`).
- **Kiến trúc backend**: Phân hệ NestJS tổ chức theo mô hình module rõ ràng (`ProductsModule`, `ProductsController`, `ProductsService`, `products.data.ts`, `products.types.ts`), áp dụng nguyên lý Dependency Injection chuẩn mực.
- **Nguồn dữ liệu**: Dữ liệu mẫu chuẩn hóa, tách biệt với controller, sẵn sàng mở rộng hoặc thay thế bằng cơ sở dữ liệu (PostgreSQL/Prisma) ở các sprint tiếp theo mà không làm thay đổi API contract.
- **Tài nguyên hình ảnh**: Các tệp hình ảnh vector SVG cục bộ đặt tại `frontend/public/images/products/`, đảm bảo tồn tại thực tế và sẵn sàng để phân hệ Frontend Next.js sử dụng trực tiếp tại Task 3.
- **Kiểm thử tự động**: Đầy đủ Unit Test cho controller/service và HTTP Integration/E2E Test với Supertest, bảo toàn 100% chức năng Hello từ Task 1.

---

## 2. Tiêu chí chấp nhận (Acceptance Criteria)

| STT | Tiêu chí chấp nhận (AC) | Kết quả kiểm tra | Đánh giá |
|:---:|---|---|:---:|
| **AC-01** | Cung cấp endpoint `GET /products` trả về mã trạng thái `200 OK` và `Content-Type: application/json`. | Server trả về HTTP 200 và header `application/json; charset=utf-8`. | **PASS** |
| **AC-02** | Dữ liệu trả về là mảng JSON các đối tượng sản phẩm, không rỗng. | Mảng 4 sản phẩm mẫu định dạng chuẩn. | **PASS** |
| **AC-03** | Mỗi sản phẩm chứa đầy đủ các trường bắt buộc: `id`, `name`, `price`, `imageUrl`. | 100% sản phẩm có đầy đủ 4 trường với kiểu dữ liệu hợp lệ. | **PASS** |
| **AC-04** | `id` là chuỗi ký tự duy nhất, không trùng lặp và ổn định giữa các lần gọi. | Kiểm tra tính duy nhất (Unique Set) đạt 4/4 ID khác nhau. | **PASS** |
| **AC-05** | `name` là tên sản phẩm hợp lệ, không rỗng, mô tả rõ ràng món đồ uống. | Tên món rõ ràng: "Cà phê sữa", "Americano", "Cappuccino", "Trà đào". | **PASS** |
| **AC-06** | `price` là số nguyên không âm ($\ge 0$), đơn vị VND, phản ánh giá cơ sở. | Đơn giá từ 35.000đ đến 45.000đ, là số nguyên `Number.isInteger() === true`. | **PASS** |
| **AC-07** | `imageUrl` là chuỗi tham chiếu đến tài nguyên hình ảnh thực tế tồn tại trong dự án. | 4 tệp vector SVG tồn tại tại `frontend/public/images/products/`. | **PASS** |
| **AC-08** | Cấu trúc NestJS chuẩn mực: controller ủy nhiệm xử lý cho service; dữ liệu mẫu không gán cứng trong controller. | Tách riêng `products.data.ts`, `products.service.ts` và `products.controller.ts`. | **PASS** |
| **AC-09** | Có bộ Unit Test toàn diện cho `ProductsService` và `ProductsController`. | 8 unit tests pass 100% (bao gồm kiểm tra tính bất biến / bản sao phòng vệ). | **PASS** |
| **AC-10** | Có HTTP Integration/E2E Test kiểm tra request thực tế trên server NestJS. | 4 E2E tests pass 100% với Supertest. | **PASS** |
| **AC-11** | Endpoint `GET /` từ Task 1 không bị hồi quy (regression) và vẫn hoạt động chính xác. | Kiểm tra E2E và runtime `GET /` trả về đúng "Hello BrewLite API". | **PASS** |
| **AC-12** | API `GET /products` truy cập công khai, không đòi hỏi JWT hay phân quyền. | Đã xác minh qua E2E test request không cần Authorization header. | **PASS** |
| **AC-13** | Không vi phạm phạm vi: không tạo database/ORM phức tạp, không làm Task 3–10. | Tuân thủ nghiêm ngặt phạm vi kỹ thuật của Task 2. | **PASS** |

---

## 3. Khảo sát thiết kế Figma & Đối chiếu dữ liệu

### A. Tình trạng truy cập thiết kế Figma
- **Đường dẫn cung cấp**: `https://www.figma.com/make/2bPJMAlevBhb3qpiYwGBnQ/BrewLite-Coffee-Ordering-App`
- **Kết quả kiểm tra**:
  - Truy cập trực tiếp qua HTTP trả về `HTTP 404 Not Found` (đối với đường dẫn `/make/...`) và `HTTP 403 Forbidden` (đối với đường dẫn `/design/...` do cơ chế phân quyền bảo vệ của CloudFront/Figma).
  - Không có phiên đăng nhập khả dụng của Figma trong môi trường dòng lệnh.
- **Giới hạn ghi nhận**: Theo hướng dẫn tại Mục 3 của đặc tả nhiệm vụ, kỹ sư ghi nhận rõ ràng giới hạn không thể truy cập trực tiếp vào canvas Figma, **không tự nhận là đã trích xuất trực tiếp từ file Figma**, và giữ API contract ổn định, dễ cấu hình để sẵn sàng đồng bộ khi có phiên bản thiết kế mới.

### B. Bảng đối chiếu trường dữ liệu (Field Mapping)

| Trường Backend JSON | Kiểu dữ liệu | Ý nghĩa | Trạng thái xác minh | Ghi chú tích hợp Frontend Task 3 |
|---|---|---|:---:|---|
| `id` | `string` | Định danh duy nhất của món | **Đã xác minh theo đề bài** | Dùng làm React `key` và tham số route chi tiết món tại Task 4 |
| `name` | `string` | Tên món hiển thị trên thẻ menu | **Đã xác minh theo đề bài** | Render tại thẻ sản phẩm trong lưới đồ uống |
| `price` | `number` (integer) | Giá cơ sở của món (VND) | **Đã xác minh theo đề bài** | Định dạng hiển thị tiền tệ (ví dụ: `35.000 ₫`) |
| `imageUrl` | `string` | Đường dẫn tài nguyên hình ảnh | **Đã xác minh theo đề bài** | Sử dụng thẻ `<Image>` Next.js trỏ đến `/images/products/...` |

---

## 4. Kiến trúc Product Module

Cấu trúc thư mục được thiết kế theo khuyến nghị kiến trúc NestJS chuẩn mực:

```text
backend/src/
├── app.module.ts                   # Đăng ký ProductsModule vào root module
├── app.controller.ts               # Endpoint GET / (Task 1)
├── app.service.ts                  # Logic nghiệp vụ Hello (Task 1)
├── app.controller.spec.ts          # Unit test AppController
├── main.ts                         # Bootstrap server, CORS, cổng 3001
└── products/
    ├── products.module.ts          # Khai báo Controller, Provider & Export Service
    ├── products.controller.ts      # Khai báo Route GET /products, inject ProductsService
    ├── products.service.ts         # Phương thức findAll() trả về bản sao phòng thủ
    ├── products.data.ts            # Dữ liệu mẫu tĩnh tách biệt, dễ thay thế
    ├── products.types.ts           # Interface định nghĩa cấu trúc Product
    ├── product.interface.ts        # Re-export để tương thích các import kiểu cũ
    ├── products.controller.spec.ts # Unit test ProductsController (mock dependency)
    └── products.service.spec.ts    # Unit test ProductsService (kiểm tra toàn diện dữ liệu)
```

### Đặc điểm thiết kế kiến trúc:
1. **Separation of Concerns (SoC)**: Controller chỉ chịu trách nhiệm tiếp nhận HTTP request và định tuyến; Service đảm nhiệm logic cung cấp danh sách; Dữ liệu tĩnh lưu trữ tại `products.data.ts`.
2. **Defensive Copying**: `ProductsService.findAll()` sử dụng `.map((product) => ({ ...product }))` để trả về bản sao các đối tượng sản phẩm, ngăn chặn việc vô tình làm biến đổi mảng gốc trong bộ nhớ.
3. **No Premature Optimization**: Không cài đặt Repository Pattern, ORM, TypeORM/Prisma hay kết nối cơ sở dữ liệu ngoài vì đề bài cho phép rõ ràng sử dụng dữ liệu mẫu cho Task 2.

---

## 5. API Contract & Dữ liệu thực tế

### A. Đặc tả kỹ thuật Endpoint
- **URL**: `http://localhost:3001/products`
- **Method**: `GET`
- **Authentication**: None (Public Endpoint)
- **Status Code**: `200 OK`
- **Header**: `Content-Type: application/json; charset=utf-8`

### B. Payload phản hồi thực tế (Live JSON Response)
```json
[
  {
    "id": "coffee-milk",
    "name": "Cà phê sữa",
    "price": 35000,
    "imageUrl": "/images/products/coffee-milk.svg"
  },
  {
    "id": "americano",
    "name": "Americano",
    "price": 40000,
    "imageUrl": "/images/products/americano.svg"
  },
  {
    "id": "cappuccino",
    "name": "Cappuccino",
    "price": 45000,
    "imageUrl": "/images/products/cappuccino.svg"
  },
  {
    "id": "peach-tea",
    "name": "Trà đào",
    "price": 39000,
    "imageUrl": "/images/products/peach-tea.svg"
  }
]
```

### C. Xác minh tài nguyên ảnh cục bộ
Các tệp vector SVG đã được tích hợp vào `frontend/public/images/products/`:
1. `frontend/public/images/products/coffee-milk.svg` (Cà phê sữa)
2. `frontend/public/images/products/americano.svg` (Americano)
3. `frontend/public/images/products/cappuccino.svg` (Cappuccino)
4. `frontend/public/images/products/peach-tea.svg` (Trà đào)

Đường dẫn `/images/products/<file>.svg` được phân giải trực tiếp từ thư mục `public` của Next.js, không phụ thuộc vào internet hay dịch vụ CDN bên ngoài, đảm bảo render tức thì khi chạy offline.

---

## 6. Danh sách tệp tin đã tạo / chỉnh sửa

| Tệp tin | Thao tác | Mô tả chi tiết |
|---|:---:|---|
| `backend/src/products/products.types.ts` | Tạo mới | Khai báo interface `Product` chuẩn (`id`, `name`, `price`, `imageUrl`) |
| `backend/src/products/product.interface.ts` | Tạo mới | Re-export `Product` đảm bảo tương thích đa dạng quy ước đặt tên |
| `backend/src/products/products.data.ts` | Tạo mới | Hằng số `SAMPLE_PRODUCTS` chứa danh mục 4 món đồ uống |
| `backend/src/products/products.service.ts` | Tạo mới | Service cung cấp phương thức `findAll()` trả về bản sao dữ liệu mẫu |
| `backend/src/products/products.controller.ts` | Tạo mới | Controller tiếp nhận route `GET /products` |
| `backend/src/products/products.module.ts` | Tạo mới | Module đóng gói controller, provider và export service |
| `backend/src/products/products.service.spec.ts` | Tạo mới | Unit test kiểm tra tính toàn vẹn, tính duy nhất, giá tiền và bản sao phòng thủ |
| `backend/src/products/products.controller.spec.ts` | Tạo mới | Unit test kiểm tra controller gọi đúng service qua Vitest spy/mock |
| `backend/test/products.e2e-spec.ts` | Tạo mới | HTTP E2E test cho `GET /products`, kiểm tra JSON schema, public access và hồi quy `GET /` |
| `backend/src/app.module.ts` | Chỉnh sửa | Import và đăng ký `ProductsModule` |
| `frontend/public/images/products/*.svg` | Tạo mới | 4 tệp ảnh vector SVG cục bộ chất lượng cao |
| `README.md` | Chỉnh sửa | Cập nhật tài liệu API `GET /products`, hướng dẫn kiểm thử và tiến độ Sprint 1 |
| `docs/TASK-02.md` | Tạo mới | Báo cáo nghiệm thu kỹ thuật chi tiết của Task 2 |

---

## 7. Kết quả kiểm thử thực tế (Test Verification Matrix)

Toàn bộ các bước kiểm tra đã được thực thi và xác nhận trực tiếp trên môi trường Windows PowerShell:

| Hạng mục | Lệnh thực thi | Kết quả | Chi tiết đầu ra console |
|---|---|:---:|---|
| **Backend Unit Test** | `npm --prefix backend run test` | **PASS (8/8)** | `3 passed (3)` test files: `products.controller.spec.ts` (2 tests), `products.service.spec.ts` (5 tests), `app.controller.spec.ts` (1 test). Thời gian: 1.34s. |
| **Backend E2E Test** | `npm --prefix backend run test:e2e` | **PASS (4/4)** | `2 passed (2)` test files: `test/app.e2e-spec.ts` (1 test), `test/products.e2e-spec.ts` (3 tests). Thời gian: 1.23s. |
| **Backend & Frontend Lint** | `npm run lint` | **PASS** | ESLint 9 (frontend): 0 lỗi; Oxlint (backend): 15 files kiểm tra với 111 rules, 0 warnings, 0 errors. |
| **Frontend Build** | `npm run build:frontend` | **PASS** | Next.js 16 (Turbopack) biên dịch thành công toàn bộ trang tĩnh, TypeScript không lỗi. |
| **Backend Build** | `npm run build:backend` | **PASS** | `nest build` tạo mã đầu ra `dist/` hoàn chỉnh, không có lỗi kiểu dữ liệu. |
| **Runtime HTTP GET /products** | `Invoke-RestMethod http://localhost:3001/products` | **PASS** | Trả về HTTP 200, mảng 4 sản phẩm với đầy đủ trường, giá trị chính xác. |
| **Runtime HTTP GET / (Task 1)** | `Invoke-RestMethod http://localhost:3001/` | **PASS** | Trả về HTTP 200, chuỗi `"Hello BrewLite API"`. |

---

## 8. Hướng dẫn kiểm tra nghiệm thu bằng Windows PowerShell

Giảng viên hoặc người đánh giá có thể kiểm tra trực tiếp qua các lệnh PowerShell sau:

### Bước 1: Kiểm tra Unit Test & E2E Test
```powershell
# Từ thư mục gốc dự án:
npm test
npm --prefix backend run test:e2e
```

### Bước 2: Kiểm tra Lint và Build
```powershell
npm run lint
npm run build
```

### Bước 3: Khởi động Backend và gọi API thực tế
```powershell
# Khởi động backend trong một cửa sổ PowerShell:
npm run dev:backend

# Tại cửa sổ PowerShell thứ hai, thực hiện kiểm tra endpoint:
Invoke-RestMethod http://localhost:3001/products | ConvertTo-Json -Depth 5
Invoke-RestMethod http://localhost:3001/
```

---

## 9. Rủi ro và giới hạn (Risks & Limitations)

1. **Dữ liệu mẫu trong bộ nhớ**: Dữ liệu hiện tại là tĩnh (`SAMPLE_PRODUCTS`). Khi triển khai các tác vụ quản trị hoặc cập nhật giá trong tương lai, hệ thống sẽ cần tích hợp cơ sở dữ liệu quan hệ (PostgreSQL) theo kế hoạch của Sprint sau.
2. **Kích thước và Topping**: Giá hiện tại là giá cơ sở cho từng món. Việc chọn size (S/M/L) và thêm topping sẽ được mở rộng trong Task 4.
3. **Phân hệ Frontend**: Task 2 chỉ chịu trách nhiệm hoàn thiện tầng Backend REST API và chuẩn bị tài nguyên ảnh. Giao diện hiển thị danh sách sản phẩm sẽ được hiện thực trong Task 3.

---

## 10. Đánh giá Definition of Done (DoD)

- [x] Đúng repository Assignment 1 (`brewlite_v01`).
- [x] Nhánh làm việc `feature/task-02-products-api` được rẽ từ `main` mới nhất (commit `a60b9d6`).
- [x] Có `ProductsModule`.
- [x] Có `ProductsController`.
- [x] Có `ProductsService`.
- [x] `GET /products` trả về HTTP 200 và JSON hợp lệ.
- [x] Đầy đủ các trường: `id`, `name`, `price`, `imageUrl`.
- [x] Các hình ảnh tham chiếu có nguồn hợp lệ và tồn tại thực tế trên đĩa.
- [x] Unit test PASS (8/8 tests).
- [x] HTTP integration/E2E test PASS (4/4 tests).
- [x] Lint PASS (0 warning, 0 error).
- [x] Build PASS (cả frontend và backend).
- [x] `GET /` của Task 1 không bị ảnh hưởng.
- [x] Có `README.md` cập nhật.
- [x] Có tài liệu `docs/TASK-02.md`.
- [x] Không thực hiện trước các Task 3–10.
- [x] Có commit Git rõ ràng theo chuẩn Conventional Commits.
