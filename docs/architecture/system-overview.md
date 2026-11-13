# Tổng quan Kiến trúc Hệ thống BrewLite

## 1. Giới thiệu
BrewLite là giải pháp quản lý bán hàng (POS) và vận hành quán đồ uống/cà phê tinh gọn, hiệu năng cao.

## 2. Công nghệ sử dụng (Tech Stack)

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide Icons, Axios/Fetch.
- **Backend:** NestJS, TypeScript, RESTful API, Swagger/OpenAPI.
- **Cơ sở dữ liệu:** PostgreSQL.
- **Hạ tầng / DevOps:** Docker, Docker Compose, Git.

## 3. Cấu trúc thư mục dự án

```text
brewlite_v01/
├── frontend/             # Next.js (Client & POS UI)
│   ├── app/              # Next.js App Router
│   ├── public/           # Static assets
│   ├── package.json
│   └── tsconfig.json
├── backend/              # NestJS (Core Business API)
│   ├── src/              # Source code (modules, controllers, services)
│   ├── test/             # E2E & unit tests
│   ├── package.json
│   └── tsconfig.json
├── docs/                 # Scrum và tài liệu
│   ├── architecture/     # Kiến trúc hệ thống
│   └── scrum/            # Scrum artifacts & sprints
├── .gitignore            # Cấu hình Git ignore
├── .env.example          # Mẫu biến môi trường
├── docker-compose.yml    # Cấu hình containerization (PostgreSQL, Backend, Frontend)
└── README.md             # Hướng dẫn dự án
```

## 4. Giao tiếp giữa các thành phần
```mermaid
flowchart LR
    User[Người dùng / Thu ngân] -->|HTTP / HTTPS| FE[Next.js Frontend (Port 3000)]
    FE -->|REST API Requests| BE[NestJS Backend (Port 4000)]
    BE -->|ORM / SQL Queries| DB[(PostgreSQL Database (Port 5432))]
```

