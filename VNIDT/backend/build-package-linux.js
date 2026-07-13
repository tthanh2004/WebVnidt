/**
 * VNiDT Website - Build & Package Script for Linux Deployment
 * Creates a deployment archive ready for Linux Server
 * 
 * Usage: node build-package-linux.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PACKAGE_DIR = path.join(ROOT, 'vnidt-linux-deploy');
const OUTPUT_FILE = path.join(ROOT, 'vnidt-linux-deploy.tar.gz');

console.log('============================================================');
console.log('   VNiDT Website - Dong goi san pham cho Linux');
console.log('============================================================');
console.log('');

// Step 1: Clean previous package
console.log('[1/8] Don dep ban dong goi cu...');
if (fs.existsSync(PACKAGE_DIR)) {
  fs.rmSync(PACKAGE_DIR, { recursive: true, force: true });
}
if (fs.existsSync(OUTPUT_FILE)) {
  fs.unlinkSync(OUTPUT_FILE);
}
fs.mkdirSync(PACKAGE_DIR, { recursive: true });
console.log('      OK');

// Step 2: Build
console.log('[2/8] Build backend (TypeScript → JavaScript)...');
try {
  execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
  console.log('      OK');
} catch (e) {
  console.error('      LOI build:', e.message);
  process.exit(1);
}

// Step 3: Copy dist
console.log('[3/8] Sao chep dist/ (backend compiled)...');
copyDirSync(path.join(ROOT, 'dist'), path.join(PACKAGE_DIR, 'dist'));
console.log('      OK');

// Step 4: Copy public (frontend files)
console.log('[4/8] Sao chep public/ (frontend website)...');
copyDirSync(path.join(ROOT, '..', 'frontend'), path.join(PACKAGE_DIR, 'public'));
// Also copy to dist/public for ServeStaticModule
copyDirSync(path.join(ROOT, '..', 'frontend'), path.join(PACKAGE_DIR, 'dist', 'public'));
console.log('      OK');

// Step 5: Copy prisma & database
console.log('[5/8] Sao chep prisma/ & database...');
copyDirSync(path.join(ROOT, 'prisma'), path.join(PACKAGE_DIR, 'prisma'));
// Copy database
if (fs.existsSync(path.join(ROOT, 'dev.db'))) {
  fs.copyFileSync(path.join(ROOT, 'dev.db'), path.join(PACKAGE_DIR, 'dev.db'));
} else if (fs.existsSync(path.join(ROOT, 'prisma', 'dev.db'))) {
  fs.copyFileSync(path.join(ROOT, 'prisma', 'dev.db'), path.join(PACKAGE_DIR, 'dev.db'));
}
console.log('      OK');

// Step 6: Copy config & scripts
console.log('[6/8] Sao chep config & scripts...');
const filesToCopy = [
  'package.json',
  'package-lock.json',
  'ecosystem.config.js',
  '.env.production',
  '.env.example',
  'install.sh',
];
filesToCopy.forEach(f => {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(PACKAGE_DIR, f));
  }
});

// Copy generated dir (Prisma client)
if (fs.existsSync(path.join(ROOT, 'generated'))) {
  copyDirSync(path.join(ROOT, 'generated'), path.join(PACKAGE_DIR, 'generated'));
}

// Create necessary directories
fs.mkdirSync(path.join(PACKAGE_DIR, 'logs'), { recursive: true });
fs.writeFileSync(path.join(PACKAGE_DIR, 'logs', '.gitkeep'), '');
fs.mkdirSync(path.join(PACKAGE_DIR, 'uploads'), { recursive: true });
fs.writeFileSync(path.join(PACKAGE_DIR, 'uploads', '.gitkeep'), '');

console.log('      OK');

// Step 7: Copy Docker files & Nginx config
console.log('[7/8] Sao chep Docker files & Nginx config...');
const dockerFiles = ['Dockerfile', 'docker-compose.yml', '.dockerignore'];
dockerFiles.forEach(f => {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(PACKAGE_DIR, f));
  }
});

// Copy nginx config directory
if (fs.existsSync(path.join(ROOT, 'nginx'))) {
  copyDirSync(path.join(ROOT, 'nginx'), path.join(PACKAGE_DIR, 'nginx'));
}

// Create nginx/ssl placeholder directory
fs.mkdirSync(path.join(PACKAGE_DIR, 'nginx', 'ssl'), { recursive: true });
fs.writeFileSync(path.join(PACKAGE_DIR, 'nginx', 'ssl', '.gitkeep'), '');

console.log('      OK');

// Step 8: Create archive
console.log('[8/8] Tao file tar.gz...');
try {
  // Try tar command (available on Windows with Git Bash, WSL, or native tar)
  const tarCmd = `tar -czf "${OUTPUT_FILE}" -C "${path.dirname(PACKAGE_DIR)}" "${path.basename(PACKAGE_DIR)}"`;
  execSync(tarCmd, { stdio: 'pipe' });
  
  const stats = fs.statSync(OUTPUT_FILE);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`      OK - ${OUTPUT_FILE}`);
  console.log(`      Kich thuoc: ${sizeMB} MB`);
} catch (e) {
  // Fallback to ZIP
  console.log('      tar khong kha dung, thu tao ZIP...');
  try {
    const zipFile = OUTPUT_FILE.replace('.tar.gz', '.zip');
    const psCmd = `Compress-Archive -Path "${PACKAGE_DIR}\\*" -DestinationPath "${zipFile}" -Force`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'pipe' });
    
    const stats = fs.statSync(zipFile);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
    console.log(`      OK - ${zipFile}`);
    console.log(`      Kich thuoc: ${sizeMB} MB`);
  } catch (e2) {
    console.error('      LOI tao archive:', e2.message);
    console.log('      Thu muc deploy van san sang tai:', PACKAGE_DIR);
  }
}

console.log('');
console.log('============================================================');
console.log('   DONG GOI CHO LINUX HOAN TAT!');
console.log('============================================================');
console.log('');
console.log('File deploy:', OUTPUT_FILE);
console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('  HUONG DAN TRIEN KHAI TREN LINUX SERVER');
console.log('═══════════════════════════════════════════════════════════');
console.log('');
console.log('  CACH 1: Cai dat tu dong (KHUYEN NGHI)');
console.log('  ─────────────────────────────────────');
console.log('  1. Upload file vnidt-linux-deploy.tar.gz len server');
console.log('     scp vnidt-linux-deploy.tar.gz user@server:/tmp/');
console.log('');
console.log('  2. SSH vao server va chay:');
console.log('     cd /tmp');
console.log('     tar -xzf vnidt-linux-deploy.tar.gz');
console.log('     cd vnidt-linux-deploy');
console.log('     sudo bash install.sh --domain vnidt.vn --ssl');
console.log('');
console.log('  CACH 2: Docker (don gian nhat)');
console.log('  ─────────────────────────────');
console.log('  1. Upload va giai nen tuong tu');
console.log('  2. cd vnidt-linux-deploy');
console.log('  3. docker compose up -d');
console.log('');
console.log('  CACH 3: Cai dat thu cong');
console.log('  ───────────────────────');
console.log('  1. Cai dat Node.js 20+, PM2, Nginx');
console.log('  2. Copy thu muc vao /var/www/vnidt');
console.log('  3. cd /var/www/vnidt');
console.log('  4. npm ci --omit=dev');
console.log('  5. npx prisma generate && npx prisma db push');
console.log('  6. cp .env.production .env (chinh sua)');
console.log('  7. pm2 start ecosystem.config.js');
console.log('  8. Cau hinh Nginx reverse proxy');
console.log('');

// ─── Helper Functions ───

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.name === 'node_modules') continue;
    if (entry.name === '.git') continue;
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
