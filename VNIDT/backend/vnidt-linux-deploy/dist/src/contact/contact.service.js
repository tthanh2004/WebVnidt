"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let ContactService = ContactService_1 = class ContactService {
    configService;
    logger = new common_1.Logger(ContactService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        const smtpUser = this.configService.get('SMTP_USER', 'vnidt.jsc@gmail.com');
        const smtpPass = this.configService.get('SMTP_PASS', '');
        if (!smtpPass) {
            this.logger.warn('⚠️  SMTP_PASS chưa được cấu hình trong .env! ' +
                'Hãy tạo Google App Password và thêm vào file .env. ' +
                'Xem hướng dẫn tại: https://myaccount.google.com/apppasswords');
        }
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });
    }
    async sendEmail(data) {
        const smtpUser = this.configService.get('SMTP_USER', 'vnidt.jsc@gmail.com');
        const smtpPass = this.configService.get('SMTP_PASS', '');
        if (!smtpPass) {
            throw new Error('SMTP_PASS chưa được cấu hình. Vui lòng thêm Google App Password vào file .env');
        }
        const { name, email, phone, organization, interest, message } = data;
        const interestLabels = {
            gis: 'Cơ sở dữ liệu GIS',
            webgis: 'Nền tảng WebGIS',
            aquaculture: 'Quản lý thủy sản',
            environment: 'Quản lý nguồn thải / Môi trường',
            disaster: 'Cảnh báo thiên tai',
            digital: 'Tư vấn chuyển đổi số',
            other: 'Khác',
        };
        const interestLabel = interest ? (interestLabels[interest] || interest) : '';
        const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">
        <div style="background: linear-gradient(135deg, #4390C8, #670E7A); padding: 24px 30px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">📩 Yêu cầu tư vấn mới từ Website VNiDT</h2>
        </div>
        
        <div style="padding: 24px 30px; border: 1px solid #e8e8e8; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin-top: 0; color: #666;">Hệ thống vừa ghi nhận một yêu cầu tư vấn mới với các thông tin sau:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8; background: #f7f8fa; width: 150px; font-weight: 600; color: #444;">👤 Họ và tên</td>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">${this.escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600; color: #444;">✉️ Email</td>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">
                <a href="mailto:${this.escapeHtml(email)}" style="color: #4390C8; text-decoration: none;">${this.escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600; color: #444;">📞 Số điện thoại</td>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">${phone ? this.escapeHtml(phone) : '<i style="color:#999">Không cung cấp</i>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600; color: #444;">🏢 Đơn vị / Tổ chức</td>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">${organization ? this.escapeHtml(organization) : '<i style="color:#999">Không cung cấp</i>'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8; background: #f7f8fa; font-weight: 600; color: #444;">🎯 Lĩnh vực quan tâm</td>
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">${interestLabel || '<i style="color:#999">Không cung cấp</i>'}</td>
            </tr>
          </table>

          <h3 style="margin-top: 24px; color: #670E7A; font-size: 16px;">💬 Nội dung yêu cầu:</h3>
          <blockquote style="background: #f7f8fa; padding: 16px 20px; border-left: 4px solid #670E7A; margin: 0; white-space: pre-wrap; border-radius: 0 6px 6px 0; line-height: 1.6;">${this.escapeHtml(message)}</blockquote>
          
          <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin-bottom: 0;">
            Email này được gửi tự động từ hệ thống Website VNiDT · ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
          </p>
        </div>
      </div>
    `;
        const mailOptions = {
            from: `"VNiDT Website" <${smtpUser}>`,
            to: 'vnidt.jsc@gmail.com',
            subject: `[VNiDT] Yêu cầu tư vấn mới từ ${name}`,
            html: htmlContent,
            replyTo: email,
        };
        this.logger.log(`📤 Đang gửi email tư vấn từ "${name}" <${email}>...`);
        try {
            const result = await this.transporter.sendMail(mailOptions);
            this.logger.log(`✅ Gửi email thành công! MessageId: ${result.messageId}`);
            return result;
        }
        catch (error) {
            this.logger.error(`❌ Lỗi gửi email: ${error.message}`);
            throw error;
        }
    }
    escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = ContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContactService);
//# sourceMappingURL=contact.service.js.map