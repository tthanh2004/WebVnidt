# 🚀 VNiDT Website - Hướng dẫn Triển khai trên Linux Server

## 📦 Nội dung gói triển khai

```
vnidt-linux-deploy/
├── dist/                  # Backend đã compile (NestJS → JavaScript)
│   ├── src/               # Mã nguồn đã build
│   └── public/            # Frontend (copy cho ServeStaticModule)
├── public/                # Frontend website (HTML/CSS/JS)
│   ├── index.html         # Trang chủ
│   ├── admin.html         # Trang quản trị
│   ├── login.html         # Trang đăng nhập
│   ├── style.css          # CSS chính
│   ├── script.js          # JavaScript chính
│   └── content.js         # Nội dung CMS
├── prisma/                # Database schema
│   └── schema.prisma
├── nginx/                 # Cấu hình Nginx cho Docker
│   └── default.conf
├── dev.db                 # SQLite database (có sẵn dữ liệu)
├── package.json           # Dependencies
├── package-lock.json
├── ecosystem.config.js    # PM2 config
├── .env.production        # Cấu hình production
├── install.sh             # Script cài đặt tự động
├── Dockerfile             # Docker build
└── docker-compose.yml     # Docker Compose
```

---

## ⚡ Cách 1: Cài đặt tự động (KHUYẾN NGHỊ)

### Bước 1: Upload file lên server

```bash
# Từ máy Windows, dùng SCP hoặc SFTP
scp vnidt-linux-deploy.tar.gz user@YOUR_SERVER_IP:/tmp/
```

### Bước 2: SSH vào server

```bash
ssh user@YOUR_SERVER_IP
```

### Bước 3: Giải nén và cài đặt

```bash
cd /tmp
tar -xzf vnidt-linux-deploy.tar.gz
cd vnidt-linux-deploy

# Cài đặt với domain và SSL
sudo bash install.sh --domain vnidt.vn --ssl

# Hoặc cài đặt cơ bản (không có domain)
sudo bash install.sh
```

### Tùy chọn install.sh

| Option | Mô tả | Mặc định |
|--------|--------|----------|
| `--domain <domain>` | Tên miền | localhost |
| `--port <port>` | Port ứng dụng | 3000 |
| `--dir <path>` | Thư mục cài đặt | /var/www/vnidt |
| `--ssl` | Cài SSL (Let's Encrypt) | không |

**Ví dụ đầy đủ:**
```bash
sudo bash install.sh --domain vnidt.vn --port 3000 --ssl
```

### Script tự động thực hiện:
1. ✅ Cài đặt Node.js 20.x
2. ✅ Cài đặt PM2 (Process Manager)
3. ✅ Cài đặt và cấu hình Nginx (Reverse Proxy)
4. ✅ Copy files vào thư mục cài đặt
5. ✅ Cài đặt npm dependencies
6. ✅ Tạo Prisma client & đồng bộ database
7. ✅ Cấu hình firewall (UFW/firewalld)
8. ✅ Khởi động ứng dụng với PM2
9. ✅ Tạo systemd service (tùy chọn)
10. ✅ Cấu hình log rotation
11. ✅ Tạo công cụ quản lý `vnidt-ctl`
12. ✅ Cài đặt SSL nếu có `--ssl`

---

## 🐳 Cách 2: Docker (Đơn giản nhất)

### Yêu cầu
- Docker và Docker Compose đã cài đặt

### Bước 1: Upload và giải nén

```bash
scp vnidt-linux-deploy.tar.gz user@YOUR_SERVER_IP:/tmp/
ssh user@YOUR_SERVER_IP
cd /tmp && tar -xzf vnidt-linux-deploy.tar.gz
cd vnidt-linux-deploy
```

### Bước 2: Cấu hình

```bash
# Tạo file .env từ template
cp .env.production .env

# Chỉnh sửa cấu hình
nano .env
```

### Bước 3: Khởi động

```bash
# Build và chạy
docker compose up -d

# Xem logs
docker compose logs -f

# Kiểm tra trạng thái
docker compose ps
```

### Quản lý Docker

```bash
# Dừng
docker compose down

# Khởi động lại
docker compose restart

# Cập nhật
docker compose down
docker compose build --no-cache
docker compose up -d

# Backup database
docker cp vnidt-app:/app/dev.db ./backup-dev.db
```

---

## 🔧 Cách 3: Cài đặt thủ công

### 1. Cài đặt phần mềm cần thiết

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs nginx

# Cài PM2
sudo npm install pm2 -g
```

### 2. Triển khai ứng dụng

```bash
# Tạo thư mục
sudo mkdir -p /var/www/vnidt
sudo cp -r /tmp/vnidt-linux-deploy/* /var/www/vnidt/
cd /var/www/vnidt

# Cài dependencies
sudo npm ci --omit=dev

# Setup Prisma
sudo npx prisma generate
sudo npx prisma db push --accept-data-loss

# Tạo file .env
sudo cp .env.production .env
sudo nano .env   # Chỉnh sửa cấu hình
```

### 3. Khởi động

```bash
# Khởi động với PM2
pm2 start ecosystem.config.js

# Tự động khởi động cùng hệ thống
pm2 startup
pm2 save
```

### 4. Cấu hình Nginx

```bash
# Tạo cấu hình Nginx
sudo nano /etc/nginx/sites-available/vnidt
```

Nội dung:
```nginx
server {
    listen 80;
    server_name vnidt.vn www.vnidt.vn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Kích hoạt
sudo ln -s /etc/nginx/sites-available/vnidt /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Cài SSL (tùy chọn)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d vnidt.vn -d www.vnidt.vn
```

---

## 🛠️ Quản lý Server

### Công cụ vnidt-ctl (sau khi cài bằng install.sh)

```bash
vnidt-ctl start      # Khởi động server
vnidt-ctl stop       # Dừng server
vnidt-ctl restart    # Khởi động lại
vnidt-ctl status     # Xem trạng thái
vnidt-ctl logs       # Xem logs (mặc định 50 dòng)
vnidt-ctl logs 200   # Xem 200 dòng logs gần nhất
vnidt-ctl backup     # Sao lưu database & cấu hình
vnidt-ctl update     # Cập nhật ứng dụng
```

### Quản lý PM2

```bash
pm2 status           # Xem trạng thái
pm2 logs vnidt-cms   # Xem logs realtime
pm2 restart vnidt-cms # Khởi động lại
pm2 monit            # Monitor realtime
```

---

## 🔐 Cấu hình bảo mật

### File .env cần chỉnh sửa

```bash
# JWT Secret - BẮT BUỘC thay đổi
JWT_SECRET=thay-doi-gia-tri-nay-thanh-chuoi-ngau-nhien-dai

# SMTP Password
SMTP_USER=vnidt.jsc@gmail.com
SMTP_PASS=your_google_app_password
```

### Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Firewalld (CentOS)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

---

## 📋 Truy cập sau khi cài đặt

| Trang | URL |
|-------|-----|
| Website | http://vnidt.vn (hoặc http://SERVER_IP) |
| Trang Admin | http://vnidt.vn/admin.html |
| Đăng nhập | http://vnidt.vn/login.html |
| API Documentation | http://vnidt.vn/api/docs |

---

## ❓ Xử lý sự cố

### Server không khởi động được

```bash
# Kiểm tra logs
pm2 logs vnidt-cms --lines 100

# Kiểm tra port đã bị chiếm chưa
sudo lsof -i :3000

# Khởi động thủ công để debug
cd /var/www/vnidt
node dist/src/main.js
```

### Nginx lỗi 502 Bad Gateway

```bash
# Kiểm tra app có đang chạy không
pm2 status

# Kiểm tra Nginx config
sudo nginx -t

# Restart tất cả
pm2 restart vnidt-cms
sudo systemctl restart nginx
```

### Database lỗi

```bash
cd /var/www/vnidt

# Reset database schema
npx prisma db push --accept-data-loss

# Tạo lại Prisma client
npx prisma generate
```
