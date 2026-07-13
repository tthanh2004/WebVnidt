/**
 * Test script to verify Gmail SMTP connection
 * Run: node test-email.js
 */
const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpUser = process.env.SMTP_USER || 'vnidt.jsc@gmail.com';
const smtpPass = process.env.SMTP_PASS || '';

console.log('=== Test Gmail SMTP ===');
console.log('SMTP_USER:', smtpUser);
console.log('SMTP_PASS:', smtpPass ? `${smtpPass.substring(0, 4)}****` : '(CHƯA CÓ)');
console.log('SMTP_PASS length:', smtpPass.length, 'characters');
console.log('');

if (!smtpPass) {
  console.error('❌ SMTP_PASS chưa được cấu hình trong .env!');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

console.log('🔄 Đang kiểm tra kết nối SMTP...');

transporter.verify()
  .then(() => {
    console.log('✅ Kết nối SMTP thành công! App Password hoạt động tốt.');
    console.log('');
    console.log('🔄 Đang gửi email test...');
    
    return transporter.sendMail({
      from: `"VNiDT Test" <${smtpUser}>`,
      to: smtpUser,
      subject: '[TEST] Kiểm tra gửi email VNiDT',
      html: '<h2>✅ Email test thành công!</h2><p>Hệ thống gửi email đang hoạt động bình thường.</p>',
    });
  })
  .then((result) => {
    console.log('✅ Gửi email test thành công!');
    console.log('   MessageId:', result.messageId);
    console.log('');
    console.log('👉 Kiểm tra hộp thư vnidt.jsc@gmail.com để xác nhận nhận được email.');
  })
  .catch((error) => {
    console.error('');
    console.error('❌ LỖI:', error.message);
    console.error('');
    
    if (error.message.includes('Invalid login') || error.message.includes('Username and Password not accepted')) {
      console.error('📌 NGUYÊN NHÂN: Mật khẩu không đúng hoặc chưa phải App Password.');
      console.error('');
      console.error('📋 CÁCH SỬA:');
      console.error('   1. Đăng nhập Gmail: vnidt.jsc@gmail.com');
      console.error('   2. Vào: https://myaccount.google.com/security');
      console.error('   3. Đảm bảo "2-Step Verification" đã BẬT');
      console.error('   4. Vào: https://myaccount.google.com/apppasswords');
      console.error('   5. Tạo App Password mới → Copy 16 ký tự');
      console.error('   6. Dán vào SMTP_PASS trong file .env (viết liền, không dấu cách)');
    } else if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      console.error('📌 NGUYÊN NHÂN: Không thể kết nối tới Gmail SMTP server.');
      console.error('   - Kiểm tra kết nối internet');
      console.error('   - Kiểm tra firewall có chặn port 465/587 không');
    } else if (error.message.includes('less secure')) {
      console.error('📌 NGUYÊN NHÂN: Gmail yêu cầu App Password thay vì mật khẩu thường.');
      console.error('   Google đã tắt tính năng "Less secure apps" từ 05/2022.');
      console.error('   Bạn PHẢI dùng App Password.');
    }
    
    console.error('');
    console.error('Chi tiết lỗi:', error.code || error.responseCode);
  });
