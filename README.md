# Task Management System

## Mô tả

Ứng dụng quản lý công việc được xây dựng với React và JSON Server, cung cấp giải pháp hoàn chỉnh để quản lý tasks hiệu quả với giao diện đẹp mắt và responsive.

## Tính năng

### Chức năng cơ bản
- **Authentication System**: Đăng nhập/đăng xuất với session management
- **CRUD Operations**: Tạo, đọc, cập nhật, xóa tasks
- **Form Validation**: Validation real-time và submit validation
- **Responsive Design**: Thiết kế mobile-first, tương thích mọi thiết bị
- **Error Handling**: Xử lý lỗi mạng, validation và retry functionality

### Tính năng nâng cao
- **Search System**: Tìm kiếm tasks theo tiêu đề và mô tả với debounced search
- **Filter System**: Lọc theo trạng thái (Todo, In Progress, Completed)
- **Priority Filter**: Lọc theo độ ưu tiên (High, Medium, Low)
- **Sort Options**: Sắp xếp theo ngày tạo, cập nhật, hạn, ưu tiên, tiêu đề
- **Task Statistics**: Hiển thị thống kê và tiến độ hoàn thành
- **Modern UI/UX**: Giao diện hiện đại với animations và micro-interactions

### Tính năng UX
-  **Loading States**: Spinner và skeleton loading
- **Empty States**: Hiển thị trạng thái khi không có dữ liệu
- **Success Feedback**: Thông báo khi thành công
- **Error Messages**: Thông báo lỗi rõ ràng và hướng dẫn khắc phục
- **Due Date Warnings**: Cảnh báo tasks sắp hết hạn và quá hạn

## Công nghệ sử dụng

- **Frontend**: React 18.2.0 với Hooks (useState, useEffect, useMemo)
- **Backend**: JSON Server 0.17.3
- **Styling**: CSS3 với CSS Variables và Flexbox/Grid
- **Build Tool**: Create React App
- **Package Manager**: npm
- **Development**: Concurrently để chạy đồng thời frontend và backend

## Cài đặt và chạy

### Prerequisites
- Node.js >= 14.0.0
- npm hoặc yarn

### Installation

```bash
# Clone repository
git clone [repository-url]
cd task-manager

# Cài đặt dependencies
npm install
```

### Chạy ứng dụng

```bash
# Chạy cả JSON Server và React app cùng lúc
npm run dev

# Hoặc chạy riêng biệt:

# Terminal 1: Chạy JSON Server (Backend)
npm run server

# Terminal 2: Chạy React app (Frontend)
npm start
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Scripts có sẵn

```bash
npm start          # Chạy React development server
npm run server     # Chạy JSON Server
npm run dev        # Chạy cả hai cùng lúc
npm run build      # Build production
npm test           # Chạy tests
```

## Cấu trúc dự án

```
task-manager/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx      # Form đăng nhập
│   │   │   └── Navbar.jsx         # Navigation bar
│   │   ├── Tasks/
│   │   │   ├── TaskManagement.jsx # Container chính
│   │   │   ├── TaskList.jsx       # Danh sách tasks
│   │   │   ├── TaskItem.jsx       # Item task đơn lẻ
│   │   │   └── TaskForm.jsx       # Form tạo/sửa task
│   │   └── Common/
│   │       ├── ErrorMessage.jsx   # Component hiển thị lỗi
│   │       └── LoadingSpinner.jsx # Loading spinner
│   ├── api/
│   │   ├── authAPI.js            # API calls cho authentication
│   │   └── taskAPI.js            # API calls cho tasks
│   ├── style/
│   │   ├── App.css               # Global styles
│   │   ├── Navbar.css            # Navbar styles
│   │   ├── LoginForm.css         # Login form styles
│   │   ├── TaskManagement.css    # Task management styles
│   │   ├── TaskList.css          # Task list styles
│   │   ├── TaskItem.css          # Task item styles
│   │   ├── TaskForm.css          # Task form styles
│   │   ├── ErrorMessage.css      # Error message styles
│   │   └── LoadingSpinner.css    # Loading spinner styles
│   ├── utils/
│   │   └── validation.js         # Validation utilities
│   ├── App.js                    # Root component
│   └── index.js                  # Entry point
├── db.json                       # JSON Server database
├── package.json                  # Dependencies và scripts
└── README.md                     # Documentation
```

## Database Schema

### Users
```json
{
  \"id\": \"string\",
  \"username\": \"string\",
  \"password\": \"string\",
  \"email\": \"string\",
  \"createdAt\": \"ISO date string\"
}
```

### Tasks
```json
{
  \"id\": \"string\",
  \"userId\": \"string\",
  \"title\": \"string\",
  \"description\": \"string\",
  \"status\": \"todo | in-progress | completed\",
  \"priority\": \"low | medium | high\",
  \"dueDate\": \"YYYY-MM-DD\",
  \"createdAt\": \"ISO date string\",
  \"updatedAt\": \"ISO date string\"
}
```

## Demo Accounts

```
Username: admin
Password: password123
Email: admin@taskmanager.com

Username: user1
Password: userpass123
Email: user1@taskmanager.com

Username: demo
Password: demo123
Email: demo@taskmanager.com
```

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

## Tính năng nổi bật

### Search & Filter System
- **Debounced Search**: Tìm kiếm không lag với delay 500ms
- **Multi-filter**: Lọc đồng thời theo status, priority
- **Smart Sort**: Sắp xếp thông minh theo nhiều tiêu chí
- **Clear Filters**: Xóa tất cả filter một lần

### Advanced UI/UX
- **Mobile-first Design**: Thiết kế ưu tiên mobile
- **Micro-animations**: Animations mượt mà và tinh tế
- **Visual Feedback**: Highlight search terms, status indicators
- **Accessibility**: Focus styles, keyboard navigation
- **Dark/Light Mode Ready**: CSS Variables hỗ trợ theme switching

### Performance Optimizations
- **useMemo**: Tối ưu filter và sort operations
- **Debounce Search**: Giảm API calls không cần thiết
- **Optimistic Updates**: Update UI ngay, rollback khi lỗi
- **Error Boundaries**: Xử lý lỗi component-level

## Validation Rules

### Login Form
- **Username**: Bắt buộc, ít nhất 3 ký tự
- **Password**: Bắt buộc, ít nhất 6 ký tự

### Task Form
- **Title**: Bắt buộc, 5-100 ký tự
- **Description**: Tùy chọn, tối đa 500 ký tự
- **Status**: Bắt buộc (todo, in-progress, completed)
- **Priority**: Bắt buộc (low, medium, high)
- **Due Date**: Bắt buộc, không được trong quá khứ

## Error Handling

- **Network Errors**: \"Kiểm tra kết nối mạng\"
- **HTTP Errors**: Messages phù hợp theo status code
- **Validation Errors**: Focus vào field đầu tiên có lỗi
- **Retry Functionality**: Button \"Thử lại\" khi có lỗi

## Design System

### Colors
```css
--primary: #3498db    /* Blue */
--success: #27ae60    /* Green */
--danger: #e74c3c     /* Red */
--warning: #f39c12    /* Orange */
--info: #9b59b6       /* Purple */
--light: #ecf0f1      /* Light Gray */
--dark: #2c3e50       /* Dark Gray */
```

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB (gzipped)

## Development

### Code Quality
- **Component Structure**: Single Responsibility Principle
- **Props Interface**: Typed props với default values
- **Reusable Components**: DRY principle
- **Clean Code**: Consistent formatting, meaningful names
- **Error Boundaries**: Proper error handling

### Best Practices
- **Mobile-first CSS**: Responsive design approach
- **Semantic HTML**: Accessibility-friendly markup
- **Performance**: Optimized re-renders và bundle size
- **Security**: Input validation và XSS protection

## Deployment

### Build Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Frontend deployment
- **Netlify**: Alternative frontend deployment
- **Heroku**: Backend JSON Server deployment

### Environment Variables
```bash
REACT_APP_API_URL=http://localhost:3001
```

## Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Internationalization (i18n) - English/Vietnamese
- [ ] Progressive Web App (PWA) features
- [ ] Unit tests với Jest/React Testing Library
- [ ] Drag & Drop task management
- [ ] Real-time collaboration
- [ ] Task categories và tags
- [ ] File attachments
- [ ] Email notifications

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**[Tên học viên]** - *React Developer*

- GitHub: [@username](https://github.com/username)
- LinkedIn: [profile](https://linkedin.com/in/profile)
- Email: email@example.com

## Acknowledgments

- Create React App team
- JSON Server contributors
- React community
- Anthropic Claude AI for development assistance

---

**Nếu project này hữu ích, hãy cho một star!**
