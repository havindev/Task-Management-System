# 🚀 Hieu Task Manager

Một hệ thống quản lý task hiện đại được phát triển bằng React.js với giao diện người dùng thân thiện và tính năng quản lý công việc toàn diện.

## 🌐 **Live Demo**

### Frontend (Vercel)
**URL:** [Coming Soon - Deploy to Vercel]

### Backend (JSON Server)
**API Base URL:** `http://localhost:3001`

**API Endpoints:**
- Users: http://localhost:3001/users
- Tasks: http://localhost:3001/tasks

## ✨ Tính năng chính

### 🔐 **Hệ thống xác thực**
- Đăng nhập/Đăng ký tài khoản đơn giản
- Quản lý session cơ bản
- Phân quyền user cơ bản
- Validation form đăng nhập/đăng ký

### 📋 **Quản lý Task**
- **CRUD Operations**: Tạo, chỉnh sửa, xóa task
- **Status Management**: Todo, In Progress, Completed
- **Priority System**: High, Medium, Low với màu sắc phân biệt
- **Due Date Management**: Ngày hết hạn cho từng task
- **Task Filtering**: Lọc theo trạng thái và độ ưu tiên
- **Search Functionality**: Tìm kiếm task theo tiêu đề và mô tả

### 🎨 **Giao diện người dùng**
- **Modern UI**: Giao diện hiện đại và sạch sẽ
- **Responsive Design**: Tối ưu cho mobile, tablet, desktop
- **Interactive Elements**: Hover effects và transitions mượt mà
- **Color-coded Priority**: Hệ thống màu sắc trực quan
- **Clean Layout**: Bố cục rõ ràng, dễ sử dụng

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18.2.0** - Framework chính với functional components
- **React Scripts 5.0.1** - Build tools và development server
- **CSS3** - Styling với custom CSS
- **JavaScript ES6+** - Logic programming

### Backend
- **JSON Server 0.17.3** - Mock REST API server
- **Node.js** - Runtime environment cho JSON Server

### Development Tools
- **Concurrently 8.2.0** - Chạy multiple scripts đồng thời
- **Git** - Version control
- **VS Code** - Development environment

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js (version 16 trở lên)
- npm hoặc yarn

### Bước 1: Clone repository
```bash
git clone [repository-url]
cd task-manager
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Khởi động hệ thống

#### Chạy tất cả services (khuyến nghị)
```bash
npm run dev
```

Lệnh này sẽ chạy:
- **JSON Server** (port 3001) - API backend
- **React App** (port 3000) - Frontend application

#### Chạy từng service riêng lẻ
```bash
# Chỉ chạy React app
npm start

# Chỉ chạy JSON server
npm run server
```

## 🚀 Sử dụng

### Đăng nhập
1. Mở trình duyệt và truy cập `http://localhost:3000`
2. Sử dụng tài khoản có sẵn hoặc đăng ký mới

#### Tài khoản Admin mặc định
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@taskmanager.com`

#### Tài khoản User mặc định
- **Username:** `hieu`
- **Password:** `hieu123`
- **Email:** `hieu@taskmanager.com`

#### Tài khoản Demo
- **Username:** `demo`
- **Password:** `demo123`
- **Email:** `demo@taskmanager.com`

### Tạo Task mới
1. Đăng nhập vào hệ thống
2. Click nút "Add New Task" hoặc "Thêm Task"
3. Điền thông tin task:
   - **Title** (Tiêu đề) - bắt buộc
   - **Description** (Mô tả)
   - **Priority** (Độ ưu tiên): High/Medium/Low
   - **Status** (Trạng thái): Todo/In Progress/Completed
   - **Due Date** (Ngày hết hạn)
4. Click "Save" hoặc "Lưu"

### Quản lý Task
- **Chỉnh sửa**: Click vào task để edit
- **Xóa**: Click nút delete trên task
- **Thay đổi trạng thái**: Click vào status dropdown
- **Lọc**: Sử dụng filter buttons (All, Todo, In Progress, Completed)
- **Tìm kiếm**: Gõ từ khóa vào search box

## 📁 Cấu trúc dự án

```
task-manager/
├── api/                     # Vercel API endpoints
│   ├── auth/               # Authentication APIs
│   ├── migrate.js          # Database migration
│   ├── tasks.js            # Tasks API endpoints
│   └── users.js            # Users API endpoints
├── public/                 # Static assets
├── src/
│   ├── api/                # API service layer
│   ├── components/         # React components
│   │   ├── Auth/          # Authentication components
│   │   ├── Common/        # Shared components
│   │   └── Tasks/         # Task management components
│   ├── constants/         # Application constants
│   ├── contexts/          # React context providers
│   ├── data/              # Static data and utilities
│   ├── style/             # CSS styling files
│   ├── utils/             # Utility functions
│   ├── App.js             # Main App component
│   └── index.js           # Application entry point
├── utils/                 # Build and utility scripts
├── db.json               # JSON Server database
├── package.json          # Dependencies and scripts
└── vercel.json           # Vercel deployment config
```

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev              # Chạy both frontend và backend
npm start               # Chạy React app (port 3000)
npm run server          # Chạy JSON server (port 3001)

# Testing
npm run test            # Chạy tests
npm run test:watch      # Chạy tests với watch mode

# Build
npm run build           # Build production
```

## 🌐 API Endpoints

### Users
- `GET /users` - Lấy danh sách users
- `GET /users/:id` - Lấy thông tin user cụ thể
- `POST /users` - Tạo user mới
- `PUT /users/:id` - Cập nhật user
- `DELETE /users/:id` - Xóa user

### Tasks
- `GET /tasks` - Lấy danh sách tasks
- `GET /tasks/:id` - Lấy thông tin task cụ thể
- `POST /tasks` - Tạo task mới
- `PUT /tasks/:id` - Cập nhật task
- `PATCH /tasks/:id` - Cập nhật một phần task
- `DELETE /tasks/:id` - Xóa task

## 🎨 Styling và UI

### CSS Architecture
- **Component-based CSS**: Mỗi component có file CSS riêng
- **Global Styles**: Common styles trong index.css
- **Responsive Design**: Mobile-first approach
- **CSS Variables**: Consistent color scheme

### Design System
- **Color Palette**: 
  - Primary: Blue tones
  - Success: Green (#28a745)
  - Warning: Yellow (#ffc107)
  - Danger: Red (#dc3545)
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent margin/padding system
- **Components**: Reusable UI components

## 🔒 Bảo mật

### Authentication
- Cơ bản username/password authentication
- Local storage để lưu session
- Client-side route protection
- Form validation

### Data Protection
- Input sanitization cơ bản
- XSS protection thông qua React
- CORS handling

## 📊 Performance

### Optimization
- React functional components
- Minimal re-renders
- Efficient state management
- Code splitting cơ bản

### Best Practices
- Clean code structure
- Reusable components
- Proper error handling
- Responsive design

## 🐛 Troubleshooting

### Vấn đề thường gặp

1. **"JSON Server không khởi động"**
   ```bash
   # Kiểm tra port 3001 có bị chiếm không
   lsof -i :3001
   
   # Chạy lại server
   npm run server
   ```

2. **"React app không load được data"**
   - Kiểm tra JSON Server có chạy không (port 3001)
   - Kiểm tra file db.json có tồn tại không
   - Xem console logs để debug

3. **"Build failed"**
   ```bash
   # Clear cache và reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

4. **"CORS errors"**
   - JSON Server tự động handle CORS
   - Đảm bảo API calls đúng URL (localhost:3001)

### Debug Commands
```bash
# Check if ports are available
lsof -i :3000
lsof -i :3001

# Check JSON Server data
curl http://localhost:3001/users
curl http://localhost:3001/tasks

# View package info
npm list
npm outdated
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. **Kết nối GitHub Repository** với Vercel
2. **Build Command:** `npm run build`
3. **Output Directory:** `build`
4. **Environment Variables:**
   - `REACT_APP_API_URL=[your-api-url]`

### Backend Deployment
- Có thể deploy JSON Server lên Heroku
- Hoặc sử dụng các API service khác như Firebase, Supabase
- Update `REACT_APP_API_URL` trong environment variables

### Production Build
```bash
npm run build
```

### Environment Variables
Tạo file `.env.local` cho development:
```env
REACT_APP_API_URL=http://localhost:3001
```

Tạo file `.env.production` cho production:
```env
REACT_APP_API_URL=[your-production-api-url]
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 Todo List

### Upcoming Features
- [ ] User profile management
- [ ] Task categories/tags
- [ ] File attachments for tasks
- [ ] Task comments/notes
- [ ] Advanced search and filters
- [ ] Dark/Light theme toggle
- [ ] Email notifications
- [ ] Task sharing and collaboration
- [ ] Calendar view
- [ ] Export tasks to CSV/PDF

### Technical Improvements
- [ ] Add TypeScript
- [ ] Implement Redux for state management
- [ ] Add unit and integration tests
- [ ] Implement proper authentication (JWT)
- [ ] Add real database (MongoDB/PostgreSQL)
- [ ] Optimize performance with lazy loading
- [ ] Add PWA capabilities
- [ ] Implement offline functionality

## 📝 License

Dự án này được phát hành dưới MIT License.

## 👨‍💻 Tác giả

**Hieu** - Developer

---

⭐ **Nếu dự án này hữu ích, hãy cho một star!**

## 🔗 Liên kết hữu ích

- [React Documentation](https://reactjs.org/docs)
- [JSON Server Documentation](https://github.com/typicode/json-server)
- [Vercel Deployment Guide](https://vercel.com/docs)
