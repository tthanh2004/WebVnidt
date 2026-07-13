#!/bin/bash
# ============================================================
#   VNiDT Website - Script Cai dat cho Linux Server
#   Tuong thich: Ubuntu 20.04+, Debian 11+, CentOS 8+
# ============================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Config
INSTALL_DIR="/var/www/vnidt"
APP_PORT=3000
DOMAIN=""
ENABLE_SSL="n"

# ─── Functions ───────────────────────────────────────────────

print_banner() {
    echo -e "${CYAN}"
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║                                                            ║"
    echo "║        VNiDT Website - Cai dat Linux Server               ║"
    echo "║        Version 1.0 - Production Deployment                 ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

log_step() {
    echo -e "\n${BLUE}[${1}]${NC} ${BOLD}${2}${NC}"
}

log_ok() {
    echo -e "  ${GREEN}✔${NC} ${1}"
}

log_warn() {
    echo -e "  ${YELLOW}⚠${NC} ${1}"
}

log_error() {
    echo -e "  ${RED}✖${NC} ${1}"
}

log_info() {
    echo -e "  ${CYAN}ℹ${NC} ${1}"
}

check_root() {
    if [ "$EUID" -ne 0 ]; then
        log_error "Vui long chay script nay voi quyen root!"
        echo -e "  Su dung: ${YELLOW}sudo bash install.sh${NC}"
        exit 1
    fi
}

detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
        OS_VERSION=$VERSION_ID
    elif [ -f /etc/redhat-release ]; then
        OS="centos"
    else
        OS="unknown"
    fi
    log_ok "He dieu hanh: ${OS} ${OS_VERSION}"
}

# ─── Parse Arguments ─────────────────────────────────────────

while [[ $# -gt 0 ]]; do
    case $1 in
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        --port)
            APP_PORT="$2"
            shift 2
            ;;
        --dir)
            INSTALL_DIR="$2"
            shift 2
            ;;
        --ssl)
            ENABLE_SSL="y"
            shift
            ;;
        --help)
            echo "Su dung: sudo bash install.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --domain <domain>   Ten mien (vd: vnidt.vn)"
            echo "  --port <port>       Port ung dung (mac dinh: 3000)"
            echo "  --dir <path>        Thu muc cai dat (mac dinh: /var/www/vnidt)"
            echo "  --ssl               Cai dat SSL tu dong bang Let's Encrypt"
            echo "  --help              Hien thi huong dan"
            exit 0
            ;;
        *)
            shift
            ;;
    esac
done

# ─── Main Installation ───────────────────────────────────────

print_banner
check_root

log_step "1/8" "Kiem tra he thong..."
detect_os

# ─── Step 2: Install Node.js ─────────────────────────────────

log_step "2/8" "Cai dat Node.js..."

if command -v node &> /dev/null; then
    NODE_VER=$(node -v)
    log_ok "Node.js ${NODE_VER} da duoc cai dat"
else
    log_info "Dang cai dat Node.js 20.x..."
    case $OS in
        ubuntu|debian)
            curl -fsSL https://deb.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
            apt-get install -y nodejs > /dev/null 2>&1
            ;;
        centos|rhel|fedora|rocky|almalinux)
            curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - > /dev/null 2>&1
            yum install -y nodejs > /dev/null 2>&1
            ;;
        *)
            log_error "Khong ho tro tu dong cai Node.js tren ${OS}"
            log_info "Vui long cai dat Node.js 20+ thu cong truoc khi chay lai script"
            exit 1
            ;;
    esac
    log_ok "Node.js $(node -v) - da cai dat"
fi

# ─── Step 3: Install PM2 ─────────────────────────────────────

log_step "3/8" "Cai dat PM2 (Process Manager)..."

if command -v pm2 &> /dev/null; then
    log_ok "PM2 da duoc cai dat"
else
    npm install -g pm2 > /dev/null 2>&1
    log_ok "PM2 - da cai dat"
fi

# ─── Step 4: Install Nginx ───────────────────────────────────

log_step "4/8" "Cai dat Nginx..."

if command -v nginx &> /dev/null; then
    log_ok "Nginx da duoc cai dat"
else
    log_info "Dang cai dat Nginx..."
    case $OS in
        ubuntu|debian)
            apt-get update -qq > /dev/null 2>&1
            apt-get install -y nginx > /dev/null 2>&1
            ;;
        centos|rhel|fedora|rocky|almalinux)
            yum install -y nginx > /dev/null 2>&1
            ;;
    esac
    log_ok "Nginx - da cai dat"
fi

# ─── Step 5: Copy application files ──────────────────────────

log_step "5/8" "Cai dat ung dung..."

# Get script directory (where the deploy package is)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Create install directory
mkdir -p "${INSTALL_DIR}"
log_ok "Thu muc: ${INSTALL_DIR}"

# Copy all files
log_info "Dang sao chep files..."

# Copy dist (compiled backend)
if [ -d "${SCRIPT_DIR}/dist" ]; then
    cp -r "${SCRIPT_DIR}/dist" "${INSTALL_DIR}/"
    log_ok "dist/ (backend compiled)"
fi

# Copy public (frontend)
if [ -d "${SCRIPT_DIR}/public" ]; then
    cp -r "${SCRIPT_DIR}/public" "${INSTALL_DIR}/"
    log_ok "public/ (frontend website)"
fi

# Copy prisma
if [ -d "${SCRIPT_DIR}/prisma" ]; then
    cp -r "${SCRIPT_DIR}/prisma" "${INSTALL_DIR}/"
    log_ok "prisma/ (database schema)"
fi

# Copy package files
cp "${SCRIPT_DIR}/package.json" "${INSTALL_DIR}/"
cp "${SCRIPT_DIR}/package-lock.json" "${INSTALL_DIR}/"
log_ok "package.json, package-lock.json"

# Copy ecosystem config
cp "${SCRIPT_DIR}/ecosystem.config.js" "${INSTALL_DIR}/"
log_ok "ecosystem.config.js (PM2)"

# Copy generated (Prisma client) if exists
if [ -d "${SCRIPT_DIR}/generated" ]; then
    cp -r "${SCRIPT_DIR}/generated" "${INSTALL_DIR}/"
    log_ok "generated/ (Prisma client)"
fi

# Setup .env
if [ ! -f "${INSTALL_DIR}/.env" ]; then
    if [ -f "${SCRIPT_DIR}/.env.production" ]; then
        cp "${SCRIPT_DIR}/.env.production" "${INSTALL_DIR}/.env"
        log_ok ".env (cau hinh) - TAO MOI"
        log_warn "Hay chinh sua file ${INSTALL_DIR}/.env de cap nhat cau hinh!"
    fi
else
    log_ok ".env (cau hinh) - GIU NGUYEN file hien tai"
fi

# Copy database if not exists
if [ ! -f "${INSTALL_DIR}/dev.db" ]; then
    if [ -f "${SCRIPT_DIR}/dev.db" ]; then
        cp "${SCRIPT_DIR}/dev.db" "${INSTALL_DIR}/"
        log_ok "dev.db (database) - SAO CHEP"
    fi
else
    log_ok "dev.db (database) - GIU NGUYEN data hien tai"
fi

# Create logs directory
mkdir -p "${INSTALL_DIR}/logs"

# Create uploads directory
mkdir -p "${INSTALL_DIR}/uploads"

# ─── Step 6: Install dependencies ────────────────────────────

log_step "6/8" "Cai dat dependencies..."

cd "${INSTALL_DIR}"

log_info "Dang cai dat npm packages (production only)..."
npm ci --omit=dev 2>/dev/null || npm install --omit=dev 2>/dev/null
log_ok "npm dependencies"

log_info "Tao Prisma client..."
npx prisma generate > /dev/null 2>&1
log_ok "Prisma client"

log_info "Dong bo database schema..."
npx prisma db push --accept-data-loss > /dev/null 2>&1 || true
log_ok "Database schema"

# Set proper ownership
chown -R www-data:www-data "${INSTALL_DIR}" 2>/dev/null || true

# ─── Step 7: Configure Nginx ─────────────────────────────────

log_step "7/8" "Cau hinh Nginx..."

if [ -n "${DOMAIN}" ]; then
    SERVER_NAME="${DOMAIN} www.${DOMAIN}"
else
    SERVER_NAME="_"
    DOMAIN="localhost"
fi

# Create Nginx config
cat > /etc/nginx/sites-available/vnidt <<NGINX_EOF
# VNiDT Website - Nginx Configuration
# Generated by install.sh

upstream vnidt_backend {
    server 127.0.0.1:${APP_PORT};
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name ${SERVER_NAME};

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        image/svg+xml;

    # Max upload size
    client_max_body_size 50M;

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://vnidt_backend;
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API routes
    location /api/ {
        proxy_pass http://vnidt_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # All other routes
    location / {
        proxy_pass http://vnidt_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX_EOF

# Enable site
if [ -d /etc/nginx/sites-enabled ]; then
    rm -f /etc/nginx/sites-enabled/default
    ln -sf /etc/nginx/sites-available/vnidt /etc/nginx/sites-enabled/vnidt
else
    # CentOS/RHEL style
    cp /etc/nginx/sites-available/vnidt /etc/nginx/conf.d/vnidt.conf
fi

# Test Nginx config
if nginx -t > /dev/null 2>&1; then
    log_ok "Nginx config - OK"
    systemctl enable nginx > /dev/null 2>&1
    systemctl restart nginx > /dev/null 2>&1
    log_ok "Nginx - da khoi dong"
else
    log_warn "Nginx config co loi, vui long kiem tra: nginx -t"
fi

# ─── Step 8: Start application ───────────────────────────────

log_step "8/8" "Khoi dong ung dung..."

cd "${INSTALL_DIR}"

# Stop existing PM2 process if running
pm2 delete vnidt-cms > /dev/null 2>&1 || true

# Start with PM2
pm2 start ecosystem.config.js
log_ok "Ung dung da khoi dong voi PM2"

# Setup PM2 startup
pm2 startup > /dev/null 2>&1 || true
pm2 save > /dev/null 2>&1
log_ok "PM2 - tu dong khoi dong cung he thong"

# ─── SSL Setup (optional) ────────────────────────────────────

if [ "${ENABLE_SSL}" = "y" ] && [ "${DOMAIN}" != "localhost" ]; then
    log_step "SSL" "Cai dat SSL voi Let's Encrypt..."

    case $OS in
        ubuntu|debian)
            apt-get install -y certbot python3-certbot-nginx > /dev/null 2>&1
            ;;
        centos|rhel|fedora|rocky|almalinux)
            yum install -y certbot python3-certbot-nginx > /dev/null 2>&1
            ;;
    esac

    certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos --email "admin@${DOMAIN}" || {
        log_warn "Khong the cai dat SSL tu dong. Vui long chay thu cong:"
        log_info "certbot --nginx -d ${DOMAIN}"
    }

    # Setup auto-renewal
    (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet") | sort -u | crontab -
    log_ok "SSL auto-renewal - da cau hinh"
fi

# ─── Create management scripts ───────────────────────────────

# vnidt-ctl management script
cat > /usr/local/bin/vnidt-ctl <<'CTRL_EOF'
#!/bin/bash
# VNiDT Website - Management Tool

APP_DIR="/var/www/vnidt"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

case "$1" in
    start)
        echo -e "${CYAN}Dang khoi dong VNiDT...${NC}"
        cd "$APP_DIR" && pm2 start ecosystem.config.js
        echo -e "${GREEN}✔ Server da khoi dong${NC}"
        ;;
    stop)
        echo -e "${YELLOW}Dang dung VNiDT...${NC}"
        pm2 stop vnidt-cms
        echo -e "${GREEN}✔ Server da dung${NC}"
        ;;
    restart)
        echo -e "${CYAN}Dang khoi dong lai VNiDT...${NC}"
        pm2 restart vnidt-cms
        echo -e "${GREEN}✔ Server da khoi dong lai${NC}"
        ;;
    status)
        echo -e "${CYAN}╔════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║   VNiDT Website - Trang thai       ║${NC}"
        echo -e "${CYAN}╚════════════════════════════════════╝${NC}"
        echo ""
        pm2 show vnidt-cms
        echo ""
        echo -e "${CYAN}Nginx status:${NC}"
        systemctl status nginx --no-pager -l | head -5
        ;;
    logs)
        pm2 logs vnidt-cms --lines "${2:-50}"
        ;;
    update)
        echo -e "${CYAN}Dang cap nhat VNiDT...${NC}"
        cd "$APP_DIR"
        pm2 stop vnidt-cms
        npm ci --omit=dev
        npx prisma generate
        npx prisma db push --accept-data-loss || true
        pm2 start ecosystem.config.js
        echo -e "${GREEN}✔ Cap nhat thanh cong${NC}"
        ;;
    backup)
        BACKUP_DIR="/var/backups/vnidt"
        BACKUP_FILE="${BACKUP_DIR}/vnidt-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        mkdir -p "$BACKUP_DIR"
        tar -czf "$BACKUP_FILE" -C "$APP_DIR" dev.db .env uploads/ 2>/dev/null || \
        tar -czf "$BACKUP_FILE" -C "$APP_DIR" dev.db .env 2>/dev/null
        echo -e "${GREEN}✔ Backup da luu tai: ${BACKUP_FILE}${NC}"
        ;;
    *)
        echo -e "${CYAN}VNiDT Website - Cong cu quan ly${NC}"
        echo ""
        echo "Su dung: vnidt-ctl {start|stop|restart|status|logs|update|backup}"
        echo ""
        echo "  start    - Khoi dong server"
        echo "  stop     - Dung server"
        echo "  restart  - Khoi dong lai server"
        echo "  status   - Xem trang thai"
        echo "  logs     - Xem logs (them so dong: vnidt-ctl logs 100)"
        echo "  update   - Cap nhat ung dung"
        echo "  backup   - Sao luu database va cau hinh"
        echo ""
        ;;
esac
CTRL_EOF

# Update INSTALL_DIR in vnidt-ctl
sed -i "s|APP_DIR=\"/var/www/vnidt\"|APP_DIR=\"${INSTALL_DIR}\"|" /usr/local/bin/vnidt-ctl
chmod +x /usr/local/bin/vnidt-ctl
log_ok "vnidt-ctl - cong cu quan ly da duoc tao"

# ─── Create systemd service (alternative to PM2) ─────────────

cat > /etc/systemd/system/vnidt.service <<SYSTEMD_EOF
[Unit]
Description=VNiDT Website CMS
Documentation=https://vnidt.vn
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=${INSTALL_DIR}
ExecStart=$(which node) dist/src/main.js
Restart=always
RestartSec=10
StandardOutput=append:${INSTALL_DIR}/logs/app.log
StandardError=append:${INSTALL_DIR}/logs/error.log
Environment=NODE_ENV=production
EnvironmentFile=${INSTALL_DIR}/.env

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=${INSTALL_DIR}
PrivateTmp=true

[Install]
WantedBy=multi-user.target
SYSTEMD_EOF

systemctl daemon-reload
log_ok "systemd service - da tao (tuy chon, mac dinh dung PM2)"

# ─── Setup Firewall ──────────────────────────────────────────

if command -v ufw &> /dev/null; then
    ufw allow 'Nginx Full' > /dev/null 2>&1
    log_ok "Firewall (UFW) - da mo port 80, 443"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-service=http > /dev/null 2>&1
    firewall-cmd --permanent --add-service=https > /dev/null 2>&1
    firewall-cmd --reload > /dev/null 2>&1
    log_ok "Firewall (firewalld) - da mo port 80, 443"
fi

# ─── Setup Log Rotation ──────────────────────────────────────

cat > /etc/logrotate.d/vnidt <<LOGROTATE_EOF
${INSTALL_DIR}/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reloadLogs > /dev/null 2>&1 || true
    endscript
}
LOGROTATE_EOF

log_ok "Log rotation - da cau hinh (giu 14 ngay)"

# ─── Done ─────────────────────────────────────────────────────

echo ""
echo -e "${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║              CAI DAT HOAN TAT THANH CONG!                 ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BOLD}Thong tin cai dat:${NC}"
echo -e "  Thu muc:    ${CYAN}${INSTALL_DIR}${NC}"
echo -e "  Port:       ${CYAN}${APP_PORT}${NC}"
if [ "${DOMAIN}" != "localhost" ]; then
    echo -e "  Domain:     ${CYAN}${DOMAIN}${NC}"
fi
echo ""

echo -e "${BOLD}Truy cap:${NC}"
if [ "${DOMAIN}" != "localhost" ]; then
    if [ "${ENABLE_SSL}" = "y" ]; then
        echo -e "  Website:    ${CYAN}https://${DOMAIN}${NC}"
        echo -e "  Admin:      ${CYAN}https://${DOMAIN}/admin.html${NC}"
        echo -e "  API Docs:   ${CYAN}https://${DOMAIN}/api/docs${NC}"
    else
        echo -e "  Website:    ${CYAN}http://${DOMAIN}${NC}"
        echo -e "  Admin:      ${CYAN}http://${DOMAIN}/admin.html${NC}"
        echo -e "  API Docs:   ${CYAN}http://${DOMAIN}/api/docs${NC}"
    fi
else
    echo -e "  Website:    ${CYAN}http://SERVER_IP${NC}"
    echo -e "  Admin:      ${CYAN}http://SERVER_IP/admin.html${NC}"
    echo -e "  API Docs:   ${CYAN}http://SERVER_IP/api/docs${NC}"
fi
echo ""

echo -e "${BOLD}Quan ly server:${NC}"
echo -e "  ${CYAN}vnidt-ctl start${NC}     Khoi dong server"
echo -e "  ${CYAN}vnidt-ctl stop${NC}      Dung server"
echo -e "  ${CYAN}vnidt-ctl restart${NC}   Khoi dong lai"
echo -e "  ${CYAN}vnidt-ctl status${NC}    Xem trang thai"
echo -e "  ${CYAN}vnidt-ctl logs${NC}      Xem logs"
echo -e "  ${CYAN}vnidt-ctl backup${NC}    Sao luu database"
echo ""

if [ -z "${DOMAIN}" ] || [ "${DOMAIN}" = "localhost" ]; then
    echo -e "${YELLOW}⚠ Luu y: Ban chua cau hinh domain.${NC}"
    echo -e "  De cau hinh domain, chay lai:"
    echo -e "  ${CYAN}sudo bash install.sh --domain vnidt.vn --ssl${NC}"
    echo ""
fi

echo -e "${BOLD}Cau hinh quan trong:${NC}"
echo -e "  ${YELLOW}→ Chinh sua file ${INSTALL_DIR}/.env${NC}"
echo -e "    - JWT_SECRET: Thay doi secret key"
echo -e "    - SMTP_PASS:  Cap nhat Google App Password"
echo ""
