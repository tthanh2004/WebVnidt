/**
 * Windows Service Uninstaller for VNiDT Website
 */
const path = require('path');

try {
  const { Service } = require('node-windows');

  const svc = new Service({
    name: 'VNiDT Website',
    script: path.join(__dirname, 'dist', 'src', 'main.js'),
  });

  svc.on('uninstall', function () {
    console.log('✅ Windows Service "VNiDT Website" da duoc go bo!');
  });

  console.log('Dang go bo Windows Service...');
  svc.uninstall();

} catch (e) {
  console.error('Loi:', e.message);
}
