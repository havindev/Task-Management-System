# Task Manager - Full Stack Application

Ứng dụng quản lý công việc với React frontend và Vercel serverless backend.

## Cấu trúc Project

```
task-manager/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static files  
│   └── package.json  # Frontend dependencies
│
├── backend/          # Vercel serverless backend
│   ├── api/         # API endpoints
│   ├── utils/       # Utility functions
│   └── package.json # Backend dependencies
│
└── README.md        # This file
```

## Cài đặt và Chạy

### Frontend
```bash
cd frontend
npm install
npm start          # Dev server
npm run build      # Production build
```

### Backend  
```bash
cd backend
npm install
npm run dev        # Local development
npm run deploy     # Deploy to Vercel
```

## Tính năng

- ✅ Đăng nhập/đăng xuất
- ✅ CRUD operations cho tasks
- ✅ Filter và search tasks
- ✅ Dark/light theme
- ✅ Responsive design
- ✅ Cross-device data sync với Vercel KV
- ✅ Memory storage fallback

## Tech Stack

**Frontend:**
- React 18
- Context API (theme)
- CSS3
- LocalStorage (for auth)

**Backend:**
- Vercel Serverless Functions
- Vercel KV Database
- Memory storage fallback

## API Endpoints

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất  
- `GET /api/auth/verify` - Verify session
- `GET /api/tasks` - Lấy danh sách tasks
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks` - Cập nhật task
- `DELETE /api/tasks` - Xóa task

## Tài khoản Test

- `admin/admin123`
- `hieu/hieu123`
- `demo/demo123`