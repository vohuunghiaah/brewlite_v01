# BrewLite

Hệ thống quản lý và vận hành quán cà phê / đồ uống tinh gọn (POS & Coffee Shop Management).

## 🚀 Cấu trúc dự án

```text
brewlite_v01/
├── frontend/         # Next.js 14+ (TypeScript, Tailwind CSS, App Router)
├── backend/          # NestJS (TypeScript, REST API)
├── docs/             # Tài liệu dự án & Scrum
│   ├── architecture/ # Kiến trúc hệ thống
│   └── scrum/        # Kế hoạch Sprint & User Stories
├── .gitignore        # Cấu hình bỏ qua các tệp không cần thiết
├── .env.example      # Mẫu thiết lập biến môi trường
├── docker-compose.yml# Cấu hình Docker (PostgreSQL, Backend, Frontend)
└── README.md         # Hướng dẫn dự án
```

## 🛠 Yêu cầu hệ thống

- **Node.js**: >= 18.x (khuyến nghị >= 20.x, đã kiểm tra trên Node v24.x)
- **npm**: >= 9.x
- **Docker & Docker Compose** (tuỳ chọn khi chạy qua container)
- **Git**

## 📦 Cài đặt & Khởi chạy

### 1. Khởi tạo biến môi trường
Sao chép tệp mẫu cấu hình:
```bash
cp .env.example .env
```

### 2. Khởi chạy Backend (NestJS)
```bash
cd backend
npm install
npm run start:dev
```
Backend sẽ khởi chạy tại: `http://localhost:4000` (hoặc cổng cấu hình trong `.env`).

### 3. Khởi chạy Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend sẽ khởi chạy tại: `http://localhost:3000`.

### 4. Khởi chạy bằng Docker Compose
Để khởi động toàn bộ dịch vụ (PostgreSQL, Backend, Frontend):
```bash
docker-compose up -d
```

## 📋 Scrum & Quản lý dự án
Xem chi tiết các Sprint và User Stories tại [docs/scrum/sprint-01.md](docs/scrum/sprint-01.md).

