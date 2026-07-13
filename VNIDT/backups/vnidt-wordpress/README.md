# VNiDT WordPress — Hướng Dẫn Triển Khai

## Tổng Quan

Đây là phiên bản WordPress của website VNiDT, chuyển đổi từ kiến trúc NestJS + SQLite sang WordPress + MySQL. Giao diện giữ nguyên 100%.

## Cấu Trúc Thư Mục

```
vnidt-wordpress/
├── docker-compose.yml          # Docker stack: WordPress + MySQL + Nginx
├── .env                        # Biến môi trường (credentials)
├── .env.example                # Template .env
├── deploy.sh                   # Script triển khai tự động
├── nginx/
│   └── default.conf            # Cấu hình Nginx reverse proxy
└── wp-content/
    └── themes/
        └── vnidt-theme/        # Custom WordPress theme
            ├── style.css       # Giao diện chính (CSS)
            ├── styles_enterprise.css  # CSS bổ sung
            ├── functions.php   # Logic theme (ACF, API, menu, SMTP)
            ├── header.php      # Header & Navigation
            ├── footer.php      # Footer
            ├── front-page.php  # Template trang chủ
            ├── page.php        # Template trang thường
            ├── single.php      # Template bài viết
            ├── 404.php         # Trang lỗi 404
            ├── js/
            │   └── script.js   # Animations & Contact form
            └── assets/         # Logo, ảnh
```

## Yêu Cầu Hệ Thống

- **Server**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **Docker**: 20.10+ & Docker Compose v2
- **RAM**: Tối thiểu 1GB (khuyến nghị 2GB)
- **Disk**: Tối thiểu 5GB

## Triển Khai Nhanh (Docker)

### 1. Upload lên server

```bash
# SCP hoặc rsync thư mục vnidt-wordpress lên server
scp -r vnidt-wordpress/ user@server:/opt/vnidt/
```

### 2. Cấu hình .env

```bash
cd /opt/vnidt
cp .env.example .env
nano .env   # Sửa mật khẩu database và SMTP
```

### 3. Chạy deploy

```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. Truy cập

- **Website**: `http://your-domain.com`
- **Admin**: `http://your-domain.com/wp-admin`
- **Username**: `admin`
- **Password**: `VNiDT@2026!` (đổi ngay sau khi đăng nhập!)

## Cấu Hình Sau Cài Đặt

### 1. WP Mail SMTP (gửi email liên hệ)

1. Vào **WP Admin → WP Mail SMTP → Settings**
2. Chọn Mailer: **Other SMTP**
3. SMTP Host: `smtp.gmail.com`
4. Port: `587`
5. Encryption: `TLS`
6. Username: `vnidt.jsc@gmail.com`
7. Password: (App Password từ .env)

### 2. Chỉnh sửa nội dung trang chủ

1. Vào **WP Admin → Pages → Trang Chủ → Edit**
2. Cuộn xuống sẽ thấy các ACF field groups:
   - Hero Section
   - Giới Thiệu
   - Giá Trị Cốt Lõi
   - Thống Kê
   - Về Chúng Tôi
   - Giải Pháp
   - GIS Dashboard
   - Dự Án Tiêu Biểu
   - Khách Hàng
   - Tin Tức
   - CTA & Liên Hệ
   - Footer

### 3. Upload Logo

1. Vào **WP Admin → Appearance → Customize → Site Identity**
2. Upload logo mới

### 4. SSL (Let's Encrypt)

```bash
# Cài Certbot
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

## Plugins Đã Cài

| Plugin | Chức năng |
|--------|-----------|
| Advanced Custom Fields | Quản lý nội dung trang chủ |
| WP Mail SMTP | Gửi email liên hệ qua Gmail |
| Wordfence | Bảo mật WordPress |

## Plugins Khuyến Nghị Thêm

- **Yoast SEO** — Tối ưu SEO
- **UpdraftPlus** — Backup tự động
- **WP Super Cache** — Tăng tốc trang

## Quản Lý Docker

```bash
# Xem trạng thái
docker compose ps

# Xem logs
docker compose logs -f vnidt-wordpress

# Restart
docker compose restart

# Stop
docker compose down

# Backup database
docker compose exec vnidt-db mysqldump -u vnidt -p vnidt_wp > backup.sql
```

## Chuyển Từ NestJS Sang WordPress — Những Gì Đã Thay Đổi

| Trước (NestJS) | Sau (WordPress) |
|-----------------|-----------------|
| `content.js` (key-value CMS) | ACF field groups |
| `ContactService` (Nodemailer) | WP REST API + `wp_mail()` |
| `/api/contact` endpoint | `/wp-json/vnidt/v1/contact` |
| `admin.html` (custom admin) | WordPress Admin `/wp-admin` |
| `login.html` (JWT auth) | WordPress login `/wp-login.php` |
| SQLite database | MySQL 8.0 |
| PM2 / Node.js | Apache + PHP 8.2 |
| Prisma ORM | WordPress native |
