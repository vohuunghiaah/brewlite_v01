# Sprint 01 - Khởi tạo dự án & Nền tảng cốt lõi (Foundation)

## 1. Thông tin Sprint
- **Sprint:** 01
- **Mục tiêu:** Khởi tạo kiến trúc monorepo/multi-repo gồm Frontend (Next.js), Backend (NestJS), cấu hình Docker, Git và tài liệu Scrum chuẩn.
- **Trạng thái:** In Progress

## 2. Product Backlog Items (PBI) / Tasks

| ID | Task | Mô tả | Trạng thái | Người phụ trách |
|---|---|---|---|---|
| **TASK-01** | Khởi tạo dự án và cấu trúc | Cấu trúc repo, Next.js frontend, NestJS backend, docs, gitignore, docker-compose, env. | In Progress | Dev Team |
| **TASK-02** | Cấu hình CSDL & Docker | Cấu hình PostgreSQL, TypeORM / Prisma trên NestJS | To Do | Dev Team |
| **TASK-03** | Xác thực & Phân quyền (Auth) | JWT Auth, Module User/Auth trên NestJS và UI Login/Register trên Next.js | To Do | Dev Team |
| **TASK-04** | Module POS & Quản lý bán hàng | Quản lý sản phẩm, đơn hàng đồ uống và thanh toán | To Do | Dev Team |

## 3. Tiêu chí hoàn thành (Definition of Done - DoD) cho Task 1
- [x] Node.js và npm sẵn sàng trên máy (Node v24.19.0, npm 11.17.0).
- [x] Tạo dự án Next.js (App router, TypeScript, Tailwind CSS, ESLint) trong thư mục `frontend/`.
- [x] Tạo dự án NestJS (TypeScript, npm) trong thư mục `backend/`.
- [x] Tạo `docs/` với tài liệu Scrum và kiến trúc hệ thống.
- [x] Tạo `.gitignore`, `.env.example`, `docker-compose.yml`, `README.md`.
- [x] Thêm Dockerfile cho cả `frontend` và `backend`.
- [x] Kiểm tra build và khởi chạy thành công cả Frontend (port 3000 -> HTTP 200) và Backend (port 4000 -> "Hello World!").
- [x] Cấu hình Git và chuẩn bị commit khởi tạo.

