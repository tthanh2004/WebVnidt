/**
 * VNiDT Website - Build & Package Script
 * Creates a deployment ZIP file ready for Windows Server 2019
 * 
 * Usage: node build-package.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PACKAGE_DIR = path.join(ROOT, 'vnidt-deploy');
const OUTPUT_ZIP = path.join(ROOT, 'vnidt-deploy.zip');

console.log('============================================================');
console.log('   VNiDT Website - Dong goi san pham');
console.log('============================================================');
console.log('');

// Step 1: Clean previous package
console.log('[1/7] Don dep...');
if (fs.existsSync(PACKAGE_DIR)) {
  fs.rmSync(PACKAGE_DIR, { recursive: true, force: true });
}
if (fs.existsSync(OUTPUT_ZIP)) {
  fs.unlinkSync(OUTPUT_ZIP);
}
fs.mkdirSync(PACKAGE_DIR, { recursive: true });
console.log('      OK');

// Step 2: Build
console.log('[2/7] Build backend...');
try {
  execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
  console.log('      OK');
} catch (e) {
  console.error('      LOI build:', e.message);
  process.exit(1);
}

// Step 3: Copy dist
console.log('[3/7] Sao chep dist/ (backend compiled)...');
copyDirSync(path.join(ROOT, 'dist'), path.join(PACKAGE_DIR, 'dist'));
console.log('      OK');

// Step 4: Copy public (frontend files)
console.log('[4/7] Sao chep public/ (frontend website)...');
copyDirSync(path.join(ROOT, '..', 'frontend'), path.join(PACKAGE_DIR, 'public'));
// Also copy to dist/public for ServeStaticModule
copyDirSync(path.join(ROOT, '..', 'frontend'), path.join(PACKAGE_DIR, 'dist', 'public'));
console.log('      OK');

// Step 5: Copy prisma & database
console.log('[5/7] Sao chep prisma/ & database...');
copyDirSync(path.join(ROOT, 'prisma'), path.join(PACKAGE_DIR, 'prisma'));
// Copy dev.db to root
if (fs.existsSync(path.join(ROOT, 'dev.db'))) {
  fs.copyFileSync(path.join(ROOT, 'dev.db'), path.join(PACKAGE_DIR, 'dev.db'));
}
console.log('      OK');

// Step 6: Copy config & scripts
console.log('[6/7] Sao chep config & scripts...');
const filesToCopy = [
  'package.json',
  'package-lock.json',
  'ecosystem.config.js',
  '.env.production',
  'install.bat',
  'install-service.js',
  'uninstall-service.js',
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

// Create logs directory
fs.mkdirSync(path.join(PACKAGE_DIR, 'logs'), { recursive: true });
fs.writeFileSync(path.join(PACKAGE_DIR, 'logs', '.gitkeep'), '');

console.log('      OK');

// Step 7: Create ZIP
console.log('[7/7] Tao file ZIP...');
try {
  // Use PowerShell Compress-Archive on Windows
  const psCmd = `Compress-Archive -Path "${PACKAGE_DIR}\\*" -DestinationPath "${OUTPUT_ZIP}" -Force`;
  execSync(`powershell -Command "${psCmd}"`, { stdio: 'pipe' });
  
  const stats = fs.statSync(OUTPUT_ZIP);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`      OK - ${OUTPUT_ZIP}`);
  console.log(`      Kich thuoc: ${sizeMB} MB`);
} catch (e) {
  console.error('      LOI tao ZIP:', e.message);
  console.log('      Thu muc deploy van san sang tai:', PACKAGE_DIR);
}

console.log('');
console.log('============================================================');
console.log('   DONG GOI HOAN TAT!');
console.log('============================================================');
console.log('');
console.log('File deploy:', OUTPUT_ZIP);
console.log('');
console.log('Huong dan cai dat tren Windows Server 2019:');
console.log('  1. Copy file vnidt-deploy.zip len server');
console.log('  2. Giai nen vao thu muc C:\\vnidt-website');
console.log('  3. Cai dat Node.js LTS tren server');
console.log('  4. Mo Command Prompt (Admin), cd vao thu muc');
console.log('  5. Chay: install.bat');
console.log('  6. Hoac chay thu cong:');
console.log('     - npm ci --omit=dev');
console.log('     - npx prisma generate');
console.log('     - copy .env.production .env');
console.log('     - node dist\\src\\main.js');
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
