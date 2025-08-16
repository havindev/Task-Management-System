# Quản Lý Công Việc (Task Manager)

Ứng dụng quản lý công việc hiện đại với React frontend và Vercel serverless backend.

## Tính Năng

- ✅ Thao tác CRUD cho công việc
- 🔍 Tìm kiếm và lọc công việc
- 🎨 Chuyển đổi giao diện sáng/tối
- 📱 Thiết kế responsive
- 🔄 Đồng bộ dữ liệu giữa thiết bị
- 🔐 Xác thực người dùng

## Bắt Đầu Nhanh

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
npm run dev
```

## Cấu Trúc Dự Án

```text
task-manager/
├── frontend/          # Ứng dụng React
│   ├── src/
│   └── public/
└── backend/           # API serverless
    ├── api/
    └── utils/
```

## Công Nghệ Sử Dụng

- **Frontend:** React 18, CSS3, Context API
- **Backend:** Vercel Functions, KV Database
- **Triển khai:** Vercel

## Tài Khoản Demo

- `admin` / `admin123`
- `hieu` / `hieu123`
- `demo` / `demo123`

## Demo Trực Tuyến

**Production:** https://task-manager-five-gray-73.vercel.app

## Tài Liệu

- [Hướng Dẫn Admin](README_ADMIN.md) - Quản trị hệ thống
- [Hướng Dẫn Triển Khai](README_DEPLOYMENT.md) - Hướng dẫn deploy

## API Endpoints

| Phương Thức | Endpoint | Mô Tả |
|-------------|----------|-------|
| `POST` | `/api/auth/login` | Đăng nhập |
| `GET` | `/api/tasks` | Lấy danh sách công việc |
| `POST` | `/api/tasks` | Tạo công việc mới |
| `PUT` | `/api/tasks` | Cập nhật công việc |
| `DELETE` | `/api/tasks` | Xóa công việc |

## Phát Triển

```bash
# Phát triển frontend
cd frontend && npm start

# Phát triển backend
cd backend && npm run dev

# Build production
cd frontend && npm run build
```

## Giấy Phép

MIT License