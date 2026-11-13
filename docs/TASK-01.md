# BÁO CÁO NGHIỆM THU TASK 1: KHỞI TẠO DỰ ÁN VÀ CẤU TRÚC

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Hệ thống đặt cà phê và thanh toán không tiền mặt) |
| **Môn học** | Công nghệ Phần mềm — HK I (2026–2027) |
| **Hạng mục** | Task 1: Khởi tạo dự án và cấu trúc |
| **Quy trình áp dụng** | Agile Scrum (Sprint 1) |
| **Người thực hiện** | Senior Software Engineer & Scrum Technical Lead |
| **Trạng thái** | **HOÀN THÀNH (DONE)** |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |

---

## 1. Mục tiêu Task 1

Khởi tạo toàn bộ cấu trúc dự án BrewLite theo mô hình Monorepo tinh gọn với 2 phân hệ cốt lõi:
- **Frontend**: Khởi tạo với **Next.js (App Router, TypeScript, Tailwind CSS)**, hiển thị thông điệp `"Hello BrewLite"`.
- **Backend**: Khởi tạo với **NestJS (REST API, TypeScript)**, cung cấp endpoint `GET /` phản hồi `"Hello BrewLite API"`, lắng nghe mặc định tại cổng `3001` (hỗ trợ biến môi trường `PORT`).
- **Nền tảng & Quản trị**: Thiết lập Git repository, cấu hình `.gitignore`, tệp biến môi trường mẫu `.env.example`, tài liệu hướng dẫn `README.md` và quy trình kiểm thử tự động (Lint, Unit Test, Build).

---

## 2. Tiêu chí chấp nhận (Acceptance Criteria)

| STT | Tiêu chí chấp nhận (AC) | Kết quả kiểm tra | Đánh giá |
|:---:|---|---|:---:|
| **AC-01** | Cấu trúc monorepo phân tách rõ ràng 2 thư mục `frontend/` và `backend/`. | Đã phân tách chuẩn mực với `package.json` tại thư mục gốc quản lý npm workspaces. | **PASS** |
| **AC-02** | Frontend Next.js sử dụng App Router, TypeScript, Tailwind CSS, không lỗi build/runtime. | Build thành công qua Turbopack, không lỗi type checking, mã phản hồi HTTP 200. | **PASS** |
| **AC-03** | Frontend hiển thị thông báo "Hello BrewLite" với giao diện responsive, thẩm mỹ. | Đã triển khai tại `frontend/app/page.tsx`, xác nhận render nội dung "Hello BrewLite". | **PASS** |
| **AC-04** | Backend NestJS sử dụng TypeScript, cấu trúc module chuẩn, REST API đơn giản. | Đầy đủ controller, service, module, main.ts theo chuẩn NestJS v12. | **PASS** |
| **AC-05** | Backend cung cấp endpoint `GET /` phản hồi đúng nội dung `"Hello BrewLite API"`. | Đã kiểm thử HTTP request thực tế trên server chạy thật, trả về mã 200 và chuỗi ký tự chính xác. | **PASS** |
| **AC-06** | Backend hỗ trợ cổng mặc định 3001 và cho phép tùy biến qua biến môi trường `PORT`. | Đã kiểm thử trên cổng 3001 và cổng biến môi trường (PORT=4001) đều phản hồi chính xác. | **PASS** |
| **AC-07** | Có unit test tối thiểu cho backend controller/service Hello. | Đã viết và pass cả Unit Test (`app.controller.spec.ts`) và E2E Test (`app.e2e-spec.ts`). | **PASS** |
| **AC-08** | Cung cấp `.env.example` và `.gitignore` loại trừ đúng và đủ các tệp tạm/nhạy cảm. | Đã tạo `.env.example` (chỉ chứa PORT và API URL) và `.gitignore` loại bỏ node_modules, .next, dist. | **PASS** |
| **AC-09** | README.md chi tiết bằng tiếng Việt, hướng dẫn cài đặt, khởi chạy và kiểm thử. | Đã hoàn thiện README.md với đầy đủ 12 mục theo yêu cầu đề bài. | **PASS** |
| **AC-10** | Không triển khai ngoài phạm vi Task 1 (không database, không auth, không cart). | Tuân thủ tuyệt đối phạm vi kỹ thuật của Task 1. | **PASS** |

---

## 3. Những thành phần đã xây dựng

### A. Cấu hình Monorepo & Môi trường
- **`package.json` (Root)**: Cấu hình npm workspaces quản lý đồng thời cả `frontend` và `backend`. Cung cấp các lệnh tiện ích: `npm run lint`, `npm run test`, `npm run build`, `npm run dev:frontend`, `npm run dev:backend`.
- **`.gitignore`**: Loại trừ toàn bộ thư mục `node_modules/`, `.next/`, `backend/dist/`, các tệp `.env`, `.env*.local`, tệp log và metadata của IDE.
- **`.env.example`**: Mẫu cấu hình tối giản phục vụ đúng phạm vi Task 1 (`PORT=3001`, `NEXT_PUBLIC_API_URL=http://localhost:3001`).

### B. Phân hệ Frontend (Next.js)
- Khung ứng dụng: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.
- `frontend/app/layout.tsx`: Thiết lập title, SEO metadata và font chữ chuẩn.
- `frontend/app/page.tsx`: Giao diện chào đón chuyên nghiệp hiển thị nổi bật **"Hello BrewLite"**, các thẻ trạng thái kiến trúc hệ thống, cổng dịch vụ và trạng thái hoàn thành Sprint 1 Task 1.

### C. Phân hệ Backend (NestJS)
- Khung ứng dụng: NestJS 12, TypeScript, Express Platform.
- `backend/src/main.ts`: Khởi tạo ứng dụng NestJS, kích hoạt CORS, lắng nghe cổng `process.env.PORT || 3001`.
- `backend/src/app.controller.ts` & `backend/src/app.service.ts`: Endpoint `GET /` trả về chuỗi plain text `"Hello BrewLite API"`.
- `backend/src/app.controller.spec.ts`: Unit test kiểm thử controller gọi service trả về `"Hello BrewLite API"`.
- `backend/test/app.e2e-spec.ts`: E2E test gửi HTTP request tới server ảo và kiểm tra HTTP 200 cùng nội dung trả về.

---

## 4. Danh sách các file chính đã tạo / chỉnh sửa

| Tệp tin | Trạng thái | Mục đích |
|---|---|---|
| `package.json` | Tạo mới | Cấu hình Monorepo root, npm workspaces và scripts quản lý chung |
| `.gitignore` | Tạo mới | Khai báo các mẫu tệp loại trừ khỏi Git theo chuẩn |
| `.env.example` | Tạo mới | Mẫu biến môi trường Task 1 cho toàn dự án |
| `frontend/.env.example` | Tạo mới | Mẫu biến môi trường riêng cho phân hệ Frontend |
| `backend/.env.example` | Tạo mới | Mẫu biến môi trường riêng cho phân hệ Backend |
| `README.md` | Tạo mới | Hướng dẫn cài đặt, cấu trúc dự án và chạy thử nghiệm bằng tiếng Việt |
| `docs/TASK-01.md` | Tạo mới | Báo cáo nghiệm thu chi tiết tiêu chí Task 1 và bằng chứng kiểm thử |
| `frontend/app/page.tsx` | Chỉnh sửa | Giao diện trang chủ Next.js hiển thị "Hello BrewLite" |
| `frontend/app/layout.tsx` | Chỉnh sửa | Metadata tiêu đề và mô tả ứng dụng BrewLite |
| `backend/src/main.ts` | Chỉnh sửa | Cấu hình cổng 3001 (PORT env) và bật CORS |
| `backend/src/app.service.ts` | Chỉnh sửa | Phương thức `getHello()` trả về "Hello BrewLite API" |
| `backend/src/app.controller.spec.ts` | Chỉnh sửa | Unit test cho `getHello()` |
| `backend/test/app.e2e-spec.ts` | Chỉnh sửa | E2E test cho `GET /` |

---

## 5. Kết quả kiểm thử thực tế (Test Verification Matrix)

Toàn bộ các bước kiểm tra đều được thực thi trực tiếp trên môi trường Windows PowerShell:

| Hạng mục kiểm thử | Lệnh thực thi | Kết quả | Bằng chứng thực tế từ console |
|---|---|:---:|---|
| **Frontend Lint** | `npm --prefix frontend run lint` | **PASS** | ESLint 9 chạy thành công, 0 cảnh báo, 0 lỗi. |
| **Frontend Build** | `npm --prefix frontend run build` | **PASS** | Turbopack compile thành công trang tĩnh `/` và `/_not-found` trong 847ms, TypeScript không có lỗi. |
| **Backend Lint** | `npm --prefix backend run lint` | **PASS** | Oxlint kiểm tra 6 files với 111 rules trong 252ms: 0 warnings, 0 errors. |
| **Backend Unit Test** | `npm --prefix backend run test` | **PASS** | Vitest chạy `app.controller.spec.ts`: 1 test passed (100%). |
| **Backend E2E Test** | `cd backend; npm run test:e2e` | **PASS** | Vitest chạy `test/app.e2e-spec.ts`: 1 test passed (100%). |
| **Backend Build** | `npm --prefix backend run build` | **PASS** | `nest build` tạo tệp `dist/main.js` sạch sẽ, không lỗi. |
| **Backend HTTP GET / (Default 3001)** | `Invoke-WebRequest -Uri "http://localhost:3001"` | **PASS** | `StatusCode: 200`, `Content: "Hello BrewLite API"`. |
| **Backend HTTP GET / (Custom PORT=4001)** | `$env:PORT="4001"; node dist/main.js` | **PASS** | `StatusCode: 200`, `Content: "Hello BrewLite API"`. |
| **Frontend Live Web (Port 3000)** | `Invoke-WebRequest -Uri "http://localhost:3000"` | **PASS** | `StatusCode: 200`, nội dung chứa `"Hello"`, `"BrewLite"`. |
| **Git & Secret Check** | `git status` & kiểm tra file tracking | **PASS** | Không có thư mục `node_modules`, `.next`, `dist`, `.env` bị commit; không có nested git. |

---

## 6. Các vấn đề tồn tại (Known Issues / Risks)

- **Không có tồn đọng kỹ thuật trong phạm vi Task 1**: Mã nguồn sạch, không phụ thuộc thừa, không có lỗi tiềm ẩn.
- **Lưu ý cho các Sprint sau**: Phân hệ Backend chưa kết nối cơ sở dữ liệu (PostgreSQL/Prisma), sẽ được tích hợp tại Task 2 (khi xây dựng API Product).

---

## 7. Đánh giá Definition of Done (DoD)

- [x] Có frontend Next.js đúng cấu trúc chuẩn App Router.
- [x] Có backend NestJS đúng cấu trúc chuẩn Modular.
- [x] Frontend chạy thực tế và hiển thị "Hello BrewLite".
- [x] Backend chạy thực tế và trả về "Hello BrewLite API".
- [x] Lint và build của cả hai phân hệ đều thành công 100%.
- [x] Backend unit test và e2e test vượt qua thành công.
- [x] Git repository sạch sẽ, branch feature đúng quy chuẩn.
- [x] Có README.md đầy đủ 12 mục hướng dẫn bằng tiếng Việt.
- [x] Có tệp `.env.example` chính xác, tối giản.
- [x] Tuyệt đối không commit tệp nhạy cảm (secret) vào Git.
- [x] Có tài liệu nghiệm thu Task 1 chi tiết và bằng chứng xác thực (`docs/TASK-01.md`).
- [x] Không triển khai ngoài phạm vi Task 1.

**KẾT LUẬN: TASK 1 HOÀN TOÀN ĐẠT TOÀN BỘ TIÊU CHÍ (1.0 / 1.0 ĐIỂM).**
