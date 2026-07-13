/**
 * Windows Service Installer for VNiDT Website
 * Uses node-windows to create a Windows Service
 */
const path = require('path');

try {
  const { Service } = require('node-windows');

  const svc = new Service({
    name: 'VNiDT Website',
    description: 'VNiDT Enterprise Website & CMS Backend Server',
    script: path.join(__dirname, 'dist', 'src', 'main.js'),
    nodeOptions: [],
    workingDirectory: __dirname,
    env: [
      { name: 'NODE_ENV', value: 'production' },
      { name: 'PORT', value: '3000' }
    ]
  });

  svc.on('install', function () {
    console.log('');
    console.log('✅ Windows Service "VNiDT Website" da duoc cai dat thanh cong!');
    console.log('');
    console.log('Dang khoi dong service...');
    svc.start();
  });

  svc.on('start', function () {
    console.log('✅ Service da khoi dong!');
    console.log('');
    console.log('Truy cap website: http://localhost:3000');
    console.log('Trang admin:      http://localhost:3000/admin.html');
    console.log('');
    console.log('Quan ly service: services.msc > Tim "VNiDT Website"');
  });

  svc.on('alreadyinstalled', function () {
    console.log('Service da duoc cai dat truoc do.');
    console.log('De cai dat lai, hay go bo truoc bang: node uninstall-service.js');
  });

  svc.on('error', function (err) {
    console.error('Loi:', err);
  });

  console.log('Dang cai dat Windows Service "VNiDT Website"...');
  svc.install();

} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') {
    console.error('Chua cai dat node-windows!');
    console.error('Chay: npm install node-windows --save');
  } else {
    console.error('Loi:', e.message);
  }
}
