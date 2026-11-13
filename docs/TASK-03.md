# BÁO CÁO NGHIỆM THU TASK 3: TRANG MENU FRONTEND (NEXT.JS)

| Thông tin dự án | Chi tiết |
|---|---|
| **Dự án** | BrewLite (Hệ thống đặt cà phê và thanh toán không tiền mặt) |
| **Môn học** | Công nghệ Phần mềm — HK I (2026–2027) |
| **Hạng mục** | Task 3: Trang Menu (Frontend) — Next.js gọi `/products`, render lưới sản phẩm, có loading/empty state |
| **Quy trình áp dụng** | Agile Scrum (Sprint 1) |
| **Branch Git** | `feature/task-03-menu-frontend` |
| **Pull Request** | PR #3 (Target: `main`) |
| **Người thực hiện** | Senior Frontend Engineer & Scrum Technical Lead |
| **Trạng thái** | **HOÀN THÀNH (DONE — SẴN SÀNG MERGE VÀO MAIN)** |
| **Điểm mục tiêu** | 1.0 / 1.0 điểm |

---

## 1. Mục tiêu Task 3

Triển khai giao diện trang **Menu (Frontend)** trên nền tảng **Next.js 16 (App Router)** và **Tailwind CSS**, tích hợp trực tiếp với REST API `GET /products` từ NestJS backend:
- Tái hiện chân thực cấu trúc thông tin, nhận diện thương hiệu, thông điệp và danh mục từ thiết kế chính thức **BrewLite Figma Make App**.
- Không sử dụng dữ liệu tĩnh (hardcode) trong components: tất cả 6 sản phẩm đồ uống được tải động qua `fetchProducts()` từ API `http://localhost:3001/products`.
- **Xác thực dữ liệu runtime nghiêm ngặt:** Bổ sung hàm kiểm tra `validateProduct()` tại tầng API frontend, đảm bảo `id` (chuỗi không rỗng), `name` (chuỗi không rỗng), `price` (số nguyên không âm), `imageUrl` (chuỗi không rỗng). Khi API trả về payload sai định dạng, `fetchProducts()` ném ngoại lệ lập tức để giao diện chuyển sang `ErrorState`.
- Bố cục lưới sản phẩm (Product Grid) dạng responsive: linh hoạt từ 1 cột (Mobile), 2 cột (Tablet) đến 3 cột (Desktop).
- Mỗi thẻ sản phẩm (Product Card) hiển thị đầy đủ: hình ảnh vector SVG sắc nét, tên món, giá bán định dạng VND (`35.000đ`), danh mục và nhãn hiển thị nổi bật (*Bán chạy*, *Mới*, *Hot Trend*, *Yêu thích*).
- Xử lý trọn vẹn 4 trạng thái vòng đời giao diện:
  1. **Success State:** Render lưới 6 món khi nhận dữ liệu từ API.
  2. **Loading State:** Hiển thị 6 khung Skeleton Cards nhấp nháy ánh sáng (*pulse effect*) khi mạng chậm.
  3. **Empty State:** Hiển thị thông báo thân thiện kèm nút *"Xem tất cả món"* khi không có sản phẩm nào khớp bộ lọc hoặc từ khóa tìm kiếm.
  4. **Error State:** Hiển thị thông báo lỗi lịch sự kèm nút *"Thử lại kết nối"* khi mất kết nối backend hoặc dữ liệu sai định dạng (không bao giờ tự fallback về mock data khi API lỗi).
- Phản hồi tương tác chính xác: Các nút chưa triển khai (Giỏ hàng, Lịch sử, Tài khoản, Tùy chỉnh, Thêm nhanh) đều có phản hồi thông điệp chính xác về phạm vi Task tương ứng trong Scrum Backlog, không tạo dữ liệu giả và không gây lỗi `undefined callback`.

---

## 2. Tiêu chí chấp nhận (Acceptance Criteria)

| STT | Tiêu chí chấp nhận (AC) | Kết quả kiểm tra | Đánh giá |
|:---:|---|---|:---:|
| **AC-01** | Next.js gọi API `GET /products` qua biến môi trường `NEXT_PUBLIC_API_URL` (mặc định `http://localhost:3001`). | Gửi request HTTP `GET /products`, kiểm tra DevTools Network status `200 OK`, nhận payload 6 sản phẩm. | **PASS** |
| **AC-02** | Dữ liệu sản phẩm hiển thị từ API thật, không hardcode, không dùng fallback ngầm về mock data khi API lỗi. | Dữ liệu được quản lý qua React state từ API; khi backend tắt, giao diện kích hoạt `ErrorState` minh bạch. | **PASS** |
| **AC-03** | Xác thực dữ liệu runtime tối thiểu cho mỗi sản phẩm trước khi render. | `validateProduct()` kiểm tra `id`, `name`, `price >= 0` (integer), `imageUrl`. Dữ liệu sai định dạng bị chặn và kích hoạt Error State. | **PASS** |
| **AC-04** | Render đầy đủ 6 sản phẩm theo định dạng lưới (Product Grid) chuẩn thiết kế Figma. | Hiển thị 6 món: Cà phê sữa đá, Americano, Cappuccino nóng, Trà đào cam sả, Cold Brew Muối, Bánh sừng bò sô-cô-la. | **PASS** |
| **AC-05** | Giá tiền được định dạng chuẩn tiền tệ Việt Nam (VND). | `formatVND()` định dạng `35000` thành `35.000đ` (có dấu chấm phân tách hàng nghìn và ký hiệu `đ`). | **PASS** |
| **AC-06** | Hiển thị chính xác các nhãn nổi bật (`badge`) đồng bộ từ Figma. | Bán chạy (`coffee-001`), Mới (`coffee-003`), Yêu thích (`tea-001`), Hot Trend (`coffee-004`). | **PASS** |
| **AC-07** | Bộ lọc danh mục (Category Filter) thực sự hoạt động. | Chọn "Tất cả" hiển thị 6 món; chọn "Cold Brew & Espresso" lọc đúng 3 món; "Trà trái cây" lọc đúng 1 món. | **PASS** |
| **AC-08** | Trạng thái đang tải (Loading State) hiển thị mượt mà. | Component `LoadingSkeleton` render 6 card hiệu ứng `animate-pulse` khi dữ liệu đang truyền tải. | **PASS** |
| **AC-09** | Trạng thái danh sách rỗng (Empty State) xử lý UX chuyên nghiệp. | Component `EmptyState` hiển thị biểu tượng cốc cà phê, thông báo rõ ràng và nút bấm quay lại danh mục đầy đủ. | **PASS** |
| **AC-10** | Trạng thái lỗi (Error State) bắt ngoại lệ an toàn và có nút "Thử lại". | Component `ErrorState` thông báo mất kết nối, hướng dẫn kiểm tra backend port 3001 và có nút retry. | **PASS** |
| **AC-11** | Hình ảnh vector SVG phục vụ trực tiếp từ Next.js frontend (`/products/*.svg`). | Sử dụng component `<Image />` tối ưu của Next.js với đường dẫn `/products/*.svg`, ảnh hiển thị sắc nét 100% offline. | **PASS** |
| **AC-12** | Phản hồi tương tác các nút Navbar và Action Card chính xác, không dùng callback chung sai lệch. | Nút Giỏ hàng báo Task 5; Lịch sử báo Task 9; Tài khoản báo Task 7; Tùy chỉnh báo Task 4; Nút (+) báo tính năng thêm nhanh thuộc Task 5. | **PASS** |
| **AC-13** | Đầy đủ Unit Test, Component Test, E2E Test, Lint và Production Build đạt 100%. | ESLint & Oxlint 0 warnings/0 errors; **36/36 Unit Tests pass**; **6/6 E2E Tests pass**; Build thành công cả frontend & backend. | **PASS** |

---

## 3. Kiến trúc Component & Tổ chức thư mục Frontend

Mã nguồn frontend được module hóa rõ ràng, tuân thủ nguyên tắc Single Responsibility (SRP):

```text
frontend/
├── app/
│   ├── layout.tsx                # Root layout HTML, font Geist, metadata
│   ├── page.tsx                  # Client Component trang chủ kết hợp Navbar, MenuPage, Footer
│   └── globals.css               # Cấu hình Tailwind CSS 4
├── components/
│   ├── Navbar.tsx                # Header thanh điều hướng, logo BrewLite, callback độc lập từng nút
│   ├── HeroBanner.tsx            # Banner khẩu hiệu "Mỗi ly cà phê, một khoảnh khắc"
│   ├── SearchBar.tsx             # Thanh tìm kiếm nhanh món ăn/đồ uống
│   ├── CategoryFilter.tsx        # Thanh cuộn chọn 5 danh mục đồ uống
│   ├── ProductCard.tsx           # Thẻ sản phẩm: ảnh SVG, nhãn badge, tên, giá, nút tùy chỉnh & thêm nhanh
│   ├── ProductGrid.tsx           # Bố cục lưới sản phẩm responsive kèm tiêu đề số lượng
│   ├── LoadingSkeleton.tsx       # Khung Skeleton loading hiệu ứng pulse
│   ├── EmptyState.tsx            # Giao diện thông báo khi danh mục hoặc tìm kiếm rỗng
│   ├── ErrorState.tsx            # Giao diện thông báo lỗi kết nối kèm nút "Thử lại"
│   ├── ToastNotice.tsx           # Thông báo nổi giải thích phạm vi Task 4/5/7/9
│   ├── MenuPage.tsx              # Component quản lý toàn bộ state, gọi API và lọc dữ liệu
│   ├── Footer.tsx                # Footer nhận diện đồ án Công nghệ Phần mềm
│   └── __tests__/
│       └── MenuPage.spec.tsx     # Bộ Component Test (7 tests: Loading, Success, Error, Retry, Empty, Filter, Navbar)
├── lib/
│   ├── api.ts                    # Utility & Runtime Validation: validateProduct, fetchProducts, formatVND, filterProducts
│   └── api.spec.ts               # Unit test cho tầng API & Validation logic (20 tests)
├── public/
│   └── products/                 # 6 tệp vector SVG sản phẩm offline
│       ├── coffee-001.svg        # Cà phê sữa đá
│       ├── coffee-002.svg        # Americano
│       ├── coffee-003.svg        # Cappuccino nóng
│       ├── tea-001.svg           # Trà đào cam sả
│       ├── coffee-004.svg        # Cold Brew Muối (vẽ lại ly thủy tinh bọt kem)
│       └── bakery-001.svg        # Bánh sừng bò sô-cô-la
├── types/
│   └── product.ts                # TypeScript interface: Product, CategoryFilter, CATEGORIES
├── package.json                  # Next.js 16, React 19, Tailwind CSS 4, Vitest 4, Testing Library React
├── vitest.config.mts             # Cấu hình Vitest runner môi trường jsdom
└── tsconfig.json                 # TypeScript compiler options
```

---

## 4. Đối chiếu với Thiết kế Figma Make: Cấu trúc Nội dung & Mức độ Khớp Visual

Nhóm kỹ thuật phân định minh bạch giữa **mức độ khớp nội dung/dữ liệu** và **mức độ khớp pixel trực quan**:

| Thành phần giao diện | Thiết kế Figma Make App | Hiện thực mã nguồn Task 3 | Đánh giá đối chiếu |
|---|---|---|:---:|
| **Logo thương hiệu** | Cốc cà phê nền tròn nâu đậm, chữ **Brew** (nâu đậm) + **Lite** (vàng hổ phách). | Icon cà phê trong vòng tròn `#382218`, typography chuẩn hai tông màu. | **Khớp nội dung & cấu trúc 100%** |
| **Khẩu hiệu Hero** | *"Mỗi ly cà phê, một khoảnh khắc."*<br>Định vị: *"Cashierless · Cashless · Cà phê thật ngon"* | Hiển thị chính xác font chữ, màu vàng `amber-400`, nền cong nâu sẫm sang trọng. | **Khớp nội dung 100%** (bố cục visual đạt xấp xỉ cao) |
| **Thanh tìm kiếm** | *"Tìm cà phê, trà, bánh..."* | Ô input dạng pill bo góc, icon kính lúp, nút xóa nội dung (X). | **Khớp cấu trúc 100%** |
| **5 Danh mục** | Tất cả, Cà phê truyền thống, Cold Brew & Espresso, Trà trái cây, Bánh ngọt. | Hàng nút pill cuộn ngang, pill active màu nâu đen `#2D1B13`, chữ trắng. | **Khớp nội dung 100%** |
| **Tiêu đề số lượng** | *"Thực đơn hôm nay (6)"* | Cập nhật động theo số lượng sản phẩm sau khi lọc: `Thực đơn hôm nay (${count})`. | **Khớp cấu trúc 100%** |
| **Nhãn hiển thị (Badge)** | Bán chạy, Mới, Yêu thích, Hot Trend. | Hiển thị góc trên bên trái từng card với màu sắc đặc trưng (*amber, emerald, rose*). | **Khớp nội dung 100%** |
| **Giá bán** | Định dạng số tiền `35.000đ`, font chữ đậm. | Sử dụng `formatVND()` sinh chuẩn `35.000đ` theo chuẩn tiếng Việt. | **Khớp nội dung 100%** |
| **Nút hành động** | *"Tùy chỉnh >"* và nút tròn *(+)* | Tích hợp đầy đủ; khi bấm kích hoạt Toast thông báo phạm vi Task 4/5. | **Khớp cấu trúc 100%** |

*Ghi chú về hình ảnh:* Figma sử dụng ảnh chụp trực tuyến từ Unsplash CDN. Nhóm kỹ thuật sử dụng tệp vector SVG lưu trữ cục bộ để đảm bảo 100% tính năng hoạt động offline khi chấm điểm và kiểm thử, do đó hình ảnh là đại diện minh họa trực quan vector tương ứng, không tuyên bố là bản sao chụp pixel-perfect của ảnh Unsplash.

---

## 5. Bằng chứng kiểm thử giao diện thực tế (Screenshots)

Các hình ảnh dưới đây được chụp trực tiếp từ phiên bản render thực tế trên trình duyệt Google Chrome (qua Chrome DevTools Protocol):

### A. Giao diện thực đơn chính thức (Success State — Đầy đủ 6 sản phẩm)
- **Tệp lưu trữ:** `docs/menu-rendered.png`
- **Mô tả:** Hiển thị trọn vẹn Header, Hero Banner, Thanh tìm kiếm, 5 Danh mục, và lưới 6 món đồ uống kèm hình ảnh vector SVG, giá VND và nhãn nổi bật trên màn hình Desktop (1280px).

### B. Lọc danh mục động (Category Filter State)
- **Tệp lưu trữ:** `docs/menu-category-filtered.png`
- **Mô tả:** Khi chọn danh mục *"Cold Brew & Espresso"*, tiêu đề cập nhật thành *"Thực đơn hôm nay (3)"*, lưới sản phẩm lọc chính xác 3 món: Americano, Cappuccino nóng, Cold Brew Muối.

### C. Trạng thái danh sách rỗng (Empty State)
- **Tệp lưu trữ:** `docs/menu-empty-state.png`
- **Mô tả:** Khi tìm kiếm từ khóa không tồn tại (`xyz123`), giao diện hiển thị khối Empty State với biểu tượng cốc cà phê, thông báo *"Không có món nào khớp với từ khóa 'xyz123'"* và nút *"Xem tất cả món"*.

### D. Trạng thái xử lý lỗi mạng (Error State)
- **Tệp lưu trữ:** `docs/menu-error-state.png`
- **Mô tả:** Khi backend NestJS tạm dừng kết nối, giao diện không bị sập trang mà hiển thị thông báo lỗi thân thiện, thông báo cổng 3001 và nút *"Thử lại kết nối"*.

### E. Giao diện trên thiết bị di động (Mobile Responsive — Viewport 375px)
- **Tệp lưu trữ:** `docs/menu-mobile.png`
- **Mô tả:** Kiểm tra hiển thị responsive trên thiết bị di động (kích thước iPhone 375x812), thanh điều hướng thu gọn, banner tự co giãn, hàng danh mục cuộn ngang mượt mà, lưới sản phẩm 1 cột ngay ngắn không bị tràn khung ngang (no horizontal overflow).

---

## 6. Ma trận kết quả kiểm thử toàn diện (Test Verification Matrix)

| Bộ kiểm thử | Lệnh thực thi | Kết quả | Chi tiết thực tế |
|---|---|:---:|---|
| **Linter toàn dự án** | `npm run lint` | **PASS** | ESLint 9 (Frontend) 0 lỗi; Oxlint (Backend) 0 lỗi trên 13 files. |
| **Frontend Unit & Component Test** | `npm run test:frontend` | **PASS** | Vitest (jsdom): 2 test files, **27/27 tests passed** (2.31s). |
| ↳ `api.spec.ts` | *(trong bộ test)* | **PASS** | 20 tests: URL config, Format VND, Runtime Validation (id, name, price, img, optional), Filter logic. |
| ↳ `MenuPage.spec.tsx` | *(trong bộ test)* | **PASS** | 7 component tests: Loading skeleton, API Success, Error state & Retry, Category filter, Empty state reset, Action notices, Navbar callbacks. |
| **Backend Unit Test** | `npm run test:backend` | **PASS** | Vitest: 3 test files, **9/9 tests passed** (1.27s) kiểm tra Service, Controller, Badges. |
| **Toàn bộ Unit Test** | `npm test` | **PASS** | **36/36 tests passed (100%)** trên cả 2 phân hệ. |
| **Backend E2E Test** | `npm --prefix backend run test:e2e` | **PASS** | Vitest: 1 test file, **6/6 tests passed** (1.25s) kiểm tra HTTP API `GET /` và `GET /products`. |
| **Production Build** | `npm run build` | **PASS** | Next.js 16.4.6 (Turbopack) & NestJS 12 build sạch 100%, exit code 0. |

---

## 7. Giới hạn phạm vi & Kế hoạch Task 4 tiếp theo

Tuân thủ nghiêm ngặt quy định không làm vượt phạm vi đề bài Task 3:
- **Chưa triển khai trong Task 3:**
  - Logic tính giá động khi chọn Size (S/M/L) và Topping: Sẽ được hiện thực trong **Task 4 (Chi tiết & Tùy chọn sản phẩm)**.
  - Quản lý trạng thái Giỏ hàng (Cart State với Zustand/Context): Sẽ được hiện thực trong **Task 5 (Giỏ hàng)**.
  - Đăng ký/đăng nhập, tạo đơn hàng, thanh toán: Thuộc **Task 6–10**.
- Các nút bấm chưa có tính năng đều phản hồi thông báo Toast giải thích rõ ràng phạm vi tương ứng, không gây hiểu lầm là dữ liệu đã được lưu trữ vào giỏ hàng thật.

---

## 8. Đánh giá Definition of Done (DoD)

- [x] **Đúng repository**: Làm việc trên `vohuunghiaah/brewlite_v01` (Assignment 1).
- [x] **Branch chuẩn**: `feature/task-03-menu-frontend` liên kết Pull Request #3.
- [x] **Gọi API thật**: Next.js gọi `GET /products` và nhận 6 sản phẩm từ backend NestJS.
- [x] **Không dùng mock data**: Không hardcode danh sách trong component; không fallback ngầm khi API lỗi.
- [x] **Runtime Validation**: Kiểm tra hợp lệ id, name, price integer >= 0, imageUrl; dữ liệu sai định dạng chuyển sang Error State.
- [x] **Đầy đủ 4 trạng thái**: Success, Loading Skeleton, Empty State, Error State với nút thử lại.
- [x] **Bộ lọc danh mục hoạt động**: 5 danh mục lọc chính xác 100%.
- [x] **Định dạng tiền tệ**: Hiển thị giá VND chuẩn `35.000đ`.
- [x] **Đầy đủ nhãn badge**: Bán chạy, Mới, Yêu thích, Hot Trend.
- [x] **Tài nguyên ảnh**: 6 tệp vector SVG hiển thị trực tiếp từ frontend.
- [x] **Navbar & Action Callbacks**: Tách bạch callback cho từng nút Giỏ hàng (Task 5), Lịch sử (Task 9), Tài khoản (Task 7), Tùy chỉnh (Task 4), Thêm nhanh (Task 5).
- [x] **Kiểm thử tự động**: 36/36 Unit & Component Tests pass, 6/6 E2E Tests pass.
- [x] **Linter & Build**: 0 warnings, 0 errors, build production sạch sẽ.
- [x] **Tài liệu & Hình ảnh**: Hoàn thành `docs/TASK-03.md` kèm 5 ảnh chụp giao diện thực tế (Desktop, Filter, Empty, Error, Mobile).

**KẾT LUẬN: TẤT CẢ CÁC ĐIỂM TỒN TẠI ĐÃ ĐƯỢC KHẮC PHỤC TRIỆT ĐỂ — TASK 3 ĐỦ ĐIỀU KIỆN 100% ĐỂ MERGE VÀO MAIN.**
