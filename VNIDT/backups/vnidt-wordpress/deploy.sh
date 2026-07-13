#!/bin/bash
# ═══════════════════════════════════════════════════════════
# VNiDT WordPress — Deploy Script
# Chạy trên server Linux (Ubuntu/Debian/CentOS)
# ═══════════════════════════════════════════════════════════

set -e

echo "╔══════════════════════════════════════════════════════╗"
echo "║   VNiDT WordPress — Triển Khai Tự Động              ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ─── 1. Kiểm tra Docker ──────────────────────────────────
echo "→ Kiểm tra Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker chưa được cài đặt. Đang cài..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker đã cài thành công."
else
    echo "✅ Docker đã có sẵn: $(docker --version)"
fi

if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose chưa có. Plugin compose thường đi kèm Docker mới."
    echo "   Thử: apt install docker-compose-plugin"
fi

# ─── 2. Cấu hình .env ────────────────────────────────────
if [ ! -f .env ]; then
    echo "→ Tạo file .env từ .env.example..."
    cp .env.example .env
    echo "⚠️  Vui lòng chỉnh sửa file .env trước khi tiếp tục!"
    echo "   nano .env"
    exit 1
fi

echo "✅ File .env đã sẵn sàng."

# ─── 3. Tạo thư mục cần thiết ────────────────────────────
echo "→ Tạo thư mục..."
mkdir -p nginx/ssl
mkdir -p wp-content/uploads
chmod 755 wp-content/uploads

# ─── 4. Khởi động Docker Compose ─────────────────────────
echo "→ Khởi động Docker containers..."
docker compose down 2>/dev/null || true
docker compose up -d

echo ""
echo "→ Đợi WordPress khởi động (60 giây)..."
sleep 60

# ─── 5. Cài đặt WordPress qua WP-CLI ────────────────────
echo "→ Cài đặt WordPress..."
docker compose exec -T vnidt-wordpress bash -c '
    # Cài WP-CLI nếu chưa có
    if ! command -v wp &> /dev/null; then
        curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
        chmod +x wp-cli.phar
        mv wp-cli.phar /usr/local/bin/wp
    fi

    # Cài đặt WordPress
    wp core install \
        --url="http://localhost" \
        --title="VNiDT — Tài Nguyên Số Của Bạn" \
        --admin_user=admin \
        --admin_password=VNiDT@2026! \
        --admin_email=vnidt.jsc@gmail.com \
        --locale=vi \
        --allow-root

    # Kích hoạt theme
    wp theme activate vnidt-theme --allow-root

    # Cài đặt plugins
    wp plugin install advanced-custom-fields --activate --allow-root
    wp plugin install wp-mail-smtp --activate --allow-root
    wp plugin install wordfence --activate --allow-root

    # Tạo trang chủ
    wp post create --post_type=page --post_title="Trang Chủ" --post_status=publish --page_template="front-page.php" --allow-root

    # Đặt trang chủ tĩnh
    HOMEPAGE_ID=$(wp post list --post_type=page --post_status=publish --name="trang-chu" --field=ID --allow-root)
    wp option update show_on_front page --allow-root
    wp option update page_on_front $HOMEPAGE_ID --allow-root

    # Cài đặt permalink
    wp rewrite structure "/%postname%/" --allow-root
    wp rewrite flush --allow-root

    # Cấu hình timezone
    wp option update timezone_string "Asia/Ho_Chi_Minh" --allow-root
    wp option update date_format "d/m/Y" --allow-root

    echo "✅ WordPress đã cài đặt thành công!"
'

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║   ✅ TRIỂN KHAI THÀNH CÔNG!                         ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║                                                      ║"
echo "║   Website:  http://localhost                         ║"
echo "║   WP Admin: http://localhost/wp-admin                ║"
echo "║   Username: admin                                    ║"
echo "║   Password: VNiDT@2026!                              ║"
echo "║                                                      ║"
echo "║   ⚠️  Hãy đổi mật khẩu admin ngay!                  ║"
echo "║   ⚠️  Cấu hình WP Mail SMTP trong wp-admin          ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
