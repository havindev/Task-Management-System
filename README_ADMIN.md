# Quản Lý Công Việc - Hướng Dẫn Admin

Hướng dẫn quản trị và bảo trì hệ thống Quản Lý Công Việc.

## 🔑 Tài khoản Admin

### Tài khoản mặc định
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@taskmanager.com`

### Tài khoản test khác
- **User:** `hieu` / `hieu123`
- **Demo:** `demo` / `demo123`

## 🗄️ Quản Lý Cơ Sở Dữ Liệu

### Vercel KV Database
- **Vị trí:** Vercel Dashboard → Storage → KV
- **Các khóa:**
  - `users` - Mảng chứa dữ liệu người dùng
  - `tasks` - Mảng chứa dữ liệu công việc
  - `db_json_migrated` - Cờ đánh dấu migration

### Dự phòng bộ nhớ
- Khi KV không khả dụng, hệ thống tự động dùng lưu trữ trong bộ nhớ
- Dữ liệu được lưu trong mảng `defaultTasks` (backend/api/tasks.js)
- Khởi động lại session sẽ reset dữ liệu bộ nhớ

## 📊 Giám Sát & Logs

### Vercel Dashboard
- **Functions:** Giám sát hiệu suất API
- **Analytics:** Xem mẫu lưu lượng truy cập
- **Logs:** Debug các vấn đề API

### Console Logs
```bash
# View deployment logs
vercel logs [deployment-url]

# Real-time logs
vercel dev --debug
```

## 🛠️ Thao Tác Admin

### Thêm người dùng mới
1. Truy cập `backend/utils/userData.js`
2. Thêm object người dùng mới vào mảng `defaultUsers`:
```javascript
{
  id: "4",
  username: "newuser",
  password: "password123",
  email: "newuser@taskmanager.com",
  createdAt: "2024-01-04T00:00:00.000Z"
}
```
3. Triển khai lại backend

### Đặt lại cơ sở dữ liệu
```bash
# Xóa KV data (từ Vercel dashboard)
# Hoặc dùng API call
curl -X DELETE https://api.vercel.com/v1/storage/kv/...
```

### Sao lưu dữ liệu
```bash
# Export tasks data
curl "https://your-app.vercel.app/api/tasks?userId=all" > backup.json

# Export users data  
curl "https://your-app.vercel.app/api/users" > users_backup.json
```

## 🔧 Tệp Cấu Hình

### Cấu hình Backend
- `backend/vercel.json` - Cài đặt triển khai Vercel
- `backend/db.json` - Cơ sở dữ liệu dự phòng
- `backend/utils/userData.js` - Người dùng mặc định
- `backend/utils/cors.js` - Cài đặt CORS

### Cấu hình Frontend
- `frontend/package.json` - Các dependencies
- `frontend/public/manifest.json` - Cài đặt PWA

## 🚨 Troubleshooting

### API Issues
1. **500 Error:** Check Vercel function logs
2. **CORS Error:** Verify `utils/cors.js` settings
3. **KV Error:** Check Vercel KV dashboard status

### Frontend Issues
1. **Build Error:** Check `npm run build` output
2. **Auth Error:** Verify token storage
3. **API Connection:** Check network tab

### Common Fixes
```bash
# Clear Vercel cache
vercel --prod --force

# Reset local environment
rm -rf node_modules package-lock.json
npm install

# Check environment variables
vercel env ls
```

## 📈 Performance Monitoring

### Key Metrics
- **API Response Time:** < 500ms target
- **Page Load Time:** < 2s target  
- **Error Rate:** < 1% target

### Optimization
- Monitor Vercel function cold starts
- Check bundle size: `npm run build -- --analyze`
- Review Core Web Vitals

## 🔐 Security Checklist

### Regular Tasks
- [ ] Review access logs monthly
- [ ] Update passwords quarterly  
- [ ] Check for unauthorized API calls
- [ ] Monitor unusual traffic patterns

### Security Headers
```javascript
// In API routes
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
```

## 📞 Support & Maintenance

### Emergency Contacts
- **Developer:** [Your contact info]
- **Vercel Support:** https://vercel.com/help

### Maintenance Schedule
- **Daily:** Check error logs
- **Weekly:** Review performance metrics
- **Monthly:** Security audit
- **Quarterly:** Dependency updates

## 🔄 Update Process

### Code Updates
1. Test locally: `npm run dev`
2. Build frontend: `npm run build`
3. Deploy: `vercel --prod`
4. Verify: Test all features

### Database Schema Updates
1. Update `utils/userData.js` 
2. Create migration script if needed
3. Test with fallback data
4. Deploy and monitor

---

*Cập nhật lần cuối: 2025-08-16*