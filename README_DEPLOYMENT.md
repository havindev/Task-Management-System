# Quản Lý Công Việc - Hướng Dẫn Triển Khai

Hướng dẫn chi tiết triển khai Quản Lý Công Việc lên Vercel.

## 🚀 Triển Khai Nhanh

### Lựa chọn 1: Triển khai tự động (Khuyên dùng)
```bash
# Clone & triển khai trong một lệnh
git clone [your-repo-url]
cd task-manager
vercel --prod
```

### Lựa chọn 2: Triển khai thủ công
```bash
# 1. Build frontend
cd frontend
npm install
npm run build

# 2. Copy các tệp để triển khai
cd ..
cp -r frontend/build .
cp -r backend/api .
cp -r backend/utils .
cp backend/vercel.json .

# 3. Triển khai
vercel --prod
```

## 📁 Cấu Trúc Triển Khai

Vercel cần các tệp này ở thư mục gốc:
```
task-manager/
├── build/                 # Frontend build (từ frontend/build)
├── api/                   # Backend APIs (từ backend/api)  
├── utils/                 # Backend utilities (từ backend/utils)
├── vercel.json           # Vercel config (từ backend/vercel.json)
└── package.json          # Dependencies (auto-generated)
```

## ⚙️ Cấu Hình Vercel

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/build/$1"
    }
  ]
}
```

### Biến môi trường (Tùy chọn)
```bash
# Set in Vercel dashboard or CLI
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN
```

## 🔧 Hướng Dẫn Cài Đặt

### Yêu cầu trước
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel  
vercel login
```

### Cài đặt lần đầu
```bash
# 1. Navigate to project
cd task-manager

# 2. Initialize Vercel project
vercel

# 3. Answer setup questions:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? task-manager
# - Directory? ./
# - Override settings? No

# 4. Deploy
vercel --prod
```

### Cài đặt môi trường (nếu sử dụng KV)
1. Go to Vercel Dashboard
2. Select your project
3. Go to Storage → Create KV Database
4. Copy connection details
5. Add to Environment Variables

## 🔄 Quy Trình Triển Khai

### Triển khai phát triển
```bash
# Quick preview deploy
vercel

# Preview with specific build
vercel --build-env NODE_ENV=development
```

### Triển khai sản xuất
```bash
# Production deployment
vercel --prod

# Force rebuild (ignore cache)
vercel --prod --force

# Deploy specific directory
vercel --prod --cwd ./
```

### Triển khai tự động (GitHub)
1. Connect GitHub repo to Vercel
2. Enable auto-deploy on push
3. Configure branch: `main` → Production

## 📊 Danh Sách Kiểm Tra Sau Triển Khai

### ✅ Các bước xác minh
- [ ] Website loads: `https://[your-app].vercel.app`
- [ ] Login works: `admin/admin123`
- [ ] API responds: `GET /api/tasks`
- [ ] Create task works
- [ ] Cross-device sync works
- [ ] Mobile responsive
- [ ] Dark/light theme works

### 🧪 Lệnh kiểm tra
```bash
# Test login API
curl -X POST https://[your-app].vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Test tasks API  
curl "https://[your-app].vercel.app/api/tasks?userId=1"

# Test task creation
curl -X POST https://[your-app].vercel.app/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Deploy","userId":"1","status":"todo"}'
```

## 🐛 Khắc Phục Sự Cố

### Các vấn đề thường gặp

#### 1. Build Errors
```bash
# Error: Cannot find module
cd frontend && npm install

# Error: Build failed
npm run build -- --verbose
```

#### 2. API Errors
```bash
# 500 Error - Check function logs
vercel logs [deployment-url]

# CORS Error - Check utils/cors.js
curl -I https://[your-app].vercel.app/api/tasks
```

#### 3. Routing Issues
```bash
# 404 on API routes - Check vercel.json
cat vercel.json

# Frontend routing - Check build/index.html
ls -la build/
```

### Lệnh debug
```bash
# View deployment logs
vercel logs

# Local development with Vercel
vercel dev

# Check function details
vercel inspect [deployment-url]

# Test functions locally
vercel dev --debug
```

## 🔄 Cập Nhật & Khôi Phục

### Cập nhật triển khai
```bash
# 1. Make changes
# 2. Build frontend (if needed)
cd frontend && npm run build

# 3. Copy updates
cp -r frontend/build ../

# 4. Deploy
cd .. && vercel --prod
```

### Khôi phục triển khai
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [previous-deployment-url]
```

## 📈 Tối Ưu Hóa Hiệu Suất

### Tối ưu hóa build
```bash
# Analyze bundle size
cd frontend
npm run build -- --analyze

# Minimize bundle
npm install --save-dev webpack-bundle-analyzer
```

### Tối ưu hóa function
- Keep functions under 50MB
- Use minimal dependencies
- Enable edge caching where possible

### CDN & Cache
```javascript
// In vercel.json
{
  "headers": [
    {
      "source": "/build/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🔐 Cấu Hình Bảo Mật

### HTTPS & Headers
```javascript
// In API routes
res.setHeader('Strict-Transport-Security', 'max-age=31536000');
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
```

### Giới hạn tốc độ (Tùy chọn)
```javascript
// In API middleware
const rateLimit = require('express-rate-limit');
```

## 📞 Hỗ Trợ & Tài Nguyên

### Tài liệu
- [Vercel Docs](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

### Cộng đồng
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/vercel/vercel/issues)

---

*Hướng Dẫn Triển Khai v1.0 - Cập nhật lần cuối: 2025-08-16*