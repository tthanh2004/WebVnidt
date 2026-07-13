// Test API endpoint
const http = require('http');

// Test 1: Health check
console.log('=== Test 1: API Health Check ===');
http.get('http://localhost:3000/api', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    console.log('');
    
    // Test 2: POST /api/contact
    console.log('=== Test 2: POST /api/contact ===');
    const postData = JSON.stringify({
      name: 'Test User VNiDT',
      email: 'vnidt.jsc@gmail.com',
      message: 'Đây là email test tự động từ hệ thống.',
      phone: '0989026438',
      organization: 'VNiDT Test',
      interest: 'digital'
    });
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res2) => {
      let body = '';
      res2.on('data', chunk => body += chunk);
      res2.on('end', () => {
        console.log('Status:', res2.statusCode);
        console.log('Response:', body);
        
        try {
          const json = JSON.parse(body);
          if (json.success) {
            console.log('');
            console.log('✅ THÀNH CÔNG! Email đã được gửi đến vnidt.jsc@gmail.com');
            console.log('👉 Kiểm tra inbox Gmail để xác nhận.');
          } else {
            console.log('');
            console.log('❌ THẤT BẠI:', json.message);
          }
        } catch(e) {
          console.log('Response không phải JSON:', body);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ Không thể kết nối tới API:', err.message);
      console.log('👉 Backend server có thể chưa chạy hoặc port 3000 bị chặn.');
    });
    
    req.write(postData);
    req.end();
  });
}).on('error', (err) => {
  console.log('❌ Không thể kết nối tới http://localhost:3000/api');
  console.log('Lỗi:', err.message);
  console.log('');
  console.log('👉 Backend server CHƯA CHẠY!');
  console.log('   Chạy: npx pm2 start ecosystem.config.js');
});
