import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './dto/create-contact.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const smtpUser = this.configService.get<string>('SMTP_USER', 'vnidt.jsc@gmail.com');
    const smtpPass = this.configService.get<string>('SMTP_PASS', '');

    if (!smtpPass) {
      this.logger.warn(
        '⚠️  SMTP_PASS chưa được cấu hình trong .env! ' +
        'Hãy tạo Google App Password và thêm vào file .env. ' +
        'Xem hướng dẫn tại: https://myaccount.google.com/apppasswords'
      );
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  async sendEmail(data: CreateContactDto) {
    const smtpUser = this.configService.get<string>('SMTP_USER', 'vnidt.jsc@gmail.com');
    const smtpPass = this.configService.get<string>('SMTP_PASS', '');

    const { name, email, phone, organization, sector, message } = data;

    // 1. Save to SQLite database
    await this.prisma.contactRequest.create({
      data: {
        name,
        email,
        phone,
        organization,
        sector,
        message,
      },
    });

    if (!smtpPass) {
      this.logger.warn('SMTP_PASS chưa cấu hình. Bỏ qua gửi email, chỉ lưu vào database.');
      return;
    }

    // Map sector value to readable label
    const sectorLabels: Record<string, string> = {
      gis: 'Cơ sở dữ liệu GIS',
      webgis: 'Nền tảng WebGIS',
      aquaculture: 'Quản lý thủy sản',
      environment: 'Quản lý nguồn thải / Môi trường',
      disaster: 'Cảnh báo thiên tai',
      digital: 'Tư vấn chuyển đổi số',
      other: 'Khác',
    };
    const sectorLabel = sector ? (sectorLabels[sector] || sector) : '';

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">
        <div style="background: linear-gradient(135deg, #0F52BA, #0D9488); padding: 24px 30px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">📩 Yêu cầu tư vấn mới từ Website VNiDT (Biển Đảo)</h2>
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
                <a href="mailto:${this.escapeHtml(email)}" style="color: #0F52BA; text-decoration: none;">${this.escapeHtml(email)}</a>
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
              <td style="padding: 12px 14px; border: 1px solid #e8e8e8;">${sectorLabel || '<i style="color:#999">Không cung cấp</i>'}</td>
            </tr>
          </table>

          <h3 style="margin-top: 24px; color: #0D9488; font-size: 16px;">💬 Nội dung yêu cầu:</h3>
          <blockquote style="background: #f7f8fa; padding: 16px 20px; border-left: 4px solid #0D9488; margin: 0; white-space: pre-wrap; border-radius: 0 6px 6px 0; line-height: 1.6;">${this.escapeHtml(message)}</blockquote>
          
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
      subject: `[VNiDT - Biển Đảo] Yêu cầu tư vấn mới từ ${name}`,
      html: htmlContent,
      replyTo: email,
    };

    this.logger.log(`📤 Đang gửi email tư vấn từ "${name}" <${email}>...`);

    try {
      const result = await this.transporter.sendMail(mailOptions);
      this.logger.log(`✅ Gửi email thành công! MessageId: ${result.messageId}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Lỗi gửi email: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.contactRequest.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    return this.prisma.contactRequest.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
