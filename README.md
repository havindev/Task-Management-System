# Task Management System

## Mô tả

Ứng dụng quản lý công việc được xây dựng với React và hỗ trợ cả JSON Server (development) và Vercel KV (production). Ứng dụng cung cấp đầy đủ tính năng CRUD cho việc quản lý tasks với giao diện responsive và xác thực người dùng.

## Tính năng

- Authentication (Login/Logout) với session management
- CRUD operations cho tasks (Create, Read, Update, Delete)
- Form validation và error handling
- Responsive design (Mobile-first)
- Dark/Light theme toggle
- Real-time search và filtering
- Priority levels (Low, Medium, High)
- Status tracking (Todo, In Progress, Completed)
- Due date management
- User isolation (mỗi user chỉ thấy tasks của mình)

## Công nghệ sử dụng

- **Frontend**: React 18.2.0
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel KV (Redis) với fallback in-memory storage
- **Development Server**: JSON Server
- **Styling**: CSS3 với CSS Variables
- **State Management**: React Context API
- **Storage**: LocalStorage cho session và preferences
- **Deployment**: Vercel

## Cài đặt và chạy

### Prerequisites

- Node.js >= 14
- npm hoặc yarn

### Installation

```bash
git clone https://github.com/havindev/Task-Management-System
cd task-manager
npm install
```

### Chạy ứng dụng

#### Development mode (với JSON Server)

```bash
# Chạy cả React app và JSON Server
npm run dev

# Hoặc chạy riêng biệt:
# Terminal 1: Chạy JSON Server
npm run server

# Terminal 2: Chạy React app
npm start
```

#### Build production

```bash
npm run build
```

## Demo

### Tài khoản test

- **Username**: `admin` / **Password**: `admin123`
- **Username**: `hieu` / **Password**: `hieu123`
- **Username**: `demo` / **Password**: `demo123`

### URLs

- **Development**: http://localhost:3000
- **JSON Server**: http://localhost:3001
- **Live demo**: https://task-manager-five-gray-73.vercel.app/

## API Endpoints

### Development (JSON Server)
- `GET /tasks` - Lấy danh sách tasks
- `POST /tasks` - Tạo task mới
- `PUT /tasks/:id` - Cập nhật task
- `DELETE /tasks/:id` - Xóa task
- `GET /users` - Lấy danh sách users

### Production (Vercel)
- `GET /api/tasks?userId=1` - Lấy tasks theo user
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks?taskId=123` - Cập nhật task
- `DELETE /api/tasks?taskId=123` - Xóa task
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/verify` - Xác thực session

## Cấu trúc thư mục

```
task-manager/
├── api/                    # Vercel serverless functions
│   ├── auth/
│   ├── tasks.js
│   └── users.js
├── src/
│   ├── components/         # React components
│   ├── contexts/          # React Context
│   ├── constants/         # App constants
│   ├── style/            # CSS files
│   └── api/              # API services
├── public/               # Static files
├── utils/                # Utility functions
├── db.json              # Development database
└── vercel.json          # Vercel configuration
```

## Screenshots

### Desktop View
![Desktop Dashboard](screenshots/desktop-dashboard.png)
*Task management dashboard với full features*

### Mobile View
![Mobile View](screenshots/mobile-view.png)
*Responsive design cho mobile devices*

### Login Screen
![Login Screen](screenshots/login.png)
*Authentication form với validation*

### Task Form
![Task Form](screenshots/task-form.png)
*Task creation/editing với form validation*

### Dark Theme
![Dark Theme](screenshots/dark-theme.png)
*Dark mode theme toggle*

## Tính năng nâng cao

- **Theme System**: Dark/Light mode với persistence
- **Real-time Search**: Tìm kiếm instant theo title và description
- **Advanced Filtering**: Lọc theo status, priority, user
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Comprehensive error handling và user feedback
- **Session Management**: Auto-logout và session validation
- **Data Persistence**: Vercel KV với in-memory fallback
- **Performance Optimization**: React optimization với useCallback, useMemo

## Deployment

Ứng dụng được thiết kế để deploy lên Vercel với:
- Frontend và Backend trong cùng 1 repository
- Vercel KV cho database storage
- Environment variables cho configuration
- Automatic deployment từ GitHub


## Progress Report

### Đã hoàn thành (100%)

✅ **Setup Project và JSON Server (5/5 điểm)**
- Project setup hoàn chỉnh với React 18.2.0
- JSON Server configuration cho development
- Environment variables setup
- Vercel deployment configuration

✅ **Authentication System (15/15 điểm)**
- LoginForm component với validation đầy đủ
- Logout functionality
- Protected routes với route guards
- Token management với localStorage
- Session validation và auto-logout
- Navbar hiển thị user status

✅ **Task CRUD Operations (25/25 điểm)**
- Create Task: Form validation hoàn chỉnh
- Read Tasks: Display với pagination
- Update Task: Edit functionality
- Delete Task: Confirmation dialog
- Advanced filtering và search
- Real-time updates

✅ **Form Validation và Error Handling (15/15 điểm)**
- Real-time validation khi typing
- Submit validation trước API calls
- Error messages cụ thể cho từng field
- Field highlighting và focus management
- Network error handling
- Success feedback với notifications

✅ **Responsive Design (10/10 điểm)**
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px
- Hamburger menu cho mobile
- Grid/stack layout responsive
- Touch-friendly interactions

✅ **User Experience (10/10 điểm)**
- Loading states với spinners
- Empty states với helpful messages
- Success feedback với toast notifications
- Confirmation dialogs
- Auto-focus và keyboard navigation
- Visual hierarchy với typography

✅ **Code Quality (10/10 điểm)**
- Single responsibility components
- Reusable component architecture
- Clean code với proper naming
- Error boundaries và try-catch
- Performance optimization
- Constants extraction

✅ **Advanced Features (8/8 điểm)**
- **Option A: Search và Filter System**
  - Real-time search theo title/description
  - Filter by status (All, Todo, In Progress, Completed)
  - Sort theo due date, created date, priority
  - Debounced search (500ms delay)
  - Advanced filtering combinations

✅ **Deployment (2/2 điểm)**
- Frontend deployed trên Vercel
- Backend API routes với Vercel Functions
- Environment variables configuration
- Production-ready với error handling

### Bonus Features Implemented (+3 điểm)

✅ **Dark/Light Theme Toggle (+1 điểm)**
- Complete theme system với CSS variables
- Theme persistence trong localStorage
- Smooth transitions giữa themes

✅ **Advanced Search & Filter (+2 điểm)**
- Multi-criteria filtering
- Search highlighting
- Filter persistence
- Advanced sort options

### Tổng điểm dự kiến: 103/100 điểm

### Challenges gặp phải và giải pháp

1. **Challenge**: Deployment với Vercel và database
   - **Solution**: Sử dụng Vercel KV cho production và JSON Server cho development
   - **Lesson**: Hiểu được architecture của serverless functions

2. **Challenge**: Authentication không có backend framework
   - **Solution**: Implement custom session management với localStorage và API verification
   - **Lesson**: Security considerations cho client-side auth

3. **Challenge**: Responsive design cho mobile
   - **Solution**: Mobile-first approach với careful testing trên multiple devices
   - **Lesson**: Importance của user testing trên real devices

4. **Challenge**: State management phức tạp
   - **Solution**: React Context API với proper state structure
   - **Lesson**: Clean state architecture quan trọng cho scalability

### Lessons Learned

- **React Hooks**: Hiểu sâu về useState, useEffect, useContext
- **API Integration**: Best practices cho error handling và loading states
- **Responsive Design**: Mobile-first approach và breakpoint strategy
- **User Experience**: Importance của feedback và error messages
- **Deployment**: Vercel deployment và environment configuration
- **Code Quality**: Clean code principles và component architecture

## Tác giả

**Nguyễn Trần Trung Hiếu**
**Project**: task-manager
**Version**: 1.0.0
**Last Updated**: August 16, 2025

---

**Note**: Dự án này được phát triển theo yêu cầu của đề thi thực hành React JS với timeline 14 ngày. Tất cả requirements đã được implement đầy đủ với code quality cao và deployment thành công.
